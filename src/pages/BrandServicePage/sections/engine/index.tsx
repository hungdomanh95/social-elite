import TickerMarquee from "@/shared/components/TickerMarquee";
import { useLandingPage } from "@/shared/api/useLandingPage";

import type { LucideIcon } from "lucide-react";
import {
  TrendingUp,
  Briefcase,
  Cpu,
  Users,
  Monitor,

  Network,
  ShoppingBag,
  Layers,
  CircleCheck,
  Globe,
} from "lucide-react";

import * as S from "./engine.styled";

/* ========= ICON MAPS ========= */

// ticker icons theo CMS (string)
const TICKER_ICONS: Record<string, LucideIcon> = {
  TrendingUp,
  Briefcase,
  Cpu,
  Users,
  Monitor,
};

function TickerIcon({ name }: { name: string }) {
  const Cmp = TICKER_ICONS[name] ?? TrendingUp;
  return <Cmp size={20} color="var(--accent)" />;
}

// engine icons theo CMS (string)
type EngineIconKey = "network" | "bag" | "stack" | "check" | "globe";

const ENGINE_ICONS: Record<EngineIconKey, LucideIcon> = {
  network: Network,
  bag: ShoppingBag,
  stack: Layers,
  check: CircleCheck,
  globe: Globe,
};

export default function SocialCommerceEngine() {
  const { data: landing } = useLandingPage();

  const tickerItems = (landing?.features ?? []) as Array<{
    id?: number;
    icon?: string;
    text?: string;
  }>;

  const titleLines = (landing?.engineTitle ?? []) as Array<{
    id?: number;
    line_text?: string;
    is_highlight?: boolean | null;
  }>;

  const engines = (landing?.engines ?? []) as Array<{
    id?: number;
    icon?: EngineIconKey | string;
    title?: string;
    content?: string;
  }>;

  return (
    <S.EngineSection>
      <S.TickerWrap>
        <TickerMarquee
          items={tickerItems.map((t, idx) => {
            const label = String(t?.text ?? "");
            const iconName = String(t?.icon ?? "TrendingUp");
            const key = t?.id ?? `${label}-${idx}`;

            return (
              <S.TickerItem key={key}>
                <TickerIcon name={iconName} />
                <span>{label}</span>
              </S.TickerItem>
            );
          })}
          durationSec={50}
          gapPx={56}
        />
      </S.TickerWrap>

      <S.EngineContainer>
        <S.EngineRow>
          <S.EngineTitle data-reveal>
            {titleLines.length ? (
              titleLines.map((l, idx) => (
                <span
                  key={l?.id ?? idx}
                  className={`line${l?.is_highlight ? " accent" : ""}`}
                >
                  {l?.line_text}
                </span>
              ))
            ) : (
              <>
                <span className="line">Our Complete</span>
                <span className="line accent">Social Commerce</span>
                <span className="line">Engine</span>
              </>
            )}
          </S.EngineTitle>

          <S.FeatureGrid data-reveal>
            {engines.map((f, idx) => {
              const iconKey = String(f?.icon ?? "network") as EngineIconKey;
              const IconCmp = ENGINE_ICONS[iconKey] ?? Network;

              return (
                <S.FeatureItem key={f?.id ?? f?.title ?? idx}>
                  <S.FeatureIcon aria-hidden="true">
                    <IconCmp size={18} />
                  </S.FeatureIcon>

                  <S.FeatureContent>
                    <S.FeatureTitle>{f?.title}</S.FeatureTitle>
                    <S.FeatureDesc>{f?.content}</S.FeatureDesc>
                  </S.FeatureContent>
                </S.FeatureItem>
              );
            })}
          </S.FeatureGrid>
        </S.EngineRow>
      </S.EngineContainer>
    </S.EngineSection>
  );
}
