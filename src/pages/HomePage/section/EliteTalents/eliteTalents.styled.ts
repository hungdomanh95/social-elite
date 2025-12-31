
import styled from "styled-components";

const bp = { md: 768, lg: 1024 };

export const Section = styled.section`
  position: relative;
  overflow-x: hidden; /* ✅ chặn scroll ngang */
  padding: 72px 0 36px;
  background: #050707;
`;

export const Container = styled.div`
  width: min(1320px, calc(100% - 40px));
  margin: 0 auto;

  display: flex;
  align-items: flex-end;
  justify-content: flex-start;

  &::after {
    content: "";
    flex: 0 0 50%;
  }

  @media (max-width: ${bp.md}px) {
    width: min(1320px, calc(100% - 28px));
  }

  @media (max-width: ${bp.lg}px) {
    &::after {
      display: none;
      flex: 0 0 0;
    }
  }
`;

export const Title = styled.h2`
  flex: 0 0 50%;          /* ✅ nằm trong nửa trái */
  display: flex;
  justify-content: center; /* ✅ center trong nửa trái */
  margin: 0 0 18px;
  font-size: clamp(28px, 3.2vw, 48px);
  font-weight: 600;
  text-align: left;
  color: rgba(255, 255, 255, 0.95);

  .inner {
    width: min(560px, 100%); /* ✅ giống “center của 50%” như hình */
    display: block;
  }

  .accent {
    color: var(--accent, #22c55e);
  }

  @media (max-width: ${bp.lg}px) {
    flex: 0 0 100%;
    justify-content: flex-start;

    .inner {
      width: auto;
    }
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