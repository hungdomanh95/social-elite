import styled from "styled-components";

const bp = { md: 768 };


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

export const TagRow = styled.div`
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

/* ✅ IMPORTANT: remove pre-wrap. markdown renderer handles layout */
export const Content = styled.div`
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  line-height: 1.72;
  color: rgba(255, 255, 255, 0.86);
`;

/* ----- Markdown elements ----- */
export const InlineCode = styled.code`
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 0.95em;
  padding: 0.12em 0.35em;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.14);
`;

export const A = styled.a`
  color: rgba(34, 197, 94, 0.92);
  text-decoration: none;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;

export const Figure = styled.figure`
  margin: 14px 0;
`;

export const FigureCaption = styled.figcaption`
  margin-top: 10px;
  font-size: 13px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.7);
`;

export const ContentImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.12);
`;

export const Heading = styled.h2<{ $level: 1 | 2 | 3 }>`
  margin: 18px 0 10px;
  line-height: 1.2;
  letter-spacing: -0.01em;

  font-size: ${({ $level }) => ($level === 1 ? "28px" : $level === 2 ? "20px" : "16px")};
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

export const OL = styled.ol`
  margin: 10px 0 10px 18px;
  color: rgba(255, 255, 255, 0.86);
  line-height: 1.75;

  li {
    margin: 6px 0;
  }
`;

/* ----- Related ----- */
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

export const EmptyInline = styled.div`
  padding: 6px 2px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 13px;
`;

/* ----- Bottom Prev/Next ----- */
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

  &:hover {
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

  ${({ $align }) => ($align === "right" ? `justify-content:flex-end;` : `justify-content:flex-start;`)}
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

  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
