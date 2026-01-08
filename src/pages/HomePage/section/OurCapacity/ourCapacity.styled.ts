import styled, { keyframes } from "styled-components";

const bp = { md: 768, lg: 1024 };

const glow = keyframes`
  0%,100% { transform: scale(1); opacity: .40; filter: blur(12px); }
  50%     { transform: scale(1.06); opacity: .66; filter: blur(16px); }
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

  --vh: 100vh;
  @supports (height: 100dvh) {
    --vh: 100dvh;
  }

  --padTop: clamp(24px, 3.6vh, 38px);
  --padBottom: clamp(26px, 4.4vh, 52px);
  --capGap: clamp(14px, 2vh, 22px);

  height: var(--vh);
  padding: var(--padTop) 0 var(--padBottom);
  box-sizing: border-box;

  /* ✅ không cho “đè” */
  overflow: hidden;

  display: flex;
  align-items: stretch;

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
    --padTop: clamp(26px, 4vh, 42px);
    --padBottom: clamp(24px, 4vh, 46px);
    --capGap: clamp(12px, 1.8vh, 18px);
  }
`;

export const Container = styled.div`
  position: relative;
  z-index: 1;

  width: min(1240px, calc(100% - 40px));
  margin: 0 auto;

  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--capGap);

  @media (max-width: ${bp.md}px) {
    width: min(1240px, calc(100% - 28px));
  }
`;

export const Header = styled.div`
  text-align: center;
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

  /* ✅ TSX set --dBound theo viewport thật */
  --d: var(--dBound, 680px);

  width: var(--d);
  height: var(--d);
  margin: 0 auto;

  font-family: var(--font-body);

  --cy: 54.5%;
  --scale: 0.98;

  --centerSize: clamp(78px, calc(var(--d) * 0.32), 176px);

  /* ✅ Node to hơn 1 xíu */
  --nodeSize: clamp(62px, calc(var(--d) * 0.235), 132px);

  --nodePad: clamp(9px, calc(var(--d) * 0.02), 14px);
  --nodeGap: clamp(6px, calc(var(--d) * 0.014), 10px);

  filter: drop-shadow(0 14px 34px rgba(0, 0, 0, 0.42));

  @media (max-width: ${bp.lg}px) {
    --scale: 0.97;
  }

  @media (max-width: 640px) {
    --scale: 0.965;
    --centerSize: clamp(76px, calc(var(--d) * 0.30), 160px);
    --nodeSize: clamp(56px, calc(var(--d) * 0.205), 112px);
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
    0 22px 48px rgba(0, 0, 0, 0.5);

  &::before {
    content: "";
    position: absolute;
    inset: clamp(-18px, calc(var(--centerSize) * -0.14), -12px);
    border-radius: inherit;
    background: radial-gradient(
      circle,
      rgba(0, 210, 106, 0.46),
      transparent 62%
    );
    animation: ${glow} 2200ms ease-in-out infinite;
    z-index: -1;
  }
`;

export const CenterTitle = styled.div`
  font-family: var(--font-display);
  font-weight: var(--fw-semibold);
  letter-spacing: 0.04em;

  font-size: clamp(13px, calc(var(--d) * 0.03), 20px);
  margin-bottom: clamp(6px, calc(var(--d) * 0.01), 9px);
`;

export const CenterSub = styled.div`
  font-family: "Plus Jakarta Sans";
  font-weight: var(--fw-regular);
  font-size: var(--text-xs);
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

  border: 1.5px solid var(--accent, #00d26a);

  box-shadow: 0 0 0 1px rgba(0, 210, 106, 0.1) inset,
    0 0 18px rgba(0, 210, 106, 0.1);

  &::after {
    content: "";
    position: absolute;
    inset: clamp(7px, calc(var(--nodeSize) * 0.11), 9px);
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
  color: var(--accent, #00d26a);
  display: inline-flex;
  align-items: center;
  justify-content: center;

  svg,
  svg * {
    stroke: currentColor;
  }
  svg [fill]:not([fill="none"]) {
    fill: currentColor;
  }

  svg {
    filter: drop-shadow(0 0 8px rgba(0, 210, 106, 0.18));
  }
`;

export const NodeText = styled.div`
  color: rgba(255, 255, 255, 0.92);
  font-weight: var(--fw-regular);

  font-size: clamp(10px, calc(var(--d) * 0.015), 12.5px);
  text-align: center;
  white-space: pre-line;
  line-height: var(--leading-tight, 1.25);

  max-width: 92%;
  word-break: break-word;
`;
