import styled, { keyframes } from "styled-components";

const bp = { md: 768, lg: 1024 };

const glow = keyframes`
  0%,100% { transform: scale(1); opacity: .55; filter: blur(14px); }
  50%     { transform: scale(1.06); opacity: .85; filter: blur(18px); }
`;

const orbitSpin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

const counterSpin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(-360deg); }
`;

const popIn = keyframes`
  from { opacity: 0; transform: scale(.92); filter: blur(1px); }
  to   { opacity: 1; transform: scale(1);  filter: blur(0); }
`;

export const Section = styled.section<{ $bg: string }>`
  position: relative;
  width: 100%;
  margin: 0;
  padding: 72px 0 80px;

  /* ✅ chặn scroll ngang */
  overflow-x: clip;
  @supports not (overflow-x: clip) {
    overflow-x: hidden;
  }

  background-image: url(${(p) => p.$bg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(900px 520px at 50% 55%, rgba(0, 210, 106, 0.10), transparent 60%),
      radial-gradient(340px 260px at 15% 6%, rgba(0, 210, 106, 0.12), transparent 70%),
      radial-gradient(260px 220px at 92% 78%, rgba(0, 210, 106, 0.10), transparent 72%),
      linear-gradient(180deg, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.68));
    pointer-events: none;
  }

  @media (max-width: ${bp.md}px) {
    padding: 52px 0 56px;
  }
`;

export const Container = styled.div`
  position: relative;
  z-index: 1;

  width: min(1240px, calc(100% - 40px));
  margin: 0 auto;

  /* ✅ quan trọng: KHÔNG clip ở container để Bleed thoát ra */
  /* overflow-x: hidden; */

  @media (max-width: ${bp.md}px) {
    width: min(1240px, calc(100% - 28px));
  }
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 34px;

  @media (max-width: ${bp.md}px) {
    margin-bottom: 22px;
  }
`;

export const Kicker = styled.div`
  color: rgba(255, 255, 255, 0.9);
  // font-weight: 700;
  font-size: 36px;
  line-height: 1.2;

  @media (max-width: ${bp.md}px) {
    font-size: 32px;
  }
