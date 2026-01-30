import { Container } from "@/shared/components/Container";
import * as S from "./bottomCta.styled";

export default function BottomCTA() {
  return (
    <S.CtaSection>
      <Container>
        <S.CtaRow data-reveal>
          <S.CtaTitle>
            <span className="dark">Elevate your brand</span>
            <br />
            <span className="light">with bold creativity</span>
          </S.CtaTitle>
          <S.CtaButton to="/contact-us">Get in touch</S.CtaButton>
        </S.CtaRow>
      </Container>
    </S.CtaSection>
  );
}
