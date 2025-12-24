import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";

import HomePage from "@/pages/HomePage";
import AboutUsPage from "@/pages/AboutUsPage";
import BrandServicePage from "@/pages/BrandServicePage";
import ForCreatorPage from "@/pages/ForCreatorPage";
import BlogPage from "@/pages/BlogPage";
import OurCampaignPage from "@/pages/OurCampaignPage";
import ContactUsPage from "@/pages/ContactUsPage";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/brand-service" element={<BrandServicePage />} />
        <Route path="/for-creator" element={<ForCreatorPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/our-campaign" element={<OurCampaignPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
