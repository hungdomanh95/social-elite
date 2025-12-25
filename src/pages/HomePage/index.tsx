// HomePage
import SE_2025 from "@/assets/videos/SE_2025.mp4";
import Banner from "./section/Banner";
import TrustBy from "./section/TrustBy";
import DATA_TRUST_BY, { leftTalents, rightTalents } from "./mockData";
import EcosystemOverview from "./section/EcosystemOverview";
import EliteTalents from "./section/EliteTalents";




const HomePage = () => {
  return (
    <div>
      <Banner videoSrc={SE_2025} />
      <EcosystemOverview />
      <EliteTalents leftTalents={leftTalents} rightTalents={rightTalents} imageHeight={310} />
      <TrustBy brands={DATA_TRUST_BY} speedSec={20} />
    </div>
  );
};

export default HomePage;
