// import { FaLinkedin } from "react-icons/fa";
import { TfiLinkedin } from "react-icons/tfi";
import Logo from "../Logo/logo.jsx";
import Navigation from "../Navigation/Navigation.jsx";
import styles from "./Footer.module.css";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="container">
      <div className={styles.footer}>
        <div className={styles.footerLogoContainer}>
          <Logo className={styles.logoFooter} />
          <p className={styles.footerText}>
            Pomáháme podnikům dosahovat úspěchu díky strategickému řízení IT
            projektů.
          </p>
        </div>

        <div className={styles.social}>
          <a
            href="https://www.linkedin.com/in/your-profile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TfiLinkedin className={styles.icon} />
          </a>
          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube className={styles.icon} />
          </a>
        </div>
        <div className={styles.navWrapper}>
          <h3 className={styles.menu}>Menu</h3>
          <Navigation className={styles.navFooter} />
        </div>
      </div>
      <p className={styles.copyright}>
        Copyright © {new Date().getFullYear()} RRP. All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
