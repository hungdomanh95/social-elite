import React, { useCallback, useEffect, useRef, useState } from "react";
import * as S from "./eliteTalents.styled";

import BgLeft from "@/assets/images/talents/ba_talent_left.png";
import BgLeftCover from "@/assets/images/talents/ba_talent_left_cover.png";
import BgRight from "@/assets/images/talents/bg_talent_right.png";

import Talent1 from "@/assets/images/talents/talent1.png";
import Talent2 from "@/assets/images/talents/talent2.png";
import Talent3 from "@/assets/images/talents/talent3.png";
import Talent4 from "@/assets/images/talents/talent4.png";

import Talent5 from "@/assets/images/talents/talent5.png";
import Talent6 from "@/assets/images/talents/talent6.png";
import Talent7 from "@/assets/images/talents/talent7.png";
import Talent8 from "@/assets/images/talents/talent8.png";

type TalentConfig = {
  id: string;
  src: string;
  name: string;
  scale: number;
  z: number;
  dx?: number;
};

const BASE_RATIO_LEFT = 0.82;
const BASE_RATIO_RIGHT = 0.82;

const SCALE_TALENT_LEFT = 1.95;
const SCALE_TALENT_RIGHT = 1.95;

const LEFT_TALENTS: TalentConfig[] = [
  { id: "l1", src: Talent1, name: "Thiên Minh", scale: SCALE_TALENT_LEFT, z: 1, dx: 0 },
  { id: "l2", src: Talent2, name: "Đoan Trang", scale: SCALE_TALENT_LEFT, z: 2, dx: -1 },
  { id: "l3", src: Talent3, name: "Đinh Ngọc Diệp", scale: SCALE_TALENT_LEFT, z: 4, dx: -2.5 },
  { id: "l4", src: Talent4, name: "Victor Vũ", scale: SCALE_TALENT_LEFT, z: 3, dx: -2.5 },
];

const RIGHT_TALENTS: TalentConfig[] = [
  { id: "r1", src: Talent5, name: "Chế Nguyễn Quỳnh Châu", scale: SCALE_TALENT_RIGHT, z: 4, dx: 1.5 },
  { id: "r2", src: Talent6, name: "Sĩ Thanh", scale: SCALE_TALENT_RIGHT, z: 3, dx: 1.5 },
  { id: "r3", src: Talent7, name: "Liêu Hà Trinh", scale: SCALE_TALENT_RIGHT, z: 2, dx: 0 },
  { id: "r4", src: Talent8, name: "Minh Anh", scale: SCALE_TALENT_RIGHT, z: 1, dx: 0 },
];

type FollowTagApi = {
  wrapRef: React.RefObject<HTMLDivElement>;
  tagRef: React.RefObject<HTMLDivElement>;
  active: boolean;
  label: string;
  enter: (e: React.PointerEvent, label: string) => void;
  move: (e: React.PointerEvent) => void;
  leave: () => void;
  focus: (label: string) => void;
  blur: () => void;
};

