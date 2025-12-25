import React, { useEffect, useMemo, useRef, useState } from "react";
import * as S from "./tickerMarquee.styled";

type Props = {
  title?: React.ReactNode;
  items: React.ReactNode[];

  durationSec?: number;     // default 18
  pauseOnHover?: boolean;   // default true
  fadeEdges?: boolean;      // default true
  gapPx?: number;           // default 28

  className?: string;
};

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

const TickerMarquee: React.FC<Props> = ({
  title,
  items,

  durationSec = 18,
  pauseOnHover = true,
  fadeEdges = true,
  gapPx = 28,

  className,
}) => {
  const base = useMemo(() => items.filter(Boolean), [items]);
  const [repeat, setRepeat] = useState(2);

  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const rowRef = useRef<HTMLDivElement | null>(null);

  // Row A = base * repeat
  const rowItems = useMemo(() => {
    if (!base.length) return [];
    return Array.from({ length: repeat }, () => base).flat();
  }, [base, repeat]);

  // ✅ auto-fill: đảm bảo width(row A) >= width(container) để không bị “mất khoảng”
  useEffect(() => {
    if (!base.length) return;

    const marqueeEl = marqueeRef.current;
    const rowEl = rowRef.current;
    if (!marqueeEl || !rowEl) return;

    let raf = 0;
    const MAX_REPEAT = 40;

    const recompute = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const vw = marqueeEl.getBoundingClientRect().width;
        const rw = rowEl.getBoundingClientRect().width;
        if (vw <= 0 || rw <= 0) return;

        // cần dư một chút để chắc chắn không hở
        const need = vw * 1.1;

        if (rw < need && repeat < MAX_REPEAT) {
          setRepeat((r) => clamp(r + 1, 2, MAX_REPEAT));
        }
      });
    };

    const ro = new ResizeObserver(recompute);
    ro.observe(marqueeEl);
    ro.observe(rowEl);
    recompute();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [base.length, repeat]);

  if (!base.length) return null;

  return (
    <S.Wrap className={className}>
      {title ? <S.Title>{title}</S.Title> : null}

      <S.Marquee
        ref={marqueeRef}
        data-pause={pauseOnHover ? "1" : "0"}
        data-fade={fadeEdges ? "1" : "0"}
        style={
          {
            ["--duration" as any]: `${durationSec}s`,
            ["--gap" as any]: `${gapPx}px`,
          } as React.CSSProperties
        }
      >
        <S.Track>
          {/* Row A */}
          <S.Row ref={rowRef}>
            {rowItems.map((node, idx) => (
              <S.Item key={`a-${idx}`}>{node}</S.Item>
            ))}
          </S.Row>

          {/* Row B duplicate */}
          <S.Row aria-hidden="true">
            {rowItems.map((node, idx) => (
              <S.Item key={`b-${idx}`}>{node}</S.Item>
            ))}
          </S.Row>
        </S.Track>
      </S.Marquee>
    </S.Wrap>
  );
};

export default TickerMarquee;
