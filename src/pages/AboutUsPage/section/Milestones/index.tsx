import React, { useLayoutEffect, useMemo, useRef } from "react";
import * as S from "./milestones.styled";
import { MILESTONES, type MilestoneItem, type Side } from "./mockup";

type MilestonesProps = {
  items?: MilestoneItem[];
};

const Milestones: React.FC<MilestonesProps> = ({ items = MILESTONES }) => {
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);

  const normalized = useMemo(() => {
    return items.map((m, idx) => ({
      ...m,
      side: (m.side ?? (idx % 2 === 0 ? "left" : "right")) as Side,
    }));
  }, [items]);

  useLayoutEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const compute = () => {
      const cs = window.getComputedStyle(timeline);

      // --cycle có dạng "6s"
      const cycleRaw = cs.getPropertyValue("--cycle").trim();
      const cycle = Math.max(0.1, parseFloat(cycleRaw || "6"));

      const nodeYRaw = cs.getPropertyValue("--nodeY").trim(); // "74px"
      const nodeY = Math.max(0, parseFloat(nodeYRaw || "0"));

      const tRect = timeline.getBoundingClientRect();
      const height = tRect.height;

      // dot chạy từ nodeY tới (height - nodeY)
      const travel = Math.max(1, height - nodeY * 2);

      const lastIdx = normalized.length - 1;

      normalized.forEach((_, idx) => {
        const rowEl = rowRefs.current[idx];
        if (!rowEl) return;

        const rRect = rowEl.getBoundingClientRect();
        // vị trí node (tính từ top timeline)
        const y = (rRect.top - tRect.top) + nodeY;

        // progress 0..1 theo đường chạy dot
        const p = Math.min(1, Math.max(0, (y - nodeY) / travel));

        // delay theo progress
        let d = p * cycle;

        // tránh đụng frame reset cuối cycle => kéo sớm 1 chút
        if (idx === lastIdx) d = Math.min(d, cycle - 0.25);

        rowEl.style.setProperty("--d", `${d}s`);
      });
    };

    // chạy 2 lần cho chắc sau font/layout settle
    const raf1 = requestAnimationFrame(() => {
      compute();
      requestAnimationFrame(compute);
    });

    const ro = new ResizeObserver(() => compute());
    ro.observe(timeline);
    rowRefs.current.forEach((el) => el && ro.observe(el));

    window.addEventListener("resize", compute);

    return () => {
      cancelAnimationFrame(raf1);
      ro.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, [normalized]);

  return (
    <S.MilestonesSection>
      <S.Container>
        <S.MilestonesHeading>
          <span className="bar" aria-hidden />
          <div className="stack">
            <div className="top">Key Milestones</div>
            <div className="bottom">of Social Elite</div>
          </div>
        </S.MilestonesHeading>

        <S.Timeline ref={timelineRef} aria-label="Key Milestones timeline">
          <S.TimelineList>
            {normalized.map((m, idx) => (
              <S.Row
                key={m.year}
                $side={m.side}
                ref={(el) => {
                  rowRefs.current[idx] = el;
                }}
              >
                <S.Node aria-hidden />
                <S.Arm $side={m.side} aria-hidden />

                <S.Content $side={m.side}>
                  <S.Year>{m.year}</S.Year>
                  <S.Lines>
                    {m.lines.map((l) => (
                      <S.Line key={l.key} className={l.accent ? "accent" : ""}>
                        {l.content}
                      </S.Line>
                    ))}
                  </S.Lines>
                </S.Content>
              </S.Row>
            ))}
          </S.TimelineList>
        </S.Timeline>
      </S.Container>
    </S.MilestonesSection>
  );
};

export default Milestones;
