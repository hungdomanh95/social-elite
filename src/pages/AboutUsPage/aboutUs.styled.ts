import styled from "styled-components";

const bp = { md: 768, lg: 1024 };
const ACCENT = "var(--accent, #22c55e)";

export const Page = styled.main`
  width: 100%;
  background: #000;
  color: #fff;
  overflow-x: hidden;
  font-family: var(--font-body);
`;

export const Container = styled.div`
  width: min(1240px, calc(100% - 80px));
  margin: 0 auto;

  @media (max-width: ${bp.md}px) {
    width: min(1240px, calc(100% - 28px));
  }
`;

/* =========================
   HERO (About Us)
========================= */
export const Hero = styled.section`
  width: 100%;
  background:
    radial-gradient(900px 260px at 50% 0%, rgba(34, 197, 94, 0.14), transparent 62%),
    linear-gradient(180deg, #0a0a0a 0%, #000 100%);
  padding: 44px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);

  @media (max-width: ${bp.md}px) {
    padding: 34px 0;
  }
`;

export const HeroTitle = styled.h1`
  margin: 0;
  color: ${ACCENT};
  font-weight: var(--fw-regular);

  font-size: var(--text-7xl);

  @media (max-width: ${bp.lg}px) {
    font-size: var(--text-6xl, 60px);
  }
  @media (max-width: ${bp.md}px) {
    font-size: var(--text-5xl, 48px);
  }
`;
