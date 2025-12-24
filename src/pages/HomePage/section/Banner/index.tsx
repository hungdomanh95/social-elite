import { useEffect, useRef, useState } from "react";
import * as S from "./banner.styled";

type BannerProps = {
  videoSrc: string; // local import | /public path | remote URL
  posterSrc?: string;
  mutedInitially?: boolean; // default true
};

export default function Banner({ videoSrc, posterSrc, mutedInitially = true }: BannerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState<boolean>(mutedInitially);

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

    // đảm bảo video đang chạy (autoplay đôi khi bị chặn)
    if (el.paused) {
      try {
        await el.play();
      } catch {
        // ignore
      }
    }

    syncMuted(!muted);
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = async (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      await toggleSound();
    }
  };

  useEffect(() => {
    // đổi video (API update) -> reset mute + autoplay lại
    syncMuted(mutedInitially);

    const el = videoRef.current;
    if (el) {
      el.pause();
      el.play().catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoSrc]);

  useEffect(() => {
    // đồng bộ state -> element
    const el = videoRef.current;
    if (!el) return;
    el.muted = muted;
  }, [muted]);

  return (
    <S.Section>
      <S.VideoWrap
        role="button"
        tabIndex={0}
        aria-label="Toggle video sound"
        onClick={toggleSound}
        onKeyDown={onKeyDown}
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
      </S.VideoWrap>
    </S.Section>
  );
}
