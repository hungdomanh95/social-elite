import React, { useMemo } from "react";
import * as S from "./ourMission.styled";
import { useLandingPage } from "@/shared/api/useLandingPage";

type OurMissionProps = {};

const splitTitleToLines = (title: string) => {
  const t = (title || "").trim();
  if (!t) return [""];

  // nếu đã có xuống dòng sẵn
  if (t.includes("\n")) return t.split("\n").map((x) => x.trim()).filter(Boolean);

  // chia 2 dòng: ưu tiên tách gần giữa
  const words = t.split(/\s+/).filter(Boolean);
  if (words.length <= 2) return [t];

  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
};

const splitParagraphs = (content: string) => {
  return (content || "")
    .split(/\n\s*\n/g)
    .map((p) => p.trim())
    .filter(Boolean);
};

const OurMission: React.FC<OurMissionProps> = () => {
  const { data: landing } = useLandingPage();

  const kicker = landing?.missionHighlight || "Our";
  const title = landing?.missionTitle || "Mission";

  const titleLines = useMemo(() => splitTitleToLines(title), [title]);

  const paragraphs = useMemo(
    () => splitParagraphs(landing?.missionContent || ""),
    [landing?.missionContent]
  );

  return (
    <S.MissionSection>
      <S.Container>
        <S.SectionHeading>
          <span className="bar" aria-hidden />
          <span className="text">Our Mission</span>
        </S.SectionHeading>

        <S.MissionCard>
          <S.MissionLeft>
            <S.MissionKicker>{kicker}</S.MissionKicker>

            <S.MissionMain>
              {titleLines.map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < titleLines.length - 1 ? <br /> : null}
                </React.Fragment>
              ))}
            </S.MissionMain>
          </S.MissionLeft>

          <S.MissionRight>
            {paragraphs.length ? (
              paragraphs.map((p, idx) => <p key={idx}>{p}</p>)
            ) : (
              <p>{landing?.missionContent || ""}</p>
            )}
          </S.MissionRight>
        </S.MissionCard>
      </S.Container>
    </S.MissionSection>
  );
};

export default OurMission;
