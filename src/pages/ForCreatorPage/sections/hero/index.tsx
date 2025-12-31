import CountUp from "@/shared/components/CountUp";
import * as S from "./hero.styled";
import OrbitVisual from "./OrbitVisual";

type Props = {
  onJoinClick?: () => void;
};

const defaultStats = [
  { value: 50, suffix: "+", label: "Exclusive Talents" },
  { value: 100, suffix: "+", label: "Top-tier KOLs" },
  { value: 1000, suffix: "+", label: "Campaigns" },
];

export default function Hero({ onJoinClick }: Props) {
  return (
    <S.HeroSection>
      <S.HeroInner>
        <S.TopRow>
          <S.Copy>
            <S.H1>
              <span>A creator-</span>
              <span>powered</span>
              <span className="accent">community</span>
              <span>unlocking brand</span>
              <span>and commercial</span>
              <span>growth</span>
            </S.H1>

            <S.CTAButton type="button" onClick={onJoinClick}>
              Join Us!
            </S.CTAButton>
          </S.Copy>

          <S.VisualArea>
            <OrbitVisual revealDelayMs={220} />
          </S.VisualArea>
        </S.TopRow>

        <S.Stats>
          {defaultStats.map((s, idx) => (
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
      </S.HeroInner>
    </S.HeroSection>
  );
}
