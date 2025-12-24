import React from 'react'
import * as S from "./platform.styled";

type PlatformProps = {};

const Platform:React.FC<PlatformProps> = () => {
  return (
    <S.Platform>
        {/* ===== LEFT COLUMN ===== */}
        <S.PlatformItems>
          <S.TitleStack>
            <S.TitleLine>
              our <S.TitleAccent>elite™</S.TitleAccent>
            </S.TitleLine>
            <S.TitleLine>network</S.TitleLine>
            <S.TitleLine>platform</S.TitleLine>
          </S.TitleStack>

          <S.FeatureList>
            <S.FeatureItem>
              <S.Dot />
              <S.FeatureText>Real-time Performance Tracking</S.FeatureText>
            </S.FeatureItem>

            <S.FeatureItem>
              <S.Dot />
              <S.FeatureText>Instant Quotation</S.FeatureText>
            </S.FeatureItem>

            <S.FeatureItem>
              <S.Dot />
              <S.FeatureText>
                Brand Safety &amp; Automated Control
              </S.FeatureText>
            </S.FeatureItem>
          </S.FeatureList>
        </S.PlatformItems>

        {/* ===== RIGHT COLUMN ===== */}
        <S.PlatformItems>
          <S.TitleStack>
            <S.TitleLine>
              our <S.TitleAccent>elite™</S.TitleAccent>
            </S.TitleLine>
            <S.TitleLine>network</S.TitleLine>
            <S.TitleLine>platform</S.TitleLine>
          </S.TitleStack>

          <S.FeatureList>
            <S.FeatureItem>
              <S.Dot />
              <S.FeatureText>Real-time Performance Tracking</S.FeatureText>
            </S.FeatureItem>

            <S.FeatureItem>
              <S.Dot />
              <S.FeatureText>Instant Quotation</S.FeatureText>
            </S.FeatureItem>

            <S.FeatureItem>
              <S.Dot />
              <S.FeatureText>
                Brand Safety &amp; Automated Control
              </S.FeatureText>
            </S.FeatureItem>
          </S.FeatureList>
        </S.PlatformItems>
      </S.Platform>
  )
}

export default Platform
