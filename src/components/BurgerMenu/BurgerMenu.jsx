// import { useState, useEffect } from "react";
// import styles from "./BurgerMenu.module.css";
// import { RxHamburgerMenu } from "react-icons/rx";
// import { VscClose } from "react-icons/vsc";
// import Navigation from "../Navigation/Navigation.jsx";

// const BurgerMenu = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => setIsOpen(!isOpen);
//   const closeMenu = () => setIsOpen(false);

//   useEffect(() => {
//     document.body.style.overflow = isOpen ? "hidden" : "auto";
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [isOpen]);

//   return (
//     <div className={styles.burgerContainer}>
//       {/* Бургер-кнопка */}
//       <button className={styles.burger} onClick={toggleMenu}>
//         {isOpen ? <VscClose /> : <RxHamburgerMenu />}
//       </button>

//       {/* Навігація */}
//       <Navigation className={isOpen ? styles.show : ""} onClose={closeMenu} />
//     </div>
//   );
// };

// export default BurgerMenu;
