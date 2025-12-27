import React from "react";
import * as S from "./successStories.styled";
import type { SuccessStory } from "../../mockData";


type Props = {
  items: SuccessStory[];
  onViewAll?: () => void;
  viewAllHref?: string;
};

const SuccessStories: React.FC<Props> = ({ items, onViewAll, viewAllHref }) => {
  return (
    <S.Section>
      <S.Container>
        <S.Top>
          <S.Left>
            <S.Pill data-reveal style={{ ["--d" as any]: "0ms" }}>
              Our Campaign
            </S.Pill>

            <S.Heading data-reveal style={{ ["--d" as any]: "90ms" }}>
              Success Stories That
              <br />
              Speak Volumes
            </S.Heading>
          </S.Left>

          {viewAllHref ? (
            <S.ViewAllLink
              data-reveal
              style={{ ["--d" as any]: "160ms" }}
              href={viewAllHref}
            >
              View All Projects
            </S.ViewAllLink>
          ) : (
            <S.ViewAllBtn
              data-reveal
              style={{ ["--d" as any]: "160ms" }}
              type="button"
              onClick={onViewAll}
            >
              View All Projects
            </S.ViewAllBtn>
          )}
        </S.Top>

        <S.Grid>
          {items.map((it, idx) => (
            <S.Card
              key={it.id}
              as={it.href ? "a" : "div"}
              href={it.href}
              $clickable={!!it.href}
              data-reveal
              style={{ ["--d" as any]: `${220 + idx * 70}ms` }}
            >
              <S.Thumb $src={it.imageSrc} aria-label={it.title} />
              <S.CardTitle>{it.title}</S.CardTitle>
              <S.CardMeta>{it.category}</S.CardMeta>
            </S.Card>
          ))}
        </S.Grid>
      </S.Container>
    </S.Section>
  );
};

export default SuccessStories;

