import { useEffect, useRef } from "react";
import * as S from "./orbitVisual.styled";

type Props = {
  className?: string;
};

export default function OrbitVisual({ className }: Props) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const mediaReduce = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (mediaReduce?.matches) return;

    let tx = 0,
      ty = 0; // target
    let cx = 0,
      cy = 0; // current

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const ny = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);

      // clamp + scale px
      const max = 14;
      tx = Math.max(-1, Math.min(1, nx)) * max;
      ty = Math.max(-1, Math.min(1, ny)) * max;
    };

    const onLeave = () => {
      tx = 0;
      ty = 0;
    };

    const tick = () => {
      // lerp
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
  }, []);

  return (
    <S.Stage ref={stageRef} className={className} aria-hidden="true">
      <S.Center>
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
      </S.Center>
    </S.Stage>
  );
}
