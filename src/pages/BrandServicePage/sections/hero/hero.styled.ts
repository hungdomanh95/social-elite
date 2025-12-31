import styled from "styled-components";

const bp = { md: 768, lg: 1024 };

export const HeroSection = styled.section`
  position: relative;
  background: #000;
  overflow: hidden;

  /* đúng vibe UI: glow bên phải + vignette nhẹ */
  &:before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      radial-gradient(900px 560px at 76% 52%, rgba(30, 215, 95, 0.16), transparent 62%),
      radial-gradient(760px 520px at 18% 42%, rgba(30, 215, 95, 0.06), transparent 65%),
      radial-gradient(900px 600px at 90% 10%, rgba(255, 255, 255, 0.04), transparent 60%);
    opacity: 1;
  }
`;

export const HeroRow = styled.div`
  position: relative;

  padding: 112px 0 92px;
  min-height: clamp(560px, 72vh, 740px);

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: clamp(28px, 4.4vw, 86px);

  @media (max-width: ${bp.lg}px) {
    padding: 92px 0 82px;
    min-height: unset;
  }

  @media (max-width: ${bp.md}px) {
    padding: 72px 0 68px;
    flex-direction: column;
    align-items: flex-start;
    gap: 28px;
  }
`;

export const HeroCopy = styled.div`
  flex: 0 0 auto;
  width: min(680px, 58%);
  max-width: 720px;

  @media (max-width: ${bp.lg}px) {
    width: 100%;
    max-width: 760px;
  }
`;

export const HeroTitle = styled.h1`
  margin: 0;
  line-height: 1.02;
  letter-spacing: -0.02em;
  font-size: clamp(54px, 5.6vw, 96px);

  .accent {
    color: var(--accent);
  }

  @media (max-width: ${bp.md}px) {
    font-size: clamp(44px, 10vw, 64px);
  }
`;

export const HeroActions = styled.div`
  margin-top: 30px;

  @media (max-width: ${bp.md}px) {
    margin-top: 22px;
  }
`;

export const HeroButton = styled.button`
  appearance: none;
  border: 0;
  cursor: pointer;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  background: var(--accent);
  color: #0b0f0c;
  border-radius: 999px;

  padding: 16px 26px;
  font-size: 14px;

  box-shadow: 0 12px 28px rgba(30, 215, 95, 0.18);
  transition: transform 160ms ease, filter 160ms ease;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.02);
  }
  &:active {
    transform: translateY(0);
  }
`;

export const HeroVisual = styled.div`
  flex: 0 0 auto;
  width: min(620px, 44%);
  aspect-ratio: 1 / 1;

  display: flex;
  align-items: center;
  justify-content: center;

  /* để OrbitVisual fit full */
  > * {
    width: 100%;
    height: 100%;
  }

  @media (max-width: ${bp.lg}px) {
    width: min(520px, 56%);
  }

  @media (max-width: ${bp.md}px) {
    width: min(520px, 92%);
    align-self: center;
    margin-top: 6px;
  }
`;
