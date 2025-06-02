import { Link, useParams } from "react-router-dom";
import styles from "./CareerPositionPage.module.css";
import { FaArrowLeft } from "react-icons/fa";
import Loader from "../../components/Loader/Loader.jsx";
import { useEffect, useState } from "react";
import { fetchSingleCareerPosition } from "../../api/content/careers.js";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const CareerPositionPage = () => {
  const { id } = useParams();
  const [positions, setPositions] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPosition = async () => {
      try {
        const data = await fetchSingleCareerPosition(id);

        if (data) {
          const fixedDescription = data.description.replace(
            /<p>&nbsp;<\/p>/g,
            "<p></p>"
          );
          setPositions({ ...data, description: fixedDescription });
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
    loadPosition();
  }, [id]);

  if (!positions) {
    return <p>Zatím žádné volné pozice</p>;
  }

  return (
    <section className={styles.careerPosition}>
      <div className="container">
        <Link to="/careers" className={styles.backButton}>
          <FaArrowLeft /> Zpět na Kariéra
        </Link>
        {isLoading && <Loader />}
        {error && <p className={styles.errorMessage}>{error}</p>}
        <div className={styles.titleAndTextWrapper}>
          <h1 className={styles.title}>{positions.title}</h1>
          <p className={styles.text}>{positions.text}</p>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: positions.description }}
          />
        </div>
      </div>
    </section>
  );
};

export default CareerPositionPage;
