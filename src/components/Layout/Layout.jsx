import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import AppBar from "../AppBar/AppBar";
import Footer from "../Footer/Footer.jsx";
import ScrollToTopButton from "../ScrollToTopButton/ScrollToTopButton.jsx";
import styles from "./Layout.module.css";

function Layout() {
  const [isVisible, setIsVisible] = useState(true);
  let lastScrollY = window.scrollY;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY = window.scrollY;
    };

    const handleTouch = () => {
      setIsVisible(true);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("touchstart", handleTouch);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchstart", handleTouch);
    };
  }, []);

  return (
    <div>
      <header
        className={`${styles.headerContainer} ${
          isVisible ? styles.visible : styles.hidden
        }`}
      >
        <AppBar />
      </header>
      <main className={styles.mainContainer}>
        <Outlet />
      </main>
      <footer className={styles.footerContainer}>
        <Footer />
        <div className={styles.line}></div>
      </footer>
      <ScrollToTopButton />
    </div>
  );
}

export default Layout;
