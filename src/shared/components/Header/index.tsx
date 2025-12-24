import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import * as S from "./header.styled";

type MenuItem = { label: string; to: string };

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const menu: MenuItem[] = useMemo(
    () => [
      { label: "About Us", to: "/about-us" },
      { label: "Brand Service", to: "/brand-service" },
      { label: "For Creator", to: "/for-creator" },
      { label: "Blog", to: "/blog" },
      { label: "Our Campaign", to: "/our-campaign" },
    ],
    []
  );

  // đóng mobile menu khi đổi route
  useEffect(() => setOpen(false), [location.pathname]);

  // lock scroll khi mở menu mobile
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <S.Wrap>
      <S.Glow />

      <S.Inner>
        <S.Logo as={Link} to="/" aria-label="Social Elite">
          <S.LogoText>
            social<S.LogoAccent>elite</S.LogoAccent>
          </S.LogoText>
        </S.Logo>

        <S.Nav aria-label="Primary">
          {menu.map((m) => (
            <S.MenuLink
              key={m.to}
              to={m.to}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {m.label}
            </S.MenuLink>
          ))}
        </S.Nav>

        <S.Right>
          <S.Cta
            to="/contact-us"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Contact Us
          </S.Cta>

          <S.Hamburger
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </S.Hamburger>
        </S.Right>
      </S.Inner>

      {open && (
        <S.MobileOverlay
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
        >
          <S.MobilePanel onClick={(e) => e.stopPropagation()}>
            <S.MobileTop>
              <S.MobileBrand>
                social<span>elite</span>
              </S.MobileBrand>

              <S.CloseBtn
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                ✕
              </S.CloseBtn>
            </S.MobileTop>

            <S.MobileNav aria-label="Mobile">
              {menu.map((m) => (
                <S.MobileLink
                  key={m.to}
                  to={m.to}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {m.label}
                </S.MobileLink>
              ))}
            </S.MobileNav>

            <S.MobileCta
              to="/contact-us"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Contact Us
            </S.MobileCta>
          </S.MobilePanel>
        </S.MobileOverlay>
      )}
    </S.Wrap>
  );
}
