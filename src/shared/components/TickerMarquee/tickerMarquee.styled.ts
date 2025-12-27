import styled from "styled-components";

export const Wrap = styled.div`
  width: 100%;
`;

export const Title = styled.div`
  text-align: center;
  color: var(--accent);
  font-weight: 800;
  letter-spacing: 0.2px;
  /* margin-bottom: 14px; */
  margin-top: 14px;
`;

export const Marquee = styled.div`
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  text-align: left;

  /* chống jump/reflow */
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
  padding-right: var(--gap, 28px);
`;

export const Item = styled.span`
  display: inline-flex;
  align-items: center;

  /* default “text look” (item custom vẫn ok vì node tự style) */
  font-weight: 850;
  font-size: 12px;
  letter-spacing: 0.28px;
  color: rgba(255, 255, 255, 0.85);
  text-transform: uppercase;

  /* img đẹp hơn */
  img {
    display: block;
  }
`;
