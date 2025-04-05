import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import styles from "./Navigation.module.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { VscClose } from "react-icons/vsc";
import { NavLink } from "react-router-dom";

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
          className={`${styles.nav} 
      ${isFooter ? styles.navFooter : ""} 
      ${isOpen ? styles.show : ""} 
      ${className || ""}`}
        >
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <NavLink
                to="/"
                end
                onClick={closeMenu}
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.activeLink : ""}`
                }
              >
                O nás
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink
                to="/ourTeam"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.activeLink : ""}`
                }
              >
                Náš tým
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink
                to="/projects"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.activeLink : ""}`
                }
              >
                Projekty
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink
                to="/blog"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.activeLink : ""}`
                }
              >
                Blog
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink
                to="/contact"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.activeLink : ""}`
                }
              >
                Kontakt
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Navigation;
