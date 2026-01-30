import CountUp from "@/shared/components/CountUp";
import * as S from "./hero.styled";
import OrbitVisual from "./OrbitVisual";
import { useLandingPage } from "@/shared/api/useLandingPage";

const parseNumberWithSuffix = (
  raw?: string
): { value: number; suffix?: string } => {
  const s = String(raw ?? "").trim();
  if (!s) return { value: 0 };

  // "1000+" / "5,000+" / "85%"...
  const match = s.match(/^([\d.,]+)\s*([+%a-zA-Z]+)?$/);
  if (!match) return { value: Number(s.replace(/[^\d]/g, "")) || 0 };

  const numPart = match[1] || "0";
  const suffixPart = match[2] || "";

  const value = Math.round(parseFloat(numPart.replace(/,/g, "")) || 0);

  const suffix = suffixPart.includes("+")
    ? "+"
    : suffixPart.includes("%")
    ? "%"
    : undefined;

  return { value, suffix };
};

export default function Hero() {
  const { data: landing } = useLandingPage();

  const titleLines =
    (landing?.creatorTitle ?? []) as Array<{
      id?: number;
      line_text?: string;
      is_highlight?: boolean | null;
    }>;

  const stats =
    (landing?.creatorStats ?? []) as Array<{
      id?: number;
      number?: string;
      label?: string;
    }>;

  return (
    <S.HeroSection>
      <S.HeroInner>
        <S.TopRow>
          <S.Copy>
            <S.H1>
              {titleLines.length ? (
                titleLines.map((l, idx) => (
                  <span
                    key={l?.id ?? idx}
                    className={l?.is_highlight ? "accent" : undefined}
                  >
                    {l?.line_text}
                  </span>
                ))
              ) : (
                <>
                  <span>A creator-</span>
                  <span>powered</span>
                  <span className="accent">community</span>
                  <span>unlocking brand</span>
                  <span>and commercial</span>
                  <span>growth</span>
                </>
              )}
            </S.H1>

            {/* ✅ Navigate to Contact page */}
            <S.CTAButton href="/contact-us" aria-label="Go to Contact Us">
              Join Us!
            </S.CTAButton>
          </S.Copy>

          <S.VisualArea>
            <OrbitVisual revealDelayMs={220} />
          </S.VisualArea>
        </S.TopRow>

        <S.Stats>
          {stats.length
            ? stats.map((s, idx) => {
                const parsed = parseNumberWithSuffix(s?.number);
                return (
                  <S.StatCard key={s?.id ?? idx}>
                    <S.StatNumber>
                      <CountUp
                        to={parsed.value}
                        suffix={parsed.suffix}
                        startOnView
                        viewThreshold={0.25}
                        durationMs={1100}
                        bounceOnFinish
                      />
                    </S.StatNumber>
                    <S.StatLabel>{s?.label}</S.StatLabel>
                  </S.StatCard>
                );
              })
            : null}
        </S.Stats>
      </S.HeroInner>
    </S.HeroSection>
  );
}
