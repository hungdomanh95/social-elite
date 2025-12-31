import styled, { keyframes } from "styled-components";

const bp = { md: 768, lg: 1024 };

const floatY = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
`;

export const OfferSection = styled.section<{ $bg: string }>`
  position: relative;
  width: 100%;
  overflow: hidden;
  border-top: 1px solid rgba(0, 0, 0, 0.06);

  background-color: #f1fbf3;
  background-image: url(${(p) => p.$bg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  &:before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(
      to bottom,
      rgba(241, 251, 243, 0.65),
      rgba(241, 251, 243, 0.75)
    );
  }

  [data-reveal] {
    opacity: 0;
    transform: translateY(12px);
    filter: blur(2px);
    transition:
      opacity 700ms ease,
      transform 700ms cubic-bezier(0.2, 0.8, 0.2, 1),
      filter 700ms ease;
    transition-delay: var(--d, 0ms);
    will-change: opacity, transform, filter;
  }

  [data-reveal].reveal-in {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }

  @media (prefers-reduced-motion: reduce) {
    [data-reveal] {
      transition: none;
      opacity: 1;
      transform: none;
      filter: none;
    }
  }
`;

export const OfferInner = styled.div`
  position: relative;
  z-index: 1;

  width: min(1180px, calc(100% - 64px));
  margin: 0 auto;
  padding: 64px 0 72px;

  @media (max-width: ${bp.md}px) {
    width: min(1180px, calc(100% - 28px));
    padding: 54px 0 60px;
  }
`;

export const OfferTitle = styled.h2`
  margin: 0 0 34px;
  text-align: center;
  letter-spacing: -0.02em;
  color: var(--accent, #22c55e);
  font-size: clamp(32px, 3.2vw, 48px);
`;

export const OfferRow = styled.div`
  display: grid;
  gap: 22px 34px;
  align-items: center;
  justify-items: center;

  &[data-cols="3"] {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    margin-bottom: 26px;
  }

  &[data-cols="2"] {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    width: min(820px, 100%);
    margin: 0 auto;
  }

  @media (max-width: ${bp.lg}px) {
    &[data-cols="3"] {
      grid-template-columns: 1fr;
      justify-items: start;
      margin-bottom: 18px;
    }
    &[data-cols="2"] {
      grid-template-columns: 1fr;
      justify-items: start;
      width: 100%;
    }
  }
`;

/* ✅ Declare OfferIcon FIRST */
export const OfferIcon = styled.div`
  width: 46px;
  height: 46px;
  border-radius: 999px;
  background: var(--accent, #22c55e);
  color: #ffffff;
  display: grid;
  place-items: center;
  box-shadow: 0 12px 28px rgba(34, 197, 94, 0.22);
  flex: 0 0 auto;

  animation: ${floatY} 2.8s ease-in-out infinite;
  transform-origin: center;
  transition: transform 180ms ease, box-shadow 180ms ease;

  svg {
    display: block;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transition: none;
  }
`;

export const OfferItem = styled.div`
  width: 100%;
  display: inline-flex;
  align-items: center;
  gap: 14px;
  justify-content: center;

  transition: transform 180ms ease, filter 180ms ease;
  will-change: transform;

  @media (hover: hover) {
    &:hover {
      transform: translateY(-2px);
      filter: drop-shadow(0 10px 18px rgba(34, 197, 94, 0.12));
    }

    &:hover ${OfferIcon} {
      transform: translateY(-1px) scale(1.02);
      box-shadow: 0 16px 34px rgba(34, 197, 94, 0.26);
    }
  }

  @media (max-width: ${bp.lg}px) {
    justify-content: flex-start;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const OfferText = styled.div`
  color: #0b0f0c;
  font-size: 18px;

  @media (max-width: ${bp.md}px) {
    font-size: 16px;
  }
`;
