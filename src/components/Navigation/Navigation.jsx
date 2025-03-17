import { useState, useEffect } from "react";
import styles from "./Navigation.module.css";
import { FaTimes } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";

const Navigation = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Блокування скролу, коли меню відкрите
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
      {/* Бургер-кнопка (видима тільки на мобільних пристроях) */}
      <button className={styles.burger} onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <RxHamburgerMenu />}
      </button>

      {/* Меню (на весь екран при відкритті) */}
      <nav
        className={`${styles.nav} ${isOpen ? styles.show : ""} ${className}`}
      >
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <a className={styles.navLink} href="/about" onClick={closeMenu}>
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

      {/* Затемнення заднього фону при відкритому меню */}
      {isOpen && <div className={styles.overlay} onClick={closeMenu}></div>}
    </div>
  );
};

export default Navigation;
