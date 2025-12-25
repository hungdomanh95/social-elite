import styled from "styled-components";

export const Wrap = styled.div`
  width: 100%;
`;

export const Title = styled.div`
  text-align: center;
  color: var(--accent);
  font-weight: 800;
  letter-spacing: 0.2px;
  margin-bottom: 14px;
`;

export const Marquee = styled.div`
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  text-align: left;

  /* tránh hover/repaint làm jump */
  contain: layout paint;

  &[data-fade="1"] {
    -webkit-mask-image: linear-gradient(
      to right,
      transparent 0%,
      #000 10%,
      #000 90%,
      transparent 100%
    );
    mask-image: linear-gradient(
      to right,
      transparent 0%,
      #000 10%,
      #000 90%,
      transparent 100%
    );
  }
`;

export const Track = styled.div`
  display: flex;
  width: max-content;
  align-items: center;

  will-change: transform;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;

  animation: ticker-marquee var(--duration, 18s) linear infinite;

  /* ✅ TrustBy style: pause only (no duration change => no restart => no jerk) */
  ${Marquee}[data-pause="1"]:hover & {
    animation-play-state: paused;
  }

  @keyframes ticker-marquee {
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(-50%, 0, 0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: none;
  }
`;

export const Row = styled.div`
  display: inline-flex;
  align-items: center;
  gap: var(--gap, 28px);
  padding: 14px 0;
`;

export const Item = styled.span<{ "data-uppercase"?: "1" | "0" }>`
  display: inline-flex;
  align-items: center;

  /* variant=text: áp style chữ giống ảnh */
  ${Marquee}[data-variant="text"] & {
    font-weight: 850;
    font-size: 12px;
    letter-spacing: 0.28px;
    color: rgba(255, 255, 255, 0.85);

    ${({ ["data-uppercase"]: u }) => (u === "1" ? "text-transform: uppercase;" : "")}
  }
`;

export const ItemLink = styled.a<{ "data-uppercase"?: "1" | "0" }>`
  display: inline-flex;
  align-items: center;
  text-decoration: none;

  ${Marquee}[data-variant="text"] & {
    font-weight: 850;
    font-size: 12px;
    letter-spacing: 0.28px;
    color: rgba(255, 255, 255, 0.85);

    ${({ ["data-uppercase"]: u }) => (u === "1" ? "text-transform: uppercase;" : "")}
  }

  &:hover {
    ${Marquee}[data-variant="text"] & {
      color: rgba(255, 255, 255, 0.95);
    }
  }
`;
