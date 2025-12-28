import styled from "styled-components";

const bp = { md: 768, lg: 1024 };

export const HeroSection = styled.section`
  position: relative;
  width: 100%;
  background: #060806;
  color: #fff;
  overflow: hidden;

  /* subtle vignette like screenshot */
  &:before {
    content: "";
    position: absolute;
    inset: -120px -120px -120px -120px;
    background: radial-gradient(900px 520px at 70% 40%, rgba(34, 197, 94, 0.18), transparent 60%),
      radial-gradient(900px 520px at 20% 20%, rgba(255, 255, 255, 0.06), transparent 55%);
    pointer-events: none;
  }
`;

export const HeroInner = styled.div`
  position: relative;
  width: min(1180px, calc(100% - 64px));
  margin: 0 auto;
  padding: clamp(52px, 6.2vw, 92px) 0 36px;

  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: clamp(18px, 3vw, 44px);
  align-items: center;

  @media (max-width: ${bp.lg}px) {
    grid-template-columns: 1fr;
    padding: 54px 0 30px;
  }

  @media (max-width: ${bp.md}px) {
    width: min(1180px, calc(100% - 28px));
  }
`;

export const Copy = styled.div`
  min-width: 0;
`;

export const H1 = styled.h1`
  margin: 0;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.03;
  font-size: clamp(38px, 4.8vw, 76px);

  span {
    display: block;
  }

  .accent {
    color: var(--accent, #22c55e);
  }
`;

export const CTAButton = styled.button`
  margin-top: 18px;
  height: 44px;
  padding: 0 20px;
  border-radius: 999px;
  border: 0;
  outline: none;
  cursor: pointer;

  background: var(--accent, #22c55e);
  color: #07130b;
  font-weight: 800;

  box-shadow: 0 14px 32px rgba(34, 197, 94, 0.18);

  &:active {
    transform: translateY(1px);
  }

  @media (max-width: ${bp.md}px) {
    height: 42px;
  }
`;

export const StatsRow = styled.div`
  margin-top: clamp(26px, 3.4vw, 42px);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(14px, 2.6vw, 36px);

  @media (max-width: ${bp.md}px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const Stat = styled.div`
  text-align: center;

  @media (max-width: ${bp.lg}px) {
    text-align: left;
  }

  @media (max-width: ${bp.md}px) {
    text-align: left;
  }
`;

export const StatValue = styled.div`
  font-weight: 900;
  color: var(--accent, #22c55e);
  font-size: clamp(54px, 6.5vw, 104px);
  letter-spacing: -0.02em;
  line-height: 1;
`;

export const StatLabel = styled.div`
  margin-top: 6px;
  color: rgba(255, 255, 255, 0.78);
  font-size: 16px;

  @media (max-width: ${bp.md}px) {
    font-size: 15px;
  }
`;

export const Visual = styled.div`
  display: grid;
  place-items: center;
  min-width: 0;

  @media (max-width: ${bp.lg}px) {
    margin-top: 18px;
  }
`;

/** Dùng ảnh export để đúng chuẩn nhất */
export const OrbitImage = styled.img`
  width: min(520px, 44vw);
  height: auto;
  display: block;
  user-select: none;
  pointer-events: none;

  @media (max-width: ${bp.lg}px) {
    width: min(560px, 88vw);
  }
`;

/** fallback đơn giản nếu chưa có ảnh */
export const OrbitFallback = styled.div`
  position: relative;
  width: min(520px, 44vw);
  aspect-ratio: 1 / 1;
  border-radius: 999px;

  @media (max-width: ${bp.lg}px) {
    width: min(560px, 88vw);
  }
`;

export const OrbitGlow = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.9), rgba(34, 197, 94, 0.35) 44%, transparent 72%);
  filter: blur(0.2px);
`;

export const OrbitDash = styled.div`
  position: absolute;
  inset: 14%;
  border-radius: 999px;
  border: 2px dashed rgba(255, 255, 255, 0.65);
  opacity: 0.6;
`;

export const OrbitCenter = styled.div`
  position: absolute;
  inset: 26%;
  border-radius: 999px;
  display: grid;
  place-items: center;
  font-weight: 800;
  letter-spacing: -0.02em;
  background: radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 1), rgba(34, 197, 94, 0.72));
  color: #0b1a10;
`;

/* ====================== OFFER ====================== */

export const OfferSection = styled.section<{ $bg: string }>`
  position: relative;
  width: 100%;
  overflow: hidden;
  border-top: 1px solid rgba(0, 0, 0, 0.06);

  /* BG image */
  background-color: #f1fbf3;
  background-image: url(${(p) => p.$bg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  /* đảm bảo content nổi lên trên nền */
  &:before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    /* overlay nhẹ để chữ rõ hơn nếu BG hơi nổi */
    background: linear-gradient(
      to bottom,
      rgba(241, 251, 243, 0.65),
      rgba(241, 251, 243, 0.75)
    );
  }
`;

export const OfferInner = styled.div`
  position: relative;
  z-index: 1;

  width: min(1180px, calc(100% - 64px));
  margin: 0 auto;
  padding: 64px 0 72px;

  @media (max-width: ${bp.md}px) {
    width: min(1180px, calc(100% - 28px));
    padding: 54px 0 60px;
  }
`;

export const OfferTitle = styled.h2`
  margin: 0 0 34px;
  text-align: center;
  font-weight: 900;
  letter-spacing: -0.02em;
  color: var(--accent, #22c55e);
  font-size: clamp(32px, 3.2vw, 48px);
`;

export const OfferRow = styled.div`
  display: grid;
  gap: 22px 34px;
  align-items: center;
  justify-items: center;

  &[data-cols="3"] {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    margin-bottom: 26px;
  }

  &[data-cols="2"] {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    width: min(820px, 100%);
    margin: 0 auto;
  }

  @media (max-width: ${bp.lg}px) {
    &[data-cols="3"] {
      grid-template-columns: 1fr;
      justify-items: start;
      margin-bottom: 18px;
    }
    &[data-cols="2"] {
      grid-template-columns: 1fr;
      justify-items: start;
      width: 100%;
    }
  }
`;

export const OfferItem = styled.div`
  width: 100%;
  display: inline-flex;
  align-items: center;
  gap: 14px;
  justify-content: center;

  @media (max-width: ${bp.lg}px) {
    justify-content: flex-start;
  }
`;

export const OfferIcon = styled.div`
  width: 46px;
  height: 46px;
  border-radius: 999px;
  background: var(--accent, #22c55e);
  color: #ffffff;
  display: grid;
  place-items: center;
  box-shadow: 0 12px 28px rgba(34, 197, 94, 0.22);
  flex: 0 0 auto;

  svg {
    display: block;
  }
`;

export const OfferText = styled.div`
  font-weight: 800;
  color: #0b0f0c;
  font-size: 18px;

  @media (max-width: ${bp.md}px) {
    font-size: 16px;
  }
`;
