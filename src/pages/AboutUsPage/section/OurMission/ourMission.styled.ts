import styled from "styled-components";
import { Container as BaseContainer } from "@/shared/components/Container";

const bp = { md: 768, lg: 1024 };
const ACCENT = "var(--accent, #22c55e)";
const FONT = "var(--font-body)";

export const MissionSection = styled.section`
  width: 100%;
  font-family: ${FONT};
  background: #eef6f2;
  padding: 56px 0 74px;

  @media (max-width: ${bp.md}px) {
    padding: 42px 0 56px;
  }
`;

export const Container = styled(BaseContainer)`
  max-width: 1100px;
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
    font-family: var(--font-display);
    font-size: var(--text-5xl);
    font-weight: var(--fw-regular);
  }

  @media (max-width: ${bp.md}px) {
    .text {
      font-size: var(--text-4xl, 36px);
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
  line-height: var(--leading-display, 1.05);
`;

export const MissionKicker = styled.div`
  color: ${ACCENT};
  font-family: var(--font-display);
  font-size: var(--text-7xl);

  @media (max-width: ${bp.md}px) {
    font-size: var(--h-64, 64px);
  }
`;

export const MissionMain = styled.div`
  margin-top: 10px;
  color: #fff;
  font-family: var(--font-display);
  font-size: var(--h-64, 64px);
  line-height: var(--leading-display, 1.05);
  letter-spacing: -0.02em;

  @media (max-width: ${bp.md}px) {
    font-size: var(--text-5xl, 48px);
  }
`;

export const MissionRight = styled.div`
  flex: 1 1 auto;

  p {
    margin: 0 0 18px;
    font-size: var(--text-sm);
    line-height: var(--leading-relaxed, 1.625);
  }
  p:last-child {
    margin-bottom: 0;
  }

  @media (max-width: ${bp.md}px) {
    font-size: var(--text-sm, 14px);
    line-height: var(--leading-relaxed, 1.625);

    p {
      margin-bottom: 14px;
    }
  }
`;
