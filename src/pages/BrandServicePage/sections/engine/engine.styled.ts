import styled from "styled-components";
import { Container as BaseContainer } from "@/shared/components/Container";

const bp = { md: 768, lg: 1024, xl: 1280 };

export const EngineSection = styled.section`
  background: #eff7f4;
  color: #0b0f0c;

  padding-bottom: var(--space-9);

`;

export const EngineContainer = styled(BaseContainer)`
  max-width: 1100px;
  padding:0;
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
    font-size: var(--text-2xl);
    line-height: var(--leading-none, 1);
    font-family: var(--font-body);
    font-weight: var(--fw-semibold);
  }

  @media (max-width: ${bp.md}px) {
    span {
      font-size: var(--text-sm, 14px);
    }
  }
`;

export const EngineRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  /* ✅ gap co giãn theo viewport => màn lớn nhìn “đều”
  gap: clamp(40px, 5vw, 96px); */

  gap:var(--space-10);

  @media (max-width: ${bp.lg}px) {
    flex-direction: column;
    gap: 26px;
  }
`;

export const EngineTitle = styled.h2`
  margin: 0;

  display: flex;
  flex-direction: column;

  font-family: var(--font-display);
  font-weight: var(--fw-regular);
  letter-spacing: -0.02em;
  line-height: var(--leading-none, 1);

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
  --gapX: var(--space-7);
  --gapY: var(--space-5);

  /* flex: 1 1 auto; */

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

  font-family: var(--font-display);
  font-weight: var(--fw-regular);

  font-size: var(--text-base);
  line-height: var(--leading-head, 1.15);
  letter-spacing: -0.01em;
  color: #0b0f0c;

  @media (max-width: ${bp.md}px) {
    font-size: var(--text-base, 16px);
  }
`;

export const FeatureDesc = styled.p`
  margin: 0;

  font-family: var(--font-body);
  font-weight: var(--fw-regular);

  font-size: var(--text-xs);
  line-height: var(--leading-relaxed, 1.625);
  letter-spacing: 0;

  color: #0e632c;

  @media (max-width: ${bp.md}px) {
    font-size: var(--text-sm, 14px);
    line-height: var(--leading-relaxed, 1.625);
  }
`;
