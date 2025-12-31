import Hero from "./sections/hero";
import Offer from "./sections/offer";


import BG_Offer from "@/assets/images/creatorPage/BG_Offer.png";

type Props = {
  onJoinClick?: () => void;
};

export default function ForCreator({ onJoinClick }: Props) {
  return (
    <>
      <Hero onJoinClick={onJoinClick} />
      <Offer bgSrc={BG_Offer} />
    </>
  );
}
