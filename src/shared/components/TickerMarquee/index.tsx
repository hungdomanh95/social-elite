import React, { useEffect, useMemo, useRef, useState } from "react";
import * as S from "./tickerMarquee.styled";

export type TickerMarqueeItem = {
  id?: string | number;
  node: React.ReactNode; // ✅ string | img | div | anything
  href?: string;
};

type Props = {
  title?: string;
  items: Array<TickerMarqueeItem | React.ReactNode>;

  durationSec?: number;
  pauseOnHover?: boolean;
  fadeEdges?: boolean;

  /** text = auto uppercase + text style; custom = giữ nguyên node style */
  variant?: "text" | "custom";
  uppercase?: boolean;

  gapPx?: number;

  /** fallback fill */
  minVisualCount?: number;

  /** ensure row width >= viewport * ratio to avoid “missing gap” */
  fillRatio?: number;
};

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

const normalize = (items: Array<TickerMarqueeItem | React.ReactNode>): TickerMarqueeItem[] => {
  return  items.map((it, idx) => {
    if (typeof it === "object" && it && "node" in (it as any)) {
      const t = it as TickerMarqueeItem;
      return { id: t.id ?? idx, node: t.node, href: t.href };
    }
    return { id: idx, node: it };
  })
}
 ;

const TickerMarquee: React.FC<Props> = ({
  title,
  items,

  durationSec = 18,
  pauseOnHover = true,
  fadeEdges = true,

  variant = "text",
  uppercase = true,

  gapPx = 28,

  minVisualCount = 10,
  fillRatio = 1.25,
}) => {
  const base = useMemo(() => normalize(items), [items]);

  const [mult, setMult] = useState(() => {
    if (!base.length) return 1;
    return Math.ceil(minVisualCount / base.length);
  });

  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const rowRef = useRef<HTMLDivElement | null>(null);

  const rowItems = useMemo(() => {
    if (!base.length) return [];
    return Array.from({ length: mult }, () => base).flat();
  }, [base, mult]);

  // ✅ auto-fill to avoid empty gap on wide screens
  useEffect(() => {
    if (!base.length) return;

    const marqueeEl = marqueeRef.current;
    const rowEl = rowRef.current;
    if (!marqueeEl || !rowEl) return;

    let raf = 0;
    const MAX_MULT = 40;

    const recompute = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const vw = marqueeEl.getBoundingClientRect().width;
        const rw = rowEl.getBoundingClientRect().width;

        if (vw <= 0 || rw <= 0) return;

        if (rw < vw * fillRatio && mult < MAX_MULT) {
          setMult((m) => clamp(m + 1, 1, MAX_MULT));
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
  }, [base.length, fillRatio, mult]);

  if (!base.length) return null;

  return (
    <S.Wrap>
      {title ? <S.Title>{title}</S.Title> : null}

      <S.Marquee
        ref={marqueeRef}
        data-pause={pauseOnHover ? "1" : "0"}
        data-fade={fadeEdges ? "1" : "0"}
        data-variant={variant}
        style={
          {
            ["--duration" as any]: `${durationSec}s`,
            ["--gap" as any]: `${gapPx}px`,
          } as React.CSSProperties
        }
        aria-label={typeof title === "string" ? title : "ticker"}
      >
        <S.Track>
          {/* Row A */}
          <S.Row ref={rowRef}>
            {rowItems.map((it, idx) => (
              <React.Fragment key={`${it.id}-${idx}`}>
                {it.href ? (
                  <S.ItemLink
                    href={it.href}
                    target="_blank"
                    rel="noreferrer"
                    data-uppercase={uppercase ? "1" : "0"}
                  >
                    {it.node}
                  </S.ItemLink>
                ) : (
                  <S.Item data-uppercase={uppercase ? "1" : "0"}>
                    {it.node}
                  </S.Item>
                )}
              </React.Fragment>
            ))}
          </S.Row>

          {/* Row B duplicate */}
          <S.Row aria-hidden="true">
            {rowItems.map((it, idx) => (
              <React.Fragment key={`dup-${it.id}-${idx}`}>
                {it.href ? (
                  <S.ItemLink
                    href={it.href}
                    target="_blank"
                    rel="noreferrer"
                    data-uppercase={uppercase ? "1" : "0"}
                  >
                    {it.node}
                  </S.ItemLink>
                ) : (
                  <S.Item data-uppercase={uppercase ? "1" : "0"}>
                    {it.node}
                  </S.Item>
                )}
              </React.Fragment>
            ))}
          </S.Row>
        </S.Track>
      </S.Marquee>
    </S.Wrap>
  );
};

export default TickerMarquee;
