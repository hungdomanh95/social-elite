import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
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
const clamp = (min: number, v: number, max: number) => Math.max(min, Math.min(max, v));

const OurCapacity: React.FC = () => {
  const maskId = React.useId();

  // ===== measure Diagram size => derive R/CY safely
  const diagramRef = useRef<HTMLDivElement | null>(null);
  const [dPx, setDPx] = useState(0);

  useLayoutEffect(() => {
    const el = diagramRef.current;
    if (!el) return;

    const measure = () => setDPx(el.getBoundingClientRect().width || 0);
    measure();

    const ro = new ResizeObserver(() => measure());
    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  const metrics = useMemo(() => {
    const d = dPx || 880; // fallback for first paint
    const isSmall = d <= 420; //sc; // roughly maps to <= 640 layout in your setup

    // must match styled.ts vars
    const centerSizePx = isSmall ? clamp(96, d * 0.4, 180) : clamp(112, d * 0.42, 220);
    const nodeSizePx = isSmall ? clamp(70, d * 0.25, 128) : clamp(78, d * 0.29, 160);

    // convert px -> viewBox units (0..100)
    const centerR = (centerSizePx / d) * 50;
    const nodeR = (nodeSizePx / d) * 50;

    const gap = isSmall ? 2.6 : 2.2; // space between center-ring and node-ring
    const pad = isSmall ? 2.6 : 2.2; // safe padding to keep top node inside Diagram

    // spacious radius, but never collide with center
    let R = Math.max(isSmall ? 44 : 46, centerR + nodeR + gap);
    R = Math.min(R, 48.5); // cap to avoid overstretch look

    // push orbit down enough so TOP node never spills into header area
    let CY = 56; // baseline slightly lower than 52.7
    CY = Math.max(CY, R + nodeR + pad);
    CY = Math.min(CY, 66.5); // prevent going too low visually

    // after clamping CY, ensure R still fits safely on top
    const RmaxTop = CY - nodeR - pad;
    R = Math.min(R, RmaxTop);

    // holes follow real sizes (mask line ends nicely at rings)
    const HOLE_OUTER = nodeR + 1.2;
    const HOLE_CENTER = centerR + 1.4;

    return { R, CY, HOLE_OUTER, HOLE_CENTER };
  }, [dPx]);

  const CX = 50;
  const CY = metrics.CY;

  const vertices = useMemo(() => {
    const angles = [-90, -18, 54, 126, 198]; // top -> clockwise
    return angles.map((a) => ({
      x: CX + metrics.R * Math.cos(deg2rad(a)),
      y: CY + metrics.R * Math.sin(deg2rad(a)),
    }));
  }, [CX, CY, metrics.R]);

  const pointsStr = useMemo(() => {
    const pts = vertices.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`);
    return `${pts.join(", ")}, ${pts[0]}`;
  }, [vertices]);

  return (
    <S.Section $bg={BG_Capacity}>
      <S.Container>
        <S.Header>
          <S.Kicker>Our Capacity</S.Kicker>
          <S.Headline>Comprehensive Set Of Service</S.Headline>
        </S.Header>

        <S.Bleed>
          <S.Diagram
            ref={diagramRef}
            style={{ ["--cy" as any]: `${CY}%` } as React.CSSProperties}
          >
            <S.Stage>
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

              <S.Orbit style={{ ["--dur" as any]: "22s" } as React.CSSProperties}>
                <S.Lines viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
                  <defs>
                    <mask id={maskId} maskUnits="userSpaceOnUse">
                      <rect x="0" y="0" width="100" height="100" fill="white" />

                      {/* center hole */}
                      <circle cx={CX} cy={CY} r={metrics.HOLE_CENTER} fill="black" />

                      {/* node holes */}
                      {vertices.map((p, idx) => (
                        <circle
                          key={idx}
                          cx={p.x}
                          cy={p.y}
                          r={metrics.HOLE_OUTER}
                          fill="black"
                        />
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
