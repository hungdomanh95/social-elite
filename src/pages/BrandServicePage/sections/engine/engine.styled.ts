import styled from "styled-components";
// import { Container as BaseContainer } from "@/shared/components/Container";

const bp = { md: 768, lg: 1024, xl: 1280 };

export const EngineSection = styled.section`
  background: #eff7f4;
  color: #0b0f0c;

  padding-bottom: var(--space-9);
`;

export const EngineContainer = styled.section`
  /* giữ padding chuẩn của Container shared để đồng nhất toàn site */
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
  justify-content: center;
  padding: 24px 96px;

  /* ✅ quan trọng: cho phép wrap để Title không đè qua Grid */
  /* flex-wrap: wrap; */

  /* ✅ gap “đẹp” hơn: row/column riêng */
  gap: clamp(22px, 3vw, 34px) clamp(40px, 5vw, 88px);

  /* không dùng space-between để tránh layout bị “kéo giãn” khó kiểm soát */

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

  /* ✅ cố định “cột trái” hợp lý để không đè Grid */
  flex: 0 0 clamp(420px, 40%, 560px);
  max-width: 560px;

  .line {
    display: block;
    white-space: nowrap;
  }

  .accent {
    color: var(--accent);
  }

  @media (max-width: ${bp.lg}px) {
    flex: none;
    max-width: none;

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

  /* ✅ spacing thoáng + co giãn theo viewport */
  --gapX: clamp(28px, 2.8vw, 44px);
  --gapY: clamp(18px, 2.2vw, 28px);

  display: flex;
  flex-wrap: wrap;
  column-gap: var(--gapX);
  row-gap: var(--gapY);
  align-items: flex-start;

  /* ✅ cột phải: cho phép co giãn nhưng có “mức tối thiểu” để đỡ bí */
  flex: 1 1 560px;
  min-width: 0;

  /* ✅ tránh bị quá rộng, giữ đúng feel UI */
  max-width: 760px;

  > * {
    flex: 0 0 calc((100% - (var(--cols) - 1) * var(--gapX)) / var(--cols));
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
  gap: 14px;
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

  width: 46px;
  height: 46px;
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
