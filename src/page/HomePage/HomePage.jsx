import styles from "./HomePage.module.css";
import Button from "../../components/Button/Button.jsx";
import heroImage from "../../assets/hero.jpg";

const HomePage = () => {
  return (
    <main>
      <section
        className={styles.heroImage}
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <h1 className={styles.heroTitle}>
          Efektivní řešení pro vaše podnikání
        </h1>
        <Button />
      </section>
      <section className={styles.heroDesContainer}>
        <p className={styles.heroText}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis,
          minima. Laudantium sint mollitia, rem, qui ea pariatur et placeat
          veniam tempora, officiis beatae atque distinctio quas alias culpa
          deserunt asperiores. Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Blanditiis, minima. Laudantium sint mollitia, rem,
          qui ea pariatur et placeat veniam tempora, officiis beatae atque
          distinctio quas alias culpa deserunt asperiores. Lorem ipsum dolor
          sit, amet consectetur adipisicing elit. Blanditiis, minima. Laudantium
          sint mollitia, rem, qui ea pariatur et placeat veniam tempora,
          officiis beatae atque distinctio quas alias culpa deserunt asperiores.
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis,
          minima. Laudantium sint mollitia, rem, qui ea pariatur et placeat
          veniam tempora, officiis beatae atque distinctio quas alias culpa
          deserunt asperiores. Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Blanditiis, minima. Laudantium sint mollitia, rem,
          qui ea pariatur et placeat veniam tempora, officiis beatae atque
          distinctio quas alias culpa deserunt asperiores.
        </p>
      </section>
    </main>
  );
};
export default HomePage;
