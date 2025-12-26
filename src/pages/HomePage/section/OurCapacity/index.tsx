import React from "react";
import * as S from "./ourCapacity.styled";
import { CAPACITY_ITEMS } from "../../mockData";
import Icon from "@/assets/icons";

const POS = {
  AGENCY_SERVICE: { x: 50, y: 14 },
  SOCIAL_CHANNEL_NETWORK: { x: 84, y: 40 },
  CREATOR_BUSINESS_MANAGEMENT: { x: 70, y: 84 },
  COMPLEX_STUDIO_SERVICE: { x: 30, y: 84 },
  MCN: { x: 16, y: 40 },
} as const;

const orderedKeys = [
  "AGENCY_SERVICE",
  "SOCIAL_CHANNEL_NETWORK",
  "CREATOR_BUSINESS_MANAGEMENT",
  "COMPLEX_STUDIO_SERVICE",
  "MCN",
] as const;

const OurCapacity: React.FC = () => {
  const maskId = React.useId();

  return (
    <S.Section>
      <S.Container>
        <S.Diagram>
          {/* center (đứng yên) */}
          <S.Center>
            <S.CenterTitle>ALL-IN-ONE</S.CenterTitle>
            <S.CenterSub>
              Ecosystem of
              <br />
              social commerce &amp;
              <br />
              influencer solutions
            </S.CenterSub>
          </S.Center>

          {/* ✅ Orbit xoay tròn: gồm line + nodes */}
          <S.Orbit style={{ ["--dur" as any]: "22s" } as React.CSSProperties}>
            <S.Lines viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
              <defs>
                <mask id={maskId} maskUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="100" height="100" fill="white" />

                  {/* center hole */}
                  <circle cx="50" cy="56" r="15" fill="black" />

                  {/* outer holes (tăng nhẹ r để line không chạm vào circle) */}
                  <circle cx="50" cy="14" r="12" fill="black" />
                  <circle cx="84" cy="40" r="12" fill="black" />
                  <circle cx="70" cy="84" r="12" fill="black" />
                  <circle cx="30" cy="84" r="12" fill="black" />
                  <circle cx="16" cy="40" r="12" fill="black" />
                </mask>
              </defs>

              <polyline
                mask={`url(#${maskId})`}
                points="50 14, 84 40, 70 84, 30 84, 16 40, 50 14"
              />
            </S.Lines>

            {orderedKeys.map((key, idx) => {
              const item = CAPACITY_ITEMS.find((x) => x.key === key)!;
              const p = POS[key];
              return (
                <S.Node
                  key={item.key}
                  style={
                    {
                      ["--x" as any]: `${p.x}%`,
                      ["--y" as any]: `${p.y}%`,
                      ["--i" as any]: idx,
                    } as React.CSSProperties
                  }
                >
                  <S.NodeInner>
                    {/* ✅ counter-rotate để nội dung không xoay */}
                    <S.NodeContent>
                      <S.NodeIconWrap>
                        <Icon name={item.icon} size={26} />
                      </S.NodeIconWrap>
                      <S.NodeText>{item.title}</S.NodeText>
                    </S.NodeContent>
                  </S.NodeInner>
                </S.Node>
              );
            })}
          </S.Orbit>
        </S.Diagram>
      </S.Container>
    </S.Section>
  );
};

export default OurCapacity;
