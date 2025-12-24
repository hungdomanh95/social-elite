import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Wrap = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  height: var(--header-h);
  backdrop-filter: blur(12px);
  background: var(--surface);
  border-bottom: 1px solid var(--border);
`;

export const Glow = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    900px 90px at 80% -20px,
    rgba(34, 197, 94, 0.35),
    transparent 70%
  );
`;

export const Inner = styled.div`
  position: relative;
  height: var(--header-h);
  max-width: var(--container);
  margin: 0 auto;
  padding: 0 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
`;

export const Logo = styled.a`
  text-decoration: none;
`;

export const LogoText = styled.div`
  font-weight: 900;
  letter-spacing: 0.2px;
  color: #fff;
  font-size: 20px;
  line-height: 1;
`;

export const LogoAccent = styled.span`
  color: var(--accent);
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 22px;

  @media (max-width: 900px) {
    display: none;
  }
`;

export const MenuLink = styled(NavLink)`
  position: relative;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.78);
  padding: 6px 2px;

  &:hover {
    color: rgba(255, 255, 255, 0.92);
  }

  &.active {
    color: #fff;
  }

  &.active::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -10px;
    height: 2px;
    border-radius: 999px;
    background: rgba(34, 197, 94, 0.9);
    box-shadow: 0 0 18px rgba(34, 197, 94, 0.6);
  }
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Cta = styled(NavLink)`
  text-decoration: none;
  font-weight: 800;
  font-size: 14px;
  padding: 10px 16px;
  border-radius: var(--radius-xl);

  color: #062213;
  background: linear-gradient(180deg, #2cff7a, var(--accent-2));
  box-shadow: var(--shadow-accent);

  &:hover {
    filter: brightness(1.03);
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

export const Hamburger = styled.button`
  display: none;
  width: 42px;
  height: 42px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-2);
  background: rgba(255, 255, 255, 0.04);
  cursor: pointer;

  span {
    display: block;
    width: 18px;
    height: 2px;
    margin: 4px auto;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 2px;
  }

  @media (max-width: 900px) {
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
`;

export const MobilePanel = styled.div`
  width: min(420px, 92vw);
  height: 100%;
  padding: 18px;
  background: var(--surface-2);
  border-left: 1px solid var(--border);
`;

export const MobileTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const MobileBrand = styled.div`
  font-weight: 900;
  font-size: 18px;
  color: #fff;

  span {
    color: var(--accent);
  }
`;

export const CloseBtn = styled.button`
  width: 42px;
  height: 42px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-2);
  background: rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.92);
  cursor: pointer;
`;

export const MobileNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 18px;
`;

export const MobileLink = styled(NavLink)`
  text-decoration: none;
  padding: 12px 12px;
  border-radius: var(--radius-md);
  color: rgba(255, 255, 255, 0.85);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);

  &.active {
    color: #fff;
    border-color: rgba(34, 197, 94, 0.35);
    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.12);
  }
`;

export const MobileCta = styled(NavLink)`
  display: block;
  margin-top: 18px;
  text-align: center;
  text-decoration: none;
  font-weight: 900;
  padding: 12px 16px;
  border-radius: var(--radius-xl);

  color: #062213;
  background: linear-gradient(180deg, #2cff7a, var(--accent-2));
`;
