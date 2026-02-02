import styled from "styled-components";

const bp = {
  md: 768,
  lg: 1024,
};

export const Section = styled.section`
  width: 100%;
`;

export const SoundTag = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  opacity: 0;

  display: inline-flex;
  align-items: center;
  gap: 8px;

  padding: 10px 14px;
  border-radius: 999px;

  background: var(--accent);
  color: #111;
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.2);

  line-height: var(--leading-none, 1);

  pointer-events: none;
  user-select: none;
  white-space: nowrap;

  transform: translate3d(
      calc(var(--cursor-x, 0px) + 14px),
      var(--cursor-y, 0px),
      0
    )
    translate3d(0, -50%, 0) scale(0.96);

  transition: opacity 120ms ease, transform 90ms ease;
  will-change: transform, opacity;

  @media (max-width: ${bp.md}px) {
    padding: 9px 12px;
    gap: 7px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: opacity 0ms linear, transform 0ms linear;
  }
`;

export const SoundDot = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background: #111;

  @media (max-width: ${bp.md}px) {
    width: 11px;
    height: 11px;
  }
`;

export const SoundText = styled.span`
  font-size: var(--text-base, 16px);
  font-weight: var(--fw-semibold);

  @media (max-width: ${bp.md}px) {
    font-size: var(--text-sm, 14px);
  }
`;

export const VideoWrap = styled.div`
  position: relative;
  width: 100%;
  border-bottom: 1px solid var(--border);

  /* ✅ Luôn giữ đúng 16:9 (mobile cũng 16:9) */
  aspect-ratio: 16 / 9;

  /* ✅ quan trọng nếu video cover và có border-radius sau này */
  overflow: hidden;

  cursor: default;
  outline: none;
  user-select: none;

  /* (Tuỳ chọn) Nếu trang của bạn có padding container, bật đoạn này để video full-bleed 100vw trên mobile */
  /* @media (max-width: ${bp.md}px) {
    width: 100vw;
    margin-left: calc(50% - 50vw);
    margin-right: calc(50% - 50vw);
  } */

  &[data-hide-cursor="true"]:hover {
    cursor: none;
  }

  &[data-tag-visible="true"] ${SoundTag} {
    opacity: 1;
    transform: translate3d(
        calc(var(--cursor-x, 0px) + 14px),
        var(--cursor-y, 0px),
        0
      )
      translate3d(0, -50%, 0) scale(1);
  }

  &:focus-visible {
    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.18);
  }

  @media (hover: none) {
    cursor: pointer;

    &:hover {
      cursor: pointer;
    }

    ${SoundTag} {
      display: none;
    }
  }
`;

export const Video = styled.video`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* ✅ video 16:9 + container 16:9 => gần như không crop */
  background: #000;
`;
