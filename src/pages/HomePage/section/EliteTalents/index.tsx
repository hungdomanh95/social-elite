import React from "react";
import * as S from "./eliteTalents.styled";

export type Talent = {
  id: string | number;
  imageSrc: string; // PNG đã tách nền
  alt?: string;
  href?: string;
};

type Props = {
  title?: React.ReactNode;

  leftTalents: Talent[];
  rightTalents: Talent[];

  imageHeight?: number; // default: 300
  className?: string;
};

const EliteTalents: React.FC<Props> = ({
  title = (
    <>
      Our <span className="accent">elite™</span> talents
    </>
  ),
  leftTalents,
  rightTalents,
  imageHeight = 300,
  className,
}) => {
  return (
    <S.Section className={className}>
      <S.Container>
        <S.Stage style={{ ["--imgH" as any]: `${imageHeight}px` }}>
          <S.Title>{title}</S.Title>

          {/* BACKGROUND SHAPES */}
          <S.BgLeft aria-hidden="true" />
          <S.BgRight aria-hidden="true" />

          {/* LEFT PEOPLE */}
          <S.PeopleLeft>
            {leftTalents.map((t, idx) => {
              const node = (
                <S.Person key={t.id} $idx={idx}>
                  <S.PersonImg
                    src={t.imageSrc}
                    alt={t.alt ?? "talent"}
                    draggable={false}
                    loading="lazy"
                  />
                </S.Person>
              );

              return t.href ? (
                <S.PersonLink key={t.id} href={t.href} target="_blank" rel="noreferrer">
                  {node}
                </S.PersonLink>
              ) : (
                node
              );
            })}
          </S.PeopleLeft>

          {/* RIGHT PEOPLE */}
          <S.PeopleRight>
            {rightTalents.map((t, idx) => {
              const node = (
                <S.Person key={t.id} $idx={idx}>
                  <S.PersonImg
                    src={t.imageSrc}
                    alt={t.alt ?? "talent"}
                    draggable={false}
                    loading="lazy"
                  />
                </S.Person>
              );

              return t.href ? (
                <S.PersonLink key={t.id} href={t.href} target="_blank" rel="noreferrer">
                  {node}
                </S.PersonLink>
              ) : (
                node
              );
            })}
          </S.PeopleRight>
        </S.Stage>
      </S.Container>
    </S.Section>
  );
};

export default EliteTalents;
