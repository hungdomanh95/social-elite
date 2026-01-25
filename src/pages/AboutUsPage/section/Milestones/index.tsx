import React, { useMemo } from "react";
import * as S from "./milestones.styled";
import { useLandingPage } from "@/shared/api/useLandingPage";

type Side = "left" | "right";

type MilestoneCms = {
  id: number;
  year: string;
  highlights: string; // HTML
};

type MilestonesProps = {};

const stripOuterP = (html: string) => {
  const s = (html || "").trim();
  return s.replace(/^<p>/i, "").replace(/<\/p>$/i, "").trim();
};

const Milestones: React.FC<MilestonesProps> = () => {
  const { data: landing } = useLandingPage();

  const items: MilestoneCms[] = useMemo(() => {
    const list = (landing?.milestones ?? []) as MilestoneCms[];
    if (!Array.isArray(list)) return [];

    // sort theo year tăng dần nếu backend trả lộn
    const sorted = [...list].sort((a, b) => Number(a.year) - Number(b.year));
    return sorted;
  }, [landing?.milestones]);

  const CYCLE = 6; // phải khớp --cycle trong css

  return (
    <S.MilestonesSection>
      <S.Container>
        <S.MilestonesHeading>
          <div className="stack">
            <span className="bar" aria-hidden />
            <div>
              <div className="top">Key Milestones</div>
              <div className="bottom">of Social Elite</div>
            </div>
          </div>
        </S.MilestonesHeading>

        <S.Timeline aria-label="Key Milestones timeline">
          <S.TimelineList>
            {items.map((m, idx) => {
              const side: Side = idx % 2 === 0 ? "left" : "right";

              // SYNC: dot chạy từ item đầu -> item cuối theo cycle
              const denom = Math.max(items.length - 1, 1);
              let delay = (idx / denom) * CYCLE;

              // tránh trường hợp delay == CYCLE (bị wrap về 0)
              if (idx === items.length - 1 && items.length > 1) {
                delay = Math.max(CYCLE - 0.25, 0);
              }

              const html = stripOuterP(m.highlights);

              return (
                <S.Row
                  key={m.id ?? m.year}
                  $side={side}
                  style={{ ["--d" as any]: `${delay}s` }}
                >
                  <S.Node aria-hidden />
                  <S.Arm $side={side} aria-hidden />

                  <S.Content $side={side}>
                    <S.Year>{m.year}</S.Year>

                    {/* ✅ CMS trả HTML, giữ nguyên highlight style */}
                    <S.Lines>
                      <S.Line
                        as="div"
                        dangerouslySetInnerHTML={{ __html: html }}
                      />
                    </S.Lines>
                  </S.Content>
                </S.Row>
              );
            })}
          </S.TimelineList>
        </S.Timeline>
      </S.Container>
    </S.MilestonesSection>
  );
};

export default Milestones;
