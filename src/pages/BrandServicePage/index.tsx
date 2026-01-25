import SuccessStories from "../HomePage/section/SuccessStories";

import * as S from "./brandService.styled";
import BottomCTA from "./sections/bottomCta";
import SocialCommerceEngine from "./sections/engine";
import BrandServiceHero from "./sections/hero";
import ProofGrid from "./sections/proof";

export default function BrandService() {
  return (
    <S.Page>
      <BrandServiceHero />
      <SocialCommerceEngine />
      <SuccessStories />
      <ProofGrid />
      <BottomCTA />
    </S.Page>
  );
}
