import styled from "styled-components";
import { Container as BaseContainer } from "@/shared/components/Container";
import { Link } from "react-router-dom";

const bp = {
  sm: 640,
  md: 768,
  lg: 1024,
};

export const Section = styled.section`
  position: relative;
  overflow: hidden; /* ✅ để glow không tràn ra ngoài */
  padding: 72px 0 0;

  /* ✅ nền + vignette nhẹ */
  background:
    radial-gradient(
        1200px 700px at 50% 18%,
        rgba(255, 255, 255, 0.03) 0%,
        transparent 60%
      ),
    radial-gradient(
        900px 520px at 10% 10%,
        rgba(255, 255, 255, 0.02) 0%,
        transparent 55%
      ),
    #050707;

  @media (max-width: ${bp.lg}px) {
    padding: 62px 0 0;
  }
  @media (max-width: ${bp.md}px) {
    padding: 46px 0 0;
  }
  @media (max-width: ${bp.sm}px) {
    padding: 40px 0 0;
  }

  /* ✅ green glow “lan” từ dưới lên */
  &::before {
    content: "";
    position: absolute;
    inset: -20%;
    pointer-events: none;
    z-index: 0;

    background: radial-gradient(
        60% 55% at 18% 100%,
        rgba(34, 197, 94, 0.28) 0%,
        rgba(34, 197, 94, 0.16) 25%,
        rgba(34, 197, 94, 0.06) 42%,
        transparent 62%
      ),
      radial-gradient(
        55% 50% at 55% 105%,
        rgba(34, 197, 94, 0.18) 0%,
        rgba(34, 197, 94, 0.1) 30%,
        transparent 60%
      ),
      radial-gradient(
        40% 35% at 88% 18%,
        rgba(34, 197, 94, 0.1) 0%,
        transparent 55%
      );
  }

  /* ✅ “band” xanh ở phần đáy */
  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 180px;
    pointer-events: none;
    z-index: 0;

    background: linear-gradient(
      to top,
      rgba(34, 197, 94, 0.22) 0%,
      rgba(34, 197, 94, 0.1) 35%,
      transparent 100%
    );
  }

  /* ✅ đảm bảo content nằm trên glow */
  > * {
    position: relative;
    z-index: 1;
  }

  /* reveal animation */
  [data-reveal] {
    opacity: 0;
    transform: translateY(10px);
    animation: eco-reveal 700ms ease forwards;
  }

  @keyframes eco-reveal {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const Container = styled(BaseContainer)`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  /* ✅ mobile: nếu layout của bạn cần stack thì bật */
  @media (max-width: ${bp.md}px) {
    flex-direction: column;
    gap: 18px;
  }
`;

export const Content = styled.div`
  width: 100%;
`;

export const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: ${bp.md}px) {
    gap: 10px;
  }
`;

export const TitleLine = styled.div`
  font-family: var(--font-display);
  font-weight: var(--fw-regular);
  font-size: var(--text-7xl);
  line-height: 1.02;
  color: rgba(255, 255, 255, 0.92);
  word-break: break-word;

  /* ✅ smaller on mobile */
   @media (max-width: ${bp.md}px) {
    font-size: clamp(26px, 7.2vw, 40px);
    line-height: 1.08;
  }

  @media (max-width: 420px) {
    font-size: clamp(24px, 7.8vw, 36px);
  }
  @media (max-width: ${bp.md}px) {
    font-size: clamp(44px, 10vw, 64px);
  }
`;

export const TitleLineAccent = styled.div`
  font-family: var(--font-display);
  font-weight: var(--fw-regular);
  font-size: var(--text-7xl);
  line-height: 1.02;
  color: var(--accent);
  word-break: break-word;

  /* ✅ smaller on mobile */
  @media (max-width: ${bp.md}px) {
    font-size: clamp(26px, 7.2vw, 40px);
    line-height: 1.08;
  }

  @media (max-width: 420px) {
    font-size: clamp(24px, 7.8vw, 36px);
  }
  @media (max-width: ${bp.md}px) {
    font-size: clamp(44px, 10vw, 64px);
  }
`;

export const CTARow = styled.div`
  margin-top: 14px;

  @media (max-width: ${bp.md}px) {
    margin-top: 12px;
  }
`;

export const CTAButton = styled(Link)`
  border: 0;
  text-decoration: none;
  cursor: pointer;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 14px 20px;
  border-radius: 999px;

  font-size: var(--text-sx, 12px);
  line-height: var(--leading-tight, 1.25);
  font-weight: var(--fw-semibold);
  font-family: var(--font-body);

  color: #0b1a10;
  background: var(--accent);
  box-shadow: 0 10px 30px rgba(34, 197, 94, 0.18);

  transition: transform 160ms ease, box-shadow 160ms ease, filter 160ms ease;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.02);
    box-shadow: 0 12px 34px rgba(34, 197, 94, 0.22);
  }

  @media (max-width: ${bp.md}px) {
    padding: 12px 16px;
  }
`;

export const Badges = styled.div`
  margin-top: var(--space-16);
  display: flex;
  flex-direction: column;
  gap: 6px;

  @media (max-width: ${bp.md}px) {
    margin-top: 18px;
    gap: 8px;
  }
`;

export const Badge = styled.div`
  font-size: var(--text-2xl, 24px);
  font-weight: var(--fw-semibold);

  @media (max-width: ${bp.md}px) {
    font-size: clamp(18px, 4.8vw, 22px);
  }
`;

export const BadgeAccent = styled.span`
  color: var(--accent);
`;

export const Stats = styled.div`
  margin-top: 26px;
  display: flex;
  justify-content: space-between;
  gap: 22px;

  /* ✅ mobile: mỗi StatCard xuống 1 dòng */
  @media (max-width: ${bp.md}px) {
    margin-top: 18px;
    flex-direction: column;
    align-items: center;
    gap: 14px;

    max-width: 420px;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const StatCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: center;
  align-items: center;

  @media (max-width: ${bp.md}px) {
    width: 100%;
    max-width: 360px;
    align-items: flex-start;
  }
`;

export const StatNumber = styled.div`
  font-family: var(--font-body);
  font-weight: var(--fw-bold);
  font-size: var(--text-8xl);
  line-height: var(--leading-none, 1);
  color: var(--accent);

  @media (max-width: ${bp.md}px) {
    font-size: clamp(36px, 9vw, 56px);
  }
`;

export const StatLabel = styled.div`
  font-size: var(--text-2xl, 24px);
  color: rgba(255, 255, 255, 1);
  line-height: var(--leading-snug, 1.375);
  text-align: center;

  @media (max-width: ${bp.md}px) {
    font-size: clamp(14px, 3.8vw, 18px);
  }
`;
