import styled, { keyframes } from "styled-components";
import { Container as SharedContainer } from "@/shared/components/Container";

const bp = { sm: 640, md: 768, lg: 1024 };

const ACCENT = "var(--accent, #22c55e)";
const BG = "#f4faf6";
const BORDER = "rgba(15, 23, 42, 0.08)";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const Page = styled.div`
  width: 100%;
  background: ${BG};
  color: rgba(15, 23, 42, 0.92);
`;

export const Container = styled(SharedContainer)``;

export const Section = styled.section`
  width: 100%;
  padding: 54px 0 70px;

  @media (max-width: ${bp.md}px) {
    padding: 44px 0 60px;
  }
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 26px;

  @media (max-width: ${bp.md}px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const TitleWrap = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
`;

export const TitleBar = styled.span`
  width: 3px;
  height: 24px;
  border-radius: 999px;
  background: ${ACCENT};
  opacity: 0.9;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: clamp(26px, 2.1vw, 32px);
  line-height: 1.12;
  letter-spacing: -0.02em;
  font-weight: 700;
  color: ${ACCENT};
`;

export const TopAction = styled.button`
  border: none;
  cursor: pointer;

  display: inline-flex;
  align-items: center;
  gap: 10px;

  padding: 12px 16px;
  border-radius: 999px;

  background: ${ACCENT};
  color: #06270f;
  font-size: 14px;
  font-weight: 600;

  box-shadow: 0 12px 28px rgba(34, 197, 94, 0.16);
  transition: transform 160ms ease, box-shadow 160ms ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 16px 38px rgba(34, 197, 94, 0.22);
  }
`;

export const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 28px;
`;

export const Card = styled.article`
  flex: 1 1 560px;
  max-width: calc(50% - 14px);

  @media (max-width: ${bp.lg}px) {
    max-width: 100%;
    flex-basis: 100%;
  }

  background: transparent;
  animation: ${fadeUp} 520ms ease both;
  animation-delay: var(--d, 0ms);

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const CardMedia = styled.div`
  width: 100%;
  aspect-ratio: 16 / 11;
  border-radius: 20px;
  background: rgba(34, 197, 94, 0.18);

  box-shadow: 0 14px 40px rgba(2, 6, 23, 0.05);
  border: 1px solid rgba(34, 197, 94, 0.16);

  transition: transform 180ms ease, box-shadow 180ms ease;

  ${Card}:hover & {
    transform: translateY(-2px);
    box-shadow: 0 18px 54px rgba(2, 6, 23, 0.09);
  }
`;

export const CardBody = styled.div`
  padding: 14px 2px 0;
`;

export const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 12px 0 10px;
`;

export const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 7px 12px;
  border-radius: 999px;

  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.03em;

  background: rgba(2, 6, 23, 0.03);
  border: 1px solid ${BORDER};
  color: rgba(15, 23, 42, 0.78);
`;

export const CardTitle = styled.h3`
  margin: 0;
  font-size: clamp(18px, 1.35vw, 22px);
  line-height: 1.22;
  font-weight: 700;
  letter-spacing: -0.02em;
`;

export const CardDesc = styled.p`
  margin: 10px 0 0;
  font-size: clamp(15px, 1.05vw, 16px);
  line-height: 1.6;
  color: rgba(15, 23, 42, 0.56);
`;

export const CTA = styled.section`
  width: 100%;
  background: #070b09;
  padding: 70px 0 78px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);

  @media (max-width: ${bp.md}px) {
    padding: 56px 0 64px;
  }
`;

export const CTATitle = styled.h2`
  margin: 0;
  text-align: center;
  font-size: clamp(28px, 2.6vw, 38px);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: rgba(255, 255, 255, 0.92);
`;

export const Accent = styled.span`
  color: ${ACCENT};
`;

export const CTADesc = styled.p`
  margin: 12px auto 18px;
  text-align: center;
  max-width: 72ch;
  font-size: 16px;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.62);

  @media (max-width: ${bp.md}px) {
    font-size: 15px;
  }
`;

export const CTAButton = styled.button`
  border: none;
  cursor: pointer;

  display: inline-flex;
  align-items: center;
  gap: 10px;

  padding: 12px 18px;
  border-radius: 999px;

  background: ${ACCENT};
  color: #06270f;
  font-size: 14px;
  font-weight: 600;

  margin: 0 auto;
  display: flex;
  width: fit-content;

  box-shadow: 0 12px 28px rgba(34, 197, 94, 0.16);
  transition: transform 160ms ease, box-shadow 160ms ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 16px 38px rgba(34, 197, 94, 0.22);
  }
`;
