import React, { useEffect, useMemo, useRef } from "react";
import * as S from "./offer.styled";
import Icon from "@/assets/icons";

type OfferItem = {
  icon: React.ReactNode;
  label: string;
};

type Props = {
  bgSrc: string;
};

export default function Offer({ bgSrc }: Props) {
  const wrapRef = useRef<HTMLElement | null>(null);

  const offerTop = useMemo<OfferItem[]>(
    () => [
      { icon: <Icon name="Users" />, label: "Talent Management" },
      { icon: <Icon name="DollarSign" />, label: "Social Seller Strategy" },
      { icon: <Icon name="Handshake" />, label: "Brand Collaboration" },
    ],
    []
  );

  const offerBottom = useMemo<OfferItem[]>(
    () => [
      { icon: <Icon name="TrendingUp" />, label: "Revenue Maximization" },
      { icon: <Icon name="Film" />, label: "Content Production and Operation" },
    ],
    []
  );

  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;

    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("reveal-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.15 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <S.OfferSection ref={wrapRef as any} $bg={bgSrc}>
      <S.OfferInner>
        <S.OfferTitle data-reveal style={{ ["--d" as any]: "0ms" }}>
          We Offer
        </S.OfferTitle>

        <S.OfferRow data-cols="3">
          {offerTop.map((it, idx) => (
            <S.OfferItem
              key={it.label}
              data-reveal
              style={{ ["--d" as any]: `${120 + idx * 90}ms` }}
            >
              <S.OfferIcon aria-hidden="true">{it.icon}</S.OfferIcon>
              <S.OfferText>{it.label}</S.OfferText>
            </S.OfferItem>
          ))}
        </S.OfferRow>

        <S.OfferRow data-cols="2">
          {offerBottom.map((it, idx) => {
            const base = 120 + offerTop.length * 90 + 140;
            return (
              <S.OfferItem
                key={it.label}
                data-reveal
                style={{ ["--d" as any]: `${base + idx * 90}ms` }}
              >
                <S.OfferIcon aria-hidden="true">{it.icon}</S.OfferIcon>
                <S.OfferText>{it.label}</S.OfferText>
              </S.OfferItem>
            );
          })}
        </S.OfferRow>
      </S.OfferInner>
    </S.OfferSection>
  );
}
