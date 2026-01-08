import styled from "styled-components";
import { Container as BaseContainer } from "@/shared/components/Container";

const bp = {
  sm: 480,
  md: 768,
  lg: 1024,
};

export const Container = styled(BaseContainer)`

`;

export const FooterBar = styled.footer`
  position: relative;
  background: rgba(0, 0, 0, 0.72);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
`;

export const FooterTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 64px;

  padding: var(--space-16) 0;

  @media (max-width: ${bp.lg}px) {
    gap: 56px;
    padding: var(--space-10, 40px) 0 var(--space-7, 28px);
  }

  @media (max-width: ${bp.md}px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 18px;
    padding: var(--space-7, 28px) 0 var(--space-6, 24px);
  }
`;

export const FooterTopLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  min-width: 0;

  @media (max-width: ${bp.md}px) {
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
  height: 32px;
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
  // font-weight: 900;
  font-family: var(--font-display);
  font-size: var(--text-5xl, 48px);
  // letter-spacing: -0.5px;
  line-height: var(--leading-none, 1);

  .white {
    color: #fff;
  }
  .green {
    color: var(--accent);
  }

  @media (max-width: ${bp.lg}px) {
    font-size: var(--text-4xl, 36px);
  }

  @media (max-width: ${bp.md}px) {
    font-size: var(--text-3xl, 30px);
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
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

  font-family: var(--font-body);
  font-size: var(--text-xs);
  line-height: var(--leading-normal, 1.5);
`;

export const InfoLabel = styled.span`
  min-width: 64px;
  font-weight: var(--fw-semibold);

`;

export const InfoValue = styled.a`
  text-decoration: none;
  color: var(--accent);
  /* font-weight: var(--fw-semibold); */

  &:hover {
    filter: brightness(1.05);
    text-decoration: underline;
  }
`;

export const InfoText = styled.span`
  font-weight: var(--fw-regular);
  color: rgba(255, 255, 255, 0.8);
`;

export const Socials = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  flex: 0 0 auto;

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
  padding: var(--space-5, 20px) 0 var(--space-6, 24px);
  display: flex;
  justify-content: center;

  @media (max-width: ${bp.md}px) {
    padding: var(--space-4, 16px) 0 var(--space-5, 20px);
  }
`;

export const Copyright = styled.div`
  font-size: var(--text-xs, 14px);
  color: rgba(255, 255, 255, 0.55);
  text-align: center;
`;
