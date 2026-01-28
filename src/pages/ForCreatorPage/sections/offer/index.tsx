import { useLandingPage } from "@/shared/api/useLandingPage";
import { useEffect, useMemo, useRef } from "react";
import * as S from "./offer.styled";

import { DynamicIcon, type IconName } from "lucide-react/dynamic";

type OfferItem = {
  ico: IconName;
  label: string;
};

type Props = {
  bgSrc: string;
};

export default function Offer({ bgSrc }: Props) {
  const wrapRef = useRef<HTMLElement | null>(null);
  const { data: landing } = useLandingPage();

  const offers = useMemo<OfferItem[]>(() => {
    const list = (landing?.creatorOffers ?? []) as Array<{
      id?: number;
      ico?: IconName;
      text?: string;
    }>;

    if (!Array.isArray(list)) return [];

    return list
      .filter((x) => !!x?.text)
      .map((x) => ({
        ico: (x.ico ?? "users") as IconName,
        label: String(x.text || ""),
      }));
  }, [landing?.creatorOffers]);

  // ✅ split rows: ưu tiên đúng layout 3 + 2 nếu có 5 item
  const { offerTop, offerBottom } = useMemo(() => {
    const n = offers.length;

    if (n === 5) {
      return { offerTop: offers.slice(0, 3), offerBottom: offers.slice(3) };
    }

    const topCount = Math.max(1, Math.ceil(n / 2));
    return {
      offerTop: offers.slice(0, topCount),
      offerBottom: offers.slice(topCount),
    };
  }, [offers]);

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

        <S.OfferRow data-cols={offerTop.length >= 3 ? "3" : "2"}>
          {offerTop.map((it, idx) => (
            <S.OfferItem
              key={it.label}
              data-reveal
              style={{ ["--d" as any]: `${120 + idx * 90}ms` }}
            >
              <S.OfferIcon aria-hidden="true">
                <DynamicIcon name={it.ico} size={28} color="currentColor" />
              </S.OfferIcon>
              <S.OfferText>{it.label}</S.OfferText>
            </S.OfferItem>
          ))}
        </S.OfferRow>

        {offerBottom.length ? (
          <S.OfferRow data-cols={offerBottom.length >= 3 ? "3" : "2"}>
            {offerBottom.map((it, idx) => {
              console.log('it: ', it);
              const base = 120 + offerTop.length * 90 + 140;
              return (
                <S.OfferItem
                  key={it.label}
                  data-reveal
                  style={{ ["--d" as any]: `${base + idx * 90}ms` }}
                >
                  <S.OfferIcon aria-hidden="true">
                    <DynamicIcon name={it.ico} size={28} color="currentColor" />
                  </S.OfferIcon>
                  <S.OfferText>{it.label}</S.OfferText>
                </S.OfferItem>
              );
            })}
          </S.OfferRow>
        ) : null}
      </S.OfferInner>
    </S.OfferSection>
  );
}
