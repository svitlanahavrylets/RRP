import { useEffect, useState } from "react";
import { fetchCareerPositions } from "../../api/content/career.js";
import styles from "./CareerPage.module.css";
import Loader from "../../components/Loader/Loader.jsx";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import CareerPositionsItem from "../../components/CareerPositionsItem/CareerPositionsItem.jsx";

const CareerPage = () => {
  const [careerPositions, setCareerPositions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCareerPositionsData = async () => {
      try {
        const data = await fetchCareerPositions();
        if (data) {
          // Сортуємо так, щоб новіші були на початку
          const sortedData = data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setCareerPositions(sortedData);
        }
      } catch (err) {
        const errorMessage =
          err?.message || "Něco se pokazilo. Zkuste to prosím znovu později.";
        setError(errorMessage);
        iziToast.error({
          title: "Chyba",
          message: errorMessage,
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadCareerPositionsData();
  }, []);

  return (
    <section className={styles.careerSection}>
      <div className="container">
        <h2 className={styles.careerTitle}>Aktuálně nabízené pozice</h2>

        {isLoading ? (
          <Loader />
        ) : (
          <>
            {careerPositions.length > 0 ? (
              <ul className={styles.careerCard}>
                {careerPositions.map((position) => (
                  <li key={position._id} className={styles.careerCardItem}>
                    <CareerPositionsItem position={position} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.emptyMessage}>Zatím žádné volné pozice</p>
            )}
          </>
        )}

        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
    </section>
  );
};

export default CareerPage;
