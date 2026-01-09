import styled, { keyframes } from "styled-components";

const bp = {
  sm: 640,
  md: 768,
  lg: 1024,
};

const patternDrift = keyframes`
  from { transform: translate3d(0, 0, 0) scale(1.04); }
  to   { transform: translate3d(-28px, -18px, 0) scale(1.04); }
`;

export const Wrap = styled.footer`
  width: 100%;
  background: #000;
`;

export const TopArea = styled.section<{ $pattern: string }>`
  position: relative;
  width: 100%;
  overflow: hidden;

  /* base background giống UI */
  background:
    radial-gradient(900px 520px at 18% 92%, rgba(34, 197, 94, 0.22), transparent 62%),
    radial-gradient(900px 520px at 82% 88%, rgba(34, 197, 94, 0.12), transparent 68%),
    #000;

  /* Pattern layer */
  &::before {
    content: "";
    position: absolute;
    inset: -10%;
    background-image: url(${(p) => p.$pattern});
    background-repeat: repeat;
    background-size: 980px auto;
    background-position: center;
    /* opacity: 0.22;
    filter: saturate(0) brightness(1.05); */
    pointer-events: none;
    z-index: 0;

    animation: ${patternDrift} 18s linear infinite alternate;

    /* fade nhẹ về phía trên cho giống UI */
    -webkit-mask-image: radial-gradient(120% 85% at 50% 55%, #000 62%, transparent 100%);
    mask-image: radial-gradient(120% 85% at 50% 55%, #000 62%, transparent 100%);
  }

  /* thêm lớp vignette nhẹ để chữ nổi rõ */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(1200px 520px at 50% 0%, rgba(0, 0, 0, 0.55), transparent 65%);
    pointer-events: none;
    z-index: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    &::before {
      animation: none;
    }
  }

  @media (max-width: ${bp.md}px) {
    &::before {
      background-size: 820px auto;
      opacity: 0.2;
    }
  }

  @media (max-width: ${bp.sm}px) {
    &::before {
      background-size: 720px auto;
    }
  }
`;

export const TopInner = styled.div`
  position: relative;
  z-index: 2; /* nằm trên pattern */
`;

export const BottomArea = styled.div`
  width: 100%;
  background: #000;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
`;
