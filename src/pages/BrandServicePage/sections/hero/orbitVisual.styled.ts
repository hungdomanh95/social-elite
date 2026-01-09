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

const arcWhiteRotate = keyframes`
  from { transform: rotate(300deg); }
  to   { transform: rotate(-60deg); }
`;

const arcGreenRotate = keyframes`
  from { transform: rotate(-240deg); }
  to   { transform: rotate(120deg); }
`;

const squareRotate = keyframes`
  from { transform: rotate(-14deg); }
  to   { transform: rotate(346deg); }
`;

export const Stage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  /* ✅ nếu parent không set height thì vẫn có size tối thiểu */
  min-height: 280px;

  overflow: visible;

  --px: 0px;
  --py: 0px;

  --safe: clamp(10px, 2vw, 22px);
  padding-inline: var(--safe);
  box-sizing: border-box;

  @media (min-width: ${bp.lg}px) {
    min-height: 520px;
  }
`;

export const Center = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;

  width: min(560px, calc(100% - (var(--safe) * 2)));
  aspect-ratio: 1 / 1;

  transform: translate(calc(-50% + var(--px)), calc(-50% + var(--py)));
  will-change: transform;
`;

export const Scene = styled.div<{ $scale: number }>`
  position: absolute;
  inset: 0;

  transform-origin: 50% 50%;
  transform: ${({ $scale }) => `scale(${$scale})`};
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
  width: 90%;
  height: 90%;
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
  width: 62%;
  height: 62%;
  border-radius: 999px;
  background: rgba(31, 215, 96, 0.10);
  filter: blur(24px);

  transform: translate(-50%, -50%);
  animation: ${glowPulse} 6.5s ease-in-out infinite;
  will-change: transform, opacity;
`;

export const BigDot = styled.div`
  position: absolute;
  top: 15%;
  right: 15%;
  width: clamp(96px, 22%, 128px);
  height: clamp(96px, 22%, 128px);
  border-radius: 999px;
  background: #1fd760;

  animation: ${bobY} 3.2s ease-in-out infinite;
  will-change: transform;
`;

export const SmallDot = styled.div`
  position: absolute;
  top: 22%;
  right: 9%;
  width: clamp(34px, 9%, 48px);
  height: clamp(34px, 9%, 48px);
  border-radius: 999px;
  background: rgba(31, 215, 96, 0.55);

  animation: ${drift} 4.2s ease-in-out infinite;
  will-change: transform;
`;

export const ArcWhite = styled.div`
  position: absolute;
  left: 7%;
  bottom: 17%;
  width: clamp(150px, 34%, 192px);
  height: clamp(150px, 34%, 192px);
  border-radius: 999px;
  border: 4px solid rgba(255, 255, 255, 0.20);

  clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%);

  transform: rotate(300deg);
  transform-origin: 50% 50%;
  animation: ${arcWhiteRotate} 22s linear infinite;
  will-change: transform;
`;

export const ArcGreen = styled.div`
  position: absolute;
  left: 21%;
  top: 16%;
  width: clamp(128px, 28%, 160px);
  height: clamp(128px, 28%, 160px);
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
  right: 21%;
  bottom: 22%;
  width: clamp(50px, 14%, 64px);
  height: clamp(50px, 14%, 64px);
  border-radius: 999px;

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

export const SquareOutline = styled.div`
  position: absolute;
  left: 23%;
  bottom: 8%;
  width: clamp(64px, 16%, 80px);
  height: clamp(64px, 16%, 80px);
  border: 2px solid rgba(255, 255, 255, 0.30);

  transform: rotate(-14deg);
  transform-origin: 50% 50%;
  animation: ${squareRotate} 90s linear infinite;
  will-change: transform;
`;

export const RoundedSquare = styled.div`
  position: absolute;
  left: 34%;
  top: 8%;
  width: clamp(78px, 20%, 96px);
  height: clamp(78px, 20%, 96px);
  border: 4px solid rgba(31, 215, 96, 0.40);
  border-radius: 16px;

  transform: rotate(76deg);
  animation: ${rotateTiny} 16s linear infinite reverse;
  will-change: transform;
`;
