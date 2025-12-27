import React, { useMemo } from "react";
import * as S from "./ourCapacity.styled";
import BG_Capacity from "@/assets/images/BG_Capacity.png";

import { CAPACITY_ITEMS } from "../../mockData";
import Icon from "@/assets/icons";

const orderedKeys = [
  "AGENCY_SERVICE",
  "SOCIAL_CHANNEL_NETWORK",
  "CREATOR_BUSINESS_MANAGEMENT",
  "COMPLEX_STUDIO_SERVICE",
  "MCN",
] as const;

const deg2rad = (deg: number) => (deg * Math.PI) / 180;

const OurCapacity: React.FC = () => {
  const maskId = React.useId();

  /**
   * Regular pentagon khớp layout hình:
   * top y ≈ 14, bottom y ≈ 84  -> CY ≈ 52.7, R ≈ 38.7
   */
  const CX = 50;
  const CY = 52.7;
  const R = 38.7;

  const vertices = useMemo(() => {
    const angles = [-90, -18, 54, 126, 198];
    return angles.map((a) => ({
      x: CX + R * Math.cos(deg2rad(a)),
      y: CY + R * Math.sin(deg2rad(a)),
    }));
  }, []);

  const pointsStr = useMemo(() => {
    const pts = vertices.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`);
    return `${pts.join(", ")}, ${pts[0]}`;
  }, [vertices]);

  // ✅ tăng radius “hole” để line không chạm mép circle => không còn vệt xanh lọt vào
const HOLE_OUTER = 11.8;   // 11.5–12.5 tuỳ mắt
const HOLE_CENTER = 16.2;  // 15.5–16.8 tuỳ mắt

  return (
    <S.Section $bg={BG_Capacity}>
      <S.Container>
        <S.Header>
          <S.Kicker>Our Capacity</S.Kicker>
          <S.Headline>Comprehensive Set Of Service</S.Headline>
        </S.Header>

        {/* ✅ full-bleed wrapper cho mobile */}
        <S.Bleed>
          <S.Diagram
            style={
              {
                ["--cy" as any]: `${CY}%`,
              } as React.CSSProperties
            }
          >
            <S.Stage>
              {/* Center đứng yên */}
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

              {/* Orbit xoay: line + nodes */}
              <S.Orbit style={{ ["--dur" as any]: "22s" } as React.CSSProperties}>
                <S.Lines viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
                  <defs>
                    <mask id={maskId} maskUnits="userSpaceOnUse">
                      <rect x="0" y="0" width="100" height="100" fill="white" />

                      {/* cut center */}
                      <circle cx={CX} cy={CY} r={HOLE_CENTER} fill="black" />

                      {/* cut outer nodes */}
                      {vertices.map((p, idx) => (
                        <circle key={idx} cx={p.x} cy={p.y} r={HOLE_OUTER} fill="black" />
                      ))}
                    </mask>
                  </defs>

                  <polyline mask={`url(#${maskId})`} points={pointsStr} />
                </S.Lines>

                {orderedKeys.map((key, idx) => {
                  const item = CAPACITY_ITEMS.find((x) => x.key === key)!;
                  const p = vertices[idx];

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
                        <S.NodeShell>
                          {/* counter-rotate để nội dung không xoay */}
                          <S.NodeContent>
                            <S.NodeIconWrap>
                              <Icon name={item.icon} size={26} />
                            </S.NodeIconWrap>
                            <S.NodeText>{item.title}</S.NodeText>
                          </S.NodeContent>
                        </S.NodeShell>
                      </S.NodeInner>
                    </S.Node>
                  );
                })}
              </S.Orbit>
            </S.Stage>
          </S.Diagram>
        </S.Bleed>
      </S.Container>
    </S.Section>
  );
};

export default OurCapacity;
