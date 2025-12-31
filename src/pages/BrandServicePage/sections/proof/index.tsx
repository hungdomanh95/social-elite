import * as S from "./proof.styled";
import { Container } from "../../brandService.styled";

export default function ProofGrid() {
  const blocks = Array.from({ length: 45 }, (_, i) => i);

  return (
    <S.ProofSection>
      <Container>
        <S.ProofTitle data-reveal>
          We&apos;ve done it for the best.
          <br />
          <span className="accent">Now we&apos;re here for you.</span>
        </S.ProofTitle>

        <S.BlockWrap aria-hidden="true" data-reveal>
          {blocks.map((i) => (
            <S.Block key={i} />
          ))}
        </S.BlockWrap>
      </Container>
    </S.ProofSection>
  );
}
