import styled, { css } from "styled-components";

const bp = {
  md: 768,
  lg: 1024,
};

const ACCENT = "var(--accent, #22c55e)";

export const Container = styled.div`
  width: min(1240px, calc(100% - 80px));
  margin: 0 auto;

  @media (max-width: ${bp.md}px) {
    width: min(1240px, calc(100% - 28px));
  }
`;

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
  // font-weight: 800;
    color: ${ACCENT};
  // letter-spacing: -0.01em;
    font-size: clamp(26px, 3vw, 40px);
    line-height: 1.05;
  }

  .bottom {
  // font-weight: 800;
    color: #fff;
  // letter-spacing: -0.01em;
    font-size: clamp(26px, 3vw, 40px);
    line-height: 1.05;
  }
`;

/* =========================
   TIMELINE: dot chạy dọc (global)
========================= */
export const Timeline = styled.div`
  position: relative;
  isolation: isolate;
  margin-top: clamp(18px, 2.4vw, 30px);

  --cycle: 6s;
  --arm: clamp(260px, 32vw, 560px);
  --rowH: 156px;
  --gapY: 52px;
  --nodeY: 82px;

  --lineH: 5px; /* ✅ line/spine dày 5px */

  /* spine */
  &::before {
    content: "";
    position: absolute;
    z-index: 1;
    left: 50%;
    transform: translateX(-50%);
    top: var(--nodeY);
    bottom: calc(var(--rowH) - var(--nodeY));
    width: var(--lineH);
    border-radius: 999px;
    background: rgba(34, 197, 94, 0.32);
    box-shadow:
      0 0 18px rgba(34, 197, 94, 0.18),
      0 0 70px rgba(34, 197, 94, 0.10);
  }

  /* dot chạy dọc (canh giữa đúng nodeY) */
  &::after {
    content: "";
    position: absolute;
    z-index: 2;
    left: 50%;
    top: var(--nodeY);
    transform: translate(-50%, -50%); /* ✅ center theo nodeY */
    width: 22px;
    height: 22px;
    border-radius: 999px;
    background: radial-gradient(circle at 50% 50%,
      rgba(34,197,94,1) 0 42%,
      rgba(34,197,94,0.55) 55%,
      rgba(34,197,94,0) 72%
    );
    box-shadow:
      0 0 0 10px rgba(34,197,94,0.10),
      0 0 22px rgba(34,197,94,0.65),
      0 0 70px rgba(34,197,94,0.24);
    animation: spine-dot var(--cycle) linear infinite;
    opacity: 0.98;
    pointer-events: none;
  }

  @keyframes spine-dot {
    0%   { top: var(--nodeY); opacity: 0; }
    10%  { opacity: 0.98; }
    90%  { opacity: 0.98; }
    100% { top: calc(100% - var(--nodeY)); opacity: 0; }
  }

  @media (prefers-reduced-motion: reduce) {
    &::after { animation: none; opacity: 0; }
  }

  @media (max-width: ${bp.md}px) {
    --arm: 0px;
    --rowH: auto;
    --gapY: 18px;
    --nodeY: 0px;

    &::before,
    &::after { display: none; }
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

  /* set từ TS => sync arm/node/content theo dot */
  --d: 0s;

  @media (max-width: ${bp.md}px) {
    height: auto;
    padding: 14px 0;
    border-left: 3px solid rgba(34, 197, 94, 0.45);
    padding-left: 14px;
  }
`;

/* =========================
   NODE: pulse khi dot tới row
========================= */
export const Node = styled.div`
  position: absolute;
  left: 50%;
  top: var(--nodeY);
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background: ${ACCENT};
  z-index: 3;

  box-shadow:
    0 0 0 8px rgba(34, 197, 94, 0.10),
    0 0 20px rgba(34, 197, 94, 0.50);

  animation: node-pulse var(--cycle) ease-in-out infinite;
  animation-delay: var(--d);

  @keyframes node-pulse {
    0%   { transform: translate(-50%, -50%) scale(1); opacity: 0.85; }
    12%  { transform: translate(-50%, -50%) scale(1.28); opacity: 1; }
    28%  { transform: translate(-50%, -50%) scale(1.06); opacity: 0.95; }
    100% { transform: translate(-50%, -50%) scale(1); opacity: 0.85; }
  }

  @media (prefers-reduced-motion: reduce) { animation: none; }
  @media (max-width: ${bp.md}px) { display: none; }
`;

/* =========================
   ARM: glow-fill chỉ chạy khi dot tới row (bằng --d)
========================= */
export const Arm = styled.div<{ $side: "left" | "right" }>`
  position: absolute;

  /* ✅ canh giữa đúng nodeY */
  top: calc(var(--nodeY) - (var(--lineH, 5px) / 2));

  height: var(--lineH, 5px); /* ✅ Arm 5px */
  border-radius: 999px;
  z-index: 2;

  ${({ $side }) =>
    $side === "left"
      ? css`
          left: calc(50% - var(--arm));
          width: var(--arm);
        `
      : css`
          left: 50%;
          width: var(--arm);
        `}

  /* base line */
  background: rgba(34, 197, 94, 0.30);
  box-shadow:
    0 0 6px rgba(34, 197, 94, 0.10),
    0 0 16px rgba(34, 197, 94, 0.08),
    0 0 34px rgba(34, 197, 94, 0.06);

  /* glow fill overlay: sáng hơn rõ, vẫn gọn */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;

    background-image:
      linear-gradient(
        90deg,
        rgba(34,197,94,0) 0%,
        rgba(34,197,94,0.98) 40%,
        rgba(34,197,94,1) 50%,
        rgba(34,197,94,0.98) 60%,
        rgba(34,197,94,0) 100%
      ),
      linear-gradient(
        90deg,
        rgba(255,255,255,0) 0%,
        rgba(255,255,255,0.55) 46%,
        rgba(255,255,255,1) 50%,
        rgba(255,255,255,0.55) 54%,
        rgba(255,255,255,0) 100%
      );

    opacity: 0;
    transform-origin: ${({ $side }) => ($side === "left" ? "100% 50%" : "0% 50%")};
    transform: scaleX(0);

    filter:  blur(0.25px)
      drop-shadow(0 0 8px rgba(34,197,94,0.42))
      drop-shadow(0 0 22px rgba(34,197,94,0.16))
      drop-shadow(0 0 54px rgba(34,197,94,0.10));

    box-shadow:
      0 0 10px rgba(34,197,94,0.32),
      0 0 26px rgba(34,197,94,0.18),
      0 0 70px rgba(34,197,94,0.10);


    animation: arm-fill var(--cycle) ease-in-out infinite;
    animation-delay: var(--d);
    pointer-events: none;
  }

  @keyframes arm-fill {
    0%   { opacity: 0; transform: scaleX(0); }
    10%  { opacity: 1; transform: scaleX(1); }     /* pop sáng */
    26%  { opacity: 1; transform: scaleX(1); }     /* giữ sáng */
    40%  { opacity: 0.90; transform: scaleX(1); }  /* giảm nhẹ */
    58%  { opacity: 0; transform: scaleX(1); }     /* fade out */
    100% { opacity: 0; transform: scaleX(0); }     /* reset */
  }

  /* end dot */
  ${({ $side }) =>
    $side === "left"
      ? css`
          &::before {
            content: "";
            position: absolute;
            left: -3px;
            top: 50%;
            transform: translateY(-50%);
            width: 8px;
            height: 8px;
            border-radius: 999px;
            background: rgba(34, 197, 94, 0.95);
            box-shadow:
              0 0 16px rgba(34, 197, 94, 0.50),
              0 0 46px rgba(34, 197, 94, 0.16);
          }
        `
      : css`
          &::before {
            content: "";
            position: absolute;
            right: -3px;
            top: 50%;
            transform: translateY(-50%);
            width: 8px;
            height: 8px;
            border-radius: 999px;
            background: rgba(34, 197, 94, 0.95);
            box-shadow:
              0 0 16px rgba(34, 197, 94, 0.50),
              0 0 46px rgba(34, 197, 94, 0.16);
          }
        `}

  @media (prefers-reduced-motion: reduce) {
    &::after {
      animation: none;
      opacity: 0;
      transform: scaleX(0);
    }
  }

  @media (max-width: ${bp.md}px) {
    display: none;
  }
