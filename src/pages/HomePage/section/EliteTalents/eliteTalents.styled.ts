import styled from "styled-components";

export const Section = styled.section`
  width: 100%;
  margin: 0;
  padding: 0;
`;

export const Title = styled.h2`
  position: relative;
  z-index: 1;
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  color: #ffffff;
  margin-bottom: 48px;

  .accent {
    color: var(--accent);
  }
`;

export const Stage = styled.div`
  position: relative;
  width: 100%;
  margin: 0;
  padding: 0;
`;

export const Bg = styled.img`
  display: block;
  width: 100%;
  height: auto;
`;

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end; /* bám đáy */
  justify-content: center; /* tạm để giữa, bước sau mình chỉnh trái/phải */
  pointer-events: none;
`;

export const TalentImg = styled.img`
  height: 100%;     /* = height của BG (stage) */
  width: auto;
  max-width: 100%;
  object-fit: contain;
  display: block;
`;
