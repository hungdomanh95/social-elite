import styled from "styled-components";
import { Container as BaseContainer } from "@/shared/components/Container";

const bp = {
  md: 768,
  lg: 1024,
};

export const Container = styled(BaseContainer)`
  position: relative;
  display: flex;
  max-width: 786px;
  justify-content: space-between;
`;


export const ContactBlock = styled.section`
  position: relative;
  padding: 64px 0 54px;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);

  background: rgba(0, 0, 0, 0.35);

  @media (max-width: ${bp.lg}px) {
    padding: 54px 0 46px;
  }

  @media (max-width: ${bp.md}px) {
    padding: 44px 0 40px;
  }
`;

// export const ContactGrid = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   gap: 36px;

//   @media (max-width: ${bp.lg}px) {
//     gap: 28px;
//   }

//   @media (max-width: ${bp.md}px) {
//     flex-direction: column;
//     align-items: stretch;
//     gap: 22px;
//   }
// `;

export const ContactTitle = styled.div`
  /* flex: 1 1 0; */
  min-width: 0;
`;

export const ContactHeading = styled.h2`
  margin: 0;
  font-family: var(--font-display);
  font-size: var(--text-5xl);
  font-weight: var(--fw-regular);
  color: var(--accent-3);
  @media (max-width: ${bp.lg}px) {
    font-size: var(--text-4xl);
  }

  @media (max-width: ${bp.md}px) {
    font-size: var(--text-2xl);
  }
`;

export const Form = styled.div`
  flex: 1.6 1 0;
  min-width: 0;
  display: flex;
  /* flex-direction: column; */
  gap: 18px;

  @media (max-width: ${bp.md}px) {
    gap: 14px;
  }
`;

export const Row2 = styled.div`
  display: flex;
  gap: 22px;
  margin-bottom: 12px;

  @media (max-width: ${bp.md}px) {
    flex-direction: column;
    gap: 14px;
  }
`;

export const Field = styled.div`
  flex: 1 1 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.div`
  font-size: var(--text-sm);
  line-height: var(--leading-tight, 1.25);
  font-weight: var(--fw-semibold);
  // font-weight: 700;
  // letter-spacing: 0.2px;
  text-transform: lowercase;

  @media (max-width: ${bp.md}px) {
    font-size: var(--text-xs, 12px);
  }
`;

const baseInput = `
  width: 100%;
  color: rgba(255, 255, 255, 0.92);
  background: transparent;
  border: none;
  outline: none;
  font-size: 12px;

  border-bottom: 2px solid rgba(255, 255, 255, 0.18);

  &::placeholder {
    color: rgba(255, 255, 255, 0.35);
  }

  &:focus {
    border-bottom-color: rgba(34, 197, 94, 0.55);
    box-shadow: 0 10px 22px rgba(34, 197, 94, 0.10);
  }
`;

export const Input = styled.input`
  ${baseInput}

  @media (max-width: ${bp.md}px) {
    padding: 9px 0;
  }
`;

export const Textarea = styled.textarea`
  ${baseInput}
  resize: none;
  min-height: 54px;

  @media (max-width: ${bp.md}px) {
    min-height: 48px;
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: center;
  padding-top: var(--space-8);

  @media (max-width: ${bp.md}px) {
    justify-content: flex-start;
  }
`;

export const SendBtn = styled.button`
  border: none;
  cursor: pointer;
  font-size: var(--text-xs);
  line-height: var(--leading-tight, 1.25);
  font-weight: var(--fw-semibold);

  padding: 12px 22px;
  border-radius: var(--radius-xl);
  letter-spacing: 0.2px;

  color: #000000;
  background: var(--accent-3);
  @media (max-width: ${bp.md}px) {
    padding: 11px 18px;
  }
`;
