import TickerMarquee from "@/shared/components/TickerMarquee";
import React from "react";
import DATA_TRUST_BY from "../../mockData";

export type TrustBrand = {
  id: string | number;
  img: string;
  alt?: string;
  href?: string;
};

type Props = {
  brands: TrustBrand[];
  /** tốc độ chạy (giây cho 1 vòng). số nhỏ = nhanh hơn */
  speedSec?: number;
};

const TrustBy: React.FC<Props> = (props) => {

  return (
    <TickerMarquee
      title="Trusted By"
      items={DATA_TRUST_BY.map((b) => ({
        id: b.id,
        label: <img src={b.img} alt={b.alt} style={{ height: 46, width: "auto" }} />,
      }))}
      durationSec={props.speedSec}
      showDot={false}
      uppercase={false}
      gapPx={48}
    />
  );
};

export default TrustBy;
