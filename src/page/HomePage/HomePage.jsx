import styles from "./HomePage.module.css";
import Button from "../../components/Button/Button.jsx";
// import clsx from "clsx";

const HomePage = () => {
  return (
    <>
      <section className={styles.heroImage}>
        <h1 className={styles.heroTitle}>
          Efektivní řešení pro vaše podnikání
        </h1>
        <Button
          className={styles.button}
          // onClick={handleOpenModal}
        >
          Objednat službu
        </Button>
      </section>
      <section className={styles.heroDesContainer}>
        <p className={styles.heroText}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis,
          minima. Laudantium sint mollitia, rem, qui ea pariatur et placeat
          veniam tempora, officiis beatae atque distinctio quas alias culpa
          deserunt asperiores.
        </p>
      </section>
    </>
  );
};
export default HomePage;
