import React, { useEffect, useMemo, useRef, useState } from "react";
import * as S from "./countUp.styled";

export type CountUpEasing = (t: number) => number;

const easeOutCubic: CountUpEasing = (t) => 1 - Math.pow(1 - t, 3);

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

export const useInViewOnce = <T extends HTMLElement>(threshold = 0.25) => {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView };
};

type Props = {
  to: number;
  from?: number;

  /** bật animation */
  start?: boolean;

  /** tự start khi component in-view */
  startOnView?: boolean;
  viewThreshold?: number;

  durationMs?: number;
  easing?: CountUpEasing;

  prefix?: string;
  suffix?: string;

  /** format output */
  formatter?: (value: number) => string;

  /** animate 1 lần hay cho phép restart khi props đổi */
  once?: boolean;

  /** bounce nhẹ khi kết thúc */
  bounceOnFinish?: boolean;

  className?: string;
};

const defaultFormatter = (value: number) => value.toString();

const CountUp: React.FC<Props> = ({
  to,
  from = 0,
  start = true,

  startOnView = false,
  viewThreshold = 0.25,

  durationMs = 1100,
  easing = easeOutCubic,

  prefix = "",
  suffix = "",

  formatter = defaultFormatter,

  once = true,
  bounceOnFinish = true,

  className,
}) => {
  const [val, setVal] = useState(from);
  const [done, setDone] = useState(false);

  const rafRef = useRef<number | null>(null);
  const startedRef = useRef(false);

  const { ref: viewRef, inView } = useInViewOnce<HTMLSpanElement>(
    viewThreshold
  );

  const canStart = useMemo(() => {
    if (!start) return false;
    if (!startOnView) return true;
    return inView;
  }, [start, startOnView, inView]);

  useEffect(() => {
    if (!canStart) return;

    if (once && startedRef.current) return;
    startedRef.current = true;

    setDone(false);
    const startTs = performance.now();
    const startFrom = from;
    const startTo = to;

    const tick = (now: number) => {
      const p = clamp((now - startTs) / durationMs, 0, 1);
      const eased = easing(p);
      const next = Math.round(startFrom + (startTo - startFrom) * eased);
      setVal(next);

      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDone(true);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [canStart, to, from, durationMs, easing, once]);

  const text = `${prefix}${formatter(val)}${suffix}`;

  return (
    <S.Wrap
      ref={startOnView ? viewRef : undefined}
      className={className}
      data-bounce={bounceOnFinish ? "1" : "0"}
      data-done={done ? "1" : "0"}
    >
      {text}
    </S.Wrap>
  );
};

export default CountUp;
