import { Route, Routes } from "react-router-dom";
import AdminLogin from "../page/admin/login/AdminLogin";
import AdminDashboard from "../page/admin/dashboard/AdminDashboard";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

const AdminRoutes = () => (
  <Routes>
    <Route path="" element={<AdminLogin />} />
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
