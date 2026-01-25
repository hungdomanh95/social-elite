import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import * as S from "./successStories.styled";
import type { SuccessStory } from "../../mockData";

import { getCampaigns } from "@/shared/api/cms.api";

type Props = {
  onViewAll?: () => void;
};

const CAMPAIGN_LIST_ROUTE = "/our-campaign";
const CAMPAIGN_DETAIL_ROUTE = "/campaigns";

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
  tags?: ApiTag[];
  thumbnail?: ApiThumbnail | null;
  // tùy CMS bạn có thể có category/industry/type...
  category?: any;
};

// ===== helpers =====
const CMS_ORIGIN = (import.meta as any).env?.VITE_CMS_ORIGIN || "https://social-elite-cms.leapstud.io";

const toAbsUrl = (u?: string) => {
  if (!u) return "";
  if (u.startsWith("http://") || u.startsWith("https://")) return u;
  if (u.startsWith("/")) return `${CMS_ORIGIN}${u}`;
  return `${CMS_ORIGIN}/${u}`;
};

const pickThumb = (t?: ApiThumbnail | null) => {
  if (!t) return "";
  const u =
    t.formats?.large?.url ||
    t.formats?.medium?.url ||
    t.formats?.small?.url ||
    t.formats?.thumbnail?.url ||
    t.url;
  return toAbsUrl(u);
};


const pickCategory = (c: ApiCampaign) => {
  // nếu CMS của bạn có field category object/string, bạn có thể mở rộng ở đây
  const raw = (c as any)?.category;
  if (!raw) return "";
  if (typeof raw === "string") return raw;
  return String(raw?.name ?? raw?.title ?? raw?.label ?? raw?.slug ?? "");
};

const normalizeCampaignsToStories = (res: any): SuccessStory[] => {
  const list: ApiCampaign[] = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
  return list
    .map((c) => {
      const id = String(c.documentId ?? c.id ?? "").trim();
      if (!id) return null;

      const title = (c.title ?? "Untitled").trim();
      const category = pickCategory(c) || (c.tags?.[0]?.name ?? "");

      const imageSrc = pickThumb(c.thumbnail) || "";

      const href = `${CAMPAIGN_DETAIL_ROUTE}/${id}`;

      const story: SuccessStory = {
        id,
        title,
        category: category || "",
        imageSrc,
        href,
      };

      return story;
    })
    .filter(Boolean) as SuccessStory[];
};

const SuccessStories: React.FC<Props> = ({ onViewAll }) => {

  const [data, setData] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let alive = true;

    (async () => {
      setLoading(true);
      try {
        const res = await getCampaigns();
        const stories = normalizeCampaignsToStories(res);

        if (!alive) return;
        setData(stories);
      } catch {
        if (!alive) return;
        setData([]);
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  const displayItems = useMemo(() => data.slice(0, 6), [data]);

  return (
    <S.Section>
      <S.Container>
        <S.Top>
          <S.Left>
            <S.Pill data-reveal style={{ ["--d" as any]: "0ms" }}>
              Our Campaign
            </S.Pill>

            <S.Heading data-reveal style={{ ["--d" as any]: "90ms" }}>
              Success Stories That
              <br />
              Speak Volumes
            </S.Heading>
          </S.Left>

          {/* ✅ luôn đi /our-campaign */}
          <S.ViewAllLink
            data-reveal
            style={{ ["--d" as any]: "160ms" }}
            as={Link as any}
            to={CAMPAIGN_LIST_ROUTE}
            onClick={() => onViewAll?.()}
          >
            View All Projects
          </S.ViewAllLink>
        </S.Top>

        <S.Grid aria-busy={loading}>
          {loading
            ? Array.from({ length: 6 }).map((_, idx) => (
                <S.Card
                  key={`sk_${idx}`}
                  as="div"
                  $clickable={false}
                  data-reveal
                  style={{ ["--d" as any]: `${220 + idx * 70}ms`, opacity: 0.75 }}
                >
                  <S.Thumb $src={""} aria-label="Loading" />
                  <S.CardTitle>Loading...</S.CardTitle>
                  <S.CardMeta>Fetching campaigns...</S.CardMeta>
                </S.Card>
              ))
            : displayItems.map((it, idx) =>
                it.href ? (
                  <S.Card
                    key={it.id}
                    as={Link as any}
                    to={it.href as any}
                    $clickable
                    data-reveal
                    style={{ ["--d" as any]: `${220 + idx * 70}ms` }}
                  >
                    <S.Thumb $src={it.imageSrc} aria-label={it.title} />
                    <S.CardTitle>{it.title}</S.CardTitle>
                    <S.CardMeta>{it.category}</S.CardMeta>
                  </S.Card>
                ) : (
                  <S.Card
                    key={it.id}
                    as="div"
                    $clickable={false}
                    data-reveal
                    style={{ ["--d" as any]: `${220 + idx * 70}ms` }}
                  >
                    <S.Thumb $src={it.imageSrc} aria-label={it.title} />
                    <S.CardTitle>{it.title}</S.CardTitle>
                    <S.CardMeta>{it.category}</S.CardMeta>
                  </S.Card>
                )
              )}
        </S.Grid>

      </S.Container>
    </S.Section>
  );
};

export default SuccessStories;
