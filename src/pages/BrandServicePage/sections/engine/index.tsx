import TickerMarquee from "@/shared/components/TickerMarquee";
import { useLandingPage } from "@/shared/api/useLandingPage";

import { DynamicIcon, iconNames, type IconName } from "lucide-react/dynamic";

import * as S from "./engine.styled";

const DEFAULT_TICKER_ICON: IconName = "trending-up";
const DEFAULT_ENGINE_ICON: IconName = "network";

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

export default function SocialCommerceEngine() {
  const { data: landing } = useLandingPage();

  const tickerItems = (landing?.features ?? []) as Array<{
    id?: number;
    icon?: string; // ✅ giờ nên là kebab-case, ví dụ "trending-up"
    text?: string;
  }>;

  const titleLines = (landing?.engineTitle ?? []) as Array<{
    id?: number;
    line_text?: string;
    is_highlight?: boolean | null;
  }>;

  const engines = (landing?.engines ?? []) as Array<{
    id?: number;
    ico?: string; // ✅ kebab-case, ví dụ "shopping-bag"
    title?: string;
    content?: string;
  }>;

  return (
    <S.EngineSection>
      <S.TickerWrap>
        <TickerMarquee
          items={tickerItems.map((t, idx) => {
            const label = String(t?.text ?? "");
            const key = t?.id ?? `${label}-${idx}`;

            return (
              <S.TickerItem key={key}>
                <SafeDynamicIcon
                  name={t?.icon}
                  fallback={DEFAULT_TICKER_ICON}
                  size={20}
                  color="var(--accent)"
                />
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
            {engines.map((f, idx) => (
              <S.FeatureItem key={f?.id ?? f?.title ?? idx}>
                <S.FeatureIcon aria-hidden="true">
                  <SafeDynamicIcon
                    name={f?.ico}
                    fallback={DEFAULT_ENGINE_ICON}
                    size={18}
                    color="currentColor"
                  />
                </S.FeatureIcon>

                <S.FeatureContent>
                  <S.FeatureTitle>{f?.title}</S.FeatureTitle>
                  <S.FeatureDesc>{f?.content}</S.FeatureDesc>
                </S.FeatureContent>
              </S.FeatureItem>
            ))}
          </S.FeatureGrid>
        </S.EngineRow>
      </S.EngineContainer>
    </S.EngineSection>
  );
}
