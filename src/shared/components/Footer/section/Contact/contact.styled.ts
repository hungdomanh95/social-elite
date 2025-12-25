import styled from "styled-components";

const bp = {
  md: 768,
  lg: 1024,
};

export const Container = styled.div`
  position: relative;
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: ${bp.md}px) {
    padding: 0 16px;
  }
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

export const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: 36px;
  align-items: center;

  @media (max-width: ${bp.lg}px) {
    grid-template-columns: 1fr 1.4fr;
    gap: 28px;
  }

  @media (max-width: ${bp.md}px) {
    grid-template-columns: 1fr;
    gap: 22px;
  }
`;

export const ContactTitle = styled.div``;

export const ContactHeading = styled.h2`
  margin: 0;
  font-size: 64px;
  line-height: 1.05;
  letter-spacing: -1px;
  font-weight: 700;
  color: var(--accent-3);
  @media (max-width: ${bp.lg}px) {
    font-size: 38px;
  }

  @media (max-width: ${bp.md}px) {
    font-size: 32px;
  }
`;

export const Form = styled.div`
  display: grid;
  gap: 18px;

  @media (max-width: ${bp.md}px) {
    gap: 14px;
  }
`;

export const Row2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 22px;

  @media (max-width: ${bp.md}px) {
    grid-template-columns: 1fr;
    gap: 14px;
  }
`;

export const Field = styled.div`
  display: grid;
  gap: 8px;
`;

export const Label = styled.div`
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.2px;
  text-transform: lowercase;
  color: rgba(255, 255, 255, 1);

  @media (max-width: ${bp.md}px) {
    font-size: 12px;
  }
`;

const baseInput = `
  width: 100%;
  color: rgba(255, 255, 255, 0.92);
  background: transparent;
  border: none;
  outline: none;
  padding: 10px 0;

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
  padding-top: 8px;

  @media (max-width: ${bp.md}px) {
    justify-content: flex-start;
  }
`;

export const SendBtn = styled.button`
  border: none;
  cursor: pointer;

  padding: 12px 22px;
  border-radius: var(--radius-xl);
  font-weight: 600;
  letter-spacing: 0.2px;

  color: #000000;
  background: var(--accent-3);
  /* box-shadow: var(--shadow-accent); */

  /* &:hover {
    filter: brightness(1.03);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
    filter: none;
  } */

  @media (max-width: ${bp.md}px) {
    padding: 11px 18px;
  }
`;