`;

/* =========================
   CONTENT: glow nhẹ theo --d
========================= */
export const Content = styled.div<{ $side: "left" | "right" }>`
  position: absolute;
  top: 0;
  z-index: 4;

  width: min(600px, calc(50% - 70px));
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
  // font-weight: 800;
  }

  animation: content-hit var(--cycle) ease-in-out infinite;
  animation-delay: var(--d);

  @keyframes content-hit {
    0%   { filter: none; }
    14%  {
      filter:
        drop-shadow(0 0 10px rgba(34,197,94,0.20))
        drop-shadow(0 0 26px rgba(34,197,94,0.10));
    }
    40%  { filter: none; }
    100% { filter: none; }
  }

  @media (prefers-reduced-motion: reduce) { animation: none; }
  @media (max-width: ${bp.md}px) {
    position: relative;
    width: 100%;
    left: auto;
    right: auto;
    text-align: left;
    filter: none;
  }
`;

export const Year = styled.div`
  // font-weight: 900;
  // letter-spacing: -0.02em;
  color: #fff;
  font-size: clamp(52px, 4.8vw, 78px);
  line-height: 1;
`;

export const Lines = styled.div`
  margin-top: 22px;
  display: grid;
  gap: 12px;

  @media (max-width: ${bp.md}px) {
    margin-top: 12px;
  }
`;

export const Line = styled.div`
  font-size: clamp(13px, 1.05vw, 16px);
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.74);

  &.accent {
    color: ${ACCENT};
  // font-weight: 900;
  }
`;
