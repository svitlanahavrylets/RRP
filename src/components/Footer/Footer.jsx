import { TfiLinkedin } from "react-icons/tfi";
import Logo from "../Logo/logo.jsx";
// import Navigation from "../Navigation/Navigation.jsx";
import styles from "./Footer.module.css";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="container">
      <div className={styles.footer}>
        <div className={styles.footerLeft}>
          <div className={styles.LogoTextContainer}>
            <div className={styles.logoFooter}>
              <Logo />
            </div>

            <p className={styles.footerText}>
              Pomáháme podnikům dosahovat úspěchu díky strategickému řízení IT
              projektů.
            </p>
          </div>

          <div className={styles.social}>
            <h3 className={styles.socialText}>Sociální sítě</h3>
            <ul className={styles.socialIconList}>
              <li className={styles.socialIconItem}>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <TfiLinkedin className={styles.icon} />
                </a>
              </li>
              <li className={styles.socialIconItem}>
                <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <FaYoutube className={styles.icon} />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.navWrapper}>
          <h3 className={styles.menu}>Menu</h3>
          {/* <Navigation className="navFooter" /> */}
        </div>
      </div>
      <p className={styles.copyright}>
        Copyright © {new Date().getFullYear()} RRP. All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