function useFollowTag(): FollowTagApi {
  const wrapRef = useRef<HTMLDivElement>(null!);
  const tagRef = useRef<HTMLDivElement>(null!);

  const [active, setActive] = useState(false);
  const [label, setLabel] = useState("");

  const rafRef = useRef<number | null>(null);
  const lastPtRef = useRef<{ x: number; y: number } | null>(null);
  const tagSizeRef = useRef<{ w: number; h: number }>({ w: 160, h: 44 });

  const setCursorVars = useCallback((clientX: number, clientY: number) => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const rect = wrap.getBoundingClientRect();
    const { w, h } = tagSizeRef.current;

    const ox = 14;
    const pad = 10;

    let x = clientX - rect.left;
    let y = clientY - rect.top;

    const minX = pad;
    const maxX = Math.max(minX, rect.width - w - pad - ox);

    const minY = h + pad;
    const maxY = Math.max(minY, rect.height - pad);

    x = Math.max(minX, Math.min(maxX, x));
    y = Math.max(minY, Math.min(maxY, y));

    wrap.style.setProperty("--cursor-x", `${x}px`);
    wrap.style.setProperty("--cursor-y", `${y}px`);
  }, []);

  const enter = useCallback(
    (e: React.PointerEvent, nextLabel: string) => {
      setLabel(nextLabel);
      setActive(true);
      setCursorVars(e.clientX, e.clientY);
    },
    [setCursorVars]
  );

  const move = useCallback(
    (e: React.PointerEvent) => {
      lastPtRef.current = { x: e.clientX, y: e.clientY };
      if (rafRef.current != null) return;

      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        const pt = lastPtRef.current;
        if (!pt) return;
        setCursorVars(pt.x, pt.y);
      });
    },
    [setCursorVars]
  );

  const leave = useCallback(() => {
    setActive(false);
    lastPtRef.current = null;
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const focus = useCallback(
    (nextLabel: string) => {
      setLabel(nextLabel);
      setActive(true);

      const wrap = wrapRef.current;
      if (!wrap) return;

      const rect = wrap.getBoundingClientRect();
      setCursorVars(rect.left + rect.width / 2, rect.top + rect.height / 2);
    },
    [setCursorVars]
  );

  const blur = useCallback(() => setActive(false), []);

  useEffect(() => {
    if (!active) return;
    const el = tagRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    if (r.width && r.height) tagSizeRef.current = { w: r.width, h: r.height };
  }, [active, label]);

  return { wrapRef, tagRef, active, label, enter, move, leave, focus, blur };
}

export default function EliteTalents() {
  const leftTag = useFollowTag();
  const rightTag = useFollowTag();

  return (
    <S.Section>
      <S.Container>
        <S.Title>
          <span className="inner">
            Our <span className="accent">elite™</span> Talents
          </span>
        </S.Title>
      </S.Container>

      <S.FullBleed>
        <S.Stage>
          {/* LEFT */}
          <S.Col>
            <S.Scene ref={leftTag.wrapRef} data-tag-visible={leftTag.active ? "true" : "false"}>
              <S.BgImg src={BgLeft} alt="" draggable={false} />

              <S.HoverTag ref={leftTag.tagRef} aria-hidden="true">
                <S.HoverText>{leftTag.label}</S.HoverText>
              </S.HoverTag>

              <S.TalentsOverlay style={{ ["--baseRatio" as any]: String(BASE_RATIO_LEFT) } as React.CSSProperties}>
                {LEFT_TALENTS.map((t) => (
                  <S.TalentSlot
                    key={t.id}
                    style={{ ["--z" as any]: String(t.z), ["--dx" as any]: String(t.dx ?? 0) } as React.CSSProperties}
                  >
                    <S.TalentBtn
                      type="button"
                      aria-label={t.name}
                      onPointerEnter={(e) => leftTag.enter(e, t.name)}
                      onPointerMove={leftTag.move}
                      onPointerLeave={leftTag.leave}
                      onFocus={() => leftTag.focus(t.name)}
                      onBlur={leftTag.blur}
                      style={{ ["--scale" as any]: String(t.scale) } as React.CSSProperties}
                    >
                      <S.TalentImg src={t.src} alt={t.name} draggable={false} />
                    </S.TalentBtn>
                  </S.TalentSlot>
                ))}
              </S.TalentsOverlay>

              <S.CoverImg src={BgLeftCover} alt="" draggable={false} />
            </S.Scene>
          </S.Col>

          {/* RIGHT */}
          <S.Col>
            <S.Scene ref={rightTag.wrapRef} data-tag-visible={rightTag.active ? "true" : "false"}>
              <S.BgImg src={BgRight} alt="" draggable={false} />

              <S.HoverTag ref={rightTag.tagRef} aria-hidden="true">
                <S.HoverText>{rightTag.label}</S.HoverText>
              </S.HoverTag>

              <S.TalentsOverlay style={{ ["--baseRatio" as any]: String(BASE_RATIO_RIGHT) } as React.CSSProperties}>
                {RIGHT_TALENTS.map((t) => (
                  <S.TalentSlot
                    key={t.id}
                    style={{ ["--z" as any]: String(t.z), ["--dx" as any]: String(t.dx ?? 0) } as React.CSSProperties}
                  >
                    <S.TalentBtn
                      type="button"
                      aria-label={t.name}
                      onPointerEnter={(e) => rightTag.enter(e, t.name)}
                      onPointerMove={rightTag.move}
                      onPointerLeave={rightTag.leave}
                      onFocus={() => rightTag.focus(t.name)}
                      onBlur={rightTag.blur}
                      style={{ ["--scale" as any]: String(t.scale) } as React.CSSProperties}
                    >
                      <S.TalentImg src={t.src} alt={t.name} draggable={false} />
                    </S.TalentBtn>
                  </S.TalentSlot>
                ))}
              </S.TalentsOverlay>
            </S.Scene>
          </S.Col>
        </S.Stage>
      </S.FullBleed>
    </S.Section>
  );
}
