import styled from "styled-components";

const bp = {
  md: 768,
  lg: 1024,
};

export const Section = styled.section`
  position: relative;
  padding: 72px 0 0;

  @media (max-width: ${bp.lg}px) {
    padding: 62px 0 0;
  }
  @media (max-width: ${bp.md}px) {
    padding: 46px 0 0;
  }

  /* reveal animation */
  [data-reveal] {
    opacity: 0;
    transform: translateY(10px);
    animation: eco-reveal 700ms ease forwards;
  }

  @keyframes eco-reveal {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const Container = styled.div`
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 24px;

  @media (max-width: ${bp.md}px) {
    padding: 0 16px;
  }
`;

export const Content = styled.div`
  max-width: 860px;
`;

export const Heading = styled.div`
  display: grid;
  gap: 8px;
`;

export const TitleLine = styled.div`
  font-weight: 800;
  font-size: clamp(34px, 3.2vw, 44px);
  letter-spacing: -0.6px;
  line-height: 1.05;
  color: rgba(255, 255, 255, 0.92);
`;

export const TitleLineAccent = styled.div`
  font-weight: 900;
  font-size: clamp(34px, 3.2vw, 44px);
  letter-spacing: -0.6px;
  line-height: 1.05;
  color: var(--accent);
`;

export const CTARow = styled.div`
  margin-top: 14px;
`;

export const CTAButton = styled.button`
  border: 0;
  cursor: pointer;

  padding: 8px 14px;
  border-radius: 999px;

  font-weight: 800;
  font-size: 12px;
  letter-spacing: 0.2px;

  color: #0b1a10;
  background: var(--accent);
  box-shadow: 0 10px 30px rgba(34, 197, 94, 0.18);

  transition: transform 160ms ease, box-shadow 160ms ease, filter 160ms ease;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.02);
    box-shadow: 0 12px 34px rgba(34, 197, 94, 0.22);
  }
`;

export const Badges = styled.div`
  margin-top: 18px;
  display: grid;
  gap: 6px;

  @media (max-width: ${bp.md}px) {
    gap: 8px;
  }
`;

export const Badge = styled.div`
  font-size: 14px;
  line-height: 1.4;
  font-weight: 650;
  letter-spacing: 0.1px;
  color: rgba(255, 255, 255, 0.8);
`;

export const BadgeAccent = styled.span`
  color: var(--accent);
  font-weight: 800;
`;

export const Stats = styled.div`
  margin-top: 26px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
  max-width: 760px;

  @media (max-width: ${bp.md}px) {
    grid-template-columns: 1fr;
    gap: 14px;
    max-width: 420px;
  }
`;

export const StatCard = styled.div`
  display: grid;
  gap: 6px;
`;

export const StatNumber = styled.div`
  font-size: clamp(40px, 4.2vw, 56px);
  font-weight: 950;
  letter-spacing: -0.8px;
  line-height: 1;
  color: var(--accent);
`;

export const StatLabel = styled.div`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.35;
`;
