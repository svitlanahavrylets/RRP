import Logo from "../Logo/logo.jsx";
import Navigation from "../Navigation/Navigation.jsx";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <Logo />

      <Navigation className={styles.footerNav} />
    </div>
  );
};

export default Footer;
