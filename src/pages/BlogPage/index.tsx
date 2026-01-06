import { ArrowRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import * as S from "./blogPage.styled";

type BlogCategory =
  | "All"
  | "Social Commerce"
  | "Creator Tips"
  | "Marketing Strategy"
  | "Case Studies"
  | "Production"
  | "Industry News";

type Post = {
  id: string;
  title: string;
  excerpt: string;
  category: Exclude<BlogCategory, "All">;
  href: string;
};

const POSTS: Post[] = [
  {
    id: "p1",
    title: "How Social Commerce is Revolutionizing Influencer Marketing in 2024",
    excerpt:
      "Discover the latest trends in social commerce and how influencers are leveraging live streaming, shoppable posts, and authentic content to drive massive sales for brands.",
    category: "Social Commerce",
    href: "/blog/how-social-commerce-2024",
  },
  {
    id: "p2",
    title: "Building Your Personal Brand: Essential Tips for Content Creators",
    excerpt:
      "Learn the fundamental strategies successful creators use to build authentic personal brands that resonate with audiences and attract premium brand partnerships.",
    category: "Creator Tips",
    href: "/blog/build-personal-brand",
  },
  {
    id: "p3",
    title: "Data-Driven Influencer Marketing: Metrics That Matter",
    excerpt:
      "Moving beyond vanity metrics — understand which KPIs truly matter for measuring influencer campaign success and ROI in today’s competitive landscape.",
    category: "Marketing Strategy",
    href: "/blog/metrics-that-matter",
  },
  {
    id: "p4",
    title: "How Social Commerce is Revolutionizing Influencer Marketing in 2024",
    excerpt:
      "Discover the latest trends in social commerce and how influencers are leveraging live streaming, shoppable posts, and authentic content to drive massive sales for brands.",
    category: "Social Commerce",
    href: "/blog/how-social-commerce-2024-2",
  },
  {
    id: "p5",
    title: "Building Your Personal Brand: Essential Tips for Content Creators",
    excerpt:
      "Learn the fundamental strategies successful creators use to build authentic personal brands that resonate with audiences and attract premium brand partnerships.",
    category: "Creator Tips",
    href: "/blog/build-personal-brand-2",
  },
  {
    id: "p6",
    title: "Data-Driven Influencer Marketing: Metrics That Matter",
    excerpt:
      "Moving beyond vanity metrics — understand which KPIs truly matter for measuring influencer campaign success and ROI in today’s competitive landscape.",
    category: "Marketing Strategy",
    href: "/blog/metrics-that-matter-2",
  },
];

const RELATED: Array<Pick<Post, "id" | "title" | "excerpt" | "href">> = [
  {
    id: "r1",
    title: "Top 5 Social Media Trends for Creators",
    excerpt: "Discover the latest trends in social commerce and how influencers are lev...",
    href: "/blog/top-5-trends",
  },
  {
    id: "r2",
    title: "Maximizing ROI with Micro-Influencers",
    excerpt: "Discover the latest trends in social commerce and how influencers are lev...",
    href: "/blog/micro-influencers-roi",
  },
  {
    id: "r3",
    title: "How to Pitch Brands Successfully",
    excerpt: "Discover the latest trends in social commerce and how influencers are lev...",
    href: "/blog/pitch-brands",
  },
];

export default function BlogPage() {
  const [active, setActive] = useState<BlogCategory>("All");
  const [query, setQuery] = useState("");

  const categories = useMemo(() => {
    const base: Array<Exclude<BlogCategory, "All">> = [
      "Social Commerce",
      "Creator Tips",
      "Marketing Strategy",
      "Case Studies",
      "Production",
      "Industry News",
    ];

    const countBy = base.reduce<Record<string, number>>((acc, c) => {
      acc[c] = POSTS.filter((p) => p.category === c).length;
      return acc;
    }, {});

    return [
      { key: "All" as const, label: "All", count: POSTS.length },
      ...base.map((c) => ({ key: c, label: c, count: countBy[c] || 0 })),
    ];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return POSTS.filter((p) => {
      const okCat = active === "All" ? true : p.category === active;
      if (!okCat) return false;
      if (!q) return true;
      return (p.title + " " + p.excerpt).toLowerCase().includes(q);
    });
  }, [active, query]);

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
              {filtered.map((p, idx) => (
                <S.PostCard key={p.id} style={{ ["--d" as any]: `${idx * 60}ms` }}>
                  <S.PostMedia aria-hidden />
                  <S.PostBody>
                    <S.PostTitle>{p.title}</S.PostTitle>
                    <S.PostExcerpt>{p.excerpt}</S.PostExcerpt>

                    <S.ReadMore as={Link} to={p.href} aria-label={`Read more: ${p.title}`}>
                      Read More <ArrowRight size={16} />
                    </S.ReadMore>
                  </S.PostBody>
                </S.PostCard>
              ))}
            </S.PostsCol>

            {/* Right: Sidebar */}
            <S.SidebarCol>
              <S.SidebarSticky>
                <S.SideCard>
                  <S.SideTitle>RelatedPosts</S.SideTitle>

                  <S.RelatedList>
                    {RELATED.map((r) => (
                      <S.RelatedItem key={r.id} as={Link} to={r.href}>
                        <S.RelatedThumb aria-hidden />
                        <S.RelatedInfo>
                          <S.RelatedName>{r.title}</S.RelatedName>
                          <S.RelatedDesc>{r.excerpt}</S.RelatedDesc>
                        </S.RelatedInfo>
                      </S.RelatedItem>
                    ))}
                  </S.RelatedList>
                </S.SideCard>

                <S.SideCard>
                  <S.SideTitle>Categories</S.SideTitle>

                  <S.CatList>
                    {categories.map((c) => {
                      const isActive = active === c.key;
                      return (
                        <S.CatRow
                          key={c.key}
                          $active={isActive}
                          type="button"
                          onClick={() => setActive(c.key)}
                        >
                          <span>{c.label}</span>
                          <S.CatCount $active={isActive}>{c.count}</S.CatCount>
                        </S.CatRow>
                      );
                    })}
                  </S.CatList>
                </S.SideCard>

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
