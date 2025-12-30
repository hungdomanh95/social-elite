import styled from "styled-components";

const bp = {
  md: 768,
  lg: 1024,
};

export const Platform = styled.section`
  background: var(--footer-bg);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05),
    inset 0 -1px 0 rgba(0, 0, 0, 0.2);
  padding: 84px 0 70px;

  @media (max-width: ${bp.lg}px) {
    padding: 72px 0 58px;
  }

  @media (max-width: ${bp.md}px) {
    padding: 56px 0 44px;
  }
`;

/**
 * Desktop: grid 2x2 để canh thẳng hàng như ảnh trên.
 * Mobile: chuyển sang flex-column để LeftGroup / RightGroup là 2 block độc lập.
 */
export const Inner = styled.div`
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 24px;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "title image"
    "listL listR";
  column-gap: clamp(48px, 6vw, 140px);
  row-gap: clamp(34px, 4.2vw, 72px);

  align-items: start;
  justify-items: center;

  @media (max-width: ${bp.lg}px) {
    padding: 0 18px;
  }

  @media (max-width: ${bp.md}px) {
    display: flex;
    flex-direction: column;
    gap: 28px;
    justify-items: unset;
  }
`;

/**
 * Key: Desktop dùng display: contents để con participate vào grid.
 * Mobile chuyển về flex để giữ “nội dung đi cùng nhau”.
 */
export const LeftGroup = styled.div`
  display: contents;

  @media (max-width: ${bp.md}px) {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
`;

export const RightGroup = styled.div`
  display: contents;

  @media (max-width: ${bp.md}px) {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
`;

export const TitleBlock = styled.div`
  grid-area: title;
  justify-self: center;
  width: 100%;
  max-width: 520px;

  @media (max-width: ${bp.md}px) {
    max-width: 100%;
  }
`;

export const ImageBlock = styled.div`
  grid-area: image;
  justify-self: center;
  width: 100%;
  max-width: 740px;

  @media (max-width: ${bp.lg}px) {
    max-width: 640px;
  }

  @media (max-width: ${bp.md}px) {
    max-width: 100%;
  }
`;

export const ListLeft = styled.div`
  grid-area: listL;
  width: 100%;
  max-width: 520px;
  justify-self: center;

  @media (max-width: ${bp.md}px) {
    max-width: 100%;
    justify-self: unset;
  }
`;

export const ListRight = styled.div`
  grid-area: listR;
  width: 100%;
  max-width: 520px;
  justify-self: center;

  @media (max-width: ${bp.md}px) {
    max-width: 100%;
    justify-self: unset;
  }
`;

export const TitleStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: ${bp.lg}px) {
    gap: 6px;
  }

  @media (max-width: ${bp.md}px) {
    gap: 4px;
  }
`;

export const TitleLine = styled.div`
  // font-weight: 800;
  // letter-spacing: -0.8px;
  line-height: 0.92;
  font-size: clamp(44px, 4.2vw, 72px);

  @media (max-width: ${bp.md}px) {
    line-height: 1;
  // letter-spacing: -0.5px;
  }
`;

export const TitleAccent = styled.span`
  color: var(--accent);
`;

export const ImageLeftFooter = styled.img`
  width: 100%;
  height: auto;
  display: block;
  transform: translateY(6px);
  filter: drop-shadow(0 18px 50px rgba(0, 0, 0, 0.45));

  @media (max-width: ${bp.md}px) {
    transform: none;
  }
`;

export const FeatureList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  display: grid;
  gap: 14px;

  @media (max-width: ${bp.lg}px) {
    gap: 12px;
  }

  @media (max-width: ${bp.md}px) {
    gap: 10px;
  }
`;

export const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

export const Dot = styled.span`
  flex: 0 0 auto;
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: var(--accent);
  box-shadow: 0 0 18px rgba(34, 197, 94, 0.35);
  margin-top: 8px;

  @media (max-width: ${bp.md}px) {
    margin-top: 7px;
  }
`;

export const FeatureText = styled.span`
  color: rgba(255, 255, 255, 0.82);
  // font-weight: 500;
  // letter-spacing: 0.1px;
  line-height: 1.55;
  font-size: 16px;

  @media (max-width: ${bp.lg}px) {
    font-size: 15px;
  }

  @media (max-width: ${bp.md}px) {
    font-size: 14px;
  }
`;
