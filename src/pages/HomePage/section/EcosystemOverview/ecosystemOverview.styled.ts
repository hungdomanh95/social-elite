import styled from "styled-components";

const bp = {
  md: 768,
  lg: 1024,
};

// export const Section = styled.section`
//   position: relative;
//   padding: 72px 0 0;

//   @media (max-width: ${bp.lg}px) {
//     padding: 62px 0 0;
//   }
//   @media (max-width: ${bp.md}px) {
//     padding: 46px 0 0;
//   }

//   /* reveal animation */
//   [data-reveal] {
//     opacity: 0;
//     transform: translateY(10px);
//     animation: eco-reveal 700ms ease forwards;
//   }

//   @keyframes eco-reveal {
//     to {
//       opacity: 1;
//       transform: translateY(0);
//     }
//   }
// `;

export const Section = styled.section`
  position: relative;
  overflow: hidden; /* ✅ để glow không tràn ra ngoài */
  padding: 72px 0 0;

  /* ✅ nền + vignette nhẹ */
  background:
    radial-gradient(1200px 700px at 50% 18%, rgba(255,255,255,0.03) 0%, transparent 60%),
    radial-gradient(900px 520px at 10% 10%, rgba(255,255,255,0.02) 0%, transparent 55%),
    #050707;

  @media (max-width: ${bp.lg}px) {
    padding: 62px 0 0;
  }
  @media (max-width: ${bp.md}px) {
    padding: 46px 0 0;
  }

  /* ✅ green glow “lan” từ dưới lên giống ảnh */
  &::before {
    content: "";
    position: absolute;
    inset: -20%;
    pointer-events: none;
    z-index: 0;

    background:
      radial-gradient(60% 55% at 18% 100%,
        rgba(34, 197, 94, 0.28) 0%,
        rgba(34, 197, 94, 0.16) 25%,
        rgba(34, 197, 94, 0.06) 42%,
        transparent 62%),
      radial-gradient(55% 50% at 55% 105%,
        rgba(34, 197, 94, 0.18) 0%,
        rgba(34, 197, 94, 0.10) 30%,
        transparent 60%),
      radial-gradient(40% 35% at 88% 18%,
        rgba(34, 197, 94, 0.10) 0%,
        transparent 55%);
  }

  /* ✅ “band” xanh ở phần đáy (nơi ticker chạy) */
  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 180px;
    pointer-events: none;
    z-index: 0;

    background: linear-gradient(
      to top,
      rgba(34, 197, 94, 0.22) 0%,
      rgba(34, 197, 94, 0.10) 35%,
      transparent 100%
    );
  }

  /* ✅ đảm bảo content nằm trên glow */
  > * {
    position: relative;
    z-index: 1;
  }

  /* reveal animation */
  [data-reveal] {
    opacity: 0;
    transform: translateY(10px);
    animation: eco-reveal 700ms ease forwards;
  }

  @keyframes eco-reveal {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;


export const Container = styled.div`
  max-width: 1320px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  /* padding: 0 128px; */

  @media (max-width: ${bp.md}px) {
    padding: 0 16px;
  }
`;

export const Content = styled.div`
  /* max-width: 860px; */
`;

export const Heading = styled.div`
  display: grid;
  gap: 8px;
`;

export const TitleLine = styled.div`
  font-weight: 600;
  font-size: clamp(46px, 5.2vw, 72px); /* ✅ max 72px */
  letter-spacing: -1px;
  line-height: 1.02; /* ✅ giữ gọn khi chữ to */
  color: rgba(255, 255, 255, 0.92);
`;

export const TitleLineAccent = styled.div`
  font-weight: 600;
  font-size: clamp(46px, 5.2vw, 72px); /* ✅ max 72px */
  letter-spacing: -1px;
  line-height: 1.02;
  color: var(--accent);
`;
export const CTARow = styled.div`
  margin-top: 14px;
`;

export const CTAButton = styled.button`
  border: 0;
  cursor: pointer;

  padding: 8px 14px;
  border-radius: 999px;

  font-weight: 800;
  font-size: 12px;
  letter-spacing: 0.2px;

  color: #0b1a10;
  background: var(--accent);
  box-shadow: 0 10px 30px rgba(34, 197, 94, 0.18);

  transition: transform 160ms ease, box-shadow 160ms ease, filter 160ms ease;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(1.02);
    box-shadow: 0 12px 34px rgba(34, 197, 94, 0.22);
  }
`;

export const Badges = styled.div`
  margin-top: 18px;
  display: grid;
  gap: 6px;

  @media (max-width: ${bp.md}px) {
    gap: 8px;
  }
`;

export const Badge = styled.div`
  font-size: 24px;
  line-height: 1.4;
  font-weight: 700;
  letter-spacing: 0.1px;
  color: rgba(255, 255, 255,1);
`;

export const BadgeAccent = styled.span`
  color: var(--accent);
  font-weight: 800;
`;

export const Stats = styled.div`
  margin-top: 26px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 80px;
  /* max-width: 760px; */

  @media (max-width: ${bp.md}px) {
    grid-template-columns: 1fr;
    gap: 14px;
    max-width: 420px;
  }
`;

export const StatCard = styled.div`
  display: grid;
  gap: 6px;
`;

export const StatNumber = styled.div`
  font-size: clamp(40px, 6.2vw, 96px);
  font-weight: 600;
  letter-spacing: -0.8px;
  line-height: 1;
  color: var(--accent);
`;

export const StatLabel = styled.div`
  font-size: 28px;
  color: rgba(255, 255, 255, 1);
  line-height: 1.35;
`;
