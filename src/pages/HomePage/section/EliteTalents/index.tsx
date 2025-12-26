import React from "react";
import * as S from "./eliteTalents.styled";
import BG_talent from "@/assets/images/talents/BG_talent.png";

export type Talent = {
  id: string | number;
  imageSrc: string;
  alt?: string;
  href?: string;
};

type Props = {
  leftTalents: Talent[];
  rightTalents: Talent[];
};

const EliteTalents: React.FC<Props> = ({ leftTalents }) => {

  const first = leftTalents?.[0];
  return (
    <S.Section>
      <S.Title>
        Our <span className="accent">elite™</span> talents
      </S.Title>
 <S.Stage>
        <S.Bg src={BG_talent} alt="" />

        {first && (
          <S.Overlay>
            <S.TalentImg src={first.imageSrc} alt={first.alt || "Talent"} />
          </S.Overlay>
        )}
      </S.Stage>


    </S.Section>
  );
};

export default EliteTalents;
