import styled from "styled-components";

const bp = {
  md: 768,
  lg: 1024,
};


export const Platform = styled.section`
  display: flex;
  justify-content: center;
  padding: 80px 20px;
  gap: 64px;

  background: var(--footer-bg);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05),
    inset 0 -1px 0 rgba(0, 0, 0, 0.2);

  @media (max-width: ${bp.lg}px) {
    padding: 70px 16px;
  }

  @media (max-width: ${bp.md}px) {
    padding: 60px 12px;
  }
`;

export const PlatformItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 48px;

  /* để title + list không bị kéo quá dài */
  max-width: 560px;

  @media (max-width: ${bp.lg}px) {
    max-width: 520px;
    gap: 18px;
  }

  @media (max-width: ${bp.md}px) {
    max-width: 100%;
    gap: 16px;
  }
`;

export const TitleStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  @media (max-width: ${bp.lg}px) {
    gap: 4px;
  }

  @media (max-width: ${bp.md}px) {
    gap: 3px;
  }
`;

export const TitleLine = styled.div`
  font-weight: 900;
  letter-spacing: -0.6px;
  line-height: 0.95;

  /* desktop */
  font-size: 34px;

  @media (max-width: ${bp.lg}px) {
    font-size: 24px;
  }

  @media (max-width: ${bp.md}px) {
    font-size: 24px;
    line-height: 1;
    letter-spacing: -0.4px;
  }
`;

export const TitleAccent = styled.span`
  color: var(--accent);
  text-shadow: 0 0 24px rgba(34, 197, 94, 0.25);
`;

export const FeatureList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  display: grid;
  gap: 14px;

  @media (max-width: ${bp.lg}px) {
    gap: 12px;
  }

  @media (max-width: ${bp.md}px) {
    gap: 10px;
  }
`;

export const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 12px;

  @media (max-width: ${bp.md}px) {
    gap: 10px;
  }
`;

export const Dot = styled.span`
  flex: 0 0 auto;
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--accent);
  box-shadow: 0 0 18px rgba(34, 197, 94, 0.35);

  /* canh dot với dòng chữ */
  margin-top: 8px;

  @media (max-width: ${bp.md}px) {
    width: 7px;
    height: 7px;
    margin-top: 7px;
  }
`;

export const FeatureText = styled.span`
  color: rgba(255, 255, 255, 0.82);
  font-weight: 500;
  letter-spacing: 0.1px;
  line-height: 1.55;

  /* desktop */
  font-size: 16px;

  @media (max-width: ${bp.lg}px) {
    font-size: 15px;
  }

  @media (max-width: ${bp.md}px) {
    font-size: 14px;
  }
`;
