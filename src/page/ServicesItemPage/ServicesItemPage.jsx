import { Link, useParams } from "react-router-dom";
import styles from "./ServicesItemPage.module.css";
import { FaArrowLeft } from "react-icons/fa";
import Loader from "../../components/Loader/Loader.jsx";
import { useEffect, useState } from "react";
import { fetchSingleService } from "../../api/content/services.js";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const ServicesItemPage = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadService = async () => {
      try {
        const data = await fetchSingleService(id);

        if (data) {
          const fixedDescription = data.description.replace(
            /<p>&nbsp;<\/p>/g,
            "<p></p>"
          );
          setService({ ...data, description: fixedDescription });
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
    loadService();
  }, [id]);

  if (!service) {
    return <p>Zatím žádné služby nejsou k dispozici.</p>;
  }

  return (
    <section className={styles.serviceItem}>
      <div className="container">
        <Link to="/our-services" className={styles.backButton}>
          <FaArrowLeft /> Zpět na Naše služby
        </Link>
        {isLoading && <Loader />}
        {error && <p className={styles.errorMessage}>{error}</p>}
        <div className={styles.titleAndTextWrapper}>
          <h1 className={styles.title}>{service.title}</h1>
          <div className={styles.textAndImageWrapper}>
            <p className={styles.text}>{service.text}</p>
            <img
              src={service.imageUrl}
              alt={service.title}
              className={styles.image}
            />
          </div>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: service.description }}
          />
        </div>
      </div>
    </section>
  );
};

export default ServicesItemPage;
