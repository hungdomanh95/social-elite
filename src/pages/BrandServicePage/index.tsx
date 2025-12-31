import SuccessStories from "../HomePage/section/SuccessStories";
import { SUCCESS_STORIES } from "../HomePage/mockData";

import * as S from "./brandService.styled";
import BrandServiceHero from "./sections/hero";
import SocialCommerceEngine from "./sections/engine";
import ProofGrid from "./sections/proof";
import BottomCTA from "./sections/bottomCta";

export default function BrandService() {
  return (
    <S.Page>
      <BrandServiceHero />
      <SocialCommerceEngine />
      <SuccessStories items={SUCCESS_STORIES} />
      <ProofGrid />
      <BottomCTA />
    </S.Page>
  );
}
