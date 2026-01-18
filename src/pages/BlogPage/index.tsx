import { ArrowRight, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import * as S from "./blogPage.styled";

import { getCategories, getBlogsTopViewed, searchBlogs } from "@/shared/api/cms.api";

type CmsCategory = {
  id?: number;
  documentId?: string;
  name?: string;
  title?: string;
  slug: string;
};

type CmsTag = { name: string };

type CmsMediaFormat = { url?: string };
type CmsThumbnail = {
  url?: string;
  formats?: {
    large?: CmsMediaFormat;
    medium?: CmsMediaFormat;
    small?: CmsMediaFormat;
    thumbnail?: CmsMediaFormat;
  };
};

type CmsBlog = {
  id?: number;
  documentId?: string;
  title?: string;
  excerpt?: string;
  description?: string;
  content?: string;
  createdAt?: string;
  tags?: CmsTag[];
  thumbnail?: CmsThumbnail | null;
  category?: any; // tuỳ CMS shape
};

type CategoryKey = "all" | string;

type PostUI = {
  id: string; // documentId
  title: string;
  excerpt: string;
  href: string;
  categorySlug?: string;
  categoryName?: string;
  thumbUrl?: string;
};

const CMS_ORIGIN = import.meta.env.VITE_CMS_ORIGIN || "https://social-elite-cms.leapstud.io";

const toAbsUrl = (u?: string) => {
  if (!u) return undefined;
  if (u.startsWith("http://") || u.startsWith("https://")) return u;
  if (u.startsWith("/")) return `${CMS_ORIGIN}${u}`;
  return `${CMS_ORIGIN}/${u}`;
};

const pickThumb = (t?: CmsThumbnail | null) => {
  if (!t) return undefined;
  const u =
    t.formats?.large?.url ||
    t.formats?.medium?.url ||
    t.formats?.small?.url ||
    t.formats?.thumbnail?.url ||
    t.url;
  return toAbsUrl(u);
};

const stripText = (s?: string) =>
  (s ?? "")
    .replace(/\s+/g, " ")
    .trim();

const excerptFrom = (blog: any) => {
  const ex = stripText(blog.excerpt);
  if (ex) return ex.length > 160 ? `${ex.slice(0, 160)}...` : ex;

  const d = stripText(blog.description);
  if (d) return d.length > 160 ? `${d.slice(0, 160)}...` : d;

  const c = stripText(blog.content);
  return c.length > 160 ? `${c.slice(0, 160)}...` : c;
};

const pickCategory = (blog: CmsBlog) => {
  const c = blog.category;
  if (!c) return { slug: undefined, name: undefined };

  if (typeof c === "string") return { slug: c, name: c };

  const slug = c?.slug ?? c?.documentId ?? c?.id;
  const name = c?.name ?? c?.title ?? c?.label ?? c?.slug;

  return { slug: slug ? String(slug) : undefined, name: name ? String(name) : undefined };
};

const normalizeBlogs = (res: any): PostUI[] => {
  const list: CmsBlog[] = Array.isArray(res?.data) ? res.data : [];
  return list.map((b) => {
    const id = String(b.documentId ?? b.id ?? "");
    const title = b.title ?? "Untitled";
    const { slug, name } = pickCategory(b);

    return {
      id,
      title,
      excerpt: excerptFrom(b),
      href: id ? `/blog/${id}` : "/blog",
      categorySlug: slug,
      categoryName: name,
      thumbUrl: pickThumb(b.thumbnail),
    };
  });
};

export default function BlogPage() {
  const [active, setActive] = useState<CategoryKey>("all");
  const [query, setQuery] = useState("");

  const [cats, setCats] = useState<CmsCategory[]>([]);
  const [posts, setPosts] = useState<PostUI[]>([]);
  const [topPosts, setTopPosts] = useState<PostUI[]>([]);

  const [loadingPosts, setLoadingPosts] = useState(false);
  const [loadingCats, setLoadingCats] = useState(false);
  const [loadingTop, setLoadingTop] = useState(false);

  // ✅ counts snapshot (không bị reset khi filter)
  const [allCount, setAllCount] = useState(0);
  const [countMap, setCountMap] = useState<Record<string, number>>({});

  // 1) load categories
  useEffect(() => {
    let alive = true;
    setLoadingCats(true);

    getCategories()
      .then((res: any) => {
        const list: CmsCategory[] = Array.isArray(res?.data) ? res.data : [];
        const normalized = list
          .map((c) => ({
            ...c,
            slug: String((c as any)?.slug ?? "").trim(),
            name: (c as any)?.name ?? (c as any)?.title,
          }))
          .filter((c) => !!c.slug);

        if (!alive) return;
        setCats(normalized);
      })
      .catch(() => {
        if (!alive) return;
        setCats([]);
      })
      .finally(() => {
        if (!alive) return;
        setLoadingCats(false);
      });

    return () => {
      alive = false;
    };
  }, []);

  // 2) load top viewed
  useEffect(() => {
    let alive = true;
    setLoadingTop(true);

    getBlogsTopViewed()
      .then((res: any) => {
        if (!alive) return;
        setTopPosts(normalizeBlogs(res).slice(0, 6));
      })
      .catch(() => {
        if (!alive) return;
        setTopPosts([]);
      })
      .finally(() => {
        if (!alive) return;
        setLoadingTop(false);
      });

    return () => {
      alive = false;
    };
  }, []);

  // 3) load posts by filter/search (debounce 350ms)
  useEffect(() => {
    let alive = true;
    const t = window.setTimeout(() => {
      setLoadingPosts(true);

      const category = active === "all" ? "" : active;
      const q = query.trim();

      searchBlogs({ category, q })
        .then((res: any) => {
          if (!alive) return;

          const normalized = normalizeBlogs(res);
          setPosts(normalized);

          // ✅ chỉ cập nhật count "global" khi đang All và không search text
          if (active === "all" && !q) {
            setAllCount(normalized.length);

            const by = normalized.reduce<Record<string, number>>((acc, p) => {
              if (!p.categorySlug) return acc;
              acc[p.categorySlug] = (acc[p.categorySlug] ?? 0) + 1;
              return acc;
            }, {});

            setCountMap(by);
          } else {
            // ✅ khi filter: giữ countMap cũ, nhưng update count cho category đang active
            if (active !== "all") {
              setCountMap((prev) => ({ ...prev, [active]: normalized.length }));
            }
          }
        })
        .catch(() => {
          if (!alive) return;
          setPosts([]);
        })
        .finally(() => {
          if (!alive) return;
          setLoadingPosts(false);
        });
    }, 350);

    return () => {
      alive = false;
      window.clearTimeout(t);
    };
  }, [active, query]);

  const categories = useMemo(() => {
    const base = cats.map((c) => ({
      key: c.slug,
      label: c.name || c.slug,
    }));

    return [
      { key: "all" as const, label: "All", count: allCount || posts.length },
      ...base.map((c) => ({ ...c, count: countMap[c.key] ?? 0 })),
    ];
  }, [cats, countMap, allCount, posts.length]);

  return (
    <S.Page>
      <S.Hero>
        <S.HeroInner>
          <S.HeroTitle>Blogs</S.HeroTitle>
        </S.HeroInner>
      </S.Hero>

      <S.Main>
        <S.MainInner>
          <S.Layout>
            {/* Left: Posts */}
            <S.PostsCol>
              {loadingPosts ? (
                Array.from({ length: 6 }).map((_, idx) => (
                  <S.PostCard key={`sk_${idx}`} style={{ ["--d" as any]: `${idx * 60}ms`, opacity: 0.75 }}>
                    <S.PostMedia aria-hidden />
                    <S.PostBody>
                      <S.PostTitle>Loading...</S.PostTitle>
                      <S.PostExcerpt>Fetching posts from CMS...</S.PostExcerpt>
                      <S.ReadMore as="span">
                        Read More <ArrowRight size={16} />
                      </S.ReadMore>
                    </S.PostBody>
                  </S.PostCard>
                ))
              ) : posts.length ? (
                posts.map((p, idx) => (
                  <S.PostCard key={p.id} style={{ ["--d" as any]: `${idx * 60}ms` }}>
                    <S.PostMedia
                      aria-hidden
                      style={{ backgroundImage: p.thumbUrl ? `url(${p.thumbUrl})` : undefined }}
                    />
                    <S.PostBody>
                      <S.PostTitle>{p.title}</S.PostTitle>
                      <S.PostExcerpt>{p.excerpt}</S.PostExcerpt>

                      <S.ReadMore as={Link} to={p.href} aria-label={`Read more: ${p.title}`}>
                        Read More <ArrowRight size={16} />
                      </S.ReadMore>
                    </S.PostBody>
                  </S.PostCard>
                ))
              ) : (
                <S.EmptyState>No posts found.</S.EmptyState>
              )}
            </S.PostsCol>

            {/* Right: Sidebar */}
            <S.SidebarCol>
              <S.SidebarSticky>
                {/* Top Posts */}
                <S.SideCard>
                  <S.SideTitle>TopPosts</S.SideTitle>

                  <S.RelatedList>
                    {loadingTop ? (
                      Array.from({ length: 3 }).map((_, i) => (
                        <S.RelatedItem
                          key={`tp_sk_${i}`}
                          as="div"
                          style={{ cursor: "default" as any, opacity: 0.75 }}
                        >
                          <S.RelatedThumb aria-hidden />
                          <S.RelatedInfo>
                            <S.RelatedName>Loading...</S.RelatedName>
                            <S.RelatedDesc>Fetching top viewed...</S.RelatedDesc>
                          </S.RelatedInfo>
                        </S.RelatedItem>
                      ))
                    ) : topPosts.length ? (
                      topPosts.map((r) => (
                        <S.RelatedItem key={r.id} as={Link} to={r.href}>
                          <S.RelatedThumb
                            aria-hidden
                            style={{ backgroundImage: r.thumbUrl ? `url(${r.thumbUrl})` : undefined }}
                          />
                          <S.RelatedInfo>
                            <S.RelatedName>{r.title}</S.RelatedName>
                            <S.RelatedDesc>{r.excerpt}</S.RelatedDesc>
                          </S.RelatedInfo>
                        </S.RelatedItem>
                      ))
                    ) : (
                      <S.EmptyInline>No top posts.</S.EmptyInline>
                    )}
                  </S.RelatedList>
                </S.SideCard>

                {/* Categories */}
                <S.SideCard>
                  <S.SideTitle>Categories</S.SideTitle>

                  <S.CatList>
                    {loadingCats && !cats.length ? (
                      <S.EmptyInline>Loading categories...</S.EmptyInline>
                    ) : (
                      categories.map((c) => {
                        const isActive = active === c.key;
                        return (
                          <S.CatRow key={c.key} $active={isActive} type="button" onClick={() => setActive(c.key)}>
                            <span>{c.label}</span>
                            <S.CatCount $active={isActive}>{c.count}</S.CatCount>
                          </S.CatRow>
                        );
                      })
                    )}
                  </S.CatList>
                </S.SideCard>

                {/* Search */}
                <S.SideCard>
                  <S.SideTitle>Search Here</S.SideTitle>

                  <S.SearchWrap>
                    <Search size={16} />
                    <S.SearchInput
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search Posts..."
                      aria-label="Search posts"
                    />
                  </S.SearchWrap>
                </S.SideCard>
              </S.SidebarSticky>
            </S.SidebarCol>
          </S.Layout>
        </S.MainInner>
      </S.Main>
    </S.Page>
  );
}
