import styled from "styled-components";

const bp = { md: 768, lg: 1024 };

export const Section = styled.section`
  width: 100%;
  background: #000;
  padding: 40px 0 24px;
  overflow: hidden;

  @media (max-width: ${bp.md}px) {
    padding: 28px 0 18px;
  }
`;

export const Container = styled.div`
  width: min(1180px, calc(100% - 40px));
  margin: 0 auto;

  @media (max-width: ${bp.md}px) {
    width: min(1180px, calc(100% - 28px));
  }
`;

export const Title = styled.h2`
  font-size: clamp(28px, 3.2vw, 48px);
  font-weight: 700;
  text-align: center;
  color: #fff;
  margin: 0 0 18px;

  .accent {
    color: var(--accent, #00ff00);
  }

  @media (max-width: ${bp.md}px) {
    font-size: clamp(22px, 7vw, 34px);
    margin-bottom: 14px;
  }
`;

export const Stage = styled.div`
  width: 100vw;
  margin-left: calc(50% - 50vw);

  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;
  align-items: end;

  padding-left: max(0px, env(safe-area-inset-left));
  padding-right: max(0px, env(safe-area-inset-right));

  @supports (width: 100dvw) {
    width: 100dvw;
    margin-left: calc(50% - 50dvw);
  }

  @media (max-width: ${bp.md}px) {
    grid-template-columns: 1fr;
    gap: 14px;
  }
`;

export const SideWrapper = styled.div<{ $side: "left" | "right" }>`
  position: relative;
  width: 100%;
  aspect-ratio: 1140 / 512;

  --nudge-x: 0px;
  --nudge-y: 0px;

  --talent-h: 118%;
  --overlap: -45px;

  --right-scale: 1.1;
  --right-mask: 110%;

  ${({ $side }) =>
    $side === "right"
      ? `
        --nudge-x: 0px;
        --nudge-y: -10px;
      `
      : ``}

  @media (max-width: ${bp.md}px) {
    aspect-ratio: 1140 / 700;

    --talent-h: 108%;
    --overlap: -26px;

    --right-scale: 1.06;
    --right-mask: 106%;

    ${({ $side }) =>
      $side === "right"
        ? `
          --nudge-y: -6px;
        `
        : ``}
  }
`;

export const SideBg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;

  object-fit: contain;
  object-position: left center;

  pointer-events: none;
  user-select: none;
  z-index: 0;
`;

export const SideBgRight = styled(SideBg)`
  object-position: right center;

  transform: translate(var(--nudge-x), var(--nudge-y)) scale(var(--right-scale));
  transform-origin: right center;
`;

export const TalentContainer = styled.div<{ $mask: string }>`
  position: absolute;
  inset: 0;
  z-index: 2;

  display: flex;
  align-items: flex-end;
  justify-content: flex-start;

  -webkit-mask-image: url(${(p) => p.$mask});
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: left center;
  -webkit-mask-size: contain;

  mask-image: url(${(p) => p.$mask});
  mask-repeat: no-repeat;
  mask-position: left center;
  mask-size: contain;
  mask-mode: alpha;

  @supports not ((-webkit-mask-image: url("")) or (mask-image: url(""))) {
    overflow: hidden;
    border-radius: 18px;
  }
`;

export const TalentContainerRight = styled(TalentContainer)`
  flex-direction: row-reverse;

  -webkit-mask-position: right center;
  mask-position: right center;

  -webkit-mask-size: var(--right-mask) var(--right-mask);
  mask-size: var(--right-mask) var(--right-mask);

  transform: translate(var(--nudge-x), var(--nudge-y));
`;

export const TalentItem = styled.div`
  position: relative;
  height: var(--talent-h);
  flex-shrink: 0;
  margin: 0 var(--overlap);
`;

export const TalentImg = styled.img`
  height: 100%;
  width: auto;
  display: block;
  object-fit: contain;
  object-position: bottom center;
`;
