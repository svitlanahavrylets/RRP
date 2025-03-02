import styles from "./Navigation.module.css";

const Navigation = () => {
  return (
    <div>
      <nav>
        <ul className={styles.nav}>
          <li className={styles.navItem}>
            <a className={styles.navLink} href="/about">
              O nás
            </a>
          </li>
          <li className={styles.navItem}>
            <a className={styles.navLink} href="/ourTeam">
              Náš tým
            </a>
          </li>
          <li className={styles.navItem}>
            <a className={styles.navLink} href="/projects">
              Projekty
            </a>
          </li>
          <li className={styles.navItem}>
            <a className={styles.navLink} href="/blog">
              Blog
            </a>
          </li>
          <li className={styles.navItem}>
            <a className={styles.navLink} href="/contact">
              Kontakt
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
