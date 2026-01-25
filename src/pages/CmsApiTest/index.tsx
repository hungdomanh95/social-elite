import { useCallback, useEffect, useMemo, useState } from "react";
import * as S from "./cmsApiTest.styled";

import {
  getLandingPage, // ✅ thêm
  getCampaigns,
  getCategories,
  getBlogsTopViewed,
  searchBlogs,
  getBlogDetail,
  getBlogRelated,
  getBlogNavigation,
  increaseBlogView,
} from "../../shared/api/cms.api";

type AnyObj = Record<string, any>;

const safeStringify = (v: any) => {
  try {
    return JSON.stringify(v, null, 2);
  } catch {
    return String(v);
  }
};

const pickList = (res: any) => res?.data ?? res; // tuỳ backend trả {data:[]} hay [] trực tiếp

export default function CmsApiTestPage() {
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const setBusy = (key: string, v: boolean) =>
    setLoading((prev) => ({ ...prev, [key]: v }));

  // ✅ thêm landing
  const [landingRes, setLandingRes] = useState<any>(null);

  const [campaignsRes, setCampaignsRes] = useState<any>(null);
  const [categoriesRes, setCategoriesRes] = useState<any>(null);
  const [topViewedRes, setTopViewedRes] = useState<any>(null);
  const [searchRes, setSearchRes] = useState<any>(null);

  const [detailRes, setDetailRes] = useState<any>(null);
  const [relatedRes, setRelatedRes] = useState<any>(null);
  const [navigationRes, setNavigationRes] = useState<any>(null);
  const [viewRes, setViewRes] = useState<any>(null);

  const [categorySlug, setCategorySlug] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [documentId, setDocumentId] = useState<string>("cf2chm91jhejqflwzmlmzht2");

  const categories = useMemo(() => {
    const list = pickList(categoriesRes);
    return Array.isArray(list) ? list : [];
  }, [categoriesRes]);

  const doFetch = useCallback(
    async <T,>(key: string, fn: () => Promise<T>, onOk: (v: T) => void) => {
      setBusy(key, true);
      try {
        const res = await fn();
        onOk(res);
      } finally {
        setBusy(key, false);
      }
    },
    []
  );

  // auto load categories once
  useEffect(() => {
    doFetch("categories", () => getCategories(), setCategoriesRes).catch(() => {});
  }, [doFetch]);

  const copyJson = async (data: any) => {
    try {
      await navigator.clipboard.writeText(safeStringify(data));
    } catch {
      // ignore (some browsers block clipboard without https/user gesture)
    }
  };

  const currentBlogId = useMemo(() => documentId.trim(), [documentId]);

  return (
    <S.Page>
      <S.Container>
        <S.Header data-reveal>
          <S.Title>
            CMS <span className="accent">API Test</span>
          </S.Title>
          <S.Subtitle>
            Test nhanh toàn bộ endpoint CMS (Landing / Campaigns / Categories / Blogs / Detail / Related /
            Navigation / View).
          </S.Subtitle>
          <S.EnvRow>
            <S.EnvChip>
              <span>BASE</span>
              <code>
                {import.meta.env.VITE_CMS_API_BASE || "https://social-elite-cms.leapstud.io/api"}
              </code>
            </S.EnvChip>
            <S.EnvChip>
              <span>AUTH HEADER</span>
              <code>{import.meta.env.VITE_CMS_AUTH_HEADER || "Authorization"}</code>
            </S.EnvChip>
          </S.EnvRow>
        </S.Header>

        <S.GridLike data-reveal>
          {/* LEFT */}
          <S.Col>
            {/* ✅ 0) Landing Page */}
            <S.Card>
              <S.CardHead>
                <S.CardTitle>0) Landing Page</S.CardTitle>
                <S.Row>
                  <S.Button
                    type="button"
                    onClick={() => doFetch("landing", () => getLandingPage(), setLandingRes)}
                    disabled={!!loading.landing}
                  >
                    {loading.landing ? "Loading..." : "GET /landing-page"}
                  </S.Button>
                  <S.Ghost
                    type="button"
                    onClick={() => copyJson(landingRes)}
                    disabled={!landingRes}
                    title="Copy JSON"
                  >
                    Copy
                  </S.Ghost>
                  <S.Ghost
                    type="button"
                    onClick={() => setLandingRes(null)}
                    disabled={!landingRes}
                    title="Clear"
                  >
                    Clear
                  </S.Ghost>
                </S.Row>
              </S.CardHead>

              <S.Preview>
                {landingRes ? (
                  <S.Json>{safeStringify(landingRes)}</S.Json>
                ) : (
                  <S.Empty>Chưa gọi API.</S.Empty>
                )}
              </S.Preview>
            </S.Card>

            <S.Card>
              <S.CardHead>
                <S.CardTitle>1) Campaigns</S.CardTitle>
                <S.Row>
                  <S.Button
                    type="button"
                    onClick={() => doFetch("campaigns", () => getCampaigns(), setCampaignsRes)}
                    disabled={!!loading.campaigns}
                  >
                    {loading.campaigns ? "Loading..." : "GET /campaigns"}
                  </S.Button>
                  <S.Ghost
                    type="button"
                    onClick={() => copyJson(campaignsRes)}
                    disabled={!campaignsRes}
                    title="Copy JSON"
                  >
                    Copy
                  </S.Ghost>
                </S.Row>
              </S.CardHead>

              <S.Preview>
                {campaignsRes ? (
                  <S.Json>{safeStringify(campaignsRes)}</S.Json>
                ) : (
                  <S.Empty>Chưa gọi API.</S.Empty>
                )}
              </S.Preview>
            </S.Card>

            <S.Card>
              <S.CardHead>
                <S.CardTitle>2) Categories</S.CardTitle>
                <S.Row>
                  <S.Button
                    type="button"
                    onClick={() => doFetch("categories", () => getCategories(), setCategoriesRes)}
                    disabled={!!loading.categories}
                  >
                    {loading.categories ? "Loading..." : "GET /categories"}
                  </S.Button>
                  <S.Ghost
                    type="button"
                    onClick={() => copyJson(categoriesRes)}
                    disabled={!categoriesRes}
                    title="Copy JSON"
                  >
                    Copy
                  </S.Ghost>
                </S.Row>
              </S.CardHead>

              <S.Preview>
                {categoriesRes ? (
                  <>
                    <S.MiniList>
                      {categories.slice(0, 12).map((c: AnyObj, idx: number) => (
                        <S.MiniItem key={c?.id ?? c?.slug ?? idx}>
                          <S.Badge>{c?.slug ?? "no-slug"}</S.Badge>
                          <span>{c?.name ?? c?.title ?? c?.label ?? "Unnamed"}</span>
                        </S.MiniItem>
                      ))}
                    </S.MiniList>

                    <S.Json>{safeStringify(categoriesRes)}</S.Json>
                  </>
                ) : (
                  <S.Empty>Chưa gọi API.</S.Empty>
                )}
              </S.Preview>
            </S.Card>

            <S.Card>
              <S.CardHead>
                <S.CardTitle>3) Blogs Top Viewed</S.CardTitle>
                <S.Row>
                  <S.Button
                    type="button"
                    onClick={() => doFetch("topViewed", () => getBlogsTopViewed(), setTopViewedRes)}
                    disabled={!!loading.topViewed}
                  >
                    {loading.topViewed ? "Loading..." : "GET /blogs/top-viewed"}
                  </S.Button>
                  <S.Ghost
                    type="button"
                    onClick={() => copyJson(topViewedRes)}
                    disabled={!topViewedRes}
                    title="Copy JSON"
                  >
                    Copy
                  </S.Ghost>
                </S.Row>
              </S.CardHead>

              <S.Preview>
                {topViewedRes ? (
                  <S.Json>{safeStringify(topViewedRes)}</S.Json>
                ) : (
                  <S.Empty>Chưa gọi API.</S.Empty>
                )}
              </S.Preview>
            </S.Card>
          </S.Col>

          {/* RIGHT */}
          <S.Col>
            <S.Card>
              <S.CardHead>
                <S.CardTitle>4) Blogs Search</S.CardTitle>
              </S.CardHead>

              <S.Form>
                <S.Field>
                  <S.Label>Category (slug)</S.Label>
                  <S.Select value={categorySlug} onChange={(e) => setCategorySlug(e.target.value)}>
                    <option value="">(all)</option>
                    {categories.map((c: AnyObj, idx: number) => (
                      <option key={c?.slug ?? idx} value={c?.slug ?? ""}>
                        {c?.slug ?? "(no-slug)"}
                      </option>
                    ))}
                  </S.Select>
                </S.Field>

                <S.Field>
                  <S.Label>Search text (q)</S.Label>
                  <S.Input
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Ví dụ: social commerce"
                  />
                </S.Field>

                <S.Row>
                  <S.Button
                    type="button"
                    onClick={() =>
                      doFetch(
                        "search",
                        () => searchBlogs({ category: categorySlug, q: searchText }),
                        setSearchRes
                      )
                    }
                    disabled={!!loading.search}
                  >
                    {loading.search ? "Loading..." : "GET /blogs/search"}
                  </S.Button>
                  <S.Ghost
                    type="button"
                    onClick={() => copyJson(searchRes)}
                    disabled={!searchRes}
                    title="Copy JSON"
                  >
                    Copy
                  </S.Ghost>
                </S.Row>
              </S.Form>

              <S.Preview>
                {searchRes ? (
                  <S.Json>{safeStringify(searchRes)}</S.Json>
                ) : (
                  <S.Empty>Chưa gọi API.</S.Empty>
                )}
              </S.Preview>
            </S.Card>

            <S.Card>
              <S.CardHead>
                <S.CardTitle>5) Blog Detail + Related + Navigation + View</S.CardTitle>
              </S.CardHead>

              <S.Form>
                <S.Field>
                  <S.Label>documentId</S.Label>
                  <S.Input
                    value={documentId}
                    onChange={(e) => setDocumentId(e.target.value)}
                    placeholder="cf2chm91jhejqflwzmlmzht2"
                  />
                </S.Field>

                <S.RowWrap>
                  <S.Button
                    type="button"
                    onClick={() => doFetch("detail", () => getBlogDetail(currentBlogId), setDetailRes)}
                    disabled={!currentBlogId || !!loading.detail}
                  >
                    {loading.detail ? "Loading..." : "GET /blogs/:id"}
                  </S.Button>

                  <S.Button
                    type="button"
                    onClick={() =>
                      doFetch("related", () => getBlogRelated(currentBlogId), setRelatedRes)
                    }
                    disabled={!currentBlogId || !!loading.related}
                  >
                    {loading.related ? "Loading..." : "GET /blogs/:id/related"}
                  </S.Button>

                  <S.Button
                    type="button"
                    onClick={() =>
                      doFetch("nav", () => getBlogNavigation(currentBlogId), setNavigationRes)
                    }
                    disabled={!currentBlogId || !!loading.nav}
                  >
                    {loading.nav ? "Loading..." : "GET /blogs/:id/navigation"}
                  </S.Button>

                  <S.AccentButton
                    type="button"
                    onClick={() => doFetch("view", () => increaseBlogView(currentBlogId), setViewRes)}
                    disabled={!currentBlogId || !!loading.view}
                    title="Increase view on detail load"
                  >
                    {loading.view ? "Posting..." : "POST /blogs/:id/view"}
                  </S.AccentButton>
                </S.RowWrap>

                <S.Row>
                  <S.Ghost
                    type="button"
                    onClick={() => copyJson({ detailRes, relatedRes, navigationRes, viewRes })}
                  >
                    Copy All
                  </S.Ghost>
                  <S.Ghost
                    type="button"
                    onClick={() => {
                      setDetailRes(null);
                      setRelatedRes(null);
                      setNavigationRes(null);
                      setViewRes(null);
                    }}
                  >
                    Clear
                  </S.Ghost>
                </S.Row>
              </S.Form>

              <S.Split>
                <S.SplitCol>
                  <S.SplitTitle>Detail</S.SplitTitle>
                  <S.Preview>
                    {detailRes ? <S.Json>{safeStringify(detailRes)}</S.Json> : <S.Empty>Chưa gọi.</S.Empty>}
                  </S.Preview>
                </S.SplitCol>

                <S.SplitCol>
                  <S.SplitTitle>Related</S.SplitTitle>
                  <S.Preview>
                    {relatedRes ? <S.Json>{safeStringify(relatedRes)}</S.Json> : <S.Empty>Chưa gọi.</S.Empty>}
                  </S.Preview>
                </S.SplitCol>

                <S.SplitCol>
                  <S.SplitTitle>Navigation</S.SplitTitle>
                  <S.Preview>
                    {navigationRes ? <S.Json>{safeStringify(navigationRes)}</S.Json> : <S.Empty>Chưa gọi.</S.Empty>}
                  </S.Preview>
                </S.SplitCol>

                <S.SplitCol>
                  <S.SplitTitle>View result</S.SplitTitle>
                  <S.Preview>
                    {viewRes ? <S.Json>{safeStringify(viewRes)}</S.Json> : <S.Empty>Chưa gọi.</S.Empty>}
                  </S.Preview>
                </S.SplitCol>
              </S.Split>
            </S.Card>
          </S.Col>
        </S.GridLike>
      </S.Container>
    </S.Page>
  );
}
