import React from 'react'
import * as S from "./ourMission.styled"

type OurMissionProps = {};

const OurMission: React.FC<OurMissionProps> = () => {
  return (
    <S.MissionSection>
      <S.MissionContainer>
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
      </S.MissionContainer>
    </S.MissionSection>
  )
}

export default OurMission
