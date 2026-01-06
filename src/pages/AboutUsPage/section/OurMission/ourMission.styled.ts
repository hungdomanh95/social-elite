import styled from "styled-components";
export { Container } from "@/shared/components/Container";

const bp = { md: 768, lg: 1024 };
const ACCENT = "var(--accent, #22c55e)";
const FONT = '"Plus Jakarta Sans", ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial';

export const MissionSection = styled.section`
  width: 100%;
  font-family: ${FONT};
  background: #eef6f2;
  padding: 56px 0 74px;

  @media (max-width: ${bp.md}px) {
    padding: 42px 0 56px;
  }
`;

export const SectionHeading = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 0 0 18px;

  .bar {
    width: 3px;
    height: 44px;
    background: ${ACCENT};
    border-radius: 999px;
    box-shadow: 0 0 14px rgba(34, 197, 94, 0.22);
  }

  .text {
    color: ${ACCENT};
    font-size: 58px;
    line-height: 1.05;
    letter-spacing: -0.01em;
    font-weight: 600;
  }

  @media (max-width: ${bp.md}px) {
    .text {
      font-size: 40px;
    }
  }
`;

export const MissionCard = styled.div`
  width: 100%;
  border-radius: 14px;

  /* padding giống design (gọn hơn code trước) */
  padding: 44px 56px;

  background:
    radial-gradient(900px 320px at 30% 10%, rgba(255, 255, 255, 0.06), transparent 62%),
    linear-gradient(110deg, #0b0b0b 0%, #0f2a1a 36%, #166b34 70%, #1fe06c 100%);

  box-shadow:
    0 18px 48px rgba(0, 0, 0, 0.28);

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 56px;

  @media (max-width: ${bp.lg}px) {
    flex-direction: column;
    align-items: stretch;
    gap: 26px;
    padding: 34px 24px;
  }
`;

export const MissionLeft = styled.div`
  flex: 0 0 auto;
`;

export const MissionKicker = styled.div`
  color: ${ACCENT};
  font-size: 96px;
  line-height: 1;
  letter-spacing: -0.02em;

  @media (max-width: ${bp.md}px) {
    font-size: 64px;
  }
`;

export const MissionMain = styled.div`
  margin-top: 10px;
  color: #fff;
  font-size: 64px;
  line-height: 1.06;
  letter-spacing: -0.02em;

  @media (max-width: ${bp.md}px) {
    font-size: 44px;
  }
`;

export const MissionRight = styled.div`
  flex: 1 1 auto;
  color: rgba(255, 255, 255, 0.76);
  font-size: 20px;
  line-height: 1.65;

  p {
    margin: 0 0 18px;
  }
  p:last-child {
    margin-bottom: 0;
  }

  @media (max-width: ${bp.md}px) {
    font-size: 14px;
    line-height: 1.7;

    p {
      margin-bottom: 14px;
    }
  }
`;
