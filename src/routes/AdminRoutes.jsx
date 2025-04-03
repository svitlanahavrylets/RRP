import { Route, Routes } from "react-router-dom";
import AdminPage from "../page/AdminPage/AdminPage.jsx"; // Імпортуємо AdminPage
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute.jsx"; // Для захищених маршрутів
import AdminDashboard from "../components/AdminDashboard/AdminDashboard.jsx"; // Панель адміністратора

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
