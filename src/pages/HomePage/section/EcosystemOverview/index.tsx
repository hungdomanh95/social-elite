import React, { useMemo } from "react";
import * as S from "./ecosystemOverview.styled";
import TickerMarquee from "@/shared/components/TickerMarquee";
import CountUp from "@/shared/components/CountUp";
import { useLandingPage } from "@/shared/api/useLandingPage";

import { DynamicIcon, iconNames, type IconName } from "lucide-react/dynamic";

type Stat = {
  value: number;
  suffix?: string;
  label: string;
};

const parseNumberWithSuffix = (
  raw?: string
): { value: number; suffix?: string } => {
  const s = String(raw ?? "").trim();
  if (!s) return { value: 0 };

  const match = s.match(/^([\d.,]+)\s*([a-zA-Z%+]+)?$/);
  if (!match) return { value: Number(s.replace(/[^\d]/g, "")) || 0 };

  const numPart = match[1] || "0";
  const suffix = match[2];

  const base = parseFloat(numPart.replace(/,/g, "")) || 0;

  const scale =
    suffix?.toUpperCase().includes("B")
      ? 1e9
      : suffix?.toUpperCase().includes("M")
      ? 1e6
      : suffix?.toUpperCase().includes("K")
      ? 1e3
      : 1;

  const value = Math.round(base * scale);

  const keepSuffix = suffix?.includes("+")
    ? "+"
    : suffix?.includes("%")
    ? "%"
    : undefined;

  return { value, suffix: keepSuffix };
};

const DEFAULT_TICKER_ICON: IconName = "trending-up";

const normalizeIconName = (v: string) =>
  v
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/_/g, "-");

const isValidIconName = (name: string): name is IconName =>
  iconNames.includes(name as IconName);

function SafeDynamicIcon({
  name,
  fallback,
  size,
  color,
}: {
  name?: string;
  fallback: IconName;
  size: number;
  color?: string;
}) {
  const normalized = normalizeIconName(String(name ?? ""));
  const iconName = isValidIconName(normalized) ? normalized : fallback;
  return <DynamicIcon name={iconName} size={size} color={color} />;
}

const EcosystemOverview: React.FC = () => {
  const { data: landing } = useLandingPage();

  const titleTop = landing?.title || "—";
  const titleAccent = landing?.summaryHighlight || "—";

  // ✅ Badges: parse HTML highlight -> render per line (<br>) as Badge
  const badgeList = useMemo(() => {
    const html = landing?.highlight || "";
    if (!html) return [];

    const inner = html.replace(/^<p>/i, "").replace(/<\/p>$/i, "").trim();

    const parts = inner
      .split(/<br\s*\/?>/gi)
      .map((p) => p.trim())
      .filter(Boolean);

    return parts.map((part, idx) => (
      <S.Badge key={idx}>
        <span dangerouslySetInnerHTML={{ __html: part }} />
      </S.Badge>
    ));
  }, [landing?.highlight]);

  // ✅ Stats from CMS
  const statList: Stat[] = useMemo(() => {
    const list = landing?.stats ?? [];
    return list.map((s: any) => {
      const parsed = parseNumberWithSuffix(s?.number);
      return {
        value: parsed.value,
        suffix: parsed.suffix,
        label: s?.label ?? "",
      };
    });
  }, [landing?.stats]);

  // ✅ Ticker items: dùng DynamicIcon + CMS `ico` (kebab-case)
  const tickerItems = useMemo(() => {
    const list = landing?.features ?? [];
    return list
      .filter((f: any) => !!f?.text)
      .map((f: any, idx: number) => {
        const label = String(f.text);
        const ico = String(f.ico || DEFAULT_TICKER_ICON);
        const key = f?.id ?? `${label}-${ico}-${idx}`;

        return (
          <span
            key={key}
            style={{ display: "inline-flex", gap: 10, alignItems: "center" }}
          >
            <SafeDynamicIcon
              name={ico}
              fallback={DEFAULT_TICKER_ICON}
              size={16}
              color="var(--accent)"
            />
            <span style={{ fontSize: 20, fontWeight: 600 }}>{label}</span>
          </span>
        );
      });
  }, [landing?.features]);

  return (
    <S.Section>
      <S.Container>
        <S.Content>
          <S.Heading data-reveal>
            <S.TitleLine>{titleTop}</S.TitleLine>
            <S.TitleLineAccent>{titleAccent}</S.TitleLineAccent>
          </S.Heading>

          <S.CTARow data-reveal style={{ animationDelay: "90ms" }}>
            {/* ✅ Navigate to ContactUsPage */}
            <S.CTAButton to="/contact-us">Contact Us</S.CTAButton>

          </S.CTARow>

          <S.Badges data-reveal style={{ animationDelay: "160ms" }}>
            {badgeList.length ? badgeList : null}
          </S.Badges>

          <S.Stats data-reveal style={{ animationDelay: "240ms" }}>
            {statList.map((s, idx) => (
              <S.StatCard key={idx}>
                <S.StatNumber>
                  <CountUp
                    to={s.value}
                    suffix={s.suffix}
                    startOnView
                    viewThreshold={0.25}
                    durationMs={1100}
                    bounceOnFinish
                  />
                </S.StatNumber>
                <S.StatLabel>{s.label}</S.StatLabel>
              </S.StatCard>
            ))}
          </S.Stats>
        </S.Content>
      </S.Container>

      {tickerItems.length ? (
        <TickerMarquee
          style={{ marginTop: 32, marginBottom: 24 }}
          items={tickerItems}
          durationSec={50}
          gapPx={56}
        />
      ) : null}
    </S.Section>
  );
};

export default EcosystemOverview;
