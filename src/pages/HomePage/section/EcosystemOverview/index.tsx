import React, { useMemo } from "react";
import * as S from "./ecosystemOverview.styled";
import TickerMarquee from "@/shared/components/TickerMarquee";
import CountUp from "@/shared/components/CountUp";

type Stat = {
  value: number;
  suffix?: string;
  label: string;
};

type Props = {
  titleTop?: string;
  titleAccent?: string;
  onContactClick?: () => void;
  badges?: Array<React.ReactNode>;
  stats?: Stat[];
};

const EcosystemOverview: React.FC<Props> = ({
  titleTop = "Vietnam's No.1",
  titleAccent = "Social Commerce Ecosystem",
  onContactClick,
  badges,
  stats,
}) => {
  const defaultBadges = useMemo(
    () => [
      "#No.1 influencer platform and celeb network",
      <>
        #Winner of Shopee Awards 2024{" "}
        <S.BadgeAccent>Excellence Commercial MCN</S.BadgeAccent>
      </>,
      "#2nd Runner Up Youtube Works Awards 2025",
    ],
    []
  );

  const defaultStats: Stat[] = useMemo(
    () => [
      { value: 200, suffix: "+", label: "Social Channel Networks" },
      { value: 500, suffix: "+", label: "Top-tier KOLs and Social Sellers" },
      { value: 50, suffix: "+", label: "Exclusive Talents" },
    ],
    []
  );

  const badgeList = badges?.length ? badges : defaultBadges;
  const statList = stats?.length ? stats : defaultStats;

  return (
    <S.Section>
      <S.Container>
        <S.Content>
          <S.Heading data-reveal>
            <S.TitleLine>{titleTop}</S.TitleLine>
            <S.TitleLineAccent>{titleAccent}</S.TitleLineAccent>
          </S.Heading>

          <S.CTARow data-reveal style={{ animationDelay: "90ms" }}>
            <S.CTAButton type="button" onClick={onContactClick}>
              Contact Us
            </S.CTAButton>
          </S.CTARow>

          <S.Badges data-reveal style={{ animationDelay: "160ms" }}>
            {badgeList.map((b, i) => (
              <S.Badge key={i}>{b}</S.Badge>
            ))}
          </S.Badges>

          <S.Stats data-reveal style={{ animationDelay: "240ms" }}>
            {statList.map((s, idx) => (
              <S.StatCard key={idx}>
                <S.StatNumber>
                  <CountUp
                    to={s.value}
                    suffix={s.suffix}
                    startOnView
                    viewThreshold={0.25}
                    durationMs={1100}
                    bounceOnFinish
                  />
                </S.StatNumber>
                <S.StatLabel>{s.label}</S.StatLabel>
              </S.StatCard>
            ))}
          </S.Stats>
        </S.Content>
      </S.Container>

      <TickerMarquee
        items={[
          "Digital Content",
          "Trending",
          "Personal Operation",
          "Technology",
          "Social First",
        ]}
        durationSec={18}
        pauseOnHover
        showDot
        fadeEdges
      />
    </S.Section>
  );
};

export default EcosystemOverview;
