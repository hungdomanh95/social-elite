import styled from "styled-components";

const bp = { md: 768, lg: 1024 };

export const Visual = styled.div`
  display: grid;
  place-items: center;
  min-width: 0;

  @media (max-width: ${bp.lg}px) {
    margin-top: 18px;
  }
`;

export const OrbitRoot = styled.div`
  width: min(520px, 44vw);
  aspect-ratio: 1 / 1;
  position: relative;

  /* ✅ defaults */
  --avatar-scale: 1;
  --dash-scale: 1;
  --center-size: 38%;
  --center-logo: 64%;

  @media (max-width: ${bp.lg}px) {
    width: min(560px, 88vw);
  }

  /* ✅ <= md: avatar to hơn, dashed ring co lại, center giảm theo tỷ lệ */
  @media (max-width: ${bp.md}px) {
    --avatar-scale: 1.5;
    --dash-scale: 0.86;

    /* 38% / 1.5 ≈ 25.33% -> lấy 25.5% cho đẹp */
    --center-size: 35%;

    /* logo giữ tương đối để vẫn rõ */
    --center-logo: 64%;
  }
`;

export const Glow = styled.div`
  position: absolute;
  inset: -10%;
  border-radius: 999px;
  pointer-events: none;
  z-index: 0;

  background:
    radial-gradient(closest-side, rgba(34, 197, 94, 0.26), transparent 64%),
    radial-gradient(closest-side, rgba(34, 197, 94, 0.12), transparent 72%);
`;

export const OuterRing = styled.div`
  position: absolute;
  inset: 6%;
  border-radius: 999px;
  pointer-events: none;
  z-index: 1;

  border: 2px solid rgba(34, 197, 94, 0.38);
`;

export const DashedRing = styled.div`
  position: absolute;
  inset: 18%;
  border-radius: 999px;
  pointer-events: none;
  z-index: 2;

  border: 2px dashed rgba(255, 255, 255, 0.5);
  opacity: 0.65;

  transform-origin: 50% 50%;
  will-change: transform;
`;

export const AvatarsLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 3;
`;

export const AvatarSlot = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;

  /* ✅ slot là 1 điểm (0x0) => rotate/translateX đúng tâm tuyệt đối */
  width: 0;
  height: 0;

  transform-origin: 0 0;
  will-change: transform;
`;

export const Avatar = styled.div`
  position: absolute;
  left: 0;
  top: 0;

  /* ✅ scale avatar theo bp.md */
  transform: translate(-50%, -50%) scale(var(--avatar-scale));

  border-radius: 999px;
  overflow: hidden;

  border: 3px solid rgba(34, 197, 94, 0.9);
  box-shadow:
    0 12px 28px rgba(0, 0, 0, 0.32),
    0 10px 24px rgba(34, 197, 94, 0.14);

  background: rgba(255, 255, 255, 0.06);
`;

export const AvatarInner = styled.div`
  width: 100%;
  height: 100%;
  transform-origin: 50% 50%;
  will-change: transform;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export const Center = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  width: var(--center-size);
  height: var(--center-size);
  transform: translate(-50%, -50%);
  border-radius: 999px;
  z-index: 4;

  display: grid;
  place-items: center;

  background: radial-gradient(
    circle at 40% 35%,
    rgba(34, 197, 94, 1),
    rgba(34, 197, 94, 0.78)
  );
  box-shadow:
    0 18px 46px rgba(34, 197, 94, 0.18),
    0 30px 80px rgba(0, 0, 0, 0.35);

  outline: 1px solid rgba(255, 255, 255, 0.08);
`;

export const CenterGlow = styled.div`
  position: absolute;
  inset: -18%;
  border-radius: 999px;
  pointer-events: none;

  background: radial-gradient(
    closest-side,
    rgba(34, 197, 94, 0.22),
    transparent 70%
  );
`;

export const CenterLogo = styled.img`
  width: var(--center-logo);
  height: auto;
  display: block;
  user-select: none;
  pointer-events: none;
`;
