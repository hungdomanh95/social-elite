import styled from "styled-components";

const bp = { md: 768, lg: 1024, xl: 1280 };

export const EngineSection = styled.section`
  background: #eff7f4;
  color: #0b0f0c;

  padding: 56px 0 72px;

  @media (max-width: ${bp.lg}px) {
    padding: 48px 0 64px;
  }
  @media (max-width: ${bp.md}px) {
    padding: 38px 0 52px;
  }
`;

/* ✅ container riêng cho Engine để màn >1560px không bị bó gọn */
export const EngineContainer = styled.div`
  max-width: 1380px;
  margin: 0 auto;

  /* màn càng to càng có breathing room */
  padding: 0 clamp(24px, 5vw, 120px);

  @media (max-width: ${bp.md}px) {
    padding: 0 16px;
  }

  /* extra nới khi màn cực lớn */
  @media (min-width: 1600px) {
    max-width: 1480px;
  }
`;

export const TickerWrap = styled.div`
  margin-bottom: 22px;

  @media (max-width: ${bp.md}px) {
    margin-bottom: 16px;
  }
`;

export const TickerItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #0b0f0c;

  span {
    font-size: 16px;
    line-height: 1;
  }

  @media (max-width: ${bp.md}px) {
    span {
      font-size: 14px;
    }
  }
`;

export const EngineRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  /* ✅ gap co giãn theo viewport => màn lớn nhìn “đều” */
  gap: clamp(40px, 5vw, 96px);

  @media (max-width: ${bp.lg}px) {
    flex-direction: column;
    gap: 26px;
  }
`;

export const EngineTitle = styled.h2`
  margin: 0;

  display: flex;
  flex-direction: column;

  font-family: "Cal Sans", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
  font-weight: 400;
  letter-spacing: -0.02em;
  line-height: 0.98;

  font-size: clamp(42px, 4.2vw, 72px);

  .line {
    display: block;
    white-space: nowrap;
  }

  .accent {
    color: var(--accent);
  }

  /* ✅ cân đối hơn ở màn lớn */
  width: min(560px, 42%);

  @media (max-width: ${bp.lg}px) {
    width: 100%;
    .line {
      white-space: normal;
    }
  }

  @media (max-width: ${bp.md}px) {
    font-size: clamp(34px, 9.2vw, 52px);
  }
`;

export const FeatureGrid = styled.div`
  --cols: 2;
  --gapX: 34px;
  --gapY: 22px;

  flex: 1 1 auto;

  display: flex;
  flex-wrap: wrap;
  column-gap: var(--gapX);
  row-gap: var(--gapY);
  align-items: flex-start;

  /* ✅ tránh bị quá rộng gây “thô”, nhưng vẫn đủ thoáng ở màn lớn */
  max-width: 760px;

  > * {
    flex: 0 0 calc((100% - (var(--cols) - 1) * var(--gapX)) / var(--cols));
  }

  @media (max-width: ${bp.xl}px) {
    --gapX: 28px;
    --gapY: 20px;
  }

  @media (max-width: ${bp.md}px) {
    --cols: 1;
    --gapX: 0px;
    --gapY: 18px;

    max-width: none;

    > * {
      flex-basis: 100%;
    }
  }
`;

export const FeatureItem = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;

  transition: transform 180ms ease;
  will-change: transform;

  &:hover {
    transform: translateY(-1px);
  }

  @media (prefers-reduced-motion: reduce) {
    &:hover {
      transform: none;
    }
  }
`;

export const FeatureIcon = styled.div`
  flex: 0 0 auto;

  width: 44px;
  height: 44px;
  border-radius: 999px;
  background: var(--accent);

  display: inline-flex;
  align-items: center;
  justify-content: center;

  color: #0b0f0c;

  @media (max-width: ${bp.md}px) {
    width: 42px;
    height: 42px;
  }
`;

export const FeatureContent = styled.div`
  min-width: 0;

  max-width: 360px;

  @media (max-width: ${bp.xl}px) {
    max-width: 340px;
  }

  @media (max-width: ${bp.md}px) {
    max-width: none;
  }
`;

export const FeatureTitle = styled.h3`
  margin: 0 0 6px;

  font-family: "Cal Sans", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
  font-weight: 400;

  font-size: 18px;
  line-height: 1.15;
  letter-spacing: -0.01em;
  color: #0b0f0c;

  @media (max-width: ${bp.md}px) {
    font-size: 17px;
  }
`;

export const FeatureDesc = styled.p`
  margin: 0;

  font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
  font-weight: 400;

  font-size: 14px;
  line-height: 1.65;
  letter-spacing: 0;

  color: #0e632c;

  @media (max-width: ${bp.md}px) {
    font-size: 13px;
    line-height: 1.6;
  }
`;
