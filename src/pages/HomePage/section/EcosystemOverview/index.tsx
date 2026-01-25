import React, { useMemo } from "react";
import * as S from "./ecosystemOverview.styled";
import TickerMarquee from "@/shared/components/TickerMarquee";
import CountUp from "@/shared/components/CountUp";
import Icon from "@/assets/icons";
import { useLandingPage } from "@/shared/api/useLandingPage";


type Stat = {
  value: number;
  suffix?: string;
  label: string;
};

const parseNumberWithSuffix = (raw?: string): { value: number; suffix?: string } => {
  const s = String(raw ?? "").trim();
  if (!s) return { value: 0 };

  const match = s.match(/^([\d.,]+)\s*([a-zA-Z%+]+)?$/);
  if (!match) return { value: Number(s.replace(/[^\d]/g, "")) || 0 };

  const numPart = match[1] || "0";
  const suffix = match[2];

  const base = parseFloat(numPart.replace(/,/g, "")) || 0;

  // optional scale for K/M/B
  const scale =
    suffix?.toUpperCase().includes("B") ? 1e9 :
    suffix?.toUpperCase().includes("M") ? 1e6 :
    suffix?.toUpperCase().includes("K") ? 1e3 :
    1;

  const value = Math.round(base * scale);

  // keep "+" or "%" as suffix if present, otherwise keep K/M/B if you want
  const keepSuffix =
    suffix?.includes("+") ? "+" :
    suffix?.includes("%") ? "%" :
    undefined;

  return { value, suffix: keepSuffix };
};

const EcosystemOverview: React.FC<{ onContactClick?: () => void }> = ({ onContactClick }) => {
  const { data: landing } = useLandingPage();

  const titleTop = landing?.title || "—";
  const titleAccent = landing?.summaryHighlight || "—";

  // ✅ Badges: parse HTML highlight -> render per line (<br>) as Badge
  const badgeList = useMemo(() => {
    const html = landing?.highlight || "";
    if (!html) return [];

    // strip outer <p>...</p> if any
    const inner = html
      .replace(/^<p>/i, "")
      .replace(/<\/p>$/i, "")
      .trim();

    // split by <br> tags
    const parts = inner
      .split(/<br\s*\/?>/gi)
      .map((p) => p.trim())
      .filter(Boolean);

    // render each part as HTML (badge content contains spans + strong)
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

  const tickerItems = useMemo(() => {
    const list = landing?.features ?? [];
    return list
      .filter((f: any) => !!f?.text)
      .map((f: any) => {
        const label = String(f.text);
        const icon = String(f.icon || "TrendingUp");
        console.log('icon: ', icon);
        return (
          <span
            key={`${label}-${icon}`}
            style={{ display: "inline-flex", gap: 10, alignItems: "center" }}
          >
            <Icon name={icon as any} size={16} color="var(--accent)" />
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
            <S.CTAButton type="button" onClick={onContactClick}>
              Contact Us
            </S.CTAButton>
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
