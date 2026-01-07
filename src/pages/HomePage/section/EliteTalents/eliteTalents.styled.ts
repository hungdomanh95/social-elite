
import styled from "styled-components";
import { Container as BaseContainer } from "@/shared/components/Container";

const bp = { md: 768, lg: 1024 };

export const Section = styled.section`
  position: relative;
  overflow-x: hidden; /* ✅ chặn scroll ngang */
  padding: 72px 0 36px;
  background: #050707;
`;

export const Container = styled(BaseContainer)`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;

  &::after {
    content: "";
    flex: 0 0 50%;
  }

  @media (max-width: ${bp.lg}px) {
    &::after {
      display: none;
      flex: 0 0 0;
    }
  }
`;


export const Title = styled.h2`
  flex: 0 0 50%;
  display: flex;
  justify-content: flex-start; /* ✅ bám line trái */
  margin: 0 0 18px;

  font-size: var(--text-4xl);
  font-weight: var(--fw-semibold);
  text-align: left;
  color: rgba(255, 255, 255, 0.95);

  .inner {
    width: 100%;
    max-width: 560px;
    display: block;
  }

  .accent {
    color: var(--accent, #22c55e);
  }

  @media (max-width: ${bp.lg}px) {
    flex: 0 0 100%;
    .inner { max-width: none; }
  }
`;


export const FullBleed = styled.div`
  width: 100%;
  overflow: hidden; /* ✅ ảnh/đổ bóng (nếu có) không làm tràn */
`;

export const TalentsImg = styled.img`
  width: 100%;
  max-width: 100%;
  height: auto;
  display: block; /* ✅ tránh lệch/whitespace */
  user-select: none;
  pointer-events: none;
`;
