import styled from "styled-components";

const bp = {
  md: 768,
  lg: 1024,
};

const ACCENT = "var(--accent, #22c55e)";

export const Page = styled.main`
  width: 100%;
  background: #000;
  color: #fff;
  overflow-x: hidden;
`;

export const Container = styled.div`
  width: min(1240px, calc(100% - 80px));
  margin: 0 auto;

  @media (max-width: ${bp.md}px) {
    width: min(1240px, calc(100% - 28px));
  }
`;

/* =========================
   HERO
========================= */
export const Hero = styled.section`
  width: 100%;
  background:
    radial-gradient(900px 220px at 50% 0%, rgba(34, 197, 94, 0.14), transparent 62%),
    linear-gradient(180deg, #0a0a0a 0%, #000 100%);
  padding: clamp(44px, 5vw, 64px) 0;
  display: grid;
  place-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
`;

export const HeroTitle = styled.h1`
  margin: 0;
  /* font-weight: 800; */
  letter-spacing: -0.02em;
  color: ${ACCENT};
  font-size: clamp(44px, 5.2vw, 84px);
  line-height: 1;
`;
