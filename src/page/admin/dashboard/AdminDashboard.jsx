import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { checkAdminAuth } from "../../../api/auth/auth.js";

import Button from "../../../components/Button/Button";
import styles from "./AdminDashboard.module.css";
import Loader from "../../../components/Loader/Loader.jsx";
import clsx from "clsx";
import AdminTeamSection from "../../../components/AdminTeamSection/AdminTeamSection.jsx";
import AdminProjectsSection from "../../../components/AdminProjectsSection/AdminProjectsSection.jsx";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  // const [projects, setProjects] = useState([]);

  // useEffect(() => {
  //   const verifyAuth = async () => {
  //     try {
  //       await checkAdminAuth();
  //       setIsLoading(false);
  //     } catch (error) {
  //       iziToast.error({
  //         title: "Chyba",
  //         message: error || "Neplatné heslo. Zkuste to znovu",
  //         position: "topRight",
  //       });
  //       navigate("/admin"); // Якщо неавторизований — переадресація на логін
  //     }
  //   };
  //
  //   verifyAuth();
  // }, [navigate]);

  useEffect(() => {
    setIsLoading(false); // Прибираємо перевірку токена
  }, []);

  const logout = () => {
    localStorage.removeItem("authToken");
    navigate("/admin");
  };

  return (
    <div className={clsx("", styles.adminWrapper)}>
      {isLoading && <Loader />}
      <div className={styles.adminHeaderLogout}>
        <div className="container">
          <Button onClick={logout} className={styles.btnLogOut}>
            LogOut
          </Button>
        </div>
      </div>

      <AdminTeamSection />
      <AdminProjectsSection />
    </div>
  );
};

export default AdminDashboard;
