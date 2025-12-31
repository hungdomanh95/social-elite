import styled from "styled-components";

const bp = { md: 768, lg: 1024, xl: 1280 };

export const ProofSection = styled.section`
  padding: 92px 0 112px;
  background: #000;

  @media (max-width: ${bp.lg}px) {
    padding: 78px 0 98px;
  }
  @media (max-width: ${bp.md}px) {
    padding: 60px 0 76px;
  }
`;

export const ProofTitle = styled.h2`
  margin: 0;
  text-align: center;
  line-height: 1.08;
  font-size: clamp(28px, 2.8vw, 44px);

  .accent {
    color: var(--accent);
  }
`;

export const BlockWrap = styled.div`
  --gap: 14px;
  --cols: 9;

  width: min(1120px, 100%);
  margin: 42px auto 0;

  display: flex;
  flex-wrap: wrap;
  gap: var(--gap);

  @media (max-width: ${bp.xl}px) {
    --cols: 8;
  }
  @media (max-width: ${bp.lg}px) {
    --cols: 6;
  }
  @media (max-width: ${bp.md}px) {
    --cols: 4;
    --gap: 12px;
  }
`;

export const Block = styled.div`
  height: 44px;
  border-radius: 4px;
  background: #0b3c1d;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.25);

  flex: 0 0 calc((100% - (var(--cols) - 1) * var(--gap)) / var(--cols));
`;
