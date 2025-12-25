import styled from "styled-components";

const bp = {
  sm: 480,
  md: 768,
  lg: 1024,
};

export const Container = styled.div`
  position: relative;
  /* max-width: var(--container); */
  margin: 0 auto;
  /* padding: 0 20px; */

  @media (max-width: ${bp.md}px) {
    /* padding: 0 16px; */
  }
`;

export const FooterBar = styled.div`
  position: relative;
  padding: 40px 0 0;
  background: rgba(0, 0, 0, 0.55);

  @media (max-width: ${bp.md}px) {
    padding: 34px 0 0;
  }
`;

export const FooterTop = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  align-items: center;
  gap: 22px;

  padding: 26px 0;


  @media (max-width: ${bp.lg}px) {
    grid-template-columns: 1fr 1.2fr auto;
    gap: 18px;
  }

  @media (max-width: ${bp.md}px) {
    grid-template-columns: 1fr;
    align-items: flex-start;
    gap: 16px;
    padding: 22px 0;
  }
`;
export const FooterTopLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  @media (max-width: ${bp.md}px) {
    gap: 18px;
  }
`;

export const Brand = styled.div``;

export const BrandText = styled.div`
  font-weight: 900;
  font-size: 34px;
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
  gap: 8px;

  @media (max-width: ${bp.md}px) {
    gap: 6px;
  }
`;

export const InfoRow = styled.div`
  display: flex;
  gap: 6px;
  align-items: baseline;
  flex-wrap: wrap;
  font-size: 14px;
`;

export const InfoLabel = styled.span`
  font-weight: 800;
  color: rgba(255, 255, 255, 0.78);
`;

export const InfoValue = styled.a`
  text-decoration: none;
  color: var(--accent);
  font-weight: 800;

  &:hover {
    filter: brightness(1.05);
    text-decoration: underline;
  }
`;

export const InfoText = styled.span`
  color: rgba(255, 255, 255, 0.80);
`;

export const Socials = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
  @media (max-width: ${bp.md}px) {
    gap: 8px;
  }
`;

export const SocialBtn = styled.a`
  width: 38px;
  height: 38px;
  border-radius: var(--radius-xl);

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border: 1px solid rgba(255, 255, 255, 0.10);
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(8px);

  color: rgba(255, 255, 255, 0.82);
  text-decoration: none;

  &:hover {
    border-color: rgba(34, 197, 94, 0.35);
    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.12);
  }

  @media (max-width: ${bp.sm}px) {
    width: 36px;
    height: 36px;
  }
`;

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background: var(--border);
`;

export const FooterBottom = styled.div`
  padding: 22px 0 26px;
  display: flex;
  justify-content: center;
  @media (max-width: ${bp.md}px) {
    padding: 18px 0 22px;
  }
`;

export const Copyright = styled.div`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.55);
  text-align: center;
`;