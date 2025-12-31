import styled from "styled-components";

const bp = { md: 768, lg: 1024, xl: 1280 };

export const EngineSection = styled.section`
  background: #eff7f4;
  color: #0b0f0c;
  padding-bottom: 92px;

  @media (max-width: ${bp.lg}px) {
    padding-bottom: 78px;
  }
  @media (max-width: ${bp.md}px) {
    padding-bottom: 56px;
  }
`;

export const TickerWrap = styled.div`
  margin-top: 32px;
  margin-bottom: 24px;
`;

export const TickerItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #000;

  span {
    font-size: 20px;
  }

  @media (max-width: ${bp.md}px) {
    span {
      font-size: 16px;
    }
  }
`;

export const EngineRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 64px;

  @media (max-width: ${bp.lg}px) {
    flex-direction: column;
    gap: 34px;
  }
`;

export const EngineTitle = styled.h2`
  margin: 0;
  line-height: 1.02;
  font-size: clamp(42px, 4.6vw, 76px);
  max-width: 520px;

  .accent {
    color: var(--accent);
  }
`;

export const FeatureGrid = styled.div`
  --cols: 2;
  --gapX: 46px;
  --gapY: 34px;

  flex: 1 1 auto;

  display: flex;
  flex-wrap: wrap;
  column-gap: var(--gapX);
  row-gap: var(--gapY);
  align-items: stretch;

  > * {
    flex: 0 0 calc((100% - (var(--cols) - 1) * var(--gapX)) / var(--cols));
  }

  @media (max-width: ${bp.xl}px) {
    --gapX: 36px;
    --gapY: 30px;
  }

  @media (max-width: ${bp.md}px) {
    --cols: 1;
    --gapX: 0px;
    --gapY: 22px;

    > * {
      flex-basis: 100%;
    }
  }
`;

export const FeatureItem = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;

  transition: transform 180ms ease;
  will-change: transform;

  &:hover {
    transform: translateY(-2px);
  }

  @media (prefers-reduced-motion: reduce) {
    &:hover {
      transform: none;
    }
  }
`;

export const FeatureIcon = styled.div`
  flex: 0 0 auto;
  width: 54px;
  height: 54px;
  border-radius: 999px;
  background: var(--accent);

  display: inline-flex;
  align-items: center;
  justify-content: center;

  color: #0b0f0c;

  @media (max-width: ${bp.md}px) {
    width: 50px;
    height: 50px;
  }
`;

export const FeatureContent = styled.div`
  min-width: 0;
`;

export const FeatureTitle = styled.h3`
  margin: 0 0 6px;
  font-size: 16px;
`;

export const FeatureDesc = styled.p`
  margin: 0;
  font-size: 13px;
  line-height: 1.6;
  color: rgba(11, 15, 12, 0.7);
`;
