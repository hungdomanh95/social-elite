import styled, { css } from "styled-components";

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

export const Container = styled.div`
  width: min(1240px, calc(100% - 80px));
  margin: 0 auto;

  @media (max-width: ${bp.md}px) {
    width: min(1240px, calc(100% - 28px));
  }
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
  font-weight: 800;
  letter-spacing: -0.02em;
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
    font-weight: 800;
    color: ${ACCENT};
    font-size: clamp(24px, 2.6vw, 36px);
    letter-spacing: -0.01em;
  }
`;

export const MissionCard = styled.div`
  width: 100%;
  border-radius: 14px;
  padding: clamp(26px, 3.4vw, 44px);
  background:
    radial-gradient(900px 320px at 30% 10%, rgba(255, 255, 255, 0.06), transparent 62%),
    linear-gradient(110deg, #0b0b0b 0%, #0f2a1a 36%, #166b34 70%, #1fe06c 100%);
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.36);
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  gap: clamp(18px, 3vw, 34px);
  align-items: center;

  @media (max-width: ${bp.lg}px) {
    grid-template-columns: 1fr;
    align-items: start;
  }
`;

export const MissionLeft = styled.div`
  padding: 6px 0;
`;

export const MissionKicker = styled.div`
  font-weight: 800;
  color: ${ACCENT};
  font-size: clamp(34px, 3.8vw, 64px);
  line-height: 1;
  letter-spacing: -0.02em;
`;

export const MissionMain = styled.div`
  margin-top: 6px;
  font-weight: 800;
  color: #fff;
  font-size: clamp(34px, 3.9vw, 66px);
  line-height: 1.05;
  letter-spacing: -0.02em;
`;

export const MissionRight = styled.div`
  color: rgba(255, 255, 255, 0.78);
  font-size: 13px;
  line-height: 1.55;

  p {
    margin: 0 0 14px;
  }
  p:last-child {
    margin-bottom: 0;
  }

  @media (max-width: ${bp.md}px) {
    font-size: 13px;
  }
`;

/* =========================
   MILESTONES
========================= */
export const MilestonesSection = styled.section`
  width: 100%;
  background:
    radial-gradient(900px 420px at 20% 20%, rgba(34, 197, 94, 0.08), transparent 62%),
    radial-gradient(900px 420px at 80% 70%, rgba(34, 197, 94, 0.06), transparent 62%),
    #000;
  padding: clamp(54px, 6.2vw, 86px) 0 clamp(70px, 7vw, 96px);
`;

export const MilestonesHeading = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 14px;

  .bar {
    width: 3px;
    height: 44px;
    background: ${ACCENT};
    border-radius: 999px;
    box-shadow: 0 0 16px rgba(34, 197, 94, 0.24);
    margin-top: 4px;
  }

  .stack {
    display: grid;
    gap: 6px;
  }

  .top {
    font-weight: 800;
    color: ${ACCENT};
    letter-spacing: -0.01em;
    font-size: clamp(26px, 3vw, 40px);
    line-height: 1.05;
  }

  .bottom {
    font-weight: 800;
    color: #fff;
    letter-spacing: -0.01em;
    font-size: clamp(26px, 3vw, 40px);
    line-height: 1.05;
  }
`;

/* =========================
   TIMELINE (desktop like screenshot)
========================= */
export const Timeline = styled.div`
  position: relative;
  margin-top: clamp(18px, 3vw, 34px);

  /* tune like screenshot */
  --arm: clamp(220px, 30vw, 360px);
  --rowH: 128px;
  --gapY: 72px;
  --nodeY: 52px;

  /* vertical spine */
  &::before {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: var(--nodeY);
    bottom: calc(var(--rowH) - var(--nodeY));
    width: 2px;
    background: rgba(34, 197, 94, 0.55);
    box-shadow: 0 0 18px rgba(34, 197, 94, 0.22);
  }

  @media (max-width: ${bp.md}px) {
    /* mobile: simplify to list */
    --arm: 0px;
    --rowH: auto;
    --gapY: 18px;
    --nodeY: 0px;

    &::before {
      display: none;
    }
  }
`;

export const TimelineList = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gapY);
`;

export const Row = styled.div<{ $side: "left" | "right" }>`
  position: relative;
  height: var(--rowH);

  @media (max-width: ${bp.md}px) {
    height: auto;
    padding: 14px 0;
    border-left: 2px solid rgba(34, 197, 94, 0.5);
    padding-left: 14px;
  }
`;

export const Node = styled.div`
  position: absolute;
  left: 50%;
  top: var(--nodeY);
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background: ${ACCENT};
  box-shadow:
    0 0 0 5px rgba(34, 197, 94, 0.14),
    0 0 22px rgba(34, 197, 94, 0.55);

  @media (max-width: ${bp.md}px) {
    display: none;
  }
`;

export const Arm = styled.div<{ $side: "left" | "right" }>`
  position: absolute;
  top: var(--nodeY);
  height: 2px;
  background: rgba(34, 197, 94, 0.55);
  box-shadow: 0 0 18px rgba(34, 197, 94, 0.18);

  ${({ $side }) =>
    $side === "left"
      ? css`
          left: calc(50% - var(--arm));
          width: var(--arm);

          &::before {
            content: "";
            position: absolute;
            left: -2px;
            top: 50%;
            transform: translateY(-50%);
            width: 7px;
            height: 7px;
            border-radius: 999px;
            background: rgba(34, 197, 94, 0.95);
            box-shadow: 0 0 16px rgba(34, 197, 94, 0.55);
          }
        `
      : css`
          left: 50%;
          width: var(--arm);

          &::after {
            content: "";
            position: absolute;
            right: -2px;
            top: 50%;
            transform: translateY(-50%);
            width: 7px;
            height: 7px;
            border-radius: 999px;
            background: rgba(34, 197, 94, 0.95);
            box-shadow: 0 0 16px rgba(34, 197, 94, 0.55);
          }
        `}

  @media (max-width: ${bp.md}px) {
    display: none;
  }
`;

export const Content = styled.div<{ $side: "left" | "right" }>`
  position: absolute;
  top: 0;

  width: min(420px, calc(50% - 22px));
  ${({ $side }) =>
    $side === "left"
      ? css`
          left: calc(50% - var(--arm));
          text-align: left;
        `
      : css`
          right: calc(50% - var(--arm));
          text-align: right;
        `}

  .accent {
    color: ${ACCENT};
    font-weight: 700;
  }

  @media (max-width: ${bp.md}px) {
    position: relative;
    width: 100%;
    left: auto;
    right: auto;
    text-align: left;
  }
`;

export const Year = styled.div`
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #fff;
  font-size: clamp(34px, 3.6vw, 48px);
  line-height: 1;
`;

export const Lines = styled.div`
  margin-top: 14px;
  display: grid;
  gap: 10px;

  @media (max-width: ${bp.md}px) {
    margin-top: 10px;
  }
`;

export const Line = styled.div`
  font-size: 12px;
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.72);

  &.accent {
    color: ${ACCENT};
    font-weight: 700;
  }

  @media (max-width: ${bp.md}px) {
    font-size: 12px;
  }
`;
