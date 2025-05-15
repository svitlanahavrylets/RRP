import styles from "./OrderThanksPage.module.css";
import { Link } from "react-router-dom";

const OrderThanksPage = () => {
  return (
    <section className="container">
      <div className={styles.thanksSection}>
        <h2 className={styles.title}>Děkujeme za vaši žádost!</h2>
        <p className={styles.text}>
          Vaši zprávu jsme obdrželi a brzy se s vámi spojíme.
        </p>
        <Link to="/" className={styles.button}>
          Zpět na hlavní stránku
        </Link>
      </div>
    </section>
  );
};

export default OrderThanksPage;
