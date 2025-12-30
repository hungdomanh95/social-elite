import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";

const bp = { md: 900 };

export const Wrap = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;

  height: var(--header-h, 64px);
  overflow: hidden;

  /* Glass base */
  background: rgba(10, 13, 11, 0.42);
  border-bottom: 1px solid rgba(255, 255, 255, 0.14);

  /* Glass blur */
  -webkit-backdrop-filter: blur(14px) saturate(140%);
  backdrop-filter: blur(14px) saturate(140%);

  /* depth */
  box-shadow:
    0 18px 40px rgba(0, 0, 0, 0.35),
    0 1px 0 rgba(255, 255, 255, 0.06) inset;

  /* top sheen */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.12),
      rgba(255, 255, 255, 0.04) 32%,
      transparent 70%
    );
    opacity: 0.65;
  }

  /* fallback nếu browser không support blur */
  @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
    background: rgba(10, 13, 11, 0.88);
  }
`;

export const Glow = styled.div`
  position: absolute;
  inset: -2px;
  pointer-events: none;

  /* Glass-friendly glow: nhẹ, trong, không “đục” */
  background:
    radial-gradient(900px 220px at 86% 35%, rgba(30, 215, 96, 0.32), transparent 66%),
    radial-gradient(700px 220px at 100% 0%, rgba(30, 215, 96, 0.18), transparent 62%),
    radial-gradient(520px 240px at 95% 100%, rgba(30, 215, 96, 0.12), transparent 62%),
    radial-gradient(circle at 12% 60%, transparent 0 54px, rgba(255, 255, 255, 0.08) 55px 56px, transparent 57px 240px);

  opacity: 0.9;
  filter: blur(0.2px);
`;


export const Inner = styled.div`
  position: relative;
  height: var(--header-h, 64px);

  max-width: var(--container, 1180px);
  margin: 0 auto;
  padding: 0 22px;

  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${bp.md}px) {
    justify-content: space-between;
    padding: 0 16px;
  }
`;

/* Cụm giữa (logo + menu + cta) */
export const CenterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 26px;
`;

export const Logo = styled(Link)`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
`;

export const LogoImg = styled.img`
  height: 22px;
  width: auto;
  display: block;
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 22px;

  @media (max-width: ${bp.md}px) {
    display: none;
  }
`;

export const MenuLink = styled(NavLink)`
  position: relative;
  text-decoration: none;

  font-size: 16px; /* yêu cầu */
  font-weight: 500;
  letter-spacing: 0.1px;

  color: rgba(255, 255, 255, 0.78);
  padding: 8px 4px;

  transition: color 180ms ease;

  &:hover {
    color: rgba(255, 255, 255, 0.92);
  }

  &.active {
    color: var(--accent, #1ed760);
  }

  &::after {
    content: "";
    position: absolute;
    left: 6px;
    right: 6px;
    bottom: -12px;
    height: 2px;
    border-radius: 999px;
    background: rgba(30, 215, 96, 0.95);
    box-shadow: 0 0 18px rgba(30, 215, 96, 0.45);
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 220ms ease;
  }

  &:hover::after {
    transform: scaleX(0.55);
  }

  &.active::after {
    transform: scaleX(1);
  }
`;

export const Cta = styled(NavLink)`
  text-decoration: none;

  font-size: 16px; /* yêu cầu */
  font-weight: 700;
  letter-spacing: 0.1px;

  padding: 10px 22px;
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
    background: rgba(255, 255, 255, 0.92);
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

export const MobileBrand = styled(Link)`
  display: inline-flex;
  align-items: center;
  text-decoration: none;

  img {
    height: 22px;
    width: auto;
    display: block;
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

  font-size: 16px; /* đồng bộ */
  font-weight: 600;

  color: rgba(255, 255, 255, 0.88);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);

  transition: transform 160ms ease, border-color 160ms ease, background 160ms ease;

  &:hover {
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 0.045);
    border-color: rgba(30, 215, 96, 0.18);
  }

  &.active {
    color: var(--accent, #1ed760);
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

  font-size: 16px;
  font-weight: 800;
  letter-spacing: 0.1px;

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
