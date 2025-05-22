import { Link, useParams } from "react-router-dom";
import styles from "./CareerPositionPage.module.css";
import { FaArrowLeft } from "react-icons/fa";
import Loader from "../../components/Loader/Loader.jsx";
import { useEffect, useState } from "react";
import { fetchSingleCareerPosition } from "../../api/content/career.js";

const CareerPositionPage = () => {
  const { id } = useParams();
  const [positions, setPositions] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBlog = async () => {
      const data = await fetchSingleCareerPosition(id);

      const fixedDescription = data.description.replace(
        /<p>&nbsp;<\/p>/g,
        "<p></p>"
      );
      setPositions({ ...data, description: fixedDescription });
      setIsLoading(false);
    };

    loadBlog();
  }, [id]);

  if (!positions) {
    return <p>Zatím žádné volné pozice</p>;
  }

  return (
    <section className={styles.careerPosition}>
      <div className="container">
        <Link to="/career" className={styles.backButton}>
          <FaArrowLeft /> Zpět na Kariéra
        </Link>
        {isLoading && <Loader />}
        <h1 className={styles.title}>{positions.title}</h1>
        <p className={styles.category}>{positions.text}</p>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: positions.description }}
        />
      </div>
    </section>
  );
};

export default CareerPositionPage;
