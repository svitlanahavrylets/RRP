// import { FaLinkedin } from "react-icons/fa";
import Logo from "../Logo/logo.jsx";
import Navigation from "../Navigation/Navigation.jsx";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className="container">
      <div className={styles.footer}>
        <Logo className={styles.logoFooter} />
        <div className={styles.navWrapper}>
          <h3 className={styles.menu}>Menu</h3>
          <Navigation className={styles.navFooter} />
        </div>

        {/* <div className={styles.social}>
          <a
            href="https://www.linkedin.com/in/your-profile"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className={styles.icon} />
          </a>
        </div> */}
      </div>
      <p className={styles.copyright}>
        Copyright © {new Date().getFullYear()} RRP. All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
