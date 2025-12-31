import styled from "styled-components";

const bp = { md: 768 };

export const CtaSection = styled.section`
  background: var(--accent);
  padding: 28px 0;

  @media (max-width: ${bp.md}px) {
    padding: 22px 0;
  }
`;

export const CtaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;

  @media (max-width: ${bp.md}px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 18px;
  }
`;

export const CtaTitle = styled.h3`
  margin: 0;
  font-size: clamp(34px, 3.2vw, 56px);

  .dark {
    color: #0b0f0c;
  }
  .light {
    color: #ffffff;
  }
`;

export const CtaButton = styled.button`
  appearance: none;
  border: 0;
  cursor: pointer;

  background: #ffffff;
  color: #0b0f0c;

  padding: 16px 32px;
  border-radius: 999px;
  font-size: 16px;

  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);
  transition: transform 160ms ease, filter 160ms ease;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(0.99);
  }
  &:active {
    transform: translateY(0px);
  }
`;
