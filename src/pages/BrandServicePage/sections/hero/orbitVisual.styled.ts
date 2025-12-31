import styled, { keyframes } from "styled-components";

const bp = { md: 768, lg: 1024 };

const spin = keyframes`
  to { transform: translate(-50%, -50%) rotate(360deg); }
`;

const glowPulse = keyframes`
  0%   { transform: translate(-50%, -50%) scale(1) rotate(-12deg); opacity: .9; }
  50%  { transform: translate(-50%, -50%) scale(1.10) rotate(10deg); opacity: 1; }
  100% { transform: translate(-50%, -50%) scale(1) rotate(-12deg); opacity: .9; }
`;

const bobY = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0); }
  50%      { transform: translate3d(0, -18px, 0); }
`;

const drift = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0); }
  50%      { transform: translate3d(-10px, 10px, 0); }
`;

const rotateTiny = keyframes`
  to { transform: rotate(360deg); }
`;

/* ✅ FIX: arc rotate “local”, không dùng translate(-50%, -50%) (tránh gạch đỏ) */
const arcWhiteRotate = keyframes`
  from { transform: rotate(300deg); }
  to   { transform: rotate(-60deg); }
`;

const arcGreenRotate = keyframes`
  from { transform: rotate(-240deg); }
  to   { transform: rotate(120deg); }
`;

/* ✅ square dưới-trái quay cực chậm, giữ cảm giác tĩnh như UI (tránh lệch/2 square chồng) */
const squareRotate = keyframes`
  from { transform: rotate(-14deg); }
  to   { transform: rotate(346deg); }
`;

export const Stage = styled.div`
  display: none;

  @media (min-width: ${bp.lg}px) {
    display: block;
  }

  position: relative;
  width: 100%;
  height: 600px;
  overflow: hidden;

  --px: 0px;
  --py: 0px;
`;

export const Center = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;

  width: min(560px, 72vw);
  aspect-ratio: 1 / 1;

  transform: translate(calc(-50% + var(--px)), calc(-50% + var(--py)));
  will-change: transform;
`;

export const BackdropDisk = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 999px;

  background:
    radial-gradient(closest-side, rgba(31, 215, 96, 0.10), rgba(0, 0, 0, 0) 70%),
    radial-gradient(closest-side, rgba(31, 215, 96, 0.06), rgba(0, 0, 0, 0) 78%);
  filter: blur(0.2px);
`;

export const OuterRing = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 500px;
  height: 500px;
  border-radius: 999px;
  border: 2px solid rgba(31, 215, 96, 0.20);

  transform: translate(-50%, -50%);
  animation: ${spin} 26s linear infinite;
  will-change: transform;
`;

export const Glow = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  height: 350px;
  border-radius: 999px;
  background: rgba(31, 215, 96, 0.10);
  filter: blur(24px);

  transform: translate(-50%, -50%);
  animation: ${glowPulse} 6.5s ease-in-out infinite;
  will-change: transform, opacity;
`;

export const BigDot = styled.div`
  position: absolute;
  top: 86px;
  right: 86px;
  width: 128px;
  height: 128px;
  border-radius: 999px;
  background: #1fd760;

  animation: ${bobY} 3.2s ease-in-out infinite;
  will-change: transform;
`;

export const SmallDot = styled.div`
  position: absolute;
  top: 128px;
  right: 48px;
  width: 48px;
  height: 48px;
  border-radius: 999px;
  background: rgba(31, 215, 96, 0.55);

  animation: ${drift} 4.2s ease-in-out infinite;
  will-change: transform;
`;

/* ✅ FIX gạch đỏ: arc trắng quay đúng tâm của chính nó */
export const ArcWhite = styled.div`
  position: absolute;
  left: 42px;
  bottom: 96px;
  width: 192px;
  height: 192px;
  border-radius: 999px;
  border: 4px solid rgba(255, 255, 255, 0.20);

  clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%);

  transform: rotate(300deg);
  transform-origin: 50% 50%;
  animation: ${arcWhiteRotate} 22s linear infinite;
  will-change: transform;
`;

/* ✅ FIX: arc xanh cũng quay đúng tâm (không bị lệch theo translate) */
export const ArcGreen = styled.div`
  position: absolute;
  left: 120px;
  top: 92px;
  width: 160px;
  height: 160px;
  border-radius: 999px;
  border: 6px solid #1fd760;

  clip-path: polygon(50% 0, 100% 0, 100% 100%, 50% 100%);

  transform: rotate(-240deg);
  transform-origin: 50% 50%;
  animation: ${arcGreenRotate} 18s linear infinite;
  will-change: transform;
`;

export const WhiteMini = styled.div`
  position: absolute;
  right: 118px;
  bottom: 124px;
  width: 64px;
  height: 64px;
  border-radius: 999px;

  /* ✅ vệt chéo như ảnh gốc */
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.86) 0%,
    rgba(255, 255, 255, 0.86) 46%,
    rgba(0, 0, 0, 0.10) 49%,
    rgba(255, 255, 255, 0.86) 52%,
    rgba(255, 255, 255, 0.86) 100%
  );

  animation: ${drift} 3.6s ease-in-out infinite;
  will-change: transform;
`;

/* ✅ gạch xanh: chỉ còn 1 square dưới-trái (quay rất chậm) */
export const SquareOutline = styled.div`
  position: absolute;
  left: 132px;
  bottom: 42px;
  width: 80px;
  height: 80px;
  border: 2px solid rgba(255, 255, 255, 0.30);

  transform: rotate(-14deg);
  transform-origin: 50% 50%;
  animation: ${squareRotate} 90s linear infinite;
  will-change: transform;
`;

/* square bo góc xanh (top-left) */
export const RoundedSquare = styled.div`
  position: absolute;
  left: 190px;
  top: 44px;
  width: 96px;
  height: 96px;
  border: 4px solid rgba(31, 215, 96, 0.40);
  border-radius: 16px;

  transform: rotate(76deg);
  animation: ${rotateTiny} 16s linear infinite reverse;
  will-change: transform;
`;
