import { Outlet, useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import Header from "@/shared/components/Header";
import Footer from "@/shared/components/Footer";
import { useLandingPage } from "@/shared/api/useLandingPage";

// ✅ đổi path này cho đúng nơi bạn đặt ảnh
import BlackBG from "@/assets/images/Black_BG.png";

export default function MainLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const { data: landing, loading, error, refetch } = useLandingPage();

  if (isHome && !landing) {
    if (error) {
      return (
        <GateWrap role="alert" aria-live="polite">
          <GateCard>
            <GateTitle>Không tải được dữ liệu trang chủ</GateTitle>
            <GateDesc>{error}</GateDesc>
            <GateActions>
              <GateBtn type="button" onClick={() => refetch(true)}>
                Thử lại
              </GateBtn>
              <GateGhost type="button" onClick={() => refetch(false)}>
                Dùng cache (nếu có)
              </GateGhost>
            </GateActions>
          </GateCard>
        </GateWrap>
      );
    }

    return (
      <GateWrap aria-busy="true" aria-live="polite">
        <LoadingImage
          src={BlackBG}
          alt={loading ? "Đang tải dữ liệu" : "Chuẩn bị nội dung"}
          draggable={false}
        />
      </GateWrap>
    );
  }

  return (
    <Page>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </Page>
  );
}

const Page = styled.div`
  min-height: 100vh;
`;

const Main = styled.main`
  min-height: 60vh;
`;

/* ======= Loading Gate ======= */

const GateCard = styled.div`
  width: min(520px, 100%);
  border-radius: 22px;
  padding: 26px 22px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  color: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(10px);
`;

const GateTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  line-height: 1.25;
`;

const GateDesc = styled.p`
  margin: 10px 0 0;
  font-size: 13px;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.68);
`;

const GateActions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 16px;
`;

const GateBtn = styled.button`
  height: 42px;
  padding: 0 16px;
  border-radius: 12px;
  border: 1px solid rgba(34, 197, 94, 0.35);
  background: rgba(34, 197, 94, 0.18);
  color: rgba(255, 255, 255, 0.92);
  cursor: pointer;

  &:hover {
    background: rgba(34, 197, 94, 0.26);
  }
`;

const GateGhost = styled.button`
  height: 42px;
  padding: 0 16px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.82);
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;


const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px) scale(0.98); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`;

const floaty = keyframes`
  0%, 100% { transform: translateY(0) scale(1); }
  50%      { transform: translateY(-8px) scale(1.01); }
`;

export const GateWrap = styled.div`
  min-height: 100vh;
  width: 100%;
  background: #010402;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px;
  position: relative;
  overflow: hidden;

  /* vignette nhẹ cho “sang” hơn */
  &::before {
    content: "";
    position: absolute;
    inset: -40%;
    background: radial-gradient(
      circle,
      rgba(34, 197, 94, 0.08) 0%,
      rgba(0, 0, 0, 0) 55%
    );
    filter: blur(18px);
    pointer-events: none;
  }
`;

export const LoadingImage = styled.img`
  width: min(520px, 86vw);
  height: auto;
  display: block;
  z-index: 1;
  animation: ${fadeIn} 420ms ease-out both, ${floaty} 2.6s ease-in-out infinite;
  will-change: transform, opacity;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;
