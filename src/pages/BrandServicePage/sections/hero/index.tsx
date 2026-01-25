import * as S from "./hero.styled";
import OrbitVisual from "./OrbitVisual";
import { useLandingPage } from "@/shared/api/useLandingPage";

type Props = {
  onContactClick?: () => void;
};

export default function BrandServiceHero({ onContactClick }: Props) {
  const { data: landing } = useLandingPage();

  const lines = (landing?.branchTitle ?? []) as Array<{
    id?: number;
    line_text?: string;
    is_highlight?: boolean | null;
  }>;

  return (
    <S.HeroSection>
      <S.Container>
        <S.HeroRow>
          <S.HeroCopy>
            <S.HeroTitle data-reveal>
              {lines.length ? (
                lines.map((l, idx) => (
                  <span key={l.id ?? idx}>
                    {l?.is_highlight ? (
                      <span className="accent">{l?.line_text}</span>
                    ) : (
                      l?.line_text
                    )}
                    {idx < lines.length - 1 ? <br /> : null}
                  </span>
                ))
              ) : (
                <>
                  Accelerating
                  <br />
                  business through
                  <br />
                  <span className="accent">authentic voices</span>
                  <br />
                  and creativity
                </>
              )}
            </S.HeroTitle>

            <S.HeroActions data-reveal>
              <S.HeroButton type="button" onClick={onContactClick}>
                <span>Get in touch!</span>
              </S.HeroButton>
            </S.HeroActions>
          </S.HeroCopy>

          <S.HeroVisual aria-hidden data-reveal>
            <OrbitVisual scale={1.7} scaleMobile={1.2} />
          </S.HeroVisual>
        </S.HeroRow>
      </S.Container>
    </S.HeroSection>
  );
}
