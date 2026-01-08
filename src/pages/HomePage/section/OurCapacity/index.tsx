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
const clamp = (min: number, v: number, max: number) =>
  Math.max(min, Math.min(max, v));

const OurCapacity: React.FC = () => {
  const maskId = React.useId();

  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);

  const [headerPx, setHeaderPx] = useState(0);
  const [dBoundPx, setDBoundPx] = useState(0);

  // ✅ compute max square for Diagram that fits inside 1 viewport (after header/padding/gap)
  useLayoutEffect(() => {
    const sectionEl = sectionRef.current;
    const containerEl = containerRef.current;
    const headerEl = headerRef.current;
    if (!sectionEl || !containerEl || !headerEl) return;

    const measure = () => {
      const secRect = sectionEl.getBoundingClientRect();
      const headRect = headerEl.getBoundingClientRect();
      const contRect = containerEl.getBoundingClientRect();

      const secStyle = window.getComputedStyle(sectionEl);
      const contStyle = window.getComputedStyle(containerEl);

      const padTop = parseFloat(secStyle.paddingTop || "0") || 0;
      const padBottom = parseFloat(secStyle.paddingBottom || "0") || 0;

      const gapStr = contStyle.rowGap || contStyle.gap || "0";
      const gapPx = parseFloat(gapStr) || 0;

      // buffer thêm để tránh bị “cấn” do browser bar/status bar
      const safety = 28;

      const availH =
        secRect.height - padTop - padBottom - headRect.height - gapPx - safety;
      const availW = contRect.width;

      // ✅ shrink nhẹ để chừa mép an toàn
      const d = Math.floor(clamp(240, Math.min(availW, availH) * 0.96, 880));

      setHeaderPx(Math.round(headRect.height));
      setDBoundPx(d);
    };

    measure();

    const ro = new ResizeObserver(() => measure());
    ro.observe(sectionEl);
    ro.observe(containerEl);
    ro.observe(headerEl);

    window.addEventListener("orientationchange", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("orientationchange", measure);
    };
  }, []);

  // ✅ core: enforce TOP + BOTTOM inside Diagram (0..100)
  const metrics = useMemo(() => {
    const d = dBoundPx || 720;
    const isSmall = d <= 420;

    // sizes (px) -> viewBox units
    const centerSizePx = isSmall
      ? clamp(78, d * 0.3, 150)
      : clamp(88, d * 0.32, 176);

    // ✅ Node to hơn 1 xíu (so với bản ổn trước)
    const nodeSizePx = isSmall
      ? clamp(56, d * 0.205, 112)
      : clamp(62, d * 0.235, 132);

    const centerR = (centerSizePx / d) * 50;
    const nodeR = (nodeSizePx / d) * 50;

    const pad = isSmall ? 3.0 : 2.6;
    const gap = isSmall ? 2.2 : 1.9;

    // R mong muốn
    let RDesired = centerR + nodeR + gap;

    // cap nhìn đẹp
    const RCapVisual = 47.0;

    // ✅ fit top+bottom: R <= 50 - nodeR - pad
    const RCapFit = 50 - nodeR - pad;

    let R = Math.min(RDesired, RCapVisual, RCapFit);

    // mức tối thiểu để layout không quá “bẹp”
    R = Math.max(R, isSmall ? 35.5 : 37.0);

    // luôn phải cap theo fit
    R = Math.min(R, RCapFit);

    const minCY = R + nodeR + pad;
    const maxCY = 100 - (R + nodeR + pad);

    // prefer hơi thấp giống design
    const preferredCY = 54.5;
    const CY = clamp(minCY, preferredCY, maxCY);

    // ✅ Line sát vòng tròn:
    // giảm hole để line đi sát vào node (node che lên nên nhìn “dính”)
    const HOLE_OUTER = Math.max(0, nodeR - 0.25);
    // center cũng giảm nhẹ để polyline không bị hụt (center che lên anyway)
    const HOLE_CENTER = Math.max(0, centerR - 0.35);

    return { d, R, CY, HOLE_OUTER, HOLE_CENTER };
  }, [dBoundPx]);

  const CX = 50;
  const CY = metrics.CY;

  const vertices = useMemo(() => {
    const angles = [-90, -18, 54, 126, 198];
    return angles.map((a) => ({
      x: CX + metrics.R * Math.cos(deg2rad(a)),
      y: CY + metrics.R * Math.sin(deg2rad(a)),
    }));
  }, [CX, CY, metrics.R]);

  const pointsStr = useMemo(() => {
    const pts = vertices.map((p) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`);
    return `${pts.join(", ")}, ${pts[0]}`;
  }, [vertices]);

  const iconSize = useMemo(() => {
    return Math.round(clamp(18, metrics.d * 0.03, 26));
  }, [metrics.d]);

  return (
    <S.Section ref={sectionRef} $bg={BG_Capacity}>
      <S.Container ref={containerRef}>
        <S.Header ref={headerRef}>
          <S.Kicker>Our Capacity</S.Kicker>
          <S.Headline>Comprehensive Set Of Service</S.Headline>
        </S.Header>

        <S.Bleed>
          <S.Diagram
            style={
              {
                ["--cy" as any]: `${CY}%`,
                ["--headerH" as any]: `${headerPx}px`,
                ["--dBound" as any]: `${metrics.d}px`,
              } as React.CSSProperties
            }
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

                      <circle cx={CX} cy={CY} r={metrics.HOLE_CENTER} fill="black" />

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
                  const item = CAPACITY_ITEMS.find((x) => x.key === key);
                  if (!item) return null;

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
                              <Icon name={item.icon} size={iconSize} />
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
