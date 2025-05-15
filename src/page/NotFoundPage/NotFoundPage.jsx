import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";
import { motion } from "framer-motion";

const NotFoundPage = () => {
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className={styles.title}>404</h2>
      <p className={styles.text}>Stránka nebyla nalezena</p>
      <Link to="/" className={styles.button}>
        Zpět na hlavní stránku
      </Link>
    </motion.div>
  );
};

export default NotFoundPage;
