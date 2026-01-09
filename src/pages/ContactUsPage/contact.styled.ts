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

export const Page = styled.main`
  width: 100%;
  background: #f6fff8;
  color: #0b0f0c;
`;

export const Hero = styled.section`
  padding: clamp(76px, 7.2vw, 108px) 0 clamp(26px, 3.2vw, 40px);
  text-align: center;
  animation: ${fadeUp} 520ms ease-out both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const Kicker = styled.div`
  font-size: var(--text-xs, 12px);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent, #1fd760);
  font-weight: 700;
  margin-bottom: 10px;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: var(--text-7xl);
  color: #050705;
`;

export const Lead = styled.p`
  margin: 0 auto;
  max-width: 660px;
  font-size: var(--text-sm);
  line-height: 1.7;
  color: rgba(5, 7, 5, 0.62);
`;

export const Cards = styled.section`
  margin: clamp(24px, 3.4vw, 42px) auto 0;

  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 18px;

  /* ✅ luôn 1 hàng */
  flex-wrap: nowrap;

  /* ✅ màn nhỏ không đủ chỗ thì scroll ngang thay vì xuống hàng */
  overflow-x: auto;
  overflow-y: visible;
  -webkit-overflow-scrolling: touch;

  /* để shadow card không bị cắt */
  padding: 2px 6px 10px;

  scroll-snap-type: x mandatory;

  animation: ${fadeUp} 560ms ease-out both;
  animation-delay: 70ms;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  @media (min-width: ${bp.lg}px) {
    /* desktop thường đủ chỗ => không cần scroll */
    overflow-x: visible;
    padding-bottom: 0;
    scroll-snap-type: none;
  }
`;

export const InfoCard = styled.div`
  /* ✅ 3 card nằm 1 hàng trên desktop (giữ max 340px đúng design) */
  flex: 0 0 min(340px, calc((100% - 36px) / 3));
  max-width: 340px;

  /* ✅ màn nhỏ vẫn 1 hàng nhưng card đủ to để đọc, swipe ngang */
  min-width: 280px;

  scroll-snap-align: start;

  background: rgba(255, 255, 255, 0.62);
  border: 1px solid rgba(5, 7, 5, 0.06);
  border-radius: 14px;
  padding: 24px 22px;
  text-align: center;

  box-shadow:
    0 18px 34px rgba(5, 7, 5, 0.06),
    0 2px 8px rgba(5, 7, 5, 0.04);

  transition: transform 220ms ease, box-shadow 220ms ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow:
      0 24px 44px rgba(5, 7, 5, 0.08),
      0 4px 14px rgba(5, 7, 5, 0.06);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover {
      transform: none;
    }
  }

  @media (max-width: ${bp.md}px) {
    padding: 22px 18px;
    min-width: 260px;
  }

  @media (max-width: ${bp.sm}px) {
    min-width: 240px;
  }
`;

export const IconBubble = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 999px;
  margin: 2px auto 12px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(31, 215, 96, 0.14);
  border: 1px solid rgba(31, 215, 96, 0.2);
  color: var(--accent, #1fd760);
`;

export const CardTitle = styled.div`
  font-size: var(--text-base, 16px);
  font-weight: 750;
  color: #0b0f0c;
  margin-bottom: 10px;
`;

export const CardLines = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const CardLine = styled.div`
  font-size: var(--text-xs, 13px);
  line-height: 1.6;
  color: rgba(5, 7, 5, 0.6);
`;

export const Panel = styled.section`
  margin: clamp(30px, 4.6vw, 56px) auto 0;
  border-radius: 18px;
  overflow: hidden;

  background:
    radial-gradient(1200px 420px at 50% 0%, rgba(31, 215, 96, 0.14), transparent 55%),
    radial-gradient(900px 360px at 12% 30%, rgba(255, 255, 255, 0.06), transparent 50%),
    linear-gradient(180deg, #070a07 0%, #050705 100%);

  box-shadow:
    0 30px 70px rgba(0, 0, 0, 0.18),
    0 8px 18px rgba(0, 0, 0, 0.16);

  animation: ${fadeUp} 560ms ease-out both;
  animation-delay: 120ms;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const PanelInner = styled.div`
  padding: clamp(36px, 4.4vw, 62px) clamp(22px, 3.8vw, 54px);
  text-align: center;
`;

export const PanelTitle = styled.h2`
  margin: 0;
  font-size: var(--text-5xl);
  font-family: var(--font-display);
  color: #ffffff;

  span {
    color: var(--accent, #1fd760);
  }
`;

export const PanelLead = styled.p`
  margin: 12px auto 0;
  max-width: 400px;
  font-size: var(--text-sm);
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.62);
`;

export const Form = styled.form`
  margin: clamp(22px, 2.8vw, 34px) auto 0;
  max-width: 500px;

  display: flex;
  flex-direction: column;
  gap: 18px;

  @media (max-width: ${bp.md}px) {
    max-width: 100%;
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 34px;

  @media (max-width: ${bp.md}px) {
    flex-direction: column;
    gap: 16px;
  }
`;

export const Field = styled.div`
  flex: 1;
  min-width: 0;
  text-align: left;
`;

export const Label = styled.div`
  font-size: var(--text-xs, 12px);
  color: rgba(255, 255, 255, 0.82);
  font-weight: var(--fw-semibold);
  text-transform: lowercase;
  /* margin-bottom: 8px; */
`;

export const Control = styled.div`
  border-bottom: 1px solid rgba(255, 255, 255, 0.22);
  transition: border-color 180ms ease, box-shadow 180ms ease;

  &:focus-within {
    border-color: rgba(31, 215, 96, 0.72);
    box-shadow: 0 10px 22px rgba(31, 215, 96, 0.12);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const baseInput = `
  width: 100%;
  border: 0;
  outline: 0;
  background: transparent;
  color: rgba(255,255,255,0.88);
  font-size: var(--text-sm, 13px);
  line-height: 1.6;
  // padding: 8px 0 12px;

  &::placeholder{
    color: rgba(255,255,255,0.34);
  }
`;

export const Input = styled.input`
  ${baseInput}
`;

export const Textarea = styled.textarea`
  ${baseInput}
  resize: none;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 4px;
`;

export const Button = styled.button`
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

export const BottomSpace = styled.div`
  height: clamp(46px, 6vw, 76px);
`;
