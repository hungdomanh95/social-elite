import React from "react";
import * as S from "./platform.styled";
import footerLeft from "@/assets/images/footerLeft.png";

type PlatformProps = {};

const Platform: React.FC<PlatformProps> = () => {
  return (
    <S.Platform>
      <S.Inner>
        {/* ===== LEFT GROUP (title + left list) ===== */}
        <S.LeftGroup>
          <S.TitleBlock>
            <S.TitleStack>
              <S.TitleLine>
                our <S.TitleAccent>elite™</S.TitleAccent>
              </S.TitleLine>
              <S.TitleLine>network</S.TitleLine>
              <S.TitleLine>platform</S.TitleLine>
            </S.TitleStack>
          </S.TitleBlock>

          <S.ListLeft>
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
                <S.FeatureText>Brand Safety &amp; Automated Control</S.FeatureText>
              </S.FeatureItem>
            </S.FeatureList>
          </S.ListLeft>
        </S.LeftGroup>

        {/* ===== RIGHT GROUP (image + right list) ===== */}
        <S.RightGroup>
          <S.ImageBlock>
            <S.ImageLeftFooter src={footerLeft} alt="Platform" />
          </S.ImageBlock>

          <S.ListRight>
            <S.FeatureList>
              <S.FeatureItem>
                <S.Dot />
                <S.FeatureText>
                  Update Real-time Influencer Info (view, engagement)
                </S.FeatureText>
              </S.FeatureItem>

              <S.FeatureItem>
                <S.Dot />
                <S.FeatureText>Social Listening &amp; Trend alert</S.FeatureText>
              </S.FeatureItem>

              <S.FeatureItem>
                <S.Dot />
                <S.FeatureText>Brand Customization</S.FeatureText>
              </S.FeatureItem>
            </S.FeatureList>
          </S.ListRight>
        </S.RightGroup>
      </S.Inner>
    </S.Platform>
  );
};

export default Platform;
