import styled from "styled-components";

const bp = { md: 768, lg: 1024 };

export const Section = styled.section`
  position: relative;
  padding: 28px 0 64px;
  background: #050707;
`;

export const Container = styled.div`
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 24px;

  @media (max-width: ${bp.md}px) {
    padding: 0 16px;
  }
`;

/** 1 stage duy nhất như hình */
export const Stage = styled.div`
  --imgH: 300px;

  position: relative;
  overflow: hidden;

  height: 360px;
  border-radius: 0;
  background:
    radial-gradient(900px 360px at 50% 0%, rgba(255,255,255,0.05) 0%, transparent 55%),
    radial-gradient(900px 420px at 40% 30%, rgba(255,255,255,0.02) 0%, transparent 60%),
    #050707;

  /* tạo cảm giác “khung” tối như ảnh */
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.04);

  @media (max-width: ${bp.lg}px) {
    height: 340px;
  }

  @media (max-width: ${bp.md}px) {
    height: 320px;
  }
`;

export const Title = styled.div`
  position: absolute;
  top: 34px;
  left: 40%;
  transform: translateX(-50%);
  z-index: 5;

  font-size: 28px;
  font-weight: 900;
  letter-spacing: -0.6px;
  color: rgba(255,255,255,0.9);

  .accent {
    color: var(--accent);
  }

  @media (max-width: ${bp.md}px) {
    top: 24px;
    left: 44%;
    font-size: 22px;
  }
`;

/* ===== BACKGROUND SHAPES ===== */

/** Left dark shape: bo tròn lớn bên trái + nhọn ở giữa */
export const BgLeft = styled.div`
  position: absolute;
  left: 0;
  right: 46%;
  bottom: 34px;
  height: 210px;

  background: linear-gradient(135deg, rgba(255,255,255,0.14), rgba(255,255,255,0.06));
  border-radius: 999px 22px 22px 999px;

  /* mũi nhọn hướng sang phải */
  clip-path: polygon(0% 0%, 88% 0%, 100% 50%, 88% 100%, 0% 100%);

  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.08),
    0 22px 55px rgba(0,0,0,0.55);

  @media (max-width: ${bp.md}px) {
    bottom: 30px;
    height: 190px;
    right: 44%;
  }
`;

/** Right green shape: nhọn ở giữa + bo tròn nhẹ */
export const BgRight = styled.div`
  position: absolute;
  left: 44%;
  right: 0;
  bottom: 34px;
  height: 210px;

  background: linear-gradient(135deg, rgba(34,197,94,0.95), rgba(34,197,94,0.75));
  border-radius: 22px 22px 22px 22px;

  /* mũi nhọn hướng sang trái */
  clip-path: polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%, 12% 50%);

  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.12),
    0 22px 55px rgba(0,0,0,0.55);

  @media (max-width: ${bp.md}px) {
    bottom: 30px;
    height: 190px;
    left: 42%;
  }
`;

/* ===== PEOPLE LAYOUT ===== */

const PeopleBase = styled.div`
  position: absolute;
  bottom: 34px;
  height: var(--imgH);
  display: flex;
  align-items: flex-end;
  z-index: 6;
  overflow: visible;

  @media (max-width: ${bp.md}px) {
    bottom: 30px;

    /* mobile nhiều người thì scroll ngang */
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;

    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

/** Nhóm trái bám sát trái, chiếm rộng hơn nửa để tới gần seam */
export const PeopleLeft = styled(PeopleBase)`
  left: 18px;
  width: 58%;
  justify-content: flex-start;

  /* sát nhau hơn */
  --overlap: 64px;

  @media (max-width: ${bp.lg}px) {
    --overlap: 56px;
  }
  @media (max-width: ${bp.md}px) {
    width: 62%;
    --overlap: 28px;
  }
`;

/** Nhóm phải bám sát phải, đè dần từ trái sang phải */
export const PeopleRight = styled(PeopleBase)`
  right: 18px;
  width: 58%;
  justify-content: flex-end;

  --overlap: 70px;

  @media (max-width: ${bp.lg}px) {
    --overlap: 60px;
  }
  @media (max-width: ${bp.md}px) {
    width: 62%;
    --overlap: 30px;
  }
`;

export const PersonLink = styled.a`
  text-decoration: none;
`;

export const Person = styled.div<{ $idx: number }>`
  position: relative;
  flex: 0 0 auto;

  /* ✅ chồng theo thứ tự: item sau đè item trước */
  z-index: ${({ $idx }) => 10 + $idx};

  /* ✅ overlap (hình sát nhau) */
  margin-left: ${({ $idx }) => ($idx === 0 ? "0" : "calc(var(--overlap) * -1)")};

  /* ❌ không hover shadow/scale */
  transition: none;

  @media (max-width: ${bp.md}px) {
    scroll-snap-align: start;
  }
`;

export const PersonImg = styled.img`
  height: var(--imgH);
  width: auto;
  display: block;
  object-fit: contain;

  /* giống ảnh: có shadow rất nhẹ để tách nền */
  filter: drop-shadow(0 8px 18px rgba(0, 0, 0, 0.45));

  @media (max-width: ${bp.lg}px) {
    height: calc(var(--imgH) - 18px);
  }

  @media (max-width: ${bp.md}px) {
    height: calc(var(--imgH) - 56px);
  }
`;
