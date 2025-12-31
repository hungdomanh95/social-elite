import React from "react";
import * as S from "./eliteTalents.styled";
import Talents from "@/assets/images/talents/Talents1.png";

const EliteTalents: React.FC = () => {
  return (
    <S.Section>
      <S.Container>
        <S.Title>
          <span className="inner">
            Our <span className="accent">elite™</span> talents
          </span>
        </S.Title>
      </S.Container>

      <S.FullBleed>
        <S.TalentsImg src={Talents} alt="Elite talents" draggable={false} />
      </S.FullBleed>
    </S.Section>
  );
};

export default EliteTalents;
