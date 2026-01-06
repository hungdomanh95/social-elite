import styled, { css } from "styled-components";
export { Container } from "@/shared/components/Container";

const bp = { md: 768 };
const ACCENT = "var(--accent, #22c55e)";
const FONT = '"Plus Jakarta Sans", ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial';

export const MilestonesSection = styled.section`
  width: 100%;
  font-family: ${FONT};
  background:
    radial-gradient(900px 420px at 20% 20%, rgba(34, 197, 94, 0.08), transparent 62%),
    radial-gradient(900px 420px at 80% 70%, rgba(34, 197, 94, 0.06), transparent 62%),
    #000;
  padding: 86px 0 96px;

  @media (max-width: ${bp.md}px) {
    padding: 56px 0 64px;
  }
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
    box-shadow: 0 0 14px rgba(34, 197, 94, 0.22);
    margin-top: 6px;
  }

  .stack {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .top,
  .bottom {
    letter-spacing: -0.01em;
    line-height: 1.05;
    font-size: 64px;
  }

  .top {
    color: ${ACCENT};
  }

  .bottom {
    color: #fff;
  }

  @media (max-width: ${bp.md}px) {
    .top,
    .bottom {
      font-size: 40px;
    }
  }
`;

/* =========================
   TIMELINE: dot chạy dọc spine + item glow theo --d (sync từ JS)
========================= */
export const Timeline = styled.div`
  position: relative;
  isolation: isolate;
  margin-top: 34px;

  /* ===== LOCK tỉ lệ gần design ===== */
  --cycle: 6s;
  --arm: clamp(240px, 28vw, 420px);
  --rowH: 160px;
  --gapY: 92px;
  --nodeY: 74px;
  --lineH: 2px;

  /* spine: mảnh */
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
    background: rgba(34, 197, 94, 0.38);
    box-shadow:
      0 0 14px rgba(34, 197, 94, 0.16),
      0 0 54px rgba(34, 197, 94, 0.10);
  }

  /* dot chạy dọc spine: to vừa design + glow mịn */
  &::after {
    content: "";
    position: absolute;
    z-index: 2;
    left: 50%;
    transform: translateX(-50%);
    top: var(--nodeY);
    width: 18px;
    height: 18px;
    border-radius: 999px;
    background: radial-gradient(circle at 50% 50%,
      rgba(34,197,94,1) 0 46%,
      rgba(34,197,94,0.55) 60%,
      rgba(34,197,94,0) 74%
    );
    box-shadow:
      0 0 0 10px rgba(34,197,94,0.08),
      0 0 20px rgba(34,197,94,0.55),
      0 0 70px rgba(34,197,94,0.18);
    animation: spine-dot var(--cycle) linear infinite;
    pointer-events: none;
  }

  /* tới đáy ở 96% để item cuối “kịp” glow trước khi reset */
  @keyframes spine-dot {
    0%   { top: var(--nodeY); opacity: 1; }
    96%  { top: calc(100% - var(--nodeY)); opacity: 1; }
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

  /* JS sẽ set đúng --d theo vị trí thật */
  --d: 0s;

  @media (max-width: ${bp.md}px) {
    height: auto;
    padding: 14px 0;
    border-left: 2px solid rgba(34, 197, 94, 0.45);
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
  z-index: 3;

  box-shadow:
    0 0 0 8px rgba(34, 197, 94, 0.08),
    0 0 18px rgba(34, 197, 94, 0.45);

  animation: node-hit var(--cycle) ease-out infinite;
  animation-delay: var(--d);

  @keyframes node-hit {
    0%   { transform: translate(-50%, -50%) scale(1); opacity: 0.9; }
    8%   { transform: translate(-50%, -50%) scale(1.35); opacity: 1; }
    18%  { transform: translate(-50%, -50%) scale(1.08); opacity: 0.95; }
    100% { transform: translate(-50%, -50%) scale(1); opacity: 0.9; }
  }

  @media (prefers-reduced-motion: reduce) { animation: none; }
  @media (max-width: ${bp.md}px) { display: none; }
`;

export const Arm = styled.div<{ $side: "left" | "right" }>`
  position: absolute;
  top: var(--nodeY);
  transform: translateY(-50%);
  height: var(--lineH);
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

  /* base line: mảnh, sạch */
  background: rgba(34, 197, 94, 0.40);

  /* glow fill overlay: bật sáng rõ lúc dot tới (theo --d) */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;

    background-image:
      linear-gradient(
        90deg,
        rgba(34,197,94,0) 0%,
        rgba(34,197,94,0.95) 42%,
        rgba(34,197,94,1) 50%,
        rgba(34,197,94,0.95) 58%,
        rgba(34,197,94,0) 100%
      ),
      linear-gradient(
        90deg,
        rgba(255,255,255,0) 0%,
        rgba(255,255,255,0.28) 46%,
        rgba(255,255,255,0.62) 50%,
        rgba(255,255,255,0.28) 54%,
        rgba(255,255,255,0) 100%
      );
    background-repeat: no-repeat;
    background-size: 100% 100%, 100% 100%;

    opacity: 0;
    transform-origin: ${({ $side }) => ($side === "left" ? "100% 50%" : "0% 50%")};
    transform: scaleX(0);

    /* glow mịn (không thô) */
    filter:
      drop-shadow(0 0 8px rgba(34,197,94,0.45))
      drop-shadow(0 0 22px rgba(34,197,94,0.16));

    animation: arm-fill var(--cycle) ease-out infinite;
    animation-delay: var(--d);
    pointer-events: none;
  }

  @keyframes arm-fill {
    0%   { opacity: 0; transform: scaleX(0); }
    6%   { opacity: 1; transform: scaleX(1); }
    18%  { opacity: 1; transform: scaleX(1); }
    34%  { opacity: 0.85; transform: scaleX(1); }
    52%  { opacity: 0; transform: scaleX(1); }
    100% { opacity: 0; transform: scaleX(0); }
  }

  /* end dot: nhỏ, đúng design */
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
              0 0 12px rgba(34, 197, 94, 0.38),
              0 0 34px rgba(34, 197, 94, 0.12);
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
              0 0 12px rgba(34, 197, 94, 0.38),
              0 0 34px rgba(34, 197, 94, 0.12);
          }
        `}

  @media (prefers-reduced-motion: reduce) {
    &::after { animation: none; opacity: 0; transform: scaleX(0); }
  }

  @media (max-width: ${bp.md}px) {
    display: none;
  }
`;

export const Content = styled.div<{ $side: "left" | "right" }>`
  position: absolute;
  top: 0;
  z-index: 4;

  width: min(440px, calc(50% - 56px));

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
  }

  /* glow nhẹ đúng lúc dot tới */
  animation: content-hit var(--cycle) ease-out infinite;
  animation-delay: var(--d);

  @keyframes content-hit {
    0%  { filter: none; }
    10% {
      filter:
        drop-shadow(0 0 10px rgba(34,197,94,0.14))
        drop-shadow(0 0 24px rgba(34,197,94,0.08));
    }
    28% { filter: none; }
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
  color: #fff;
  font-size: 64px;
  line-height: 1;
  letter-spacing: -0.01em;

  @media (max-width: ${bp.md}px) {
    font-size: 40px;
  }
`;

export const Lines = styled.div`
  /* FIX: đẩy xuống để KHÔNG sát/đè lên arm line */
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: ${bp.md}px) {
    margin-top: 10px;
  }
`;

export const Line = styled.div`
  font-size: 18px;
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.72);

  &.accent {
    color: ${ACCENT};
  }

  @media (max-width: ${bp.md}px) {
    font-size: 14px;
  }
`;
