import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import styles from "./Navigation.module.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { VscClose } from "react-icons/vsc";

const Navigation = ({ className, isFooter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 1158 }); // Десктоп визначається від 1158px

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
  console.log("isFooter:", isFooter);
  console.log("isDesktop:", isDesktop);
  console.log("isOpen:", isOpen);
  console.log("Navigation in Footer");
  return (
    <div className={styles.navContainer}>
      {/* Бургер-кнопка тільки для хедера на мобайл/планшеті */}
      {!isFooter && !isDesktop && (
        <button className={styles.burger} onClick={toggleMenu}>
          {isOpen ? <VscClose /> : <RxHamburgerMenu />}
        </button>
      )}

      {/* Навігація */}

      {(isFooter || isDesktop || isOpen) && (
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
              <a
                className={styles.navLink}
                href="/projects"
                onClick={closeMenu}
              >
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
      )}
    </div>
  );
};

export default Navigation;
