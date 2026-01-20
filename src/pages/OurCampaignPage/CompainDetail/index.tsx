import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import * as S from "./campaignDetailPage.styled";

import { getCampaignDetail, getCampaigns } from "@/shared/api/cms.api";

type ApiTag = { name: string };

type ApiMediaFormat = { url?: string };
type ApiThumbnail = {
  url?: string;
  formats?: {
    large?: ApiMediaFormat;
    medium?: ApiMediaFormat;
    small?: ApiMediaFormat;
    thumbnail?: ApiMediaFormat;
  };
};

type ApiCampaign = {
  id?: number;
  documentId?: string;
  title?: string;
  description?: string;
  excerpt?: string;
  content?: string;
  tags?: ApiTag[];
  thumbnail?: ApiThumbnail | null;
  createdAt?: string;
};

const CMS_ORIGIN = import.meta.env.VITE_CMS_ORIGIN || "https://social-elite-cms.leapstud.io";

const toAbsUrl = (u?: string) => {
  if (!u) return undefined;
  if (u.startsWith("http://") || u.startsWith("https://")) return u;
  if (u.startsWith("/")) return `${CMS_ORIGIN}${u}`;
  return `${CMS_ORIGIN}/${u}`;
};

const pickThumb = (t?: ApiThumbnail | null) => {
  if (!t) return undefined;
  const u =
    t.formats?.large?.url ||
    t.formats?.medium?.url ||
    t.formats?.small?.url ||
    t.formats?.thumbnail?.url ||
    t.url;
  return toAbsUrl(u);
};

// ------------------------------
// Markdown renderer (robust for CMS content)
// ------------------------------
const normalizeUrl = (u?: string) => toAbsUrl(u);

const extractFirstMarkdownImageUrl = (md?: string) => {
  if (!md) return undefined;
  const m = md.match(/!\[[^\]]*]\(([^)]+)\)/);
  return normalizeUrl(m?.[1]);
};

const cleanLine = (s: string) =>
  s
    .replace(/\r/g, "")
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+$/g, "");

const unescapeMd = (s: string) =>
  s
    .replace(/\\\./g, ".")
    .replace(/\\\(/g, "(")
    .replace(/\\\)/g, ")")
    .replace(/\\\[/g, "[")
    .replace(/\\\]/g, "]")
    .replace(/\\\*/g, "*")
    .replace(/\\#/g, "#")
    .replace(/\\\\/g, "\\");

const unwrapWhole = (input: string) => {
  let s = input.trim();
  s = s.replace(/^#{1,6}\s*/g, "").trim();

  let changed = true;
  while (changed) {
    changed = false;
    const before = s;

    if (s.startsWith("_") && s.endsWith("_") && s.length > 2) s = s.slice(1, -1).trim();
    if (s.startsWith("**") && s.endsWith("**") && s.length > 4) s = s.slice(2, -2).trim();
    if (s.startsWith("__") && s.endsWith("__") && s.length > 4) s = s.slice(2, -2).trim();

    if (s.startsWith("*") && s.endsWith("*") && !s.startsWith("**") && !s.endsWith("**") && s.length > 2) {
      s = s.slice(1, -1).trim();
    }

    changed = s !== before;
  }

  return s;
};

const isHeadingLine = (line: string) => /^#{1,6}\s+/.test(line.trim());
const isBulletLine = (line: string) => /^\s*[*-]\s+/.test(line);
const isOrderedLine = (line: string) => /^\s*\d+\.\s+/.test(line);

const isImageOnlyLine = (rawLine: string) => {
  const l = unwrapWhole(rawLine);
  return /^!\[[^\]]*]\([^)]+\)$/.test(l);
};

const extractImageUrlFromLine = (rawLine: string) => {
  const l = unwrapWhole(rawLine);
  const m = l.match(/^!\[[^\]]*]\(([^)]+)\)$/);
  return normalizeUrl(m?.[1]);
};

const isPlainCaptionLine = (line: string) => {
  const t = line.trim();
  if (!t) return false;
  if (isHeadingLine(t)) return false;
  if (isBulletLine(t)) return false;
  if (isOrderedLine(t)) return false;
  if (isImageOnlyLine(t)) return false;
  return true;
};

