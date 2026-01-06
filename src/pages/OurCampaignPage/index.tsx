import { ArrowRight } from "lucide-react";
import * as S from "./ourCampaignsPage.styled";

type Campaign = {
  id: string;
  title: string;
  desc: string;
  tags: string[];
};

const CAMPAIGNS: Campaign[] = Array.from({ length: 8 }).map((_, i) => ({
  id: `c${i + 1}`,
  title: "Driving Gen Z Awareness for Fashion Brand",
  desc: "Multi-channel digital campaign across TikTok, Instagram & Meta Ads",
  tags: ["BRANDING", "SOCIAL MEDIA", "INFLUENCER MARKETING"],
}));

export default function OurCampaignsPage() {
  return (
    <S.Page>
      <S.Section>
        <S.Container>
          <S.HeaderRow>
            <S.TitleWrap>
              <S.TitleBar aria-hidden />
              <S.Title>Our Campaigns</S.Title>
            </S.TitleWrap>

            <S.TopAction type="button">
              View All Campaigns <ArrowRight size={16} />
            </S.TopAction>
          </S.HeaderRow>

          <S.Cards>
            {CAMPAIGNS.map((c, idx) => (
              <S.Card key={c.id} style={{ ["--d" as any]: `${idx * 60}ms` }}>
                <S.CardMedia aria-hidden />
                <S.CardBody>
                  <S.TagRow>
                    {c.tags.map((t) => (
                      <S.Tag key={t}>{t}</S.Tag>
                    ))}
                  </S.TagRow>

                  <S.CardTitle>{c.title}</S.CardTitle>
                  <S.CardDesc>{c.desc}</S.CardDesc>
                </S.CardBody>
              </S.Card>
            ))}
          </S.Cards>
        </S.Container>
      </S.Section>

      <S.CTA>
        <S.Container>
          <S.CTATitle>
            Ready to Create Your Next <S.Accent>Success</S.Accent> Story?
          </S.CTATitle>
          <S.CTADesc>Let&apos;s collaborate on a campaign that drives real results for your brand.</S.CTADesc>

          <S.CTAButton type="button">
            Start a Project <ArrowRight size={16} />
          </S.CTAButton>
        </S.Container>
      </S.CTA>
    </S.Page>
  );
}
