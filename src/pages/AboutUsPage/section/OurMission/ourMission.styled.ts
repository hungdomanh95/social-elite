import styled from "styled-components";

const bp = {
  md: 768,
  lg: 1024,
};

const ACCENT = "var(--accent, #22c55e)";

export const Page = styled.main`
  width: 100%;
  background: #000;
  color: #fff;
  overflow-x: hidden;
`;


/* =========================
   HERO
========================= */
export const Hero = styled.section`
  width: 100%;
  background:
    radial-gradient(900px 220px at 50% 0%, rgba(34, 197, 94, 0.14), transparent 62%),
    linear-gradient(180deg, #0a0a0a 0%, #000 100%);
  padding: clamp(44px, 5vw, 64px) 0;
  display: grid;
  place-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
`;

export const HeroTitle = styled.h1`
  margin: 0;
  // font-weight: 800;
  // letter-spacing: -0.02em;
  color: ${ACCENT};
  font-size: clamp(44px, 5.2vw, 84px);
  line-height: 1;
`;

/* =========================
   MISSION
========================= */
export const MissionSection = styled.section`
  width: 100%;
  background: #eef6f2;
  padding: clamp(34px, 4.4vw, 56px) 0 clamp(46px, 5.6vw, 74px);
`;

export const MissionContainer = styled.div`
  width: min(1440px, calc(100% - 64px));
  margin: 0 auto;

  @media (max-width: ${bp.md}px) {
    width: min(1440px, calc(100% - 24px));
  }
`;

export const SectionHeading = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 0 0 18px;

  .bar {
    width: 3px;
    height: 28px;
    background: ${ACCENT};
    border-radius: 999px;
    box-shadow: 0 0 14px rgba(34, 197, 94, 0.22);
  }

  .text {
  // font-weight: 800;
    color: ${ACCENT};
    font-size: clamp(24px, 2.6vw, 64px);
  }
`;

export const MissionLeft = styled.div`
  padding: 6px 0;
`;
export const MissionCard = styled.div`
  width: 100%;
  border-radius: 18px;
  padding: clamp(36px, 4.6vw, 64px);
  background:
    radial-gradient(900px 320px at 30% 10%, rgba(255, 255, 255, 0.06), transparent 62%),
    linear-gradient(110deg, #0b0b0b 0%, #0f2a1a 36%, #166b34 70%, #1fe06c 100%);
  box-shadow: 0 22px 60px rgba(0, 0, 0, 0.42);

  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: clamp(26px, 4vw, 56px);
  align-items: center;

  min-height: clamp(240px, 22vw, 320px);

  @media (max-width: ${bp.lg}px) {
    grid-template-columns: 1fr;
    min-height: unset;
    align-items: start;
  }
`;

export const MissionKicker = styled.div`
  // font-weight: 800;
  color: ${ACCENT};
  font-size: clamp(46px, 4.8vw, 86px);
  line-height: 1;
  /* letter-spacing: -0.02em; */
`;

export const MissionMain = styled.div`
  margin-top: 10px;
  // font-weight: 800;
  color: #fff;
  font-size: clamp(46px, 5vw, 86px);
  line-height: 1.04;
  // letter-spacing: -0.02em;
`;

export const MissionRight = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: clamp(14px, 1vw, 18px);
  line-height: 1.7;

  p {
    margin: 0 0 18px;
  }
  p:last-child {
    margin-bottom: 0;
  }
`;
