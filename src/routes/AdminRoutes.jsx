import { Route, Routes } from "react-router-dom";
import AdminPage from "../page/AdminPage/AdminPage.jsx";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute.jsx";
import AdminDashboard from "../components/AdminDashboard/AdminDashboard.jsx";

const AdminRoutes = () => (
  <Routes>
    {/* Адмін сторінка з перевіркою авторизації */}
    <Route path="/" element={<AdminPage />} />

    {/* Захищений маршрут для адмінки */}
    <Route
      path="dashboard"
      element={
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default AdminRoutes;
