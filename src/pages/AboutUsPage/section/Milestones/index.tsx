import React from "react";
import * as S from "./milestones.styled";
import { MILESTONES, type MilestoneItem, type Side } from "./mockup";

type MilestonesProps = {
  items?: MilestoneItem[];
};

const Milestones: React.FC<MilestonesProps> = ({ items = MILESTONES }) => {
  const CYCLE = 6; // phải khớp --cycle trong css

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

        <S.Timeline aria-label="Key Milestones timeline">
          <S.TimelineList>
            {items.map((m, idx) => {
              const side: Side = m.side ?? (idx % 2 === 0 ? "left" : "right");

              // SYNC: dot chạy từ item đầu -> item cuối theo cycle
              const denom = Math.max(items.length - 1, 1);
              let delay = (idx / denom) * CYCLE;

              // tránh trường hợp delay == CYCLE (bị wrap về 0)
              if (idx === items.length - 1 && items.length > 1) {
                delay = Math.max(CYCLE - 0.25, 0);
              }

              return (
                <S.Row
                  key={m.year}
                  $side={side}
                  style={{ ["--d" as any]: `${delay}s` }}
                >
                  <S.Node aria-hidden />
                  <S.Arm $side={side} aria-hidden />

                  <S.Content $side={side}>
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
              );
            })}
          </S.TimelineList>
        </S.Timeline>
      </S.Container>
    </S.MilestonesSection>
  );
};

export default Milestones;
