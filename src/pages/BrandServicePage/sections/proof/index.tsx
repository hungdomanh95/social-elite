import { useMemo } from "react";
import { Container } from "@/shared/components/Container";
import { useLandingPage } from "@/shared/api/useLandingPage";
import * as S from "./proof.styled";

type PartnerLogo = {
  name?: string | null;
  alternativeText?: string | null;
  url?: string | null;
  formats?: {
    thumbnail?: {
      url?: string | null;
    };
  } | null;
};

const CMS_ORIGIN =
  import.meta.env.VITE_CMS_ORIGIN || "https://social-elite-cms.leapstud.io";

const toAbs = (u?: string | null) => {
  if (!u) return "";
  if (u.startsWith("http")) return u;
  if (!CMS_ORIGIN) return u; // fallback nếu bạn đang proxy /uploads
  return `${CMS_ORIGIN}${u}`;
};

export default function ProofGrid() {
  const { data: landing } = useLandingPage();

  const title = String(landing?.partnerTitle || "We've done it for the best.");
  const highlight = String(landing?.partnerHighlight || "Now we're here for you.");

  const logos = useMemo(() => {
    const list = (landing?.partnerLogos ?? []) as PartnerLogo[];

    return list
      .map((x) => {
        const thumb = x?.formats?.thumbnail?.url;
        const raw = thumb || x?.url;
        const src = toAbs(raw);
        if (!src) return null;

        const alt = String(x?.alternativeText || x?.name || "Partner logo");
        return { src, alt };
      })
      .filter(Boolean) as Array<{ src: string; alt: string }>;
  }, [landing?.partnerLogos]);


  return (
    <S.ProofSection>
      <Container>
        <S.ProofTitle data-reveal>
          {title}
          <br />
          <span className="accent">{highlight}</span>
        </S.ProofTitle>

        <S.BlockWrap aria-hidden="true" data-reveal>
          {logos.map((item, i) => (
            <S.Block key={`${item.src}-${i}`} style={{ ["--i" as any]: i }}>
              <S.BlockImg src={item.src} alt={item.alt} loading="lazy" decoding="async" />
            </S.Block>
          ))}
        </S.BlockWrap>
      </Container>
    </S.ProofSection>
  );
}
