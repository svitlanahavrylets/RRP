import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout.jsx";
import Loader from "./components/Loader/Loader.jsx";
import AdminRoutes from "./routes/AdminRoutes.jsx";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard.jsx";

const HomePage = lazy(() => import("./page/HomePage/HomePage.jsx"));
const OurTeamPage = lazy(() => import("./page/OurTeamPage/OurTeamPage.jsx"));
const ProjectsPage = lazy(() => import("./page/ProjectsPage/ProjectsPage.jsx"));
const BlogPage = lazy(() => import("./page/BlogPage/BlogPage.jsx"));
const BlogPostPage = lazy(() => import("./page/BlogPostPage/BlogPostPage.jsx"));
const ContactPage = lazy(() => import("./page/ContactPage/ContactPage.jsx"));
const NotFoundPage = lazy(() => import("./page/NotFoundPage/NotFoundPage.jsx"));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<HomePage />} />
          <Route path="ourTeam" element={<OurTeamPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:id" element={<BlogPostPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Адмін маршрути */}
        <Route path="admin/*" element={<AdminRoutes />} />
        <Route path="/test-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Suspense>
  );
}

export default App;
