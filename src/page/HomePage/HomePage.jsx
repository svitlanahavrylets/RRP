import { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import Button from "../../components/Button/Button.jsx";
import OrderServiceModal from "../../components/OrderServiceModal/OrderServiceModal.jsx";
import { benefitsData } from "../../data/benefitsData.jsx";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const setRealHeight = () => {
      const height = window.innerHeight;
      document.documentElement.style.setProperty(
        "--real-height",
        `${height}px`
      );
      if (window.innerWidth < 1158) {
        const height = document.documentElement.clientHeight;
        document.documentElement.style.setProperty(
          "--real-height",
          `${height}px`
        );
      }
    };

    setRealHeight();
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <section className={styles.heroImage}>
        <div className={styles.heroWrapper}>
          <h1 className={styles.heroTitle}>
            Efektivní řešení pro vaše podnikání
          </h1>
          <Button onClick={handleOpenModal}>Objednat službu</Button>
        </div>
      </section>
      <section className={styles.benefitsContainer}>
        <div className="container">
          <h2 className={styles.visuallyHidden}>Our benefits</h2>
          <ul className={styles.benefitsList}>
            {benefitsData.map(({ id, title, text, icon }) => (
              <li key={id} className={styles.benefitsCard}>
                <div className={styles.iconWrapper}>{icon}</div>
                <h3 className={styles.benefitsTitle}>{title}</h3>
                <p className={styles.benefitsText}>{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {isModalOpen && <OrderServiceModal onClose={handleCloseModal} />}
    </>
  );
};
export default HomePage;
