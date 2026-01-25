import { useLandingPage } from "@/shared/api/useLandingPage";
import TickerMarquee from "@/shared/components/TickerMarquee";
import React from "react";

export type TrustBrand = {
  id: string | number;
  img: string;
  alt?: string;
  href?: string;
};

type Props = {
};

const CMS_ORIGIN = "https://social-elite-cms.leapstud.io";

const TrustBy: React.FC<Props> = () => {
    const { data: landing } = useLandingPage();

    const brands =
      (landing?.trustedBranches ?? []).map((b: any) => ({
        id: b?.id ?? b?.documentId ?? b?.name,
        img: `${CMS_ORIGIN}${b?.url || ""}`,
        alt: b?.name || "brand",
      })) ?? [];


  return (
    <TickerMarquee
      title="Trusted By"
      items={brands
        .filter((b) => !!b.img)
        .map((b) => (
          <img
            key={b.id}
            src={b.img}
            alt={b.alt}
            style={{ height: 46, width: "auto" }}
          />
        ))}
      durationSec={50}
      gapPx={56}
    />
  );
};

export default TrustBy;
