import { useState, useEffect } from "react";
import AdminLogin from "../../components/AdminLogin/AdminLogin.jsx";
import AdminDashboard from "../../components/AdminDashboard/AdminDashboard.jsx"; // твоя панель

const AdminPage = () => {
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setAuthorized(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setAuthorized(true);
  };

  return authorized ? (
    <AdminDashboard />
  ) : (
    <AdminLogin onLoginSuccess={handleLoginSuccess} />
  );
};

export default AdminPage;