`;

export const Headline = styled.h2`
  margin: 10px 0 0;
  font-size: clamp(28px, 4.2vw, 44px);
  line-height: 1.05;
  // font-weight: 900;
  color: var(--accent, #00d26a);
  // letter-spacing: -0.02em;
`;

/* ✅ wrapper full-bleed cho Diagram trên mobile */
export const Bleed = styled.div`
  width: 100%;
  margin: 0 auto;

  @media (max-width: ${bp.md}px) {
    width: 100vw;
    position: relative;
    left: 50%;
    transform: translateX(-50%);

    /* ✅ safe padding 12px mỗi bên, không dùng calc */
    padding-left: max(12px, env(safe-area-inset-left));
    padding-right: max(12px, env(safe-area-inset-right));
    box-sizing: border-box;
  }
`;

/**
 * ✅ Diagram:
 * - desktop: theo container
 * - mobile: full width trong Bleed (100%) nhưng nodeSize giới hạn để không cắt
 */
export const Diagram = styled.div`
  position: relative;

  width: clamp(320px, 62vw, 880px);
  margin: 0 auto;
  aspect-ratio: 1 / 1;
  overflow: visible;

  --cy: 52.7%;
  --scale: 0.94;

  /* fallback */
  --centerSize: clamp(180px, 26vw, 280px);
  --nodeSize: clamp(150px, 20vw, 220px);
  --nodePad: 18px;
  --nodeGap: 14px;

  @supports (width: 1cqw) {
    --centerSize: clamp(180px, 30cqw, 280px);
    --nodeSize: clamp(150px, 22cqw, 220px);
    --nodePad: clamp(14px, 2cqw, 18px);
    --nodeGap: clamp(10px, 1.6cqw, 14px);
  }

  filter: drop-shadow(0 22px 60px rgba(0, 0, 0, 0.55));

  @media (max-width: ${bp.lg}px) {
    --scale: 0.92;
  }

  @media (max-width: ${bp.md}px) {
    width: 100%;
    --scale: 1; /* ✅ orbit full width */

    @supports (width: 1cqw) {
      /* ✅ giới hạn max node để không bị cắt 2 bên */
      --centerSize: clamp(128px, 32cqw, 178px);
      --nodeSize: clamp(96px, 26cqw, 118px);

      --nodePad: clamp(10px, 2.6cqw, 13px);
      --nodeGap: clamp(6px, 1.9cqw, 9px);
    }
  }

  @media (max-width: 390px) {
    --scale: 0.98;
    @supports (width: 1cqw) {
      --centerSize: clamp(124px, 34cqw, 170px);
      --nodeSize: clamp(92px, 28cqw, 112px);
    }
  }
`;

export const Stage = styled.div`
  position: absolute;
  inset: 0;

  transform: scale(var(--scale));
  transform-origin: 50% var(--cy);
`;

export const Orbit = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;

  transform-origin: 50% var(--cy);
  animation: ${orbitSpin} var(--dur, 22s) linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const Lines = styled.svg`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;

  polyline {
    fill: none;
    stroke: var(--accent, #00d26a);
    stroke-width: 0.28;        /* ✅ dày hơn 0.22 */
    opacity: 0.95;
    stroke-linecap: round;
    stroke-linejoin: round;
    shape-rendering: geometricPrecision;
  }

  @media (max-width: 768px) {
    polyline {
      stroke-width: 0.32;      /* ✅ mobile dày thêm chút */
    }
  }
`;

export const Center = styled.div`
  position: absolute;
  left: 50%;
  top: var(--cy);
  transform: translate(-50%, -50%);
  z-index: 5;

  width: var(--centerSize);
  height: var(--centerSize);
  border-radius: 999px;

  background: var(--accent, #00d26a);
  color: #04110a;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  box-shadow:
    0 0 0 1px rgba(0, 210, 106, 0.6) inset,
    0 30px 70px rgba(0, 0, 0, 0.55);

  &::before {
    content: "";
    position: absolute;
    inset: -26px;
    border-radius: inherit;
    background: radial-gradient(circle, rgba(0, 210, 106, 0.55), transparent 62%);
    animation: ${glow} 2200ms ease-in-out infinite;
    z-index: -1;
  }
`;

export const CenterTitle = styled.div`
  font-size: clamp(18px, 2.2vw, 26px);
  // font-weight: 900;
  // letter-spacing: 0.02em;
  margin-bottom: 10px;

  @media (max-width: ${bp.md}px) {
    font-size: 18px;
    margin-bottom: 8px;
  }
`;

export const CenterSub = styled.div`
  font-size: clamp(12px, 1.35vw, 16px);
  line-height: 1.35;
  text-align: center;
  // font-weight: 600;
  opacity: 0.95;

  @media (max-width: ${bp.md}px) {
    font-size: 12px; /* ✅ mobile nhỏ chữ */
    line-height: 1.25;
  }
`;

export const Node = styled.div`
  position: absolute;
  left: var(--x);
  top: var(--y);
  transform: translate(-50%, -50%);
  z-index: 2;

  width: var(--nodeSize);
  height: var(--nodeSize);
  border-radius: 999px;

  /* ✅ opaque để không thấy line xuyên qua */
  background: radial-gradient(
    circle at 50% 35%,
    rgba(18, 18, 18, 1),
    rgba(0, 0, 0, 1) 62%,
    rgba(0, 0, 0, 1)
  );

  border: 1.6px solid var(--accent, #00d26a);

  box-shadow:
    0 0 0 1px rgba(0, 210, 106, 0.12) inset,
    0 0 26px rgba(0, 210, 106, 0.12);

  &::after {
    content: "";
    position: absolute;
    inset: 8px;
    border-radius: inherit;
    border: 1px solid rgba(0, 210, 106, 0.10);
    pointer-events: none;
  }
`;

export const NodeInner = styled.div`
  width: 100%;
  height: 100%;
  padding: var(--nodePad);

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NodeShell = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  opacity: 0;
  animation: ${popIn} 650ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  animation-delay: calc(var(--i) * 90ms + 120ms);
`;

export const NodeContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--nodeGap);

  transform-origin: center;
  animation: ${counterSpin} var(--dur, 22s) linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const NodeIconWrap = styled.div`
  color: var(--accent, #00d26a);
  display: inline-flex;
  align-items: center;
  justify-content: center;

  svg {
    filter: drop-shadow(0 0 10px rgba(0, 210, 106, 0.22));
  }

  @media (max-width: ${bp.md}px) {
    svg {
      width: 22px;
      height: 22px;
    }
  }
`;

export const NodeText = styled.div`
  color: rgba(255, 255, 255, 0.92);
  font-size: clamp(13px, 1.25vw, 16px);
  // font-weight: 500;
  text-align: center;
  white-space: pre-line;
  line-height: 1.25;

  max-width: 90%;
  word-break: break-word;

  @media (max-width: ${bp.md}px) {
    font-size: 11.5px; /* ✅ nhỏ chữ mobile */
    line-height: 1.15;
    max-width: 92%;
  }
`;
