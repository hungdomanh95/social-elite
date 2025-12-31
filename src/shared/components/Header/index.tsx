import { useEffect, useMemo, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import * as S from "./header.styled";
import Black_BG from "@/assets/images/Black_BG.png";

type MenuItem = { label: string; to: string };

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const menu: MenuItem[] = useMemo(
    () => [
      { label: "About Us", to: "/about-us" },
      { label: "For Brand", to: "/brand-service" },
      { label: "For Creator", to: "/for-creator" },
      { label: "Blog", to: "/blog" },
      { label: "Our Campaign", to: "/our-campaign" },
    ],
    []
  );

  const scrollToTop = useCallback(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    window.scrollTo({ top: 0, left: 0, behavior: reduce ? "auto" : "smooth" });
  }, []);

  // đóng mobile menu + scroll top khi đổi route
  useEffect(() => {
    setOpen(false);
    scrollToTop();
  }, [location.pathname, scrollToTop]);

  // lock scroll khi mở menu mobile
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // ESC để đóng menu
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <S.Wrap>
      <S.Glow aria-hidden />
      <S.Inner>
        <S.CenterRow>
          <S.Logo to="/" aria-label="Social Elite" onClick={scrollToTop}>
            <S.LogoImg src={Black_BG} alt="socialelite" />
          </S.Logo>

          <S.Nav aria-label="Primary">
            {menu.map((m) => (
              <S.MenuLink
                key={m.to}
                to={m.to}
                onClick={scrollToTop}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {m.label}
              </S.MenuLink>
            ))}
          </S.Nav>

          <S.Cta
            to="/contact-us"
            onClick={scrollToTop}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Contact Us
          </S.Cta>
        </S.CenterRow>

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
      </S.Inner>

      {open && (
        <S.MobileOverlay role="dialog" aria-modal="true" onClick={() => setOpen(false)}>
          <S.MobilePanel onClick={(e) => e.stopPropagation()}>
            <S.MobileTop>
              <S.MobileBrand
                to="/"
                onClick={() => {
                  scrollToTop();
                  setOpen(false);
                }}
                aria-label="Social Elite"
              >
                <img src={Black_BG} alt="socialelite" />
              </S.MobileBrand>

              <S.CloseBtn type="button" aria-label="Close menu" onClick={() => setOpen(false)}>
                ✕
              </S.CloseBtn>
            </S.MobileTop>

            <S.MobileNav aria-label="Mobile">
              {menu.map((m) => (
                <S.MobileLink
                  key={m.to}
                  to={m.to}
                  onClick={scrollToTop}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {m.label}
                </S.MobileLink>
              ))}
            </S.MobileNav>

            <S.MobileCta
              to="/contact-us"
              onClick={scrollToTop}
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
