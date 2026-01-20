import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as S from "./blogDetailPage.styled";

import { getBlogDetail, getBlogNavigation, getBlogRelated, increaseBlogView } from "@/shared/api/cms.api";

type CmsBlog = {
  documentId?: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  description?: string;
  content?: string;
  tags?: any[]; // keep flexible
  viewCount?: number;
  createdAt?: string;
};

type NavRes = { prev?: CmsBlog | null; next?: CmsBlog | null };

// ------------------------------
// Markdown helpers (robust for CMS)
// ------------------------------
const extractFirstMarkdownImageUrl = (md?: string) => {
  if (!md) return undefined;
  const m = md.match(/!\[[^\]]*]\(([^)]+)\)/);
  return m?.[1];
};

const cleanLine = (s: string) =>
  s
    .replace(/\r/g, "")
    .replace(/\u00a0/g, " ") // NBSP
    .replace(/[ \t]+$/g, ""); // trimRight

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

function renderInline(text: string) {
  const src = unescapeMd(text);

  // token: **bold** | `code` | [text](url)
  const tokens = src.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+]\([^)]+\))/g);

  return tokens
    .filter((t) => t !== "")
    .map((t, idx) => {
      // bold
      if (t.startsWith("**") && t.endsWith("**")) {
        const inner = t.slice(2, -2);
        return <strong key={idx}>{inner}</strong>;
      }

      // inline code
      if (t.startsWith("`") && t.endsWith("`")) {
        const inner = t.slice(1, -1);
        return <S.InlineCode key={idx}>{inner}</S.InlineCode>;
      }

      // link
      if (t.startsWith("[") && t.includes("](") && t.endsWith(")")) {
        const m = t.match(/^\[([^\]]+)]\(([^)]+)\)$/);
        if (m?.[1] && m?.[2]) {
          return (
            <S.A
              key={idx}
              href={m[2]}
              target="_blank"
              rel="noreferrer noopener"
              onClick={(e) => e.stopPropagation()}
            >
              {m[1]}
            </S.A>
          );
        }
      }

      return <span key={idx}>{t}</span>;
    });
}

const isHeadingLine = (line: string) => /^#{1,6}\s+/.test(line.trim());
const isBulletLine = (line: string) => /^\s*[*-]\s+/.test(line);
const isOrderedLine = (line: string) => /^\s*\d+\.\s+/.test(line);

const isImageOnlyLine = (rawLine: string) => {
  let l = rawLine.trim();

  // remove heading markers
  l = l.replace(/^#{1,6}\s*/g, "").trim();

  // unwrap bold wrapper
  const boldWrap = l.match(/^\*\*(.*)\*\*$/);
  if (boldWrap?.[1]) l = boldWrap[1].trim();

  return /^!\[[^\]]*]\([^)]+\)$/.test(l);
};

