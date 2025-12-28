import React from "react";
import * as S from "./aboutUs.styled";

export default function AboutUs() {
  return (
    <S.Page>
      {/* TOP TITLE */}
      <S.Hero>
        <S.HeroTitle>About Us</S.HeroTitle>
      </S.Hero>

      {/* OUR MISSION */}
      <S.MissionSection>
        <S.Container>
          <S.SectionHeading>
            <span className="bar" aria-hidden />
            <span className="text">Our Mission</span>
          </S.SectionHeading>

          <S.MissionCard>
            <S.MissionLeft>
              <S.MissionKicker>Unlock</S.MissionKicker>
              <S.MissionMain>
                every business
                <br />
                possibilities
              </S.MissionMain>
            </S.MissionLeft>

            <S.MissionRight>
              <p>
                Social Elite is a pioneering social commerce ecosystem built to
                redefine how brands grow and how creators monetize in the new era
                of social commerce. We sit at the intersection of content,
                commerce, and community where influence turns into impact and
                creativity drives measurable results.
              </p>

              <p>
                We work end-to-end with our partners, from consulting and
                strategic planning to execution and daily operations.
              </p>

              <p>
                At Social Elite, we don’t just participate in social commerce, we
                build systems that make it work.
              </p>
            </S.MissionRight>
          </S.MissionCard>
        </S.Container>
      </S.MissionSection>

      {/* KEY MILESTONES */}
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
              {/* 2022 - LEFT */}
              <S.Row $side="left">
                <S.Node aria-hidden />
                <S.Arm $side="left" aria-hidden />
                <S.Content $side="left">
                  <S.Year>2022</S.Year>
                  <S.Lines>
                    <S.Line>
                      Established as an <span className="accent">MCN Agency</span>
                    </S.Line>
                  </S.Lines>
                </S.Content>
              </S.Row>

              {/* 2023 - RIGHT */}
              <S.Row $side="right">
                <S.Node aria-hidden />
                <S.Arm $side="right" aria-hidden />
                <S.Content $side="right">
                  <S.Year>2023</S.Year>
                  <S.Lines>
                    <S.Line>
                      Strategic Partner with <span className="accent">Shopee</span>
                    </S.Line>
                  </S.Lines>
                </S.Content>
              </S.Row>

              {/* 2024 - LEFT */}
              <S.Row $side="left">
                <S.Node aria-hidden />
                <S.Arm $side="left" aria-hidden />
                <S.Content $side="left">
                  <S.Year>2024</S.Year>
                  <S.Lines>
                    <S.Line>
                      Strategic partner with{" "}
                      <span className="accent">Yeah1 Group</span> for artist
                      management
                    </S.Line>
                    <S.Line>
                      Winner of the{" "}
                      <span className="accent">Commercial Excellence MCN</span>{" "}
                      at the <span className="accent">Shopee Awards</span>
                    </S.Line>
                  </S.Lines>
                </S.Content>
              </S.Row>

              {/* 2025 - RIGHT */}
              <S.Row $side="right">
                <S.Node aria-hidden />
                <S.Arm $side="right" aria-hidden />
                <S.Content $side="right">
                  <S.Year>2025</S.Year>
                  <S.Lines>
                    <S.Line className="accent">
                      2nd Runner Up Youtube Works Awards 2025
                    </S.Line>
                    <S.Line>
                      Launched <span className="accent">Social Elite</span> as the{" "}
                      <span className="accent">Social Commerce Ecosystem</span>
                    </S.Line>
                  </S.Lines>
                </S.Content>
              </S.Row>
            </S.TimelineList>
          </S.Timeline>
        </S.Container>
      </S.MilestonesSection>
    </S.Page>
  );
}
