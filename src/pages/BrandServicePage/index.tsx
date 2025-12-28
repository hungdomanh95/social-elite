import TickerMarquee from "@/shared/components/TickerMarquee";
import { SUCCESS_STORIES, TICKER_TRENDING } from "../HomePage/mockData";
import SuccessStories from "../HomePage/section/SuccessStories";
import * as S from "./brandService.styled";
import Icon from "@/assets/icons";

type Props = {
  onContactClick?: () => void;
};

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

function FeatureIcon({ name }: { name: Feature["icon"] }) {
  // simple inline SVGs (match style icon line in green circle)
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (name === "network") {
    return (
      <svg {...common}>
        <rect x="10" y="3" width="4" height="4" rx="1" />
        <rect x="4" y="17" width="4" height="4" rx="1" />
        <rect x="16" y="17" width="4" height="4" rx="1" />
        <path d="M12 7v5" />
        <path d="M12 12H6v5" />
        <path d="M12 12h6v5" />
      </svg>
    );
  }

  if (name === "bag") {
    return (
      <svg {...common}>
        <path d="M7 8h10" />
        <path d="M8 8V7a4 4 0 0 1 8 0v1" />
        <path d="M6.5 8h11l-1 12h-9l-1-12z" />
      </svg>
    );
  }

  if (name === "stack") {
    return (
      <svg {...common}>
        <path d="M12 3 3 8l9 5 9-5-9-5z" />
        <path d="M3 12l9 5 9-5" />
        <path d="M3 16l9 5 9-5" />
      </svg>
    );
  }

  if (name === "check") {
    return (
      <svg {...common}>
        <path d="M9 12l2 2 4-5" />
        <path d="M22 12A10 10 0 1 1 12 2a10 10 0 0 1 10 10z" />
      </svg>
    );
  }

  // globe
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.8 2.4 4.5 5.6 4.5 9S14.8 18.6 12 21" />
      <path d="M12 3C9.2 5.4 7.5 8.6 7.5 12S9.2 18.6 12 21" />
    </svg>
  );
}

/** SECTION 1 */
function BrandServiceHero({ onContactClick }: Props) {
  return (
    <S.HeroSection>
      <S.Container>
        <S.HeroInner>
          <S.HeroTitle>
            Accelerating
            <br />
            business through
            <br />
            <span className="accent">authentic voices</span>
            <br />
            and creativity
          </S.HeroTitle>

          <S.HeroActions>
            <S.HeroButton type="button" onClick={onContactClick}>
              Get in Touch!
            </S.HeroButton>
          </S.HeroActions>
        </S.HeroInner>
      </S.Container>
    </S.HeroSection>
  );
}

/** SECTION 2 */
function SocialCommerceEngine() {
  return (

      <S.EngineSection>
         <TickerMarquee
            style={{ marginTop: 32 , marginBottom: 24 }}
            items={TICKER_TRENDING.map(({ label, icon }) => (
              <span
                key={label}
                style={{ display: "inline-flex", gap: 10, alignItems: "center", color:"#000000" }}
              >
                <Icon name={icon} size={16} color="var(--accent)" />
                <span style={{ fontSize: 20 }}>{label}</span>
              </span>
            ))}
            durationSec={50}
            gapPx={56}
        />
        <S.Container>
          <S.EngineGrid>
            <S.EngineTitle>
              Our Complete
              <br />
              <span className="accent">Social Commerce</span>
              <br />
              Engine
            </S.EngineTitle>

            <S.FeatureGrid>
              {FEATURES.map((f) => (
                <S.FeatureItem key={f.title}>
                  <S.FeatureIcon>
                    <FeatureIcon name={f.icon} />
                  </S.FeatureIcon>

                  <S.FeatureContent>
                    <S.FeatureTitle>{f.title}</S.FeatureTitle>
                    <S.FeatureDesc>{f.desc}</S.FeatureDesc>
                  </S.FeatureContent>
                </S.FeatureItem>
              ))}
            </S.FeatureGrid>
          </S.EngineGrid>
        </S.Container>
      </S.EngineSection>
  );
}

/** SECTION 3 */
function ProofGrid() {
  const blocks = Array.from({ length: 45 }, (_, i) => i);

  return (
    <S.ProofSection>
      <S.Container>
        <S.ProofTitle>
          We&apos;ve done it for the best.
          <br />
          <span className="accent">Now we&apos;re here for you.</span>
        </S.ProofTitle>

        <S.BlockGrid aria-hidden="true">
          {blocks.map((i) => (
            <S.Block key={i} />
          ))}
        </S.BlockGrid>
      </S.Container>
    </S.ProofSection>
  );
}

/** SECTION 4 */
function BottomCTA({ onContactClick }: Props) {
  return (
    <S.CtaSection>
      <S.Container>
        <S.CtaGrid>
          <S.CtaTitle>
            <span className="dark">Elevate your brand</span>
            <br />
            <span className="light">with bold creativity</span>
          </S.CtaTitle>

          <S.CtaButton type="button" onClick={onContactClick}>
            Get in touch
          </S.CtaButton>
        </S.CtaGrid>
      </S.Container>
    </S.CtaSection>
  );
}

export default function BrandService({ onContactClick }: Props) {
  return (
    <S.Page>
      <BrandServiceHero onContactClick={onContactClick} />

      <SocialCommerceEngine />
      <SuccessStories items={SUCCESS_STORIES} />
      <ProofGrid />
      <BottomCTA onContactClick={onContactClick} />
    </S.Page>
  );
}
