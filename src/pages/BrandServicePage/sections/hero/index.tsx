import * as S from "./hero.styled";

// ✅ sửa path OrbitVisual theo project của bạn
import OrbitVisual from "./OrbitVisual";

type Props = {
  onContactClick?: () => void;
};

export default function BrandServiceHero({ onContactClick }: Props) {
  return (
    <S.HeroSection>
      <S.Container>
        <S.HeroRow>
          <S.HeroCopy>
            <S.HeroTitle data-reveal>
              Accelerating
              <br />
              business through
              <br />
              <span className="accent">authentic voices</span>
              <br />
              and creativity
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
