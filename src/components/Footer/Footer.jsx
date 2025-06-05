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
              Pomáháme podnikům dosahovat úspěchů díky strategickému řízení IT
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
          </div>{" "}
          <div className={styles.navWrapper}>
            {/* <div className={styles.footerRight}> */}
            <h3 className={styles.menu}>Menu</h3>
            <Navigation isFooter={true} className={styles.navFooter} />
          </div>
        </div>

        <div className={styles.firmyWidget}>
          <iframe
            title="Firmy.cz Widget"
            width="280"
            height="424"
            src="https://www.firmy.cz/detail/13814780-rrp-s-r-o-piskova-lhota.html?widget&limit=5"
            style={{ borderRadius: "4px", backgroundColor: "white" }}
            frameBorder="0"
          ></iframe>
        </div>
        {/* </div> */}
      </div>
      <div className={styles.copyrightAndPolicy}>
        <p className={styles.copyright}>
          Copyright © {new Date().getFullYear()} RRP. All Rights Reserved.
        </p>

        <div className={styles.PrivacyAndCookiePolicy}>
          <Link to="/cookie-policy" className={styles.PrivacyPolicy}>
            CookiePolicy
          </Link>

          <Link to="/privacy-policy" className={styles.PrivacyPolicy}>
            PrivacyPolicy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
