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

  /* chặn scroll ngang */
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
    background: radial-gradient(
        900px 520px at 50% 55%,
        rgba(0, 210, 106, 0.1),
        transparent 60%
      ),
      radial-gradient(
        340px 260px at 15% 6%,
        rgba(0, 210, 106, 0.12),
        transparent 70%
      ),
      radial-gradient(
        260px 220px at 92% 78%,
        rgba(0, 210, 106, 0.1),
        transparent 72%
      ),
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
  font-size: var(--text-2xl);
  font-weight: var(--fw-semibold);

  @media (max-width: ${bp.md}px) {
    font-size: var(--text-xl);
  }
`;

export const Headline = styled.h2`
  margin: 10px 0 0;
  font-size: var(--text-4xl);
  font-weight: var(--fw-regular);
  color: var(--accent, #00d26a);
`;

/* ✅ FIX cắt góc iOS: dưới 640px bỏ full-bleed 100vw */
export const Bleed = styled.div`
  width: 100%;
  margin: 0 auto;
  overflow: visible;

  @media (max-width: ${bp.md}px) {
    width: 100vw;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    padding-left: max(12px, env(safe-area-inset-left));
    padding-right: max(12px, env(safe-area-inset-right));
    box-sizing: border-box;
  }

  @media (max-width: 640px) {
    width: 100%;
    position: static;
    left: auto;
    transform: none;
    padding-left: 0;
    padding-right: 0;
  }
`;

export const Diagram = styled.div`
  position: relative;

  /* viewport height (dvh ưu tiên) */
  --vh: 100vh;
  @supports (height: 100dvh) {
    --vh: 100dvh;
  }

  /* bound theo height để Orbit luôn trọn vẹn */
  --orbitReserve: clamp(220px, 30vh, 360px);
  --orbitSafePad: clamp(14px, 3.5vh, 40px);
  --orbitHBound: max(
    240px,
    calc(var(--vh) - var(--orbitReserve) - var(--orbitSafePad))
  );

  /* desktop/tablet: theo width */
  --d0: clamp(320px, 62vw, 880px);
  --d: min(var(--d0), var(--orbitHBound));

  width: var(--d);
  margin: 0 auto;
  aspect-ratio: 1 / 1;
  overflow: visible;

  font-family: var(--font-body);

  --cy: 52.7%;
  --scale: 1;

  /* ✅ size theo --d để giữ đúng UI khi height/width thay đổi */
  --centerSize: clamp(112px, calc(var(--d) * 0.42), 220px);
  --nodeSize: clamp(78px, calc(var(--d) * 0.29), 160px);
  --nodePad: clamp(10px, calc(var(--d) * 0.022), 16px);
  --nodeGap: clamp(7px, calc(var(--d) * 0.015), 12px);

  filter: drop-shadow(0 22px 60px rgba(0, 0, 0, 0.55));

  @media (max-width: ${bp.lg}px) {
    --scale: 0.92;
  }

  @media (max-width: ${bp.md}px) {
    --d0: 100%;
    --d: min(var(--d0), var(--orbitHBound));
    width: var(--d);
    --scale: 1;
  }

  /* ✅ dưới sm: 640px -> GIỮ CỐ ĐỊNH, không co theo vw nữa */
  @media (max-width: 640px) {
    --dFixed: 360px;
    --d: min(var(--dFixed), calc(100vw - 32px), var(--orbitHBound));
    width: var(--d);
    --scale: 1;
  }

  @media (max-height: 640px) {
    --scale: 0.92;
    --orbitReserve: clamp(200px, 28vh, 320px);
  }

  @media (max-height: 560px) {
    --scale: 0.9;
    --orbitReserve: clamp(180px, 26vh, 300px);
  }
`;

export const Stage = styled.div`
  position: absolute;
  inset: 0;

  transform: scale(var(--scale));
  transform-origin: 50% var(--cy);

  will-change: transform;
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
    stroke-width: 0.28;
    opacity: 0.95;
    stroke-linecap: round;
    stroke-linejoin: round;
    shape-rendering: geometricPrecision;
  }

  @media (max-width: 768px) {
    polyline {
      stroke-width: 0.32;
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

  box-shadow: 0 0 0 1px rgba(0, 210, 106, 0.6) inset,
    0 30px 70px rgba(0, 0, 0, 0.55);

  &::before {
    content: "";
    position: absolute;
    inset: -26px;
    border-radius: inherit;
    background: radial-gradient(
      circle,
      rgba(0, 210, 106, 0.55),
      transparent 62%
    );
    animation: ${glow} 2200ms ease-in-out infinite;
    z-index: -1;
  }
`;

export const CenterTitle = styled.div`
  /* ✅ chỉ bold ALL-IN-ONE */
  font-weight: var(--fw-bold);
  letter-spacing: 0.04em;

  font-size: clamp(14px, calc(var(--d) * 0.032), 22px);
  margin-bottom: clamp(6px, calc(var(--d) * 0.012), 10px);
`;

export const CenterSub = styled.div`
  font-weight: var(--fw-regular);
  opacity: 0.95;

  font-size: clamp(10px, calc(var(--d) * 0.018), 14px);
  line-height: var(--leading-snug, 1.375);
  text-align: center;
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

  background: radial-gradient(
    circle at 50% 35%,
    rgba(18, 18, 18, 1),
    rgba(0, 0, 0, 1) 62%,
    rgba(0, 0, 0, 1)
  );

  border: 1.6px solid var(--accent, #00d26a);

  box-shadow: 0 0 0 1px rgba(0, 210, 106, 0.12) inset,
    0 0 26px rgba(0, 210, 106, 0.12);

  &::after {
    content: "";
    position: absolute;
    inset: 8px;
    border-radius: inherit;
    border: 1px solid rgba(0, 210, 106, 0.1);
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
  /* ✅ icon = màu chủ đạo */
  color: var(--accent, #00d26a);
  display: inline-flex;
  align-items: center;
  justify-content: center;

  /* ✅ force SVG inherit currentColor */
  svg,
  svg * {
    stroke: currentColor;
  }
  svg [fill]:not([fill="none"]) {
    fill: currentColor;
  }

  svg {
    filter: drop-shadow(0 0 10px rgba(0, 210, 106, 0.22));
  }
`;

export const NodeText = styled.div`
  color: rgba(255, 255, 255, 0.92);
  font-weight: var(--fw-regular);

  font-size: clamp(10px, calc(var(--d) * 0.016), 13px);
  text-align: center;
  white-space: pre-line;
  line-height: var(--leading-tight, 1.25);

  max-width: 90%;
  word-break: break-word;
`;
