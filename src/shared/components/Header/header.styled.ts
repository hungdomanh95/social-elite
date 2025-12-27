import styled from "styled-components";
import { NavLink } from "react-router-dom";

const bp = {
  md: 900,
};

export const Wrap = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;

  height: var(--header-h, 64px);
  background: #0a0d0b;
  overflow: hidden;

  /* giống UI: không “glass” quá nhiều, chỉ hơi “polish” */
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
`;

export const Glow = styled.div`
  position: absolute;
  inset: -2px;
  pointer-events: none;

  /* nền có rings + green blob như hình */
  background:
    /* green blob right */
    radial-gradient(900px 220px at 82% 35%, rgba(30, 215, 96, 0.36), transparent 65%),
    radial-gradient(720px 220px at 95% 0%, rgba(30, 215, 96, 0.22), transparent 60%),
    radial-gradient(520px 240px at 92% 90%, rgba(30, 215, 96, 0.14), transparent 60%),

    /* subtle rings left */
    radial-gradient(circle at 8% 40%, transparent 0 44px, rgba(255, 255, 255, 0.06) 45px 46px, transparent 47px 180px),
    radial-gradient(circle at 14% 70%, transparent 0 70px, rgba(255, 255, 255, 0.045) 71px 72px, transparent 73px 240px),
    radial-gradient(circle at 22% 30%, transparent 0 96px, rgba(255, 255, 255, 0.035) 97px 98px, transparent 99px 320px),

    /* soft top sheen */
    linear-gradient(180deg, rgba(255, 255, 255, 0.06), transparent 55%);

  opacity: 0.95;
`;

export const Inner = styled.div`
  position: relative;
  height: var(--header-h, 64px);

  max-width: var(--container, 1180px);
  margin: 0 auto;
  padding: 0 20px;

  /* Canh giữa nav đúng như UI */
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 18px;

  @media (max-width: ${bp.md}px) {
    grid-template-columns: auto 1fr auto;
    padding: 0 16px;
  }
`;

export const Logo = styled.a`
  justify-self: start;
  text-decoration: none;
`;

export const LogoText = styled.div`
  font-weight: 900;
  letter-spacing: 0.2px;
  color: #fff;
  font-size: 18px;
  line-height: 1;
`;

export const LogoAccent = styled.span`
  color: var(--accent, #1ed760);
`;

export const Nav = styled.nav`
  justify-self: center;
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: ${bp.md}px) {
    display: none;
  }
`;

export const MenuLink = styled(NavLink)`
  position: relative;
  text-decoration: none;
  font-weight: 500;
  font-size: 12.5px;
  letter-spacing: 0.12px;

  color: rgba(255, 255, 255, 0.72);
  padding: 6px 2px;

  transition: color 180ms ease;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -10px;
    height: 2px;
    border-radius: 999px;
    background: rgba(30, 215, 96, 0.9);
    box-shadow: 0 0 18px rgba(30, 215, 96, 0.45);
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 220ms ease;
  }

  &:hover {
    color: rgba(255, 255, 255, 0.9);
  }

  &:hover::after {
    transform: scaleX(0.65);
  }

  &.active {
    color: #fff;
  }

  &.active::after {
    transform: scaleX(1);
  }
`;

export const Right = styled.div`
  justify-self: end;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Cta = styled(NavLink)`
  text-decoration: none;
  font-weight: 700;
  font-size: 12.5px;
  letter-spacing: 0.12px;

  padding: 10px 18px;
  border-radius: 999px;

  color: #07140b;
  background: var(--accent, #1ed760);

  box-shadow:
    0 10px 26px rgba(30, 215, 96, 0.22),
    0 0 0 1px rgba(30, 215, 96, 0.28) inset;

  transition: transform 160ms ease, filter 160ms ease;

  &:hover {
    filter: brightness(1.02);
    transform: translateY(-1px);
  }

  &.active {
    box-shadow:
      0 12px 30px rgba(30, 215, 96, 0.26),
      0 0 0 2px rgba(30, 215, 96, 0.35) inset;
  }

  @media (max-width: ${bp.md}px) {
    display: none;
  }
`;

export const Hamburger = styled.button`
  display: none;
  width: 42px;
  height: 42px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  cursor: pointer;

  transition: transform 160ms ease, background 160ms ease, border-color 160ms ease;

  &:hover {
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(30, 215, 96, 0.22);
  }

  span {
    display: block;
    width: 18px;
    height: 2px;
    margin: 4px auto;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 2px;
  }

  @media (max-width: ${bp.md}px) {
    display: inline-block;
  }
`;

/* Mobile */
export const MobileOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 60;

  background: rgba(0, 0, 0, 0.66);
  backdrop-filter: blur(10px);

  display: flex;
  justify-content: flex-end;

  animation: header-fade 180ms ease both;

  @keyframes header-fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const MobilePanel = styled.div`
  width: min(420px, 92vw);
  height: 100%;
  padding: 18px;

  background: #0a0d0b;
  border-left: 1px solid rgba(255, 255, 255, 0.08);
  position: relative;
  overflow: hidden;

  /* green blob nhẹ giống tone header */
  &::before {
    content: "";
    position: absolute;
    inset: -40px;
    pointer-events: none;
    background:
      radial-gradient(700px 240px at 90% 10%, rgba(30, 215, 96, 0.22), transparent 60%),
      radial-gradient(600px 220px at 70% 90%, rgba(30, 215, 96, 0.12), transparent 60%);
    opacity: 0.95;
  }

  animation: header-slide 220ms ease both;

  @keyframes header-slide {
    from {
      transform: translateX(14px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

export const MobileTop = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const MobileBrand = styled.div`
  font-weight: 900;
  font-size: 18px;
  color: #fff;

  span {
    color: var(--accent, #1ed760);
  }
`;

export const CloseBtn = styled.button`
  width: 42px;
  height: 42px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.92);
  cursor: pointer;

  transition: transform 160ms ease, background 160ms ease;

  &:hover {
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 0.06);
  }
`;

export const MobileNav = styled.nav`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 18px;
`;

export const MobileLink = styled(NavLink)`
  text-decoration: none;
  padding: 12px 12px;
  border-radius: 14px;

  color: rgba(255, 255, 255, 0.86);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);

  transition: transform 160ms ease, border-color 160ms ease, background 160ms ease;

  &:hover {
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 0.045);
    border-color: rgba(30, 215, 96, 0.18);
  }

  &.active {
    color: #fff;
    border-color: rgba(30, 215, 96, 0.35);
    box-shadow: 0 0 0 3px rgba(30, 215, 96, 0.12);
  }
`;

export const MobileCta = styled(NavLink)`
  position: relative;
  display: block;
  margin-top: 18px;
  text-align: center;
  text-decoration: none;

  font-weight: 800;
  letter-spacing: 0.12px;

  padding: 12px 16px;
  border-radius: 999px;

  color: #07140b;
  background: var(--accent, #1ed760);

  box-shadow:
    0 10px 26px rgba(30, 215, 96, 0.22),
    0 0 0 1px rgba(30, 215, 96, 0.28) inset;

  transition: transform 160ms ease, filter 160ms ease;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.02);
  }
`;
