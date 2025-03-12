import { Outlet } from "react-router-dom";
import AppBar from "../AppBar/AppBar";
import styles from "./Layout.module.css";
import Footer from "../Footer/Footer.jsx";

function Layout() {
  return (
    <div>
      <header className={styles.headerContainer}>
        <AppBar />
      </header>
      <main>
        <Outlet />
        {/* Тут буде рендеритися HomePage або інші сторінки */}
      </main>
      <footer className={styles.footerContainer}>
        <Footer />
      </footer>
    </div>
  );
}

export default Layout;
