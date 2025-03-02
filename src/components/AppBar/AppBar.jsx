import Logo from "../Logo/logo.jsx";
import Navigation from "../Navigation/Navigation.jsx";
import styles from "./AppBar.module.css";

const AppBar = () => {
  return (
    <div className={styles.appBar}>
      <Logo />
      <Navigation />
    </div>
  );
};

export default AppBar;
