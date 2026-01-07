import styled from "styled-components";

export const Page = styled.main`
  --accent: #1ed75f;
  width: 100%;
  min-height: 100vh;
  background: #000;
  color: #fff;
  overflow-x: hidden;

  /* simple reveal default */
  [data-reveal] {
    opacity: 0;
    transform: translateY(10px);
    animation: bs-reveal 700ms ease forwards;
  }

  @keyframes bs-reveal {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    [data-reveal] {
      opacity: 1;
      transform: none;
      animation: none;
    }
  }
`;