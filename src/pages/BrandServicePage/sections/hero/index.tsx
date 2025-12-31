import { ArrowRight } from "lucide-react";
import { Container } from "../../brandService.styled";
import * as S from "./hero.styled";

// ✅ sửa path OrbitVisual theo project của bạn
import OrbitVisual from "./OrbitVisual";

type Props = {
  onContactClick?: () => void;
};

export default function BrandServiceHero({ onContactClick }: Props) {
  return (
    <S.HeroSection>
      <Container>
        <S.HeroRow>
          <S.HeroCopy>
            <S.HeroTitle data-reveal>
              Accelerating
              <br />
              business
              <br />
              through
              <br />
              <span className="accent">authentic voices</span>
              <br />
              and creativity
            </S.HeroTitle>

            <S.HeroActions data-reveal>
              <S.HeroButton type="button" onClick={onContactClick}>
                <span>Get in touch!</span>
                <ArrowRight size={18} />
              </S.HeroButton>
            </S.HeroActions>
          </S.HeroCopy>

          <S.HeroVisual aria-hidden data-reveal>
            <OrbitVisual />
          </S.HeroVisual>
        </S.HeroRow>
      </Container>
    </S.HeroSection>
  );
}
