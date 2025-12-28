// HomePage
import SE_2025 from "@/assets/videos/SE_2025.mp4";
import Banner from "./section/Banner";
import TrustBy from "./section/TrustBy";
import DATA_TRUST_BY, { leftTalents, rightTalents, SUCCESS_STORIES } from "./mockData";
import EcosystemOverview from "./section/EcosystemOverview";
import EliteTalents from "./section/EliteTalents";
import OurCapacity from "./section/OurCapacity";
import SuccessStories from "./section/SuccessStories";




const HomePage = () => {
  return (
    <div style={{ backgroundColor : "#010402"}}>
      <Banner videoSrc={SE_2025} />
      <EcosystemOverview />
      <EliteTalents leftTalents={leftTalents} rightTalents={rightTalents}/>
      <OurCapacity />
      <SuccessStories items={SUCCESS_STORIES} />
      <TrustBy brands={DATA_TRUST_BY}/>
    </div>
  );
};

export default HomePage;
