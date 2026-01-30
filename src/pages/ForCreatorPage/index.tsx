import EliteTalents from "../HomePage/section/EliteTalents";
import Hero from "./sections/hero";
import Offer from "./sections/offer";

import BG_Offer from "@/assets/images/creatorPage/BG_Offer.png";

export default function ForCreator() {
  return (
    <>
      <Hero />
      <Offer bgSrc={BG_Offer} />
      <EliteTalents />
    </>
  );
}
