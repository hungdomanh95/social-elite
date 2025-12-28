import styled from "styled-components";

const bp = { md: 768, lg: 1024, xl: 1280 };

export const Page = styled.main`
  --accent: #1ed75f;
  width: 100%;
  min-height: 100vh;
  background: #000;
  color: #fff;
  overflow-x: hidden;
`;

export const Container = styled.div`
  width: min(1180px, calc(100% - 80px));
  margin: 0 auto;

  @media (max-width: ${bp.md}px) {
    width: min(1180px, calc(100% - 32px));
  }
`;

/* =========================
   SECTION 1: HERO
========================= */
export const HeroSection = styled.section`
  position: relative;
  padding: 112px 0 132px;
  background: #000;

  /* vignette like reference */
  &:before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(
        1200px 600px at 15% 30%,
        rgba(30, 215, 95, 0.06),
        transparent 55%
      ),
      radial-gradient(900px 600px at 90% 10%, rgba(255, 255, 255, 0.04), transparent 60%);
    opacity: 1;
  }

  @media (max-width: ${bp.lg}px) {
    padding: 92px 0 112px;
  }

  @media (max-width: ${bp.md}px) {
    padding: 72px 0 92px;
  }
`;

export const HeroInner = styled.div`
  position: relative;
  max-width: 760px;
`;

export const HeroTitle = styled.h1`
  margin: 0;
  font-weight: 800;
  letter-spacing: -0.035em;
  line-height: 1.02;
  font-size: clamp(44px, 5.3vw, 92px);

  .accent {
    color: var(--accent);
  }
`;

export const HeroActions = styled.div`
  margin-top: 28px;

  @media (max-width: ${bp.md}px) {
    margin-top: 22px;
  }
`;

export const HeroButton = styled.button`
  appearance: none;
  border: 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  background: var(--accent);
  color: #0b0f0c;
  border-radius: 999px;

  padding: 10px 16px;
  font-weight: 700;
  font-size: 12px;

  box-shadow: 0 10px 24px rgba(30, 215, 95, 0.18);
  transition: transform 160ms ease, filter 160ms ease;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.02);
  }
  &:active {
    transform: translateY(0px);
  }
`;

/* =========================
   SECTION 2: ENGINE
========================= */
export const EngineSection = styled.section`
  background: #eff7f4;
  color: #0b0f0c;
  /* padding: 92px 0; */
  padding-bottom: 92px;

  @media (max-width: ${bp.lg}px) {
    /* padding: 78px 0; */
    padding-bottom: 78px;
  }
  @media (max-width: ${bp.md}px) {
    /* padding: 56px 0; */
    padding-bottom: 56px;
  }
`;

export const EngineGrid = styled.div`
  display: grid;
  grid-template-columns: 1.05fr 1.25fr;
  gap: 64px;
  align-items: start;

  @media (max-width: ${bp.lg}px) {
    grid-template-columns: 1fr;
    gap: 34px;
  }
`;

export const EngineTitle = styled.h2`
  margin: 0;
  font-weight: 800;
  letter-spacing: -0.035em;
  line-height: 1.02;
  font-size: clamp(42px, 4.6vw, 76px);

  .accent {
    color: var(--accent);
  }
`;

export const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 34px 46px;

  @media (max-width: ${bp.xl}px) {
    gap: 30px 36px;
  }

  @media (max-width: ${bp.md}px) {
    grid-template-columns: 1fr;
    gap: 22px;
  }
`;

export const FeatureItem = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;
`;

export const FeatureIcon = styled.div`
  flex: 0 0 auto;
  width: 54px;
  height: 54px;
  border-radius: 999px;
  background: var(--accent);
  display: grid;
  place-items: center;

  color: #0b0f0c;

  svg {
    width: 22px;
    height: 22px;
  }

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
  font-weight: 800;
  letter-spacing: -0.01em;
`;

export const FeatureDesc = styled.p`
  margin: 0;
  font-size: 13px;
  line-height: 1.6;
  color: rgba(11, 15, 12, 0.7);
`;

/* =========================
   SECTION 3: PROOF GRID
========================= */
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
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.08;
  font-size: clamp(28px, 2.8vw, 44px);

  .accent {
    color: var(--accent);
  }
`;

export const BlockGrid = styled.div`
  width: min(1120px, 100%);
  margin: 42px auto 0;

  display: grid;
  grid-template-columns: repeat(9, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: ${bp.xl}px) {
    grid-template-columns: repeat(8, minmax(0, 1fr));
  }
  @media (max-width: ${bp.lg}px) {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
  @media (max-width: ${bp.md}px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 12px;
  }
`;

export const Block = styled.div`
  height: 44px;
  border-radius: 4px;
  background: #0b3c1d;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.25);
`;

/* =========================
   SECTION 4: CTA BAR
========================= */
export const CtaSection = styled.section`
  background: var(--accent);
  padding: 62px 0;

  @media (max-width: ${bp.md}px) {
    padding: 44px 0;
  }
`;

export const CtaGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 24px;
  align-items: center;

  @media (max-width: ${bp.md}px) {
    grid-template-columns: 1fr;
    gap: 18px;
  }
`;

export const CtaTitle = styled.h3`
  margin: 0;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.02;
  font-size: clamp(34px, 3.6vw, 60px);

  .dark {
    color: #0b0f0c;
  }
  .light {
    color: #ffffff;
  }
`;

export const CtaButton = styled.button`
  appearance: none;
  border: 0;
  cursor: pointer;

  background: #ffffff;
  color: #0b0f0c;

  padding: 12px 22px;
  border-radius: 999px;

  font-weight: 700;
  font-size: 13px;

  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);
  transition: transform 160ms ease, filter 160ms ease;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(0.99);
  }
  &:active {
    transform: translateY(0px);
  }

  @media (max-width: ${bp.md}px) {
    justify-self: start;
  }
`;
