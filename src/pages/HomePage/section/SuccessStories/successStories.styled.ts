import styled, { keyframes, css } from "styled-components";

const bp = { sm: 640, md: 768, lg: 1024 };

const revealUp = keyframes`
  from { opacity: 0; transform: translateY(10px); filter: blur(1px); }
  to   { opacity: 1; transform: translateY(0);   filter: blur(0); }
`;

const floatSoft = keyframes`
  0%,100% { transform: translateY(0); }
  50%     { transform: translateY(-4px); }
`;

export const Section = styled.section`
  position: relative;
  width: 100%;
  margin: 0;
  padding: 68px 0 56px;

  background:
    radial-gradient(900px 520px at 35% 10%, rgba(0, 210, 106, 0.08), transparent 62%),
    radial-gradient(820px 420px at 70% 70%, rgba(0, 210, 106, 0.12), transparent 62%),
    linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.65));

  border-bottom: 2px solid rgba(0, 210, 106, 0.55);

  [data-reveal] {
    opacity: 0;
    transform: translateY(10px);
    animation: ${revealUp} 700ms ease forwards;
    animation-delay: var(--d, 0ms);
  }

  @media (prefers-reduced-motion: reduce) {
    [data-reveal] {
      animation: none;
      opacity: 1;
      transform: none;
      filter: none;
    }
  }

  @media (max-width: ${bp.md}px) {
    padding: 52px 0 46px;
  }
`;

export const Container = styled.div`
  max-width: 1320px;
  margin: 0 auto;

  /* giống Ecosystem */
  @media (max-width: ${bp.md}px) {
    padding: 0 16px;
  }
`;

export const Top = styled.div`
  width: 100%;
  max-width: 900px;   /* chỉnh theo ý, vd 860/900/980 */
  margin: 0 auto 22px;

  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 18px;

  @media (max-width: ${bp.md}px) {
    max-width: 100%;
    align-items: flex-start;
    flex-direction: column;
    gap: 14px;
  }
`;

export const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Pill = styled.div`
  display: inline-flex;
  align-items: center;
  width: fit-content;

  padding: 7px 12px;
  border-radius: 999px;

  font-size: 12px;
  // font-weight: 700;
  // letter-spacing: 0.02em;
  color: rgba(0, 210, 106, 0.95);

  background: rgba(0, 210, 106, 0.10);
  border: 1px solid rgba(0, 210, 106, 0.35);
`;

export const Heading = styled.h2`
  margin: 0;
  color: #ffffff;
  // font-weight: 900;
  // letter-spacing: -0.02em;
  line-height: 1.05;

  font-size: clamp(34px, 4.4vw, 54px);

  @media (max-width: ${bp.md}px) {
    font-size: clamp(28px, 8vw, 44px);
  }
`;

/* ✅ FIX: dùng css helper, không dùng string thường */
const viewAllBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;

  padding: 10px 16px;
  border-radius: 999px;
  // font-weight: 800;
  font-size: 13px;

  background: var(--accent, #00d26a);
  color: #06130b;
  border: 0;
  cursor: pointer;
  text-decoration: none;

  box-shadow:
    0 10px 26px rgba(0,0,0,.35),
    0 0 0 1px rgba(0,210,106,.25) inset;

  transition: transform 180ms ease, filter 180ms ease;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${floatSoft} 2600ms ease-in-out infinite;
  }

  &:hover { transform: translateY(-2px); filter: brightness(1.03); }
  &:active { transform: translateY(0); }
`;

export const ViewAllBtn = styled.button`
  ${viewAllBase}
`;

export const ViewAllLink = styled.a`
  ${viewAllBase}
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 22px;

  @media (max-width: ${bp.lg}px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${bp.md}px) {
    display: flex;
    gap: 16px;
    overflow-x: auto;
    padding-bottom: 8px;

    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
      height: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background: rgba(255,255,255,0.12);
      border-radius: 99px;
    }
  }
`;

export const Card = styled.div<{ $clickable?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 10px;

  color: inherit;
  text-decoration: none;

  ${({ $clickable }) => ($clickable ? "cursor: pointer;" : "")}

  @media (max-width: ${bp.md}px) {
    flex: 0 0 auto;
    width: min(320px, 78vw);
    scroll-snap-align: start;
  }
`;

export const Thumb = styled.div<{ $src?: string }>`
  width: 100%;
  aspect-ratio: 4 / 5;
  border-radius: 16px;
  overflow: hidden;

  background: ${({ $src }) =>
    $src
      ? `url(${$src}) center / cover no-repeat`
      : `linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.03))`};

  box-shadow:
    0 26px 60px rgba(0,0,0,.45),
    0 0 0 1px rgba(255,255,255,.05) inset;
`;

export const CardTitle = styled.div`
  color: rgba(255, 255, 255,1);
  // font-weight: 800;
  font-size: 16px;
  // letter-spacing: -0.01em;

  @media (max-width: ${bp.md}px) {
    font-size: 15px;
  }
`;

export const CardMeta = styled.div`
  color: rgba(255, 255, 255,1);
  font-size: 12px;
  line-height: 1.25;
`;
