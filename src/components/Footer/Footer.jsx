import Logo from "../Logo/logo.jsx";
// import Navigation from "../Navigation/Navigation.jsx";
import styles from "./Footer.module.css";
import { socialIcons } from "../../data/socialIcons.jsx";
import { socialLinks } from "../../data/socialLinks.js";

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
              {socialIcons
                .filter(({ id }) => socialLinks[id]) // Фільтруємо тільки наявні соцмережі
                .map(({ icon, id }) => (
                  <li key={id} className={styles.socialIconItem}>
                    <a
                      href={socialLinks[id]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                    >
                      {icon}
                    </a>
                  </li>
                ))}
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
