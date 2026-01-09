import { useEffect, useMemo, useRef, useState } from "react";
import * as S from "./orbitVisual.styled";

type Props = {
  className?: string;
  /** desktop/tablet */
  scale?: number;
  /** mobile */
  scaleMobile?: number;
};

export default function OrbitVisual({
  className,
  scale = 2,
  scaleMobile = 1.25,
}: Props) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(max-width: 768px)");
    if (!mq) return;

    const onChange = () => setIsMobile(mq.matches);
    onChange();

    // safari fallback
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener(onChange);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, []);

  const sceneScale = useMemo(() => (isMobile ? scaleMobile : scale), [isMobile, scale, scaleMobile]);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const mediaReduce = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (mediaReduce?.matches) return;

    // ✅ mobile: bỏ parallax cho nhẹ + tránh “giật” khi touch/scroll
    if (isMobile) return;

    let tx = 0,
      ty = 0;
    let cx = 0,
      cy = 0;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const ny = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);

      const max = Math.min(14, Math.max(7, r.width * 0.02));
      tx = Math.max(-1, Math.min(1, nx)) * max;
      ty = Math.max(-1, Math.min(1, ny)) * max;
    };

    const onLeave = () => {
      tx = 0;
      ty = 0;
    };

    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;

      el.style.setProperty("--px", `${cx.toFixed(2)}px`);
      el.style.setProperty("--py", `${cy.toFixed(2)}px`);

      rafRef.current = requestAnimationFrame(tick);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile]);

  return (
    <S.Stage ref={stageRef} className={className} aria-hidden="true">
      <S.Center>
        <S.Scene $scale={sceneScale}>
          <S.BackdropDisk />

          <S.OuterRing />
          <S.Glow />

          <S.BigDot />
          <S.SmallDot />

          <S.ArcWhite />
          <S.ArcGreen />

          <S.WhiteMini />

          <S.SquareOutline />
          <S.RoundedSquare />
        </S.Scene>
      </S.Center>
    </S.Stage>
  );
}
