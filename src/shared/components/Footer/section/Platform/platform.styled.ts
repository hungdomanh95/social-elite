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
  /* ✅ canh giữa + không bị lệch khi width nhỏ */
  display: flex;
  max-width: 786px;
  margin-left: auto;
  margin-right: auto;

  gap: 16px;
  align-items: stretch;
  justify-content: center;

  @media (max-width: ${bp.md}px) {
    flex-direction: column;
    gap: 28px;

    /* ✅ giữ đúng “centered container” */
    align-items: center;
  }
`;

export const LeftGroup = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;

  @media (max-width: ${bp.md}px) {
    width: 100%;
    gap: 18px;
    align-items: center;
  }
`;

export const RightGroup = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  min-width: 0;

  @media (max-width: ${bp.md}px) {
    width: 100%;
    gap: 18px;
    align-items: center;
  }
`;

export const TitleBlock = styled.div`
  width: 100%;
  max-width: 520px;

  @media (max-width: ${bp.md}px) {
    height: auto;
    max-width: 100%;
    text-align: center;
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
    justify-content: center;
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
  font-size: 44px;
  line-height: 1.05;

  @media (max-width: ${bp.lg}px) {
    font-size: 40px;
  }

  @media (max-width: ${bp.md}px) {
    font-size: clamp(28px, 8vw, 38px);
    line-height: 1.1;
  }
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
    object-position: center top;
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

  @media (max-width: ${bp.md}px) {
    width: 100%;
  }
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
