import { useNavigate } from "react-router-dom";
import styles from "./Logo.module.css";
import logo from "../../assets/Logo.svg"; // Імпортуємо логотип

const Logo = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <img
      src={logo}
      alt="Logo"
      className={styles.logo}
      onClick={handleLogoClick}
      aria-label="Go to Home Page"
    />
  );
};

export default Logo;
