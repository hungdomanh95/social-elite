import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Header from "@/shared/components/Header";
import Footer from "@/shared/components/Footer";

export default function MainLayout() {
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
