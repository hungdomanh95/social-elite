import styled from "styled-components";
import { Container as BaseContainer } from "@/shared/components/Container";

const bp = {
  md: 768,
  lg: 1024,
};

export const Platform = styled.section`
  background: transparent;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.05),
    inset 0 -1px 0 rgba(0, 0, 0, 0.2);
  padding: var(--space-20, 80px) 0 var(--space-18, 72px);

  @media (max-width: ${bp.lg}px) {
    padding: var(--space-18, 72px) 0 var(--space-14, 56px);
  }

  @media (max-width: ${bp.md}px) {
    padding: var(--space-14, 56px) 0 var(--space-11, 44px);
  }
`;

export const Inner = styled(BaseContainer)`
  /* ===== key: đồng bộ chiều cao "hàng trên" để 2 list nằm ngang nhau ===== */
  /* --platform-top-h: clamp(240px, 20vw, 320px); */

  display: flex;
  max-width: 786px;
  gap:16px;
  /* align-items: flex-start; */
  /* justify-content: space-between; */

  @media (max-width: ${bp.md}px) {
    --platform-top-h: auto;
    flex-direction: column;
    gap: 28px;
  }
`;

export const LeftGroup = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: ${bp.md}px) {
    gap: 18px;
  }
`;

export const RightGroup = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap:40px;

  @media (max-width: ${bp.md}px) {
    gap: 18px;
  }
`;

export const TitleBlock = styled.div`
  width: 100%;
  max-width: 520px;
  @media (max-width: ${bp.md}px) {
    height: auto;
    max-width: 100%;
  }
`;

export const ImageBlock = styled.div`
  width: 100%;
  max-width: 740px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;

  @media (max-width: ${bp.lg}px) {
    max-width: 640px;
  }

  @media (max-width: ${bp.md}px) {
    height: auto;
    max-width: 100%;
    justify-content: flex-start;
  }
`;

export const ListLeft = styled.div`
  width: 100%;
  max-width: 520px;

  @media (max-width: ${bp.md}px) {
    max-width: 100%;
  }
`;

export const ListRight = styled.div`
  width: 100%;
  max-width: 520px;

  @media (max-width: ${bp.md}px) {
    max-width: 100%;
  }
`;

export const TitleLine = styled.div`
  font-family: var(--font-display);
  font-weight: var(--fw-regular);
  font-size: var(--text-4xl);
  font-size: 44px;
  line-height: 36px;

`;

export const TitleAccent = styled.span`
  color: var(--accent);
`;

export const ImageLeftFooter = styled.img`
  width: 98%;
  height: 100%;
  object-fit: contain;
  object-position: right top;

  display: block;
  filter: drop-shadow(0 18px 50px rgba(0, 0, 0, 0.45));

  @media (max-width: ${bp.md}px) {
    width: 100%;
    height: auto;
  }
`;

export const FeatureList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  display: flex;
  flex-direction: column;
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
`;

export const Dot = styled.span`
  flex: 0 0 auto;
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: var(--accent);
  box-shadow: 0 0 18px rgba(34, 197, 94, 0.35);
  margin-top: 8px;

  @media (max-width: ${bp.md}px) {
    margin-top: 7px;
  }
`;

export const FeatureText = styled.span`
  font-family: var(--font-body);
  font-weight: var(--fw-regular);
  line-height: var(--leading-display);
  font-size: var(--text-xs);

  @media (max-width: ${bp.lg}px) {
    font-size: var(--text-sm, 14px);
  }

  @media (max-width: ${bp.md}px) {
    font-size: var(--text-sm, 14px);
  }
`;
