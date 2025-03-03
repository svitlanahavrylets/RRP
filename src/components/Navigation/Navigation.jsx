// import styles from "./Navigation.module.css";

// const Navigation = () => {
//   return (
//     <div>
//       <nav>
//         <ul className={styles.nav}>
//           <li className={styles.navItem}>
//             <a className={styles.navLink} href="/about">
//               O nás
//             </a>
//           </li>
//           <li className={styles.navItem}>
//             <a className={styles.navLink} href="/ourTeam">
//               Náš tým
//             </a>
//           </li>
//           <li className={styles.navItem}>
//             <a className={styles.navLink} href="/projects">
//               Projekty
//             </a>
//           </li>
//           <li className={styles.navItem}>
//             <a className={styles.navLink} href="/blog">
//               Blog
//             </a>
//           </li>
//           <li className={styles.navItem}>
//             <a className={styles.navLink} href="/contact">
//               Kontakt
//             </a>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default Navigation;

import { useState } from "react";
import styles from "./Navigation.module.css";
import { FaBars, FaTimes } from "react-icons/fa";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className={styles.navContainer}>
      {/* Бургер-кнопка */}
      <button className={styles.burger} onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Меню */}
      <nav className={`${styles.nav} ${isOpen ? styles.show : ""}`}>
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
    </div>
  );
};

export default Navigation;
