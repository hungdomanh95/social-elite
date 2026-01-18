import styled, { keyframes } from "styled-components";

const bp = { md: 768 };

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const Page = styled.main`
  width: 100%;
  min-height: 100vh;
  background: #070b08;
  color: rgba(255, 255, 255, 0.92);
`;

export const Container = styled.div`
  width: min(1200px, calc(100% - 80px));
  margin: 0 auto;
  padding: clamp(24px, 3vw, 44px) 0 72px;

  @media (max-width: ${bp.md}px) {
    width: min(1200px, calc(100% - 28px));
  }
`;

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
  animation: ${fadeUp} 520ms ease-out both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const Back = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: rgba(255, 255, 255, 0.88);
  text-decoration: none;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
  }
`;

export const NavBtns = styled.div`
  display: flex;
  gap: 10px;
`;

export const NavBtn = styled.a<{ $disabled?: boolean }>`
  padding: 10px 12px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: rgba(255, 255, 255, 0.88);
  text-decoration: none;

  ${({ $disabled }) =>
    $disabled
      ? `
    opacity: .45;
    pointer-events: none;
  `
      : `
    &:hover { background: rgba(255,255,255,0.06); }
  `}
`;

export const HeroMedia = styled.div`
  width: 100%;
  border-radius: 22px;
  aspect-ratio: 16 / 9;
  background: rgba(255, 255, 255, 0.06);
  background-size: cover;
  background-position: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
`;

export const TagRow = styled.div`
  margin-top: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const Tag = styled.div`
  padding: 7px 10px;
  border-radius: 999px;
  font-size: 12px;
  color: rgba(6, 33, 15, 0.96);
  background: rgba(34, 197, 94, 0.92);
`;

export const Title = styled.h1`
  margin: 14px 0 0;
  font-size: clamp(26px, 2.8vw, 38px);
  line-height: 1.12;
  letter-spacing: -0.02em;
`;

export const Desc = styled.p`
  margin: 10px 0 0;
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.55;
  max-width: 80ch;
`;

export const Content = styled.div`
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  white-space: pre-wrap;
  line-height: 1.72;
  color: rgba(255, 255, 255, 0.86);
`;

export const RelatedBlock = styled.section`
  margin-top: 34px;
`;

export const RelatedTitle = styled.h2`
  margin: 0 0 12px;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
`;

export const RelatedList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const RelatedItem = styled.a`
  display: flex;
  gap: 12px;
  text-decoration: none;
  color: inherit;
  padding: 12px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`;

export const RelatedThumb = styled.div`
  flex: 0 0 112px;
  height: 74px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.08);
  background-size: cover;
  background-position: center;
`;

export const RelatedInfo = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const RelatedName = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.92);
  line-height: 1.25;
`;

export const RelatedDesc = styled.div`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.35;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const RelatedMore = styled.div`
  margin-top: 2px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: rgba(34, 197, 94, 0.92);
`;
// add these below your existing exports

export const MetaRow = styled.div`
  margin-top: 14px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
`;

export const ViewCount = styled.div`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
`;

export const ContentImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  border-radius: 18px;
  margin: 14px 0;
  border: 1px solid rgba(255, 255, 255, 0.12);
`;

export const Heading = styled.h2`
  margin: 18px 0 10px;
  line-height: 1.2;
  letter-spacing: -0.01em;

  /* h1/h2/h3 đều dùng chung style base, size theo tag */
  &h1 { font-size: 28px; }
  &h2 { font-size: 20px; }
  &h3 { font-size: 16px; }
`;

export const P = styled.p`
  margin: 10px 0;
  color: rgba(255, 255, 255, 0.86);
  line-height: 1.75;
`;

export const UL = styled.ul`
  margin: 10px 0 10px 18px;
  color: rgba(255, 255, 255, 0.86);
  line-height: 1.75;

  li {
    margin: 6px 0;
  }
`;

export const EmptyInline = styled.div`
  padding: 6px 2px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 13px;
`;


export const BottomNav = styled.div`
  margin-top: 28px;
  padding-top: 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);

  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;

  @media (max-width: ${bp.md}px) {
    flex-direction: column;
    gap: 14px;
  }
`;

export const NavSide = styled.div<{ $align: "left" | "right" }>`
  flex: 1;
  min-width: 0;
  display: flex;
  justify-content: ${({ $align }) => ($align === "left" ? "flex-start" : "flex-end")};
`;

export const NavLink = styled.a<{ $align: "left" | "right" }>`
  max-width: min(460px, 100%);
  text-decoration: none;
  color: inherit;

  display: flex;
  flex-direction: column;
  gap: 10px;

  text-align: ${({ $align }) => $align};
  align-items: ${({ $align }) => ($align === "left" ? "flex-start" : "flex-end")};

  &:hover ${"" /* subtle hover */} {
    opacity: 0.92;
  }
`;

export const NavDisabled = styled.div<{ $align: "left" | "right" }>`
  max-width: min(460px, 100%);
  display: flex;
  flex-direction: column;
  gap: 10px;

  text-align: ${({ $align }) => $align};
  align-items: ${({ $align }) => ($align === "left" ? "flex-start" : "flex-end")};

  opacity: 0.45;
`;

export const NavLabelRow = styled.div<{ $align: "left" | "right" }>`
  display: inline-flex;
  align-items: center;
  gap: 12px;

  ${({ $align }) =>
    $align === "right"
      ? `
    justify-content: flex-end;
  `
      : `
    justify-content: flex-start;
  `}
`;

export const NavIconCircle = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 999px;
  display: grid;
  place-items: center;

  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.06);
`;

export const NavKicker = styled.div`
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.72);
`;

export const NavTitle = styled.div<{ $align: "left" | "right" }>`
  font-size: 20px;
  line-height: 1.25;
  letter-spacing: -0.01em;
  color: rgba(255, 255, 255, 0.9);

  text-align: ${({ $align }) => $align};

  /* clamp 2 lines */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
