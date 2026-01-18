import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import * as S from "./blogDetailPage.styled";

import {
  getBlogDetail,
  getBlogRelated,
  getBlogNavigation,
  increaseBlogView,
} from "@/shared/api/cms.api";

type CmsTag = { name: string };
type CmsBlog = {
  documentId?: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  description?: string;
  content?: string;
  tags?: CmsTag[];
  viewCount?: number;
  createdAt?: string;
};

type NavRes = { prev?: CmsBlog | null; next?: CmsBlog | null };

const extractFirstMarkdownImageUrl = (md?: string) => {
  if (!md) return undefined;
  const m = md.match(/!\[[^\]]*]\(([^)]+)\)/);
  return m?.[1];
};

// ---- mini markdown renderer (no deps) ----
function renderInline(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((p, idx) => {
    if (p.startsWith("**") && p.endsWith("**")) return <strong key={idx}>{p.slice(2, -2)}</strong>;
    return <span key={idx}>{p}</span>;
  });
}

function renderMarkdownLite(md?: string) {
  const src = (md ?? "").trim();
  if (!src) return null;

  const lines = src.split("\n");
  const out: React.ReactNode[] = [];

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i++;
      continue;
    }

    const img = line.match(/^\s*!\[[^\]]*]\(([^)]+)\)\s*$/);
    if (img?.[1]) {
      out.push(<S.ContentImage key={`img_${i}`} src={img[1]} alt="" loading="lazy" />);
      i++;
      continue;
    }

    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      const level = h[1].length;
      const text = h[2] ?? "";
      out.push(
        <S.Heading key={`h_${i}`} as={`h${Math.min(level, 3)}` as any}>
          {renderInline(text)}
        </S.Heading>
      );
      i++;
      continue;
    }

    const isList = /^\s*[-*]\s+/.test(line);
    if (isList) {
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, ""));
        i++;
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

    const buf: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{1,6})\s+/.test(lines[i]) &&
      !/^\s*[-*]\s+/.test(lines[i]) &&
      !/^\s*!\[[^\]]*]\(([^)]+)\)\s*$/.test(lines[i])
    ) {
      buf.push(lines[i]);
      i++;
    }
    const pText = buf.join(" ").replace(/\s+/g, " ").trim();
    out.push(<S.P key={`p_${i}`}>{renderInline(pText)}</S.P>);
  }

  return out;
}

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
  const contentNodes = useMemo(() => renderMarkdownLite(blog?.content), [blog?.content]);

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
            {(blog.tags ?? []).slice(0, 6).map((t, i) => (
              <S.Tag key={`${t.name}_${i}`}>{t.name}</S.Tag>
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
