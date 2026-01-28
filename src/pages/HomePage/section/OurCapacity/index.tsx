import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import * as S from "./ourCapacity.styled";
import BG_Capacity from "@/assets/images/BG_Capacity.png";
import { useLandingPage } from "@/shared/api/useLandingPage";

import { DynamicIcon, type IconName } from "lucide-react/dynamic";

type LandingService = {
  id: number;
  text: string;
  ico: IconName; // ✅ ico luôn đúng theo lucide
};

const deg2rad = (deg: number) => (deg * Math.PI) / 180;
const clamp = (min: number, v: number, max: number) =>
  Math.max(min, Math.min(max, v));

const normalize = (s: string) =>
  s
    .replace(/\\n/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

const SERVICE_ORDER = [
  "agency service",
  "social channel network",
  "creator business management",
  "complex studio service",
  "multi-channel network (mcn)",
];

const OurCapacity: React.FC = () => {
  const maskId = React.useId();
  const { data: landing } = useLandingPage();

  const sectionRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);

  const [headerPx, setHeaderPx] = useState(0);
  const [dBoundPx, setDBoundPx] = useState(0);

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

      const safety = 28;

      const availH =
        secRect.height - padTop - padBottom - headRect.height - gapPx - safety;
      const availW = contRect.width;

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

  const metrics = useMemo(() => {
    const d = dBoundPx || 720;
    const isSmall = d <= 420;

    const centerSizePx = isSmall
      ? clamp(78, d * 0.3, 150)
      : clamp(88, d * 0.32, 176);

    const nodeSizePx = isSmall
      ? clamp(56, d * 0.205, 112)
      : clamp(62, d * 0.235, 132);

    const centerR = (centerSizePx / d) * 50;
    const nodeR = (nodeSizePx / d) * 50;

    const pad = isSmall ? 3.0 : 2.6;
    const gap = isSmall ? 2.2 : 1.9;

    let RDesired = centerR + nodeR + gap;

    const RCapVisual = 47.0;
    const RCapFit = 50 - nodeR - pad;

    let R = Math.min(RDesired, RCapVisual, RCapFit);

    R = Math.max(R, isSmall ? 35.5 : 37.0);
    R = Math.min(R, RCapFit);

    const minCY = R + nodeR + pad;
    const maxCY = 100 - (R + nodeR + pad);

    const preferredCY = 54.5;
    const CY = clamp(minCY, preferredCY, maxCY);

    const HOLE_OUTER = Math.max(0, nodeR - 0.25);
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

  const orderedServices: LandingService[] = useMemo(() => {
    const list: LandingService[] = (landing?.services ?? []) as any;
    if (!Array.isArray(list) || list.length === 0) return [];

    const picked: LandingService[] = [];
    const used = new Set<number>();

    for (const key of SERVICE_ORDER) {
      const found = list.find(
        (s) => !used.has(s.id) && normalize(s.text || "").includes(key)
      );
      if (found) {
        picked.push(found);
        used.add(found.id);
      }
    }

    const rest = list.filter((s) => !used.has(s.id));
    return [...picked, ...rest].slice(0, 5);
  }, [landing?.services]);

  const headline = useMemo(() => {
    return (landing?.serviceTitle || "Comprehensive Set Of Service").trim();
  }, [landing?.serviceTitle]);

  const renderServiceText = (text: string) => {
    const lines = String(text || "")
      .replace(/\\n/g, "\n")
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    if (lines.length <= 1) return text.replace(/\\n/g, " ");

    return (
      <>
        {lines.map((line, i) => (
          <React.Fragment key={i}>
            {line}
            {i < lines.length - 1 ? <br /> : null}
          </React.Fragment>
        ))}
      </>
    );
  };

  return (
    <S.Section ref={sectionRef} $bg={BG_Capacity}>
      <S.Container ref={containerRef}>
        <S.Header ref={headerRef}>
          <S.Kicker>Our Capacity</S.Kicker>
          <S.Headline>{headline}</S.Headline>
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

                {orderedServices.map((item, idx) => {
                  const p = vertices[idx];
                  if (!p) return null;

                  return (
                    <S.Node
                      key={item.id ?? idx}
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
                              <DynamicIcon
                                name={item.ico}
                                size={iconSize}
                                color="var(--accent)"
                              />
                            </S.NodeIconWrap>

                            <S.NodeText>{renderServiceText(item.text)}</S.NodeText>
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
