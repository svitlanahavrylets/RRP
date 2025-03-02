import styles from "./HomePage.module.css";
import Button from "../../components/Button/Button.jsx";

const HomePage = () => {
  return (
    <main>
      <section className={styles.heroImage}>
        <h1 className={styles.heroTitle}>
          Efektivní řešení pro vaše podnikání
        </h1>
        <Button />
      </section>
      <section className={styles.heroDescription}>
        <p>
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
