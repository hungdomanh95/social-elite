import styled from "styled-components";

const bp = {
  sm: 480,
  md: 768,
  lg: 1024,
};

export const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;

  @media (max-width: ${bp.md}px) {
    padding: 0 16px;
  }
`;

export const FooterBar = styled.footer`
  position: relative;
  background: rgba(0, 0, 0, 0.72);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
`;

export const FooterTop = styled.div`
  display: grid;
  grid-template-columns: auto minmax(420px, 1fr) auto;
  align-items: center;
  column-gap: 64px;

  padding: 96px 34px;

  @media (max-width: ${bp.lg}px) {
    grid-template-columns: auto minmax(340px, 1fr) auto;
    column-gap: 56px;
    padding: 40px 0 30px;
  }

  @media (max-width: ${bp.md}px) {
    grid-template-columns: 1fr;
    row-gap: 18px;
    padding: 28px 0 22px;
  }
`;

export const FooterTopLeft = styled.div`
  display: contents;

  @media (max-width: ${bp.md}px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
  }
`;

export const Brand = styled.div`
  display: flex;
  align-items: center;
`;

export const BrandLogo = styled.img`
  height: 48px;
  width: auto;
  display: block;

  @media (max-width: ${bp.lg}px) {
    height: 46px;
  }

  @media (max-width: ${bp.md}px) {
    height: 40px;
  }
`;

export const BrandText = styled.div`
  font-weight: 900;
  font-size: 54px;
  letter-spacing: -0.5px;
  line-height: 1;

  .white {
    color: #fff;
  }
  .green {
    color: var(--accent);
  }

  @media (max-width: ${bp.lg}px) {
    font-size: 38px;
  }

  @media (max-width: ${bp.md}px) {
    font-size: 34px;
  }
`;

export const Info = styled.div`
  display: grid;
  gap: 10px;

  @media (max-width: ${bp.md}px) {
    gap: 8px;
  }
`;

export const InfoRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: baseline;
  flex-wrap: wrap;

  font-size: 14px;
  line-height: 1.3;
`;

export const InfoLabel = styled.span`
  min-width: 64px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.78);
`;

export const InfoValue = styled.a`
  text-decoration: none;
  color: var(--accent);
  font-weight: 700;

  &:hover {
    filter: brightness(1.05);
    text-decoration: underline;
  }
`;

export const InfoText = styled.span`
  color: rgba(255, 255, 255, 0.8);
`;

export const Socials = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;

  @media (max-width: ${bp.md}px) {
    justify-content: flex-start;
    gap: 10px;
  }
`;

export const SocialBtn = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 999px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(8px);

  transition: transform 160ms ease, box-shadow 160ms ease,
    border-color 160ms ease;

  img {
    width: 18px;
    height: 18px;
    display: block;
    opacity: 0.88;
  }

  &:hover {
    transform: translateY(-1px);
    border-color: rgba(34, 197, 94, 0.35);
    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.12);
  }

  @media (max-width: ${bp.sm}px) {
    width: 38px;
    height: 38px;

    img {
      width: 17px;
      height: 17px;
    }
  }
`;

export const Line = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.08);

  width: 100vw;
  margin-left: calc(50% - 50vw);
`;

export const FooterBottom = styled.div`
  padding: 18px 0 22px;
  display: flex;
  justify-content: center;

  @media (max-width: ${bp.md}px) {
    padding: 16px 0 20px;
  }
`;

export const Copyright = styled.div`
  font-size: 15px;
  color: rgba(255, 255, 255, 0.55);
  text-align: center;
`;
