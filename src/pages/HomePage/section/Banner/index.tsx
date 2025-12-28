import { useEffect, useRef, useState } from "react";
import * as S from "./banner.styled";

type BannerProps = {
  videoSrc: string;
  posterSrc?: string;
  mutedInitially?: boolean;
};

export default function Banner({
  videoSrc,
  posterSrc,
  mutedInitially = true,
}: BannerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const tagRef = useRef<HTMLDivElement | null>(null);

  const [muted, setMuted] = useState<boolean>(mutedInitially);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const rafRef = useRef<number | null>(null);
  const lastPtRef = useRef<{ x: number; y: number } | null>(null);
  const tagSizeRef = useRef<{ w: number; h: number }>({ w: 140, h: 44 });

  const active = hovered || focused;

  const HIDE_CURSOR_ON_HOVER = false; // CURSOR: đổi thành true để ẩn cursor khi hover
  const USE_RAF_THROTTLE = false; // DELAY (move): true = có “trễ” nhẹ nhưng mượt/ít update, false = bám sát chuột

  const syncMuted = (next: boolean) => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = next;
    if (!next) el.volume = 1;
    setMuted(next);
  };

  const toggleSound = async () => {
    const el = videoRef.current;
    if (!el) return;

    if (el.paused) {
      try {
        await el.play();
      } catch {
        //
      }
    }

    syncMuted(!muted);
  };

  const setCursorVars = (clientX: number, clientY: number) => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const rect = wrap.getBoundingClientRect();
    const { w, h } = tagSizeRef.current;

    const ox = 14; // lệch sang phải
    const pad = 10;

    let x = clientX - rect.left;
    let y = clientY - rect.top;

    const halfH = h / 2;

    const maxX = Math.max(pad, rect.width - w - pad - ox);
    const minY = pad + halfH;
    const maxY = Math.max(minY, rect.height - pad - halfH);

    x = Math.max(pad, Math.min(maxX, x));
    y = Math.max(minY, Math.min(maxY, y));

    wrap.style.setProperty("--cursor-x", `${x}px`);
    wrap.style.setProperty("--cursor-y", `${y}px`);
  };


  const onPointerEnter: React.PointerEventHandler<HTMLDivElement> = (e) => {
    setHovered(true);
    setCursorVars(e.clientX, e.clientY);
  };

  const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!USE_RAF_THROTTLE) {
      setCursorVars(e.clientX, e.clientY);
      return;
    }

    lastPtRef.current = { x: e.clientX, y: e.clientY };

    if (rafRef.current != null) return;
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      const pt = lastPtRef.current;
      if (!pt) return;
      setCursorVars(pt.x, pt.y);
    });
  };

  const onPointerLeave: React.PointerEventHandler<HTMLDivElement> = () => {
    setHovered(false);
    lastPtRef.current = null;
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const onFocus: React.FocusEventHandler<HTMLDivElement> = () => {
    setFocused(true);
    const wrap = wrapRef.current;
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    setCursorVars(rect.left + rect.width / 2, rect.top + rect.height / 2);
  };

  const onBlur: React.FocusEventHandler<HTMLDivElement> = () => setFocused(false);

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = async (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      await toggleSound();
    }
  };

  useEffect(() => {
    syncMuted(mutedInitially);
    const el = videoRef.current;
    if (el) {
      el.pause();
      el.play().catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoSrc]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = muted;
  }, [muted]);

  useEffect(() => {
    if (!active) return;
    const el = tagRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.width && r.height) tagSizeRef.current = { w: r.width, h: r.height };
  }, [active, muted]);

  const label = muted ? "SOUND ON" : "SOUND OFF";

  return (
    <S.Section>
      <S.VideoWrap
        ref={wrapRef}
        role="button"
        tabIndex={0}
        aria-label="Toggle video sound"
        aria-pressed={!muted}
        data-tag-visible={active ? "true" : "false"}
        data-hide-cursor={HIDE_CURSOR_ON_HOVER ? "true" : "false"}
        onClick={toggleSound}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        onPointerEnter={onPointerEnter}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <S.Video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          loop
          playsInline
          muted={muted}
          preload="metadata"
        />

        <S.SoundTag ref={tagRef} aria-hidden="true">
          <S.SoundDot />
          <S.SoundText>{label}</S.SoundText>
        </S.SoundTag>
      </S.VideoWrap>
    </S.Section>
  );
}
