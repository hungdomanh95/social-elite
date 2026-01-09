import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";

const bp = { md: 900 };

export const Wrap = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  isolation: isolate;

  height: var(--header-h, 64px);
  overflow: hidden;

  /* Glass base */
  background: rgba(10, 13, 11, 0.38);
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
    z-index: 1;
    pointer-events: none;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.12),
      rgba(255, 255, 255, 0.04) 32%,
      transparent 70%
    );
    opacity: 0.65;
  }

  /* dark tint để giống UI (đọc chữ tốt hơn) */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 2;
    pointer-events: none;
    background:
      linear-gradient(90deg, rgba(0, 0, 0, 0.42), rgba(0, 0, 0, 0.18) 42%, rgba(0, 0, 0, 0.32)),
      linear-gradient(180deg, rgba(0, 0, 0, 0.22), transparent 60%);
  }

  /* fallback nếu browser không support blur */
  @supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
    background: rgba(10, 13, 11, 0.88);
  }
`;

/* ✅ Thay Glow bằng ảnh NavTop */
export const NavTop = styled.img`
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;

  pointer-events: none;
  user-select: none;

  /* giống UI: dịu, chìm vào nền */
  /* opacity: 0.72;
  filter: saturate(1.1) contrast(1.05); */

  /* nhẹ nhàng “blend” (nếu browser support) */
  mix-blend-mode: screen;

  /* subtle motion (rất nhẹ, hiện đại) */
  transform: translateZ(0);
  will-change: transform;

  @media (prefers-reduced-motion: no-preference) {
    animation: navtop-drift 10s ease-in-out infinite alternate;
  }

  @keyframes navtop-drift {
    from {
      transform: translate3d(0, 0, 0) scale(1.02);
    }
    to {
      transform: translate3d(-10px, -2px, 0) scale(1.02);
    }
  }
`;

export const Inner = styled.div`
  position: relative;
  z-index: 3;

  height: var(--header-h, 64px);
  max-width: var(--container-max, 1320px);
  margin: 0 auto;
  padding: 0 var(--container-pad, 40px);

  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${bp.md}px) {
    justify-content: space-between;
    padding: 0 var(--container-pad, 16px);
  }
`;

/* Cụm giữa (logo + menu + cta) */
export const CenterRow = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-6, 24px);
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
  gap: var(--space-6, 24px);

  @media (max-width: ${bp.md}px) {
    display: none;
  }
`;

export const MenuLink = styled(NavLink)`
  position: relative;
  text-decoration: none;
  font-size: var(--text-sm);
  color: rgba(255, 255, 255, 0.78);
  padding: var(--space-2, 8px) var(--space-1, 4px);
  transition: color 180ms ease;
  font-weight: var(--fw-semibold);

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
   appearance: none;
  border: 0;
  cursor: pointer;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  background: var(--accent);
  color: #0b0f0c;
  border-radius: 999px;

  padding: 8px 26px;
  font-size: var(--text-xs);
  font-family: var(--font-body);
  font-weight:var(--fw-semibold);

  box-shadow: 0 12px 28px rgba(30, 215, 95, 0.18);
  transition: transform 160ms ease, filter 160ms ease;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.02);
  }
  &:active {
    transform: translateY(0);
  }

  @media (max-width: ${bp.md}px) {
    display: none;
  }
`;

export const Hamburger = styled.button`
  display: none;
  width: var(--space-11, 44px);
  height: var(--space-11, 44px);
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

/* Mobile (giữ nguyên của bạn) */
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
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

export const MobilePanel = styled.div`
  width: min(420px, 92vw);
  height: 100%;
  padding: var(--space-5, 20px);

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
    from { transform: translateX(14px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
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
  width: var(--space-11, 44px);
  height: var(--space-11, 44px);
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
  gap: var(--space-3, 12px);
  margin-top: var(--space-5, 20px);
`;

export const MobileLink = styled(NavLink)`
  text-decoration: none;
  padding: var(--space-3, 12px);
  border-radius: var(--radius-md, 12px);

  font-size: var(--text-base, 16px);
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
  margin-top: var(--space-5, 20px);
  text-align: center;
  text-decoration: none;

  font-size: var(--text-base, 16px);
  letter-spacing: 0.1px;

  padding: var(--space-3, 12px) var(--space-4, 16px);
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
