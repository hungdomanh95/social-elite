import styled, { keyframes } from "styled-components";

const bp = { md: 768, lg: 1024, xl: 1280 };

const popIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const ProofSection = styled.section`
  padding: 92px 0 112px;
  background: #000;

  @media (max-width: ${bp.lg}px) {
    padding: 78px 0 98px;
  }
  @media (max-width: ${bp.md}px) {
    padding: 60px 0 76px;
  }
`;

export const ProofTitle = styled.h2`
  margin: 0;
  text-align: center;
  line-height: 1.08;
  font-size: clamp(28px, 2.8vw, 44px);
  color: #fff;

  .accent {
    color: var(--accent);
  }
`;

export const BlockWrap = styled.div`
  --gap: 14px;
  --cols: 9;

  width: min(1120px, 100%);
  margin: 42px auto 0;

  display: flex;
  flex-wrap: wrap;
  gap: var(--gap);

  @media (max-width: ${bp.xl}px) {
    --cols: 8;
  }
  @media (max-width: ${bp.lg}px) {
    --cols: 6;
  }
  @media (max-width: ${bp.md}px) {
    --cols: 4;
    --gap: 12px;
  }
`;

export const Block = styled.div`
  height: clamp(46px, 4.2vw, 56px);
  border-radius: 8px;

  flex: 0 0 calc((100% - (var(--cols) - 1) * var(--gap)) / var(--cols));

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 12px;

  /* background: rgba(255, 255, 255, 0.035);
  border: 1px solid rgba(255, 255, 255, 0.07);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.25);

  transform: translateZ(0);
  transition: transform 220ms ease, background 220ms ease, border-color 220ms ease;

  animation: ${popIn} 420ms ease-out both;
  animation-delay: calc(var(--i, 0) * 12ms);

  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.055);
    border-color: rgba(255, 255, 255, 0.12);
  } */

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const BlockImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;

  opacity: 0.9;
  filter: grayscale(1) brightness(1.08) contrast(1.04);
  transition: filter 220ms ease, opacity 220ms ease;

  ${Block}:hover & {
    opacity: 1;
    filter: grayscale(0) brightness(1.06) contrast(1.02);
  }
`;
