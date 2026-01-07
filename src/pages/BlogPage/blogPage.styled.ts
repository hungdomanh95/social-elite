import styled, { keyframes } from "styled-components";
import { Container as SharedContainer } from "@/shared/components/Container";

const bp = { sm: 640, md: 768, lg: 1024 };

const ACCENT = "var(--accent, #22c55e)";
const BG = "#f4faf6";
const CARD = "#ffffff";
const BORDER = "rgba(15, 23, 42, 0.08)";
const TEXT = "rgba(15, 23, 42, 0.78)";
const MUTED = "rgba(15, 23, 42, 0.56)";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const Page = styled.div`
  width: 100%;
  background: ${BG};
  color: rgba(15, 23, 42, 0.92);
`;

export const Hero = styled.section`
  width: 100%;
  background: #070b09;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
   padding: 56px 0;
  @media (max-width: ${bp.md}px) {
    padding: 54px 0 44px;
  }
`;

export const HeroInner = styled(SharedContainer)`



`;

export const HeroTitle = styled.h1`
  margin: 0;
  font-size: clamp(44px, 4.2vw, 56px);
  line-height: var(--leading-display, 1.05);
  letter-spacing: -0.03em;
  font-weight: var(--fw-bold);
  color: ${ACCENT};
`;

export const Main = styled.main`
  width: 100%;
  padding: 46px 0 84px;

  @media (max-width: ${bp.md}px) {
    padding: 36px 0 70px;
  }
`;

export const MainInner = styled(SharedContainer)``;

export const Layout = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 28px;

  @media (max-width: ${bp.lg}px) {
    flex-direction: column;
    gap: 18px;
  }
`;

export const PostsCol = styled.div`
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

export const SidebarCol = styled.aside`
  flex: 0 0 380px;

  @media (max-width: ${bp.lg}px) {
    flex: 1 1 auto;
    width: 100%;
  }
`;

export const SidebarSticky = styled.div`
  position: sticky;
  top: 92px;
  display: flex;
  flex-direction: column;
  gap: 14px;

  @media (max-width: ${bp.lg}px) {
    position: relative;
    top: 0;
  }
`;

export const PostCard = styled.article`
  background: ${CARD};
  border: 1px solid ${BORDER};
  border-radius: 20px;
  overflow: hidden;

  box-shadow: 0 14px 40px rgba(2, 6, 23, 0.05);
  transform: translateZ(0);

  animation: ${fadeUp} 520ms ease both;
  animation-delay: var(--d, 0ms);

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 18px 54px rgba(2, 6, 23, 0.09);
    border-color: rgba(34, 197, 94, 0.22);
  }
`;

export const PostMedia = styled.div`
  width: 100%;
  aspect-ratio: 16 / 8;
  background: rgba(34, 197, 94, 0.18);
`;

export const PostBody = styled.div`
  padding: 22px 22px 20px;

  @media (max-width: ${bp.md}px) {
    padding: 18px 18px 16px;
  }
`;

export const PostTitle = styled.h3`
  margin: 0;
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: var(--fw-semibold);
  color: rgba(15, 23, 42, 0.92);
`;

export const PostExcerpt = styled.p`
  margin: 10px 0 16px;
  font-size: var(--text-xs);
  line-height: var(--leading-relaxed, 1.625);
  color: ${MUTED};
  max-width: 70ch;
`;

export const ReadMore = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;

  font-size: var(--text-xs);
  color: ${ACCENT};
  text-decoration: none;
  font-weight: var(--fw-semibold);

  svg {
    transition: transform 160ms ease;
  }

  &:hover svg {
    transform: translateX(2px);
  }
`;

export const SideCard = styled.div`
  background: ${CARD};
  border: 1px solid ${BORDER};
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 12px 28px rgba(2, 6, 23, 0.04);
`;

export const SideTitle = styled.div`
  font-weight: var(--fw-semibold);
  font-size: var(--text-base, 16px);
  letter-spacing: -0.01em;
  color: rgba(15, 23, 42, 0.9);
  margin-bottom: 12px;
`;

export const RelatedList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const RelatedItem = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: inherit;
  padding: 10px;
  border-radius: 14px;

  transition: background 160ms ease, transform 160ms ease;

  &:hover {
    background: rgba(2, 6, 23, 0.03);
    transform: translateY(-1px);
  }
`;

export const RelatedThumb = styled.div`
  flex: 0 0 46px;
  width: 46px;
  height: 46px;
  border-radius: 12px;
  background: rgba(34, 197, 94, 0.18);
`;

export const RelatedInfo = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const RelatedName = styled.div`
  font-size: var(--text-xs, 14px);
  font-weight: var(--fw-semibold);
  line-height: var(--leading-tight, 1.25);
  color: rgba(15, 23, 42, 0.9);
`;

export const RelatedDesc = styled.div`
  font-size: var(--text-xs);
  color: ${TEXT};
 line-height: var(--leading-tight, 1.25);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const CatList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CatRow = styled.button<{ $active?: boolean }>`
  width: 100%;
  border: 1px solid ${({ $active }) => ($active ? "rgba(34, 197, 94, 0.35)" : "transparent")};
  background: ${({ $active }) => ($active ? ACCENT : "rgba(2, 6, 23, 0.02)")};
  color: ${({ $active }) => ($active ? "#06270f" : "rgba(15, 23, 42, 0.8)")};

  border-radius: 12px;
  padding: 12px 12px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: var(--text-xs);
  font-weight: var(--fw-semibold);

  transition: transform 160ms ease, background 160ms ease, border-color 160ms ease;

  &:hover {
    transform: translateY(-1px);
    background: ${({ $active }) => ($active ? ACCENT : "rgba(2, 6, 23, 0.04)")};
  }
`;

export const CatCount = styled.span<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-width: 28px;
  height: 22px;
  padding: 0 8px;

  border-radius: 8px;
  background: ${({ $active }) => ($active ? "rgba(255, 255, 255, 0.35)" : "rgba(2, 6, 23, 0.06)")};
  color: rgba(15, 23, 42, 0.7);

  font-size: var(--text-xs, 12px);
  font-weight: var(--fw-semibold);
`;

export const SearchWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  border: 1px solid rgba(15, 23, 42, 0.1);
  background: rgba(2, 6, 23, 0.02);
  border-radius: 14px;

  padding: 12px 14px;

  svg {
    opacity: 0.7;
  }

  &:focus-within {
    border-color: rgba(34, 197, 94, 0.35);
    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.12);
    background: #fff;
  }
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  background: transparent;
  width: 100%;

  font-size: var(--text-xs);
  line-height: var(--leading-normal, 1.5);
  font-weight: var(--fw-regular);
  color: rgba(15, 23, 42, 0.85);

  &::placeholder {
    color: rgba(15, 23, 42, 0.45);
  }
`;
