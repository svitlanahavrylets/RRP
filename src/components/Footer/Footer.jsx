import Logo from "../Logo/logo.jsx";
import Navigation from "../Navigation/Navigation.jsx";
import styles from "./Footer.module.css";
import { socialIcons } from "../../data/socialIcons.jsx";
import { socialLinks } from "../../data/socialLinks.js";
import { Link } from "react-router-dom";

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
                .filter(({ id }) => socialLinks[id])
                .map(({ icon, id }) => (
                  <li key={id} className={styles.socialIconItem}>
                    <a
                      href={socialLinks[id]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      aria-label="Social media link"
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
          <Navigation isFooter={true} className={styles.navFooter} />
        </div>
      </div>
      <ul className={styles.copyrightPrivacyPolicy}>
        <li className={styles.cPpItem}>
          <p className={styles.copyright}>
            Copyright © {new Date().getFullYear()} RRP. All Rights Reserved.
          </p>
        </li>
        <li className={styles.cPpItem}>
          <Link to="/privacy-policy" className={styles.PrivacyPolicy}>
            PrivacyPolicy
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
