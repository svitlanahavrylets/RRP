import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout.jsx";
import Loader from "./components/Loader/Loader.jsx";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx";

const HomePage = lazy(() => import("./page/HomePage/HomePage.jsx"));
const OrderThanksPage = lazy(() =>
  import("./page/OrderThanksPage/OrderThanksPage.jsx")
);
// const OurTeamPage = lazy(() => import("./page/OurTeamPage/OurTeamPage.jsx"));
const AboutUsPage = lazy(() => import("./page/AboutUsPage/AboutUsPage.jsx"));
const OurServicesPage = lazy(() =>
  import("./page/OurServicesPage/OurServicesPage.jsx")
);
// const ProjectsPage = lazy(() => import("./page/ProjectsPage/ProjectsPage.jsx"));
const CareerPage = lazy(() => import("./page/CareerPage/CareerPage.jsx"));
const CareerPositionPage = lazy(() =>
  import("./page/CareerPositionPage/CareerPositionPage.jsx")
);
const BlogPage = lazy(() => import("./page/BlogPage/BlogPage.jsx"));
const BlogPostPage = lazy(() => import("./page/BlogPostPage/BlogPostPage.jsx"));
const ContactPage = lazy(() => import("./page/ContactPage/ContactPage.jsx"));
const PrivacyPolicyPage = lazy(() =>
  import("./page/PrivacyPolicyPage/PrivacyPolicyPage.jsx")
);
const CookiePolicyPage = lazy(() =>
  import("./page/CookiePolicyPage/CookiePolicyPage.jsx")
);
const NotFoundPage = lazy(() => import("./page/NotFoundPage/NotFoundPage.jsx"));
const AdminRoutes = lazy(() => import("./routes/AdminRoutes.jsx"));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="order" element={<HomePage showModal />} />
          <Route path="order-success" element={<OrderThanksPage />} />
          <Route path="about-us" element={<AboutUsPage />} />
          {/* <Route path="our-team" element={<OurTeamPage />} /> */}
          <Route path="our-services" element={<OurServicesPage />} />
          {/* <Route path="projects" element={<ProjectsPage />} /> */}
          <Route path="careers" element={<CareerPage />} />
          <Route path="careers/:id" element={<CareerPositionPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:id" element={<BlogPostPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="cookie-policy" element={<CookiePolicyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Адмін маршрути */}
        <Route path="admin/*" element={<AdminRoutes />} />
      </Routes>
    </Suspense>
  );
}

export default App;