function renderInline(text: string) {
  const src = unescapeMd(text);
  const tokens = src.split(/(\*\*[^*]+\*\*|_[^_]+_|`[^`]+`|\[[^\]]+]\([^)]+\))/g);

  return tokens
    .filter((t) => t !== "")
    .map((t, idx) => {
      if (t.startsWith("**") && t.endsWith("**")) return <strong key={idx}>{t.slice(2, -2)}</strong>;
      if (t.startsWith("_") && t.endsWith("_")) return <em key={idx}>{t.slice(1, -1)}</em>;
      if (t.startsWith("`") && t.endsWith("`")) return <S.InlineCode key={idx}>{t.slice(1, -1)}</S.InlineCode>;

      if (t.startsWith("[") && t.includes("](") && t.endsWith(")")) {
        const m = t.match(/^\[([^\]]+)]\(([^)]+)\)$/);
        if (m?.[1] && m?.[2]) {
          return (
            <S.A key={idx} href={m[2]} target="_blank" rel="noreferrer noopener">
              {m[1]}
            </S.A>
          );
        }
      }

      return <span key={idx}>{t}</span>;
    });
}

function renderMarkdown(md?: string) {
  const src = (md ?? "").trim();
  if (!src) return null;

  const lines = src.split("\n").map(cleanLine);
  const out: React.ReactNode[] = [];

  let i = 0;
  while (i < lines.length) {
    const raw = lines[i] ?? "";
    const line = raw.trim();

    if (!line) {
      i++;
      continue;
    }

    // image-only line (supports _**![...]**_ and heading-wrapped)
    if (isImageOnlyLine(raw)) {
      const url = extractImageUrlFromLine(raw);
      let caption: string | undefined;

      let j = i + 1;
      while (j < lines.length && !lines[j].trim()) j++;

      if (j < lines.length && isPlainCaptionLine(lines[j])) {
        caption = lines[j].trim();
        i = j + 1;
      } else {
        i++;
      }

      out.push(
        <S.Figure key={`img_${i}`}>
          {url ? <S.ContentImage src={url} alt="" loading="lazy" /> : null}
          {caption ? <S.FigureCaption>{renderInline(caption)}</S.FigureCaption> : null}
        </S.Figure>
      );
      continue;
    }

    // heading
    const h = raw.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      const level = h[1].length;
      const text = (h[2] ?? "").trim();

      // heading that is actually image: ### **![...](...)**
      if (isImageOnlyLine(text)) {
        const url = extractImageUrlFromLine(text);
        out.push(
          <S.Figure key={`img_in_h_${i}`}>
            {url ? <S.ContentImage src={url} alt="" loading="lazy" /> : null}
          </S.Figure>
        );
        i++;
        continue;
      }

      out.push(
        <S.Heading key={`h_${i}`} $level={Math.min(level, 3) as 1 | 2 | 3}>
          {renderInline(text)}
        </S.Heading>
      );
      i++;
      continue;
    }

    // bullet list
    if (isBulletLine(raw)) {
      const items: string[] = [];
      while (i < lines.length && isBulletLine(lines[i])) {
        const t = lines[i].replace(/^\s*[*-]\s+/, "").trim();
        if (t) items.push(t);
        i++;
        while (i < lines.length && !lines[i].trim()) i++;
      }

      out.push(
        <S.UL key={`ul_${i}`}>
          {items.map((t, idx) => (
            <li key={idx}>{renderInline(t)}</li>
          ))}
        </S.UL>
      );
      continue;
    }

    // ordered list
    if (isOrderedLine(raw)) {
      const items: string[] = [];
      while (i < lines.length && isOrderedLine(lines[i])) {
        const t = lines[i].replace(/^\s*\d+\.\s+/, "").trim();
        if (t) items.push(t);
        i++;
        while (i < lines.length && !lines[i].trim()) i++;
      }

      out.push(
        <S.OL key={`ol_${i}`}>
          {items.map((t, idx) => (
            <li key={idx}>{renderInline(t)}</li>
          ))}
        </S.OL>
      );
      continue;
    }

    // paragraph
    const segs: Array<{ text: string; hardBreak: boolean }> = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !isHeadingLine(lines[i]) &&
      !isBulletLine(lines[i]) &&
      !isOrderedLine(lines[i]) &&
      !isImageOnlyLine(lines[i])
    ) {
      const ln = lines[i];
      const hardBreak = / {2}$/.test(ln);
      segs.push({ text: ln.trim(), hardBreak });
      i++;
    }

    out.push(
      <S.P key={`p_${i}`}>
        {segs.map((s, idx) => (
          <span key={idx}>
            {idx > 0 && !segs[idx - 1].hardBreak ? " " : null}
            {renderInline(s.text)}
            {s.hardBreak ? <br /> : null}
          </span>
        ))}
      </S.P>
    );
  }

  return out;
}

// ------------------------------
// Page
// ------------------------------
export default function CampaignDetailPage() {
  const { documentId } = useParams<{ documentId: string }>();
  const id = (documentId ?? "").trim();

  const [item, setItem] = useState<ApiCampaign | null>(null);
  const [related, setRelated] = useState<ApiCampaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    let alive = true;
    setLoading(true);

    Promise.allSettled([getCampaignDetail(id), getCampaigns()])
      .then((results) => {
        if (!alive) return;
        const [detailR, listR] = results;

        if (detailR.status === "fulfilled") {
          const d = (detailR.value as any)?.data ?? detailR.value;
          setItem(d ?? null);
        } else {
          setItem(null);
        }

        if (listR.status === "fulfilled") {
          const list: ApiCampaign[] = Array.isArray((listR.value as any)?.data) ? (listR.value as any).data : [];
          const filtered = list.filter((x) => (x.documentId ?? String(x.id)) !== id).slice(0, 6);
          setRelated(filtered);
        } else {
          setRelated([]);
        }
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [id]);

  const heroImg = useMemo(
    () => pickThumb(item?.thumbnail) || extractFirstMarkdownImageUrl(item?.content),
    [item?.thumbnail, item?.content]
  );

  const contentNodes = useMemo(() => renderMarkdown(item?.content), [item?.content]);

  if (loading) {
    return (
      <S.Page>
        <S.Container>
          <S.Title>Loading...</S.Title>
          <S.Desc>Fetching campaign detail...</S.Desc>
        </S.Container>
      </S.Page>
    );
  }

  if (!item) {
    return (
      <S.Page>
        <S.Container>
          <S.Title>Not found</S.Title>
          <S.Desc>Campaign does not exist.</S.Desc>
        </S.Container>
      </S.Page>
    );
  }

  const docId = item.documentId ?? id;

  return (
    <S.Page>
      <S.Container>
        {heroImg ? <S.HeroMedia style={{ backgroundImage: `url(${heroImg})` }} /> : null}

        <S.MetaRow>
          <S.TagRow>
            {(item.tags ?? []).slice(0, 6).map((t, i) => (
              <S.Tag key={`${docId}_${t.name}_${i}`}>{t.name}</S.Tag>
            ))}
          </S.TagRow>
        </S.MetaRow>

        <S.Title>{item.title}</S.Title>
        <S.Desc>{item.excerpt || item.description}</S.Desc>

        <S.Content>{contentNodes}</S.Content>

        <S.RelatedBlock>
          <S.RelatedTitle>Related</S.RelatedTitle>

          {related.length ? (
            <S.RelatedWrap>
              {related.map((r) => {
                const rid = r.documentId ?? String(r.id);
                const thumb = pickThumb(r.thumbnail) || extractFirstMarkdownImageUrl(r.content);
                return (
                  <S.RelatedCard key={rid} as={Link} to={`/campaigns/${rid}`}>
                    <S.RelatedMedia aria-hidden style={{ backgroundImage: thumb ? `url(${thumb})` : undefined }} />
                    <S.RelatedBody>
                      <S.RelatedName>{r.title}</S.RelatedName>
                      <S.RelatedDesc>{r.excerpt || r.description}</S.RelatedDesc>
                      <S.RelatedMore>
                        Read More <ArrowRight size={16} />
                      </S.RelatedMore>
                    </S.RelatedBody>
                  </S.RelatedCard>
                );
              })}
            </S.RelatedWrap>
          ) : (
            <S.EmptyInline>No related campaigns.</S.EmptyInline>
          )}
        </S.RelatedBlock>
      </S.Container>
    </S.Page>
  );
}
