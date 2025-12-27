import TickerMarquee from "@/shared/components/TickerMarquee";
import React from "react";

export type TrustBrand = {
  id: string | number;
  img: string;
  alt?: string;
  href?: string;
};

type Props = {
  brands: TrustBrand[];
  speedSec?: number;
};

const TrustBy: React.FC<Props> = (props) => {
  return (
      <TickerMarquee
        title="Trusted By"
        items={props.brands.map((b) => (
          <img
            key={b.id}
            src={b.img}
            alt={b.alt}
            style={{ height: 46, width: "auto" }}
          />
        ))}
        durationSec={props.speedSec}
        gapPx={56}
      />
  );
};

export default TrustBy;
