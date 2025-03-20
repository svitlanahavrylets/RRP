import { useState, useEffect } from "react";
import styles from "./Navigation.module.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { VscClose } from "react-icons/vsc";

const Navigation = ({ className, isFooter = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
  return (
    <div className={styles.navContainer}>
      {/* Бургер-кнопка тільки для хедера і тільки на мобайл/планшет */}
      {!isFooter && (
        <button className={styles.burger} onClick={toggleMenu}>
          {isOpen ? <VscClose /> : <RxHamburgerMenu />}
        </button>
      )}

      <nav
        className={`${styles.nav} ${isOpen ? styles.show : ""} ${
          className || ""
        }`}
      >
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <a className={styles.navLink} href="/" onClick={closeMenu}>
              O nás
            </a>
          </li>
          <li className={styles.navItem}>
            <a className={styles.navLink} href="/ourTeam" onClick={closeMenu}>
              Náš tým
            </a>
          </li>
          <li className={styles.navItem}>
            <a className={styles.navLink} href="/projects" onClick={closeMenu}>
              Projekty
            </a>
          </li>
          <li className={styles.navItem}>
            <a className={styles.navLink} href="/blog" onClick={closeMenu}>
              Blog
            </a>
          </li>
          <li className={styles.navItem}>
            <a className={styles.navLink} href="/contact" onClick={closeMenu}>
              Kontakt
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
