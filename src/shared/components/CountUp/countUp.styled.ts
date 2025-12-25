import styled from "styled-components";

export const Wrap = styled.span`
  display: inline-block;

  /* bounce nhẹ khi done */
  &[data-bounce="1"][data-done="1"] {
    animation: count-bounce 420ms ease;
  }

  @keyframes count-bounce {
    0% {
      transform: scale(1);
    }
    55% {
      transform: scale(1.045);
    }
    100% {
      transform: scale(1);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none !important;
    transform: none !important;
  }
`;
