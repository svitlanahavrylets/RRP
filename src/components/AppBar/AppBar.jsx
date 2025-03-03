import { useState } from "react";
import Logo from "../Logo/logo.jsx";
import Navigation from "../Navigation/Navigation.jsx";
import styles from "./AppBar.module.css";

const AppBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <div className={styles.appBar}>
      <Logo />

      <Navigation isOpen={isOpen} closeMenu={closeMenu} />
    </div>
  );
};

export default AppBar;
