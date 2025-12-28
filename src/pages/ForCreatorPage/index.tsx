import React, { useMemo } from "react";
import * as S from "./forCreator.styled";

 import orbitImageSrc from "@/assets/images/creatorPage/img_creator.png";

 import BG_Offer from "@/assets/images/creatorPage/BG_Offer.png";

import Icon from "@/assets/icons";

type OfferItem = {
  icon: React.ReactNode;
  label: string;
};

type Props = {
  onJoinClick?: () => void;
};


export default function ForCreator({ onJoinClick }: Props) {
  const offerTop = useMemo<OfferItem[]>(
    () => [
      { icon: <Icon name='Users' />, label: "Talent Management" },
      { icon: <Icon name='DollarSign' />, label: "Social Seller Strategy" },
      { icon: <Icon name='Handshake' />, label: "Brand Collaboration" },
    ],
    []
  );

  const offerBottom = useMemo<OfferItem[]>(
    () => [
      { icon: <Icon name='TrendingUp' />, label: "Revenue Maximization" },
      { icon: <Icon name='Film' />, label: "Content Production and Operation" },
    ],
    []
  );

return (
    <>
      {/* HERO */}
      <S.HeroSection>
        <S.HeroInner>
          <S.Copy>
            <S.H1>
              <span>A creator-</span>
              <span>powered</span>
              <span className="accent">community</span>
              <span>unlocking brand</span>
              <span>and commercial</span>
              <span>growth</span>
            </S.H1>

            <S.CTAButton type="button" onClick={onJoinClick}>
              Join Us!
            </S.CTAButton>

            <S.StatsRow>
              <S.Stat>
                <S.StatValue>50+</S.StatValue>
                <S.StatLabel>Exclusive Talents</S.StatLabel>
              </S.Stat>

              <S.Stat>
                <S.StatValue>100+</S.StatValue>
                <S.StatLabel>Top-tier KOLs</S.StatLabel>
              </S.Stat>

              <S.Stat>
                <S.StatValue>1000+</S.StatValue>
                <S.StatLabel>Campaigns</S.StatLabel>
              </S.Stat>
            </S.StatsRow>
          </S.Copy>

          <S.Visual>
            {orbitImageSrc ? (
              <S.OrbitImage src={orbitImageSrc} alt="Creator network" />
            ) : (
              <S.OrbitFallback aria-hidden="true">
                <S.OrbitGlow />
                <S.OrbitDash />
                <S.OrbitCenter>socialelite</S.OrbitCenter>
              </S.OrbitFallback>
            )}
          </S.Visual>
        </S.HeroInner>
      </S.HeroSection>

      {/* WE OFFER */}
      <S.OfferSection $bg={BG_Offer}>
        <S.OfferInner>
          <S.OfferTitle>We Offer</S.OfferTitle>

          <S.OfferRow data-cols="3">
            {offerTop.map((it) => (
              <S.OfferItem key={it.label}>
                <S.OfferIcon>{it.icon}</S.OfferIcon>
                <S.OfferText>{it.label}</S.OfferText>
              </S.OfferItem>
            ))}
          </S.OfferRow>

          <S.OfferRow data-cols="2">
            {offerBottom.map((it) => (
              <S.OfferItem key={it.label}>
                <S.OfferIcon>{it.icon}</S.OfferIcon>
                <S.OfferText>{it.label}</S.OfferText>
              </S.OfferItem>
            ))}
          </S.OfferRow>
        </S.OfferInner>
      </S.OfferSection>
    </>
  );
}
