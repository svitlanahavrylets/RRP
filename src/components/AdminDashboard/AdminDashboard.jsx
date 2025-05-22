import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkAdminAuth } from "../../api/auth/auth.js";
import logo from "../../assets/Лого RRP.png";
import Button from "../Button/Button.jsx";
import styles from "./AdminDashboard.module.css";
import Loader from "../Loader/Loader.jsx";
import clsx from "clsx";
import AdminTeamSection from "../AdminTeamSection/AdminTeamSection.jsx";
import AdminProjectsSection from "../AdminProjectsSection/AdminProjectsSection.jsx";
import AdminBlogSection from "../AdminBlogSection/AdminBlogSection.jsx";
import AdminServicesSection from "../AdminServicesSection/AdminServicesSection.jsx";
import AdminCareerSection from "../AdminCareerSection/AdminCareerSection.jsx";
import iziToast from "izitoast";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await checkAdminAuth();
        setIsLoading(false);
      } catch (error) {
        iziToast.error({
          title: "Chyba",
          message: error?.message || "Neplatné heslo. Zkuste to znovu",
          position: "topRight",
        });
        localStorage.removeItem("adminToken");
        navigate("/admin");
      }
    };

    verifyAuth();
  }, [navigate]);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  return (
    <div className={clsx("", styles.adminWrapper)}>
      {isLoading && <Loader />}
      <div className={styles.adminHeaderLogout}>
        <ul className={clsx("container", styles.btnWrapper)}>
          <li className={styles.btn}>
            <Button onClick={() => setActiveSection("team")}>
              Správa týmu
            </Button>
          </li>
          <li className={styles.btn}>
            <Button onClick={() => setActiveSection("projects")}>
              Správa projektů
            </Button>
          </li>
          <li className={styles.btn}>
            <Button onClick={() => setActiveSection("blog")}>
              Správa blogu
            </Button>
          </li>
          <li className={styles.btn}>
            <Button onClick={() => setActiveSection("services")}>
              Správa služeb
            </Button>
          </li>
          <li className={styles.btn}>
            <Button onClick={() => setActiveSection("career")}>
              Správa kariéry
            </Button>
          </li>
          <li className={styles.btn}>
            <Button onClick={logout} className={styles.btnLogOut}>
              LogOut
            </Button>
          </li>
        </ul>
      </div>

      <div
        className={clsx(
          styles.adminContent,
          activeSection === "home" ? styles.homeSection : styles.otherSection
        )}
        style={
          activeSection === "home" ? { backgroundImage: `url(${logo})` } : {}
        }
      >
        {activeSection === "home" && <div></div>}
        {activeSection === "team" && <AdminTeamSection />}
        {activeSection === "projects" && <AdminProjectsSection />}
        {activeSection === "blog" && <AdminBlogSection />}
        {activeSection === "services" && <AdminServicesSection />}
        {activeSection === "career" && <AdminCareerSection />}
      </div>
    </div>
  );
};

export default AdminDashboard;
