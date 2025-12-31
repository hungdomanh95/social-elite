import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as S from "./orbitVisual.styled";

import Green_BG from "@/assets/images/Green_BG.png";

import creator1 from "@/assets/images/creatorPage/creator1.png";
import creator2 from "@/assets/images/creatorPage/creator2.png";
import creator3 from "@/assets/images/creatorPage/creator3.png";
import creator4 from "@/assets/images/creatorPage/creator4.png";
import creator5 from "@/assets/images/creatorPage/creator5.png";
import creator6 from "@/assets/images/creatorPage/creator6.png";
import creator7 from "@/assets/images/creatorPage/creator7.png";
import creator8 from "@/assets/images/creatorPage/creator8.png";
import creator9 from "@/assets/images/creatorPage/creator9.png";
import creator10 from "@/assets/images/creatorPage/creator10.png";
import creator11 from "@/assets/images/creatorPage/creator11.png";

type OrbitVisualProps = {
  revealDelayMs?: number;
};

const creators = [
  creator1,
  creator2,
  creator3,
  creator4,
  creator5,
  creator6,
  creator7,
  creator8,
  creator9,
  creator10,
  creator11,
];

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

const OrbitVisual: React.FC<OrbitVisualProps> = ({ revealDelayMs }) => {
  const orbitRef = useRef<HTMLDivElement | null>(null);
  const dashedRef = useRef<HTMLDivElement | null>(null);

  const slotRefs = useRef<Array<HTMLDivElement | null>>([]);
  const innerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const rafRef = useRef<number | null>(null);

  const [size, setSize] = useState(520);

  useLayoutEffect(() => {
    const el = orbitRef.current;
    if (!el) return;

    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect?.width ?? 520;
      setSize(w);
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const avatarSize = useMemo(() => clamp(size * 0.115, 46, 66), [size]);

  // ✅ canh theo OuterRing inset 6% => radius = size * (0.5 - 0.06) = size * 0.44
  const radius = useMemo(() => size * 0.44, [size]);

  const style =
    revealDelayMs != null
      ? ({ ["--d" as any]: `${revealDelayMs}ms` } as React.CSSProperties)
      : undefined;

  useEffect(() => {
    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (reduce) return;

    const n = creators.length;

    const durAvatars = 24000; // CW
    const durDash = 18000; // CCW
    const start = performance.now();

    const tick = (now: number) => {
      const t = now - start;

      const a = (t / durAvatars) * 360; // CW
      const d = -(t / durDash) * 360; // CCW

      if (dashedRef.current) {
        dashedRef.current.style.transform = `rotate(${d}deg)`;
      }

      for (let i = 0; i < n; i++) {
        const slot = slotRefs.current[i];
        const inner = innerRefs.current[i];
        if (!slot || !inner) continue;

        const base = (360 / n) * i;
        const angle = base + a;

        // ✅ slot là "điểm" ở tâm: chỉ rotate + translateX (không translate(-50%,-50%))
        slot.style.transform = `rotate(${angle}deg) translateX(${radius}px)`;

        // ✅ giữ ảnh luôn thẳng
        inner.style.transform = `rotate(${-angle}deg)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [radius]);

  return (
    <S.Visual data-reveal style={style}>
      <S.OrbitRoot ref={orbitRef}>
        <S.Glow aria-hidden="true" />
        <S.OuterRing aria-hidden="true" />
        <S.DashedRing ref={dashedRef} aria-hidden="true" />

        <S.AvatarsLayer aria-hidden="true">
          {creators.map((src, i) => (
            <S.AvatarSlot key={i} ref={(el:any) => (slotRefs.current[i] = el)}>
              <S.Avatar style={{ width: avatarSize, height: avatarSize }}>
                <S.AvatarInner ref={(el:any) => (innerRefs.current[i] = el)}>
                  <img src={src} alt={`Creator ${i + 1}`} />
                </S.AvatarInner>
              </S.Avatar>
            </S.AvatarSlot>
          ))}
        </S.AvatarsLayer>

        <S.Center aria-hidden="true">
          <S.CenterGlow />
          <S.CenterLogo src={Green_BG} alt="SocialElite" />
        </S.Center>
      </S.OrbitRoot>
    </S.Visual>
  );
};

export default OrbitVisual;
