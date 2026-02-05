import styled from "styled-components";
import { Container as BaseContainer } from "@/shared/components/Container";

const bp = { md: 768, lg: 1024 };

export const Section = styled.section`
  position: relative;
  overflow: visible;
  padding: var(--space-14) 0 36px;
  background: #050707;
`;

/* Title giữ trong container để canh đẹp, không full-bleed */
export const Container = styled(BaseContainer)`
  display: flex;
  justify-content: center;
  margin-bottom: 0; /* ✅ bỏ margin-bottom hên xui */

  &::after {
    content: "";
    flex: 0 0 0;
  }
`;

export const Title = styled.h2`
  width: 100%;
  margin: 0;
  /* text-align: center; */

  font-size: var(--text-4xl);
  font-weight: var(--fw-semibold);
  color: rgba(255, 255, 255, 0.95);

  .inner {
    display: inline-block;
  }

  .accent {
    color: var(--accent, #22c55e);
  }
`;

/* ✅ TRIỆT ĐỂ: chừa khoảng “safe space” giữa title và talents */
export const FullBleed = styled.div`
  width: 100%;
  overflow: visible;

  /* chỉnh giá trị này nếu bạn tăng scale nữa */
  padding-top: clamp(48px, 7vw, 140px);
`;

/* ✅ sát mép màn hình: full 100vw + kéo ra khỏi container */
export const Stage = styled.div`
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);

  display: flex;
  align-items: flex-end;
  gap: clamp(16px, 3vw, 40px);

  @media (max-width: ${bp.lg}px) {
    flex-direction: column;
    align-items: stretch;
    gap: clamp(16px, 4vw, 28px);
  }
`;

export const Col = styled.div`
  flex: 1 1 0;
  min-width: 0;
  overflow: visible;
  @media (max-width: ${bp.md}px) {
    margin-top: var(--space-14);
  }
`;

/* HoverTag (không dot) */
export const HoverTag = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;

  opacity: 0;

  display: inline-flex;
  align-items: center;

  padding: 10px 14px;
  border-radius: 999px;

  background: var(--accent, #22c55e);
  color: #111;
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.22);

  line-height: 1;
  pointer-events: none;
  user-select: none;
  white-space: nowrap;

  transform: translate3d(calc(var(--cursor-x, 0px) + 14px), var(--cursor-y, 0px), 0)
    translate3d(0, -100%, 0)
    translate3d(0, -10px, 0)
    scale(0.98);

  transition: opacity 120ms ease, transform 120ms ease;
  will-change: transform, opacity;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const Scene = styled.div`
  position: relative;
  width: 100%;
  overflow: visible;
  isolation: isolate;

  &[data-tag-visible="true"] ${/* sc-selector */ HoverTag} {
    opacity: 1;
    transform: translate3d(
        calc(var(--cursor-x, 0px) + 14px),
        var(--cursor-y, 0px),
        0
      )
      translate3d(0, -100%, 0)
      translate3d(0, -10px, 0)
      scale(1);
  }

  @media (hover: none) {
    ${/* sc-selector */ HoverTag} {
      display: none;
    }
  }
`;

export const BgImg = styled.img`
  width: 100%;
  height: auto;
  display: block;

  border-radius: 18px;
  user-select: none;
  pointer-events: none;
`;

export const CoverImg = styled.img`
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;

  border-radius: 18px;
  user-select: none;
  pointer-events: none;

  z-index: 3;
`;



export const HoverText = styled.span`
  font-size: var(--text-base, 16px);
  font-weight: var(--fw-semibold);
`;

/* overlay đặt talent */
export const TalentsOverlay = styled.div`
  position: absolute;
  inset: 0;
  height: 100%;

  display: flex;
  align-items: flex-end;
  padding: 0 clamp(16px, 2.4vw, 32px);

  --slotX: clamp(10px, 1.6vw, 28px);
  --baseRatio: 0.82;

  z-index: 2;

  pointer-events: none; /* chỉ button bắt */
`;

export const TalentSlot = styled.div`
  flex: 1 1 0;
  min-width: 0;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: flex-end;

  position: relative;
  z-index: var(--z, 1);

  transform: translateX(calc(var(--dx, 0) * var(--slotX)));
  overflow: visible;
`;

export const TalentBtn = styled.button`
  pointer-events: auto;

  border: 0;
  padding: 0;
  background: transparent;
  cursor: pointer;

  display: inline-flex;
  align-items: flex-end;
  justify-content: center;

  height: calc(100% * var(--baseRatio));
  width: auto;

  transform: scale(var(--scale, 1));
  transform-origin: bottom center;

  outline: none;

  &:focus-visible {
    outline: 2px solid rgba(34, 197, 94, 0.85);
    outline-offset: 6px;
    border-radius: 14px;
  }
`;

export const TalentImg = styled.img`
  height: 100%;
  width: auto;
  display: block;

  user-select: none;
  pointer-events: none;

  filter: drop-shadow(0 18px 40px rgba(0, 0, 0, 0.55));
`;
