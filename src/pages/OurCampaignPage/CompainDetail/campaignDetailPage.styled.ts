import styled, { keyframes } from "styled-components";

const bp = { md: 768, lg: 1024 };
const ACCENT = "var(--accent, #22c55e)";

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

export const HeroMedia = styled.div`
  width: 100%;
  border-radius: 22px;
  aspect-ratio: 16 / 9;
  background: rgba(255, 255, 255, 0.06);
  background-size: cover;
  background-position: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;

  animation: ${fadeUp} 520ms ease-out both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const MetaRow = styled.div`
  margin-top: 14px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
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
  font-weight: var(--fw-bold, 700);
`;

export const Desc = styled.p`
  margin: 10px 0 0;
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.6;
  max-width: 80ch;
`;

export const Content = styled.div`
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  line-height: 1.72;
  color: rgba(255, 255, 255, 0.86);
`;

/* Markdown atoms */
export const Figure = styled.figure`
  margin: 14px 0;
`;

export const ContentImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.12);
`;

export const FigureCaption = styled.figcaption`
  margin-top: 10px;
  font-size: 13px;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.72);
`;

export const Heading = styled.h2<{ $level: 1 | 2 | 3 }>`
  margin: 18px 0 10px;
  line-height: 1.2;
  letter-spacing: -0.01em;
  font-weight: var(--fw-bold, 700);

  ${({ $level }) =>
    $level === 1
      ? `font-size: 28px;`
      : $level === 2
      ? `font-size: 20px;`
      : `font-size: 16px;`}
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

export const A = styled.a`
  color: ${ACCENT};
  text-decoration: none;
  font-weight: var(--fw-semibold, 600);

  &:hover {
    text-decoration: underline;
  }
`;

export const InlineCode = styled.code`
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 0.95em;
  padding: 2px 6px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
`;

export const RelatedBlock = styled.section`
  margin-top: 34px;
`;

export const RelatedTitle = styled.h2`
  margin: 0 0 12px;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
`;

export const RelatedWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
`;

export const RelatedCard = styled.a`
  flex: 1 1 360px;
  max-width: calc(50% - 7px);

  @media (max-width: ${bp.lg}px) {
    max-width: 100%;
    flex-basis: 100%;
  }

  text-decoration: none;
  color: inherit;
  border-radius: 18px;
  overflow: hidden;

  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);

  transition: transform 180ms ease, background 180ms ease;

  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.08);
  }
`;

export const RelatedMedia = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  background: rgba(255, 255, 255, 0.08);
  background-size: cover;
  background-position: center;
`;

export const RelatedBody = styled.div`
  padding: 12px 12px 14px;
`;

export const RelatedName = styled.div`
  font-size: 14px;
  font-weight: var(--fw-semibold, 600);
  color: rgba(255, 255, 255, 0.92);
  line-height: 1.25;
`;

export const RelatedDesc = styled.div`
  margin-top: 8px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.45;

  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const RelatedMore = styled.div`
  margin-top: 10px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: rgba(34, 197, 94, 0.92);
  font-weight: var(--fw-semibold, 600);

  svg {
    transition: transform 160ms ease;
  }

  ${RelatedCard}:hover & svg {
    transform: translateX(2px);
  }
`;

export const EmptyInline = styled.div`
  padding: 6px 2px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 13px;
`;
