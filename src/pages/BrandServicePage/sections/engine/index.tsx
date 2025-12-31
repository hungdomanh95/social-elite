import TickerMarquee from "@/shared/components/TickerMarquee";
import { TICKER_TRENDING } from "@/pages/HomePage/mockData";

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

type Feature = {
  icon: "network" | "bag" | "stack" | "check" | "globe";
  title: string;
  desc: string;
};

const FEATURES: Feature[] = [
  {
    icon: "network",
    title: "Multi-Channel Network (MCNs)",
    desc: "Official MCN Agency partnered with top e-commerce platforms (Shopee, TikTok Shop, Lazada), delivering 5,000+ livestream sessions and generating GMV worth billions.",
  },
  {
    icon: "bag",
    title: "Agency Service",
    desc: "End-to-end client campaign service & digital solutions to optimize brand growth.",
  },
  {
    icon: "stack",
    title: "Premium Complex Studios",
    desc: "The top-notch studio service with 60+ room options with diverse selection with 24/7 professional crews and equipments",
  },
  {
    icon: "check",
    title: "Creator Business",
    desc: "Owns an intensive network with 500+ top creators and top selective strategic creators with 50+ top-tier celebrities and top social sellers.",
  },
  {
    icon: "globe",
    title: "Social Channels Network",
    desc: "Partnered with 150+ media channels and trusted by 200+ brand campaigns for large-scale media exposure.",
  },
];

const FEATURE_ICONS: Record<Feature["icon"], LucideIcon> = {
  network: Network,
  bag: ShoppingBag,
  stack: Layers,
  check: CircleCheck,
  globe: Globe,
};

// ticker icons theo mockData (string)
const TICKER_ICONS: Record<string, LucideIcon> = {
  TrendingUp,
  Briefcase,
  Cpu,
  Users,
  Monitor,
};

function TickerIcon({ name }: { name: string }) {
  const Cmp = TICKER_ICONS[name] ?? TrendingUp;
  return <Cmp size={16} color="var(--accent)" />;
}

export default function SocialCommerceEngine() {
  return (
    <S.EngineSection>
      <S.EngineContainer>
        <S.TickerWrap>
          <TickerMarquee
            items={TICKER_TRENDING.map(({ label, icon }) => (
              <S.TickerItem key={label}>
                <TickerIcon name={String(icon)} />
                <span>{label}</span>
              </S.TickerItem>
            ))}
            durationSec={50}
            gapPx={56}
          />
        </S.TickerWrap>

        <S.EngineRow>
          <S.EngineTitle data-reveal>
            <span className="line">Our Complete</span>
            <span className="line accent">Social Commerce</span>
            <span className="line">Engine</span>
          </S.EngineTitle>

          <S.FeatureGrid data-reveal>
            {FEATURES.map((f) => {
              const IconCmp = FEATURE_ICONS[f.icon];
              return (
                <S.FeatureItem key={f.title}>
                  <S.FeatureIcon aria-hidden="true">
                    <IconCmp size={18} />
                  </S.FeatureIcon>

                  <S.FeatureContent>
                    <S.FeatureTitle>{f.title}</S.FeatureTitle>
                    <S.FeatureDesc>{f.desc}</S.FeatureDesc>
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
