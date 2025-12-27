import React from "react";
import * as S from "./eliteTalents.styled";
import ba_talent_left from "@/assets/images/talents/ba_talent_left.png";
import bg_talent_right from "@/assets/images/talents/bg_talent_right.png";

export type Talent = {
  id: string | number;
  imageSrc: string;
  alt?: string;
  href?: string;
  position?: number;
};

type Props = {
  leftTalents: Talent[];
  rightTalents: Talent[];
};

const EliteTalents: React.FC<Props> = ({ leftTalents, rightTalents }) => {
  return (
    <S.Section>
      <S.Container>
        <S.Title>
          Our <span className="accent">elite™</span> talents
        </S.Title>

        <S.Stage>
          <S.SideWrapper $side="left">
            <S.SideBg src={ba_talent_left} alt="" aria-hidden />
            <S.TalentContainer $mask={ba_talent_left}>
              {leftTalents.map((talent) => (
                <S.TalentItem
                  key={talent.id}
                  style={{ zIndex: talent.position ?? 0 }}
                >
                  <S.TalentImg
                    src={talent.imageSrc}
                    alt={talent.alt || "Talent"}
                    draggable={false}
                  />
                </S.TalentItem>
              ))}
            </S.TalentContainer>
          </S.SideWrapper>

          <S.SideWrapper $side="right">
            <S.SideBgRight src={bg_talent_right} alt="" aria-hidden />
            <S.TalentContainerRight $mask={bg_talent_right}>
              {rightTalents.map((talent) => (
                <S.TalentItem
                  key={talent.id}
                  style={{ zIndex: talent.position ?? 0 }}
                >
                  <S.TalentImg
                    src={talent.imageSrc}
                    alt={talent.alt || "Talent"}
                    draggable={false}
                  />
                </S.TalentItem>
              ))}
            </S.TalentContainerRight>
          </S.SideWrapper>
        </S.Stage>
      </S.Container>
    </S.Section>
  );
};

export default EliteTalents;
