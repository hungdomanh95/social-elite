import Platform from "./section/Platform";
import Contact from "./section/Contact";
import FooterBottom from "./section/FooterBottom";

import Background_Pattern from "@/assets/images/Background_Pattern.png";
import * as S from "./footer.styled";

export default function Footer() {
  return (
    <S.Wrap>
      {/* ===== Platform + Contact (has pattern background) ===== */}
      <S.TopArea $pattern={Background_Pattern}>
        <S.TopInner>
          <Platform />
          <Contact />
        </S.TopInner>
      </S.TopArea>

      {/* ===== Footer Bottom (solid) ===== */}
      <S.BottomArea>
        <FooterBottom />
      </S.BottomArea>
    </S.Wrap>
  );
}
