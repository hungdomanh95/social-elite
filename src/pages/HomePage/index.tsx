import Banner from "./section/Banner";
import EcosystemOverview from "./section/EcosystemOverview";
import EliteTalents from "./section/EliteTalents";
import OurCapacity from "./section/OurCapacity";
import SuccessStories from "./section/SuccessStories";
import TrustBy from "./section/TrustBy";

const HomePage = () => {

  return (
    <div style={{ backgroundColor: "#010402" }}>
      <Banner />
      <EcosystemOverview />
      <EliteTalents />
      <OurCapacity />
      <SuccessStories />
      <TrustBy />
    </div>
  );
};

export default HomePage;
