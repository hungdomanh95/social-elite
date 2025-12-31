import * as S from "./bottomCta.styled";
import { Container } from "../../brandService.styled";

type Props = {
  onContactClick?: () => void;
};

export default function BottomCTA({ onContactClick }: Props) {
  return (
    <S.CtaSection>
      <Container>
        <S.CtaRow data-reveal>
          <S.CtaTitle>
            <span className="dark">Elevate your brand</span>
            <br />
            <span className="light">with bold creativity</span>
          </S.CtaTitle>

          <S.CtaButton type="button" onClick={onContactClick}>
            Get in touch
          </S.CtaButton>
        </S.CtaRow>
      </Container>
    </S.CtaSection>
  );
}
