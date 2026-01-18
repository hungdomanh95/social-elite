import styled, { keyframes } from "styled-components";

const bp = {
  sm: 640,
  md: 768,
  lg: 1024,
};

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0%   { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
`;

export const Page = styled.main`
  width: 100%;
  min-height: 100vh;
  background: #070b08;
  color: #e9f7ee;
`;

export const Container = styled.div`
  width: min(1320px, calc(100% - 80px));
  margin: 0 auto;
  padding: clamp(20px, 3.2vw, 40px) 0 clamp(40px, 4vw, 68px);

  @media (max-width: ${bp.md}px) {
    width: min(1320px, calc(100% - 28px));
  }
`;

export const Header = styled.section`
  margin-bottom: clamp(16px, 2.2vw, 24px);
  animation: ${fadeUp} 520ms ease-out both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const Title = styled.h1`
  margin: 0;
  font-size: clamp(26px, 2.8vw, 38px);
  line-height: 1.08;
  letter-spacing: -0.02em;

  .accent {
    color: var(--accent, #22c55e);
  }
`;

export const Subtitle = styled.p`
  margin: 10px 0 0;
  color: rgba(233, 247, 238, 0.78);
  font-size: 14px;
  line-height: 1.5;
  max-width: 72ch;
`;

export const EnvRow = styled.div`
  margin-top: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const EnvChip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);

  span {
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(233, 247, 238, 0.64);
  }

  code {
    font-size: 12px;
    color: rgba(233, 247, 238, 0.92);
  }
`;

export const GridLike = styled.div`
  display: flex;
  gap: 18px;
  align-items: flex-start;

  animation: ${fadeUp} 620ms ease-out both;
  animation-delay: 80ms;

  @media (max-width: ${bp.lg}px) {
    flex-direction: column;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const Col = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const Card = styled.section`
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 16px 16px 14px;
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.32);
  overflow: hidden;
`;

export const CardHead = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;

  @media (max-width: ${bp.sm}px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const CardTitle = styled.h2`
  margin: 0;
  font-size: 16px;
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: rgba(233, 247, 238, 0.92);
`;

export const Row = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const RowWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
`;

export const Button = styled.button`
  appearance: none;
  border: 0;
  cursor: pointer;
  border-radius: 14px;
  padding: 10px 12px;
  font-size: 13px;
  line-height: 1;
  color: #0b0f0c;
  background: rgba(233, 247, 238, 0.92);
  transition: transform 180ms ease, opacity 180ms ease;

  &:hover {
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0px);
    opacity: 0.92;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
    transform: none;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const AccentButton = styled(Button)`
  color: #07120a;
  background: linear-gradient(90deg, rgba(34, 197, 94, 0.95), rgba(16, 185, 129, 0.95));
  background-size: 220% 220%;
  animation: ${shimmer} 5.8s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const Ghost = styled.button`
  appearance: none;
  cursor: pointer;
  border-radius: 14px;
  padding: 10px 12px;
  font-size: 13px;
  line-height: 1;
  background: transparent;
  color: rgba(233, 247, 238, 0.9);
  border: 1px solid rgba(233, 247, 238, 0.16);
  transition: transform 180ms ease, background 180ms ease, opacity 180ms ease;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0px);
    opacity: 0.9;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    transform: none;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.div`
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(233, 247, 238, 0.62);
`;

export const Input = styled.input`
  width: 100%;
  border-radius: 14px;
  padding: 12px 12px;
  border: 1px solid rgba(233, 247, 238, 0.14);
  background: rgba(0, 0, 0, 0.25);
  color: rgba(233, 247, 238, 0.92);
  outline: none;

  &:focus {
    border-color: rgba(34, 197, 94, 0.6);
    box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.14);
  }
`;

export const Select = styled.select`
  width: 100%;
  border-radius: 14px;
  padding: 12px 12px;
  border: 1px solid rgba(233, 247, 238, 0.14);
  background: rgba(0, 0, 0, 0.25);
  color: rgba(233, 247, 238, 0.92);
  outline: none;

  &:focus {
    border-color: rgba(34, 197, 94, 0.6);
    box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.14);
  }
`;

export const Preview = styled.div`
  border-radius: 16px;
  border: 1px solid rgba(233, 247, 238, 0.12);
  background: rgba(0, 0, 0, 0.22);
  padding: 12px;
  overflow: hidden;
`;

export const Json = styled.pre`
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  font-size: 12px;
  line-height: 1.45;
  color: rgba(233, 247, 238, 0.86);
`;

export const Empty = styled.div`
  font-size: 13px;
  color: rgba(233, 247, 238, 0.62);
  padding: 8px 2px;
`;

export const MiniList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
`;

export const MiniItem = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  color: rgba(233, 247, 238, 0.86);
  font-size: 13px;

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const Badge = styled.div`
  flex: 0 0 auto;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  color: rgba(6, 33, 15, 0.96);
  background: rgba(34, 197, 94, 0.92);
`;

export const Split = styled.div`
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SplitCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SplitTitle = styled.div`
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(233, 247, 238, 0.62);
`;
