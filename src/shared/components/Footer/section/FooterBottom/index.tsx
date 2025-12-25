import React from "react";
import * as S from "./footerBottom.styled";
import linkedin from "@/assets/icons/linkedin.png";
import facebook from "@/assets/icons/facebook.png";
import instagram from "@/assets/icons/instagram.png";
import tiktok from "@/assets/icons/tiktok.png";
import Black_BG from "@/assets/images/Black_BG.png";

type SocialType = "linkedin" | "facebook" | "instagram" | "tiktok";

type FooterBottomProps = {
  contact?: {
    email: string;
    phone: string;
    address: string;
  };
  socials?: Array<{ type: SocialType; href: string, src: string }>;
};

const FooterBottom: React.FC<FooterBottomProps> = (props) => {
  const contact = props.contact ?? {
    email: "hello@socialelite.io",
    phone: "(+84) 2873023999",
    address: "No. 1, 3/2 Street, Ward 11, District 10, HCMC",
  };

  const socials = props.socials ?? [
    { type: "linkedin", href: "#", src: linkedin },
    { type: "facebook", href: "#", src: facebook },
    { type: "instagram", href: "#", src: instagram },
    { type: "tiktok", href: "#", src: tiktok },
  ];
  return (
    <S.FooterBar>
      <S.Container>
        <S.FooterTop>
          <S.FooterTopLeft>
            <S.Brand>
              <S.BrandLogo src={Black_BG} alt='logo' />
            </S.Brand>

            <S.Info>
              <S.InfoRow>
                <S.InfoLabel>Email:</S.InfoLabel>
                <S.InfoValue href={`mailto:${contact.email}`}>
                  {contact.email}
                </S.InfoValue>
              </S.InfoRow>

              <S.InfoRow>
                <S.InfoLabel>Phone:</S.InfoLabel>
                <S.InfoText>{contact.phone}</S.InfoText>
              </S.InfoRow>

              <S.InfoRow>
                <S.InfoLabel>Address:</S.InfoLabel>
                <S.InfoText>{contact.address}</S.InfoText>
              </S.InfoRow>
            </S.Info>
          </S.FooterTopLeft>

          <S.Socials>
            {socials.map((s) => (
              <S.SocialBtn
                key={s.type}
                href={s.href}
                aria-label={s.type}
                target="_blank"
                rel="noreferrer"
              >
                <img src={s.src} alt={s.type} />
              </S.SocialBtn>
            ))}
          </S.Socials>
        </S.FooterTop>

        <S.Line/>

        <S.FooterBottom>
          <S.Copyright>
            © {2023}. All rights reserved by Social Elite.
          </S.Copyright>
        </S.FooterBottom>
      </S.Container>
    </S.FooterBar>
  );
};

export default FooterBottom;
