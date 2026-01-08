import styled from "styled-components";
import { Container } from "@/shared/components/Container";

const bp = { md: 768, lg: 1024 };

export const HeroSection = styled.section`
  position: relative;
  width: 100%;
  background: #060806;
  color: #fff;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    inset: -120px;
    background:
      radial-gradient(900px 520px at 70% 40%, rgba(34, 197, 94, 0.18), transparent 60%),
      radial-gradient(900px 520px at 20% 20%, rgba(255, 255, 255, 0.06), transparent 55%);
    pointer-events: none;
  }
`;

export const HeroInner = styled(Container)`
  position: relative;
  margin: 0 auto;
  padding-top: var(--space-24) ;
  /* padding: clamp(56px, 6.4vw, 96px) 0 clamp(56px, 6.2vw, 92px); */
  margin-bottom: var(--space-24);
  display: flex;
  flex-direction: column;

  /* khoảng cách giữa top row và stats giống nhau */
  gap: clamp(26px, 3.6vw, 48px);

  @media (max-width: ${bp.lg}px) {
    width: min(1240px, calc(100% - 48px));
    padding: 54px 0 56px;
    gap: 22px;
  }

  @media (max-width: ${bp.md}px) {
    width: min(1240px, calc(100% - 28px));
  }
`;

/* ✅ Copy + Visual giãn đều (2 khối trái phải) */
export const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: clamp(28px, 4vw, 72px);

  @media (max-width: ${bp.lg}px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const Copy = styled.div`
  flex: 1 1 0;
  min-width: 0;

  /* để copy không quá rộng làm lệch bố cục */
  max-width: 620px;

  @media (max-width: ${bp.lg}px) {
    max-width: none;
  }
`;

export const VisualArea = styled.div`
  flex: 1 1 0;
  min-width: 0;

  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: ${bp.lg}px) {
    justify-content: center;
    margin-top: 10px;
  }
`;

export const H1 = styled.h1`
  margin: 0;
  font-family: var(--font-display);
  line-height: var(--leading-display, 1.05);
  letter-spacing: -0.03em;
  font-weight: var(--fw-regular);
  font-size: var(--text-6xl);

  span {
    display: block;
  }

  .accent {
    color: var(--accent, #22c55e);
  }
`;


export const CTAButton = styled.button`
  margin-top: 30px;
  appearance: none;
  border: 0;
  cursor: pointer;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  background: var(--accent);
  color: #0b0f0c;
  border-radius: 999px;

  padding: 10px 36px;
  font-size: var(--text-xs);
  font-family: var(--font-body);
  font-weight: var(--fw-semibold);

  box-shadow: 0 12px 28px rgba(30, 215, 95, 0.18);
  transition: transform 160ms ease, filter 160ms ease;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.02);
  }
  &:active {
    transform: translateY(0);
  }
`;

/* ✅ 3 stats trải đều đúng như hình */
export const Stats = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  /* đảm bảo khoảng cách đều và không bị “dồn” */
  gap: clamp(28px, 5.6vw, 110px);

  @media (max-width: ${bp.md}px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 18px;
  }
`;

export const StatCard = styled.div`
  flex: 1 1 0;
  min-width: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  @media (max-width: ${bp.md}px) {
    align-items: flex-start;
  }
`;

export const StatNumber = styled.div`
  font-family: var(--font-body);
  font-weight: var(--fw-bold);
  font-size: var(--text-8xl);
  line-height: var(--leading-none, 1);
  color: var(--accent);
`;

export const StatLabel = styled.div`
  font-size: var(--text-2xl, 24px);
  color: rgba(255, 255, 255, 1);
  line-height: var(--leading-snug, 1.375);
  text-align: center;
`;

