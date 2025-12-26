// ourCapacity.styled.ts
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

const nodeIn = keyframes`
  from { opacity: 0; transform: translate(-50%, -50%) scale(.92); filter: blur(1px); }
  to   { opacity: 1; transform: translate(-50%, -50%) scale(1);   filter: blur(0); }
`;

export const Section = styled.section`
  width: 100%;
  margin: 0;
  padding: 0;

  /* nền tối + xanh nhẹ như hình */
  background:
    radial-gradient(900px 520px at 50% 55%, rgba(0, 210, 106, 0.10), transparent 60%),
    radial-gradient(340px 260px at 15% 6%, rgba(0, 210, 106, 0.14), transparent 70%),
    radial-gradient(260px 220px at 92% 78%, rgba(0, 210, 106, 0.10), transparent 72%),
    linear-gradient(180deg, #050807, #040605);
`;

export const Container = styled.div`
  width: min(1180px, calc(100% - 40px));
  margin: 0 auto;
  padding: 56px 0 64px;

  @media (max-width: ${bp.md}px) {
    width: min(1180px, calc(100% - 28px));
    padding: 36px 0 44px;
  }
`;

export const Diagram = styled.div`
  position: relative;
  width: min(980px, 100%);
  margin: 0 auto;

  /* giữ layout vuông như hình */
  aspect-ratio: 1 / 1;

  /* mượt */
  filter: drop-shadow(0 22px 60px rgba(0, 0, 0, 0.55));
`;

/**
 * Orbit layer:
 * - chứa Lines + Nodes
 * - xoay quanh tâm (50% 56%) để đúng layout hình
 * - bạn set duration từ component: style={{"--dur":"22s"}}
 */
export const Orbit = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;

  transform-origin: 50% 56%;
  animation: ${orbitSpin} var(--dur, 22s) linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

/* Lines nằm trong Orbit */
export const Lines = styled.svg`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;

  polyline {
    fill: none;
    stroke: var(--accent, #00d26a);
    stroke-width: 0.22;
    opacity: 0.95;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`;

/* Center đứng yên (không nằm trong Orbit) */
export const Center = styled.div`
  position: absolute;
  left: 50%;
  top: 56%;
  transform: translate(-50%, -50%);
  z-index: 5;

  --size: clamp(180px, 26vw, 280px);
  width: var(--size);
  height: var(--size);
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
  font-weight: 900;
  letter-spacing: 0.02em;
  margin-bottom: 10px;
`;

export const CenterSub = styled.div`
  font-size: clamp(12px, 1.35vw, 16px);
  line-height: 1.35;
  text-align: center;
  font-weight: 600;
  opacity: 0.95;
`;

/* Nodes nằm trong Orbit (nên sẽ xoay), nhưng content bên trong counter-rotate */
export const Node = styled.div`
  position: absolute;
  left: var(--x);
  top: var(--y);
  transform: translate(-50%, -50%);
  z-index: 2;

  --size: clamp(150px, 20vw, 220px);
  width: var(--size);
  height: var(--size);
  border-radius: 999px;

  background: rgba(0, 0, 0, 0.55);
  border: 1.6px solid var(--accent, #00d26a);

  box-shadow:
    0 0 0 1px rgba(0, 210, 106, 0.15) inset,
    0 0 26px rgba(0, 210, 106, 0.12);

  opacity: 0;
  animation: ${nodeIn} 650ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  animation-delay: calc(var(--i) * 90ms + 120ms);

  @media (max-width: ${bp.md}px) {
    --size: clamp(130px, 34vw, 180px);
  }
`;

export const NodeInner = styled.div`
  width: 100%;
  height: 100%;
  padding: 18px 14px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

/* Counter-rotate để icon/text đứng thẳng */
export const NodeContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;

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
`;

export const NodeText = styled.div`
  color: rgba(255, 255, 255, 0.92);
  font-size: clamp(13px, 1.25vw, 16px);
  font-weight: 500;
  text-align: center;
  white-space: pre-line;
  line-height: 1.25;
`;