const extractImageUrlFromLine = (rawLine: string) => {
  let l = rawLine.trim();
  l = l.replace(/^#{1,6}\s*/g, "").trim();

  const boldWrap = l.match(/^\*\*(.*)\*\*$/);
  if (boldWrap?.[1]) l = boldWrap[1].trim();

  const m = l.match(/^!\[[^\]]*]\(([^)]+)\)$/);
  return m?.[1];
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

    // ✅ image block (supports **![...](...)** or in heading)
    if (isImageOnlyLine(raw)) {
      const url = extractImageUrlFromLine(raw);
      const key = `img_${i}`;

      // caption: next non-empty plain line
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
        <S.Figure key={key}>
          {url ? <S.ContentImage src={url} alt="" loading="lazy" /> : null}
          {caption ? <S.FigureCaption>{renderInline(caption)}</S.FigureCaption> : null}
        </S.Figure>
      );
      continue;
    }

    // ✅ heading
    const h = raw.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      const level = h[1].length;
      const text = (h[2] ?? "").trim();

      // heading containing image only
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

    // ✅ unordered list
    if (isBulletLine(raw)) {
      const items: string[] = [];

      while (i < lines.length && isBulletLine(lines[i])) {
        const t = lines[i].replace(/^\s*[*-]\s+/, "").trim();
        if (t) items.push(t);
        i++;
        while (i < lines.length && !lines[i].trim()) i++; // ignore blank lines between bullets
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

    // ✅ ordered list
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

    // ✅ paragraph (supports markdown hard break with 2 spaces at end)
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
export default function BlogDetailPage() {
  const { documentId } = useParams<{ documentId: string }>();
  const id = (documentId ?? "").trim();

  const [blog, setBlog] = useState<CmsBlog | null>(null);
  const [related, setRelated] = useState<CmsBlog[]>([]);
  const [nav, setNav] = useState<NavRes | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ prevent double view call (React StrictMode dev)
  const viewedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!id) return;

    let alive = true;
    setLoading(true);

    // ✅ call view only once per documentId
    if (!viewedRef.current.has(id)) {
      viewedRef.current.add(id);
      increaseBlogView(id).catch(() => {});
    }

    Promise.allSettled([getBlogDetail(id), getBlogRelated(id), getBlogNavigation(id)])
      .then((results) => {
        if (!alive) return;

        const [detailR, relatedR, navR] = results;

        if (detailR.status === "fulfilled") {
          const d = (detailR.value as any)?.data ?? detailR.value;
          setBlog(d ?? null);
        } else {
          setBlog(null);
        }

        if (relatedR.status === "fulfilled") {
          const list = (relatedR.value as any)?.data;
          setRelated(Array.isArray(list) ? list : []);
        } else {
          setRelated([]);
        }

        if (navR.status === "fulfilled") {
          const n = (navR.value as any)?.data ?? navR.value;
          setNav(n ?? null);
        } else {
          setNav(null);
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

  const heroImg = useMemo(() => extractFirstMarkdownImageUrl(blog?.content), [blog?.content]);
  const contentNodes = useMemo(() => renderMarkdown(blog?.content), [blog?.content]);

  if (loading) {
    return (
      <S.Page>
        <S.Container>
          <S.Title>Loading...</S.Title>
          <S.Desc>Fetching blog detail...</S.Desc>
        </S.Container>
      </S.Page>
    );
  }

  if (!blog) {
    return (
      <S.Page>
        <S.Container>
          <S.Title>Not found</S.Title>
          <S.Desc>Blog does not exist.</S.Desc>
        </S.Container>
      </S.Page>
    );
  }

  const prev = nav?.prev ?? null;
  const next = nav?.next ?? null;

  return (
    <S.Page>
      <S.Container>
        {heroImg ? <S.HeroMedia style={{ backgroundImage: `url(${heroImg})` }} /> : null}

        <S.MetaRow>
          <S.TagRow>
            {(blog.tags ?? []).slice(0, 6).map((t: any, i: number) => (
              <S.Tag key={`${t?.name ?? "tag"}_${i}`}>{t?.name ?? "Tag"}</S.Tag>
            ))}
          </S.TagRow>

          {typeof blog.viewCount === "number" ? <S.ViewCount>{blog.viewCount} views</S.ViewCount> : null}
        </S.MetaRow>

        <S.Title>{blog.title}</S.Title>
        <S.Desc>{blog.excerpt || blog.description}</S.Desc>

        <S.Content>{contentNodes}</S.Content>

        {/* ✅ Bottom Prev/Next (above Related) */}
        <S.BottomNav>
          <S.NavSide $align="left">
            {prev?.documentId ? (
              <S.NavLink as={Link} to={`/blog/${prev.documentId}`} $align="left">
                <S.NavLabelRow $align="left">
                  <S.NavIconCircle aria-hidden>
                    <ArrowLeft size={16} />
                  </S.NavIconCircle>
                  <S.NavKicker>PREV</S.NavKicker>
                </S.NavLabelRow>
                <S.NavTitle $align="left">{prev.title}</S.NavTitle>
              </S.NavLink>
            ) : (
              <S.NavDisabled $align="left">
                <S.NavLabelRow $align="left">
                  <S.NavIconCircle aria-hidden>
                    <ArrowLeft size={16} />
                  </S.NavIconCircle>
                  <S.NavKicker>PREV</S.NavKicker>
                </S.NavLabelRow>
                <S.NavTitle $align="left">—</S.NavTitle>
              </S.NavDisabled>
            )}
          </S.NavSide>

          <S.NavSide $align="right">
            {next?.documentId ? (
              <S.NavLink as={Link} to={`/blog/${next.documentId}`} $align="right">
                <S.NavLabelRow $align="right">
                  <S.NavKicker>NEXT</S.NavKicker>
                  <S.NavIconCircle aria-hidden>
                    <ArrowRight size={16} />
                  </S.NavIconCircle>
                </S.NavLabelRow>
                <S.NavTitle $align="right">{next.title}</S.NavTitle>
              </S.NavLink>
            ) : (
              <S.NavDisabled $align="right">
                <S.NavLabelRow $align="right">
                  <S.NavKicker>NEXT</S.NavKicker>
                  <S.NavIconCircle aria-hidden>
                    <ArrowRight size={16} />
                  </S.NavIconCircle>
                </S.NavLabelRow>
                <S.NavTitle $align="right">—</S.NavTitle>
              </S.NavDisabled>
            )}
          </S.NavSide>
        </S.BottomNav>

        <S.RelatedBlock>
          <S.RelatedTitle>Related</S.RelatedTitle>

          {related.length ? (
            <S.RelatedList>
              {related.slice(0, 6).map((r) => (
                <S.RelatedItem key={r.documentId} as={Link} to={`/blog/${r.documentId}`}>
                  <S.RelatedInfo>
                    <S.RelatedName>{r.title}</S.RelatedName>
                    <S.RelatedDesc>{r.excerpt || r.description}</S.RelatedDesc>
                    <S.RelatedMore>
                      Read <ArrowRight size={16} />
                    </S.RelatedMore>
                  </S.RelatedInfo>
                </S.RelatedItem>
              ))}
            </S.RelatedList>
          ) : (
            <S.EmptyInline>No related posts.</S.EmptyInline>
          )}
        </S.RelatedBlock>
      </S.Container>
    </S.Page>
  );
}
