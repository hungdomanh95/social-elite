import { Outlet, useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import Header from "@/shared/components/Header";
import Footer from "@/shared/components/Footer";
import { useLandingPage } from "@/shared/api/useLandingPage";

// ✅ hook landing (đã fetch + cache + store như bạn setup)

export default function MainLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  // ✅ chỉ xử lý landing-page
  const { data: landing, loading, error, refetch } = useLandingPage();

  // ✅ Gate: chỉ chặn khi vào Home lần đầu và chưa có data
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
        <GateCard>
          <Spinner />
          <GateTitle style={{ marginTop: 14 }}>
            {loading ? "Đang tải dữ liệu..." : "Chuẩn bị nội dung..."}
          </GateTitle>
          <GateDesc>Vui lòng chờ một chút.</GateDesc>
        </GateCard>
      </GateWrap>
    );
  }

  // ✅ có landing rồi (hoặc không phải Home) => render layout bình thường
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

const GateWrap = styled.div`
  min-height: 100vh;
  width: 100%;
  background: #010402;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px;
`;

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

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 999px;
  border: 3px solid rgba(255, 255, 255, 0.15);
  border-top-color: rgba(34, 197, 94, 0.75);
  margin: 0 auto;
  animation: ${spin} 820ms linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;
