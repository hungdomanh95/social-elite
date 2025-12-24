import styled from "styled-components";

const bp = {
  md: 768,
  lg: 1024,
};

export const Section = styled.section`
  width: 100%;
`;

export const VideoWrap = styled.div`
  position: relative;
  width: 100%;

  /* full width banner */
  border-bottom: 1px solid var(--border);

  /* responsive ratio */
  aspect-ratio: 21 / 9;

  @media (max-width: ${bp.lg}px) {
    aspect-ratio: 16 / 9;
  }

  @media (max-width: ${bp.md}px) {
    aspect-ratio: 4 / 3;
  }

  /* click để toggle sound nhưng không hiện cursor khi hover */
  cursor: default;
  outline: none;
  user-select: none;

  &:hover {
    cursor: none;
  }

  &:focus-visible {
    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.18);
  }
`;

export const Video = styled.video`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: #000;
`;
