import * as S from "./aboutUs.styled";
import Milestones from "./section/Milestones";
import OurMission from "./section/OurMission";

export default function AboutUs() {
  return (
    <S.Page>
      {/* TOP TITLE */}
      <S.Hero>
        <S.HeroTitle>About Us</S.HeroTitle>
      </S.Hero>
      {/* OUR MISSION */}
      <OurMission />
      {/* KEY MILESTONES */}
      <Milestones />
    </S.Page>
  );
}
