// src/pages/OurCampaignsPage/index.tsx
import { ArrowRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import * as S from "./ourCampaignsPage.styled";
import { getCampaigns } from "@/shared/api/cms.api";

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
  id: number;
  documentId: string;
  title: string;
  description: string;
  tags?: ApiTag[];
  thumbnail?: ApiThumbnail | null;
};

type CampaignUI = {
  id: string; // documentId
  title: string;
  desc: string;
  tags: string[];
  thumbUrl?: string;
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

const stripText = (s?: string) => (s ?? "").replace(/\s+/g, " ").trim();

export default function OurCampaignsPage() {
  const [items, setItems] = useState<CampaignUI[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    setLoading(true);
    getCampaigns()
      .then((res: any) => {
        const list: ApiCampaign[] = Array.isArray(res?.data) ? res.data : [];

        const mapped: CampaignUI[] = list
          .map((c) => {
            const id = String(c.documentId || c.id);
            return {
              id,
              title: stripText(c.title) || "Untitled",
              desc: stripText(c.description),
              tags: (c.tags || []).map((t) => t?.name).filter(Boolean) as string[],
              thumbUrl: pickThumb(c.thumbnail),
            };
          })
          .filter((x) => !!x.id);

        if (!alive) return;
        setItems(mapped);
      })
      .catch(() => {
        if (!alive) return;
        setItems([]);
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, []);

  const renderCards = useMemo(() => {
    if (loading) {
      return Array.from({ length: 8 }).map((_, idx) => (
        <S.Card key={`sk_${idx}`} style={{ ["--d" as any]: `${idx * 60}ms` }}>
          <S.CardMedia aria-hidden />
          <S.CardBody>
            <S.TagRow>
              <S.Tag>LOADING</S.Tag>
              <S.Tag>CMS</S.Tag>
            </S.TagRow>
            <S.CardTitle>Loading campaign...</S.CardTitle>
            <S.CardDesc>Fetching from CMS...</S.CardDesc>
          </S.CardBody>
        </S.Card>
      ));
    }

    if (!items.length) {
      return <S.EmptyState>No campaigns found.</S.EmptyState>;
    }

    return items.map((c, idx) => (
      <S.Card
        key={c.id}
        // as={Link}
        // to={`/campaigns/${c.id}`}
        style={{ ["--d" as any]: `${idx * 60}ms` }}
      >
        <S.CardMedia
          aria-hidden
          style={{
            backgroundImage: c.thumbUrl ? `url(${c.thumbUrl})` : undefined,
          }}
        />
        <S.CardBody>
          <S.TagRow>
            {(c.tags?.length ? c.tags : ["CAMPAIGN"]).map((t) => (
              <S.Tag key={`${c.id}_${t}`}>{t}</S.Tag>
            ))}
          </S.TagRow>

          <S.CardTitle>{c.title}</S.CardTitle>
          <S.CardDesc>{c.desc}</S.CardDesc>

          <S.ReadMore as={Link} to={`/campaigns/${c.id}`} aria-label={`Read more: ${c.title}`}>
            Read More <ArrowRight size={16} />
          </S.ReadMore>
        </S.CardBody>
      </S.Card>
    ));
  }, [items, loading]);

  return (
    <S.Page>
      <S.Section>
        <S.Container>
          <S.HeaderRow>
            <S.TitleWrap>
              <S.TitleBar aria-hidden />
              <S.Title>Our Campaigns</S.Title>
            </S.TitleWrap>

            {/* <S.TopAction type="button">
              View All Campaigns <ArrowRight size={16} />
            </S.TopAction> */}
          </S.HeaderRow>

          <S.Cards>{renderCards}</S.Cards>
        </S.Container>
      </S.Section>

      <S.CTA>
        <S.Container>
          <S.CTATitle>
            Ready to Create Your Next <S.Accent>Success</S.Accent> Story?
          </S.CTATitle>
          <S.CTADesc>
            Let&apos;s collaborate on a campaign that drives real results for your brand.
          </S.CTADesc>

          <S.CTAButton type="button">
            Start a Project <ArrowRight size={16} />
          </S.CTAButton>
        </S.Container>
      </S.CTA>
    </S.Page>
  );
}
