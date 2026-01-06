import styled from "styled-components";

const bp = { md: 768 };

export const Container = styled.div`
  width: min(1320px, calc(100% - 80px));
  margin: 0 auto;

  @media (max-width: ${bp.md}px) {
    width: min(1320px, calc(100% - 28px));
  }
`;
