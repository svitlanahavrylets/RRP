import { Link, useParams } from "react-router-dom";
import styles from "./ServicesItemPage.module.css";
import { FaArrowLeft } from "react-icons/fa";
import Loader from "../../components/Loader/Loader.jsx";
import { useEffect, useState } from "react";
import { fetchSingleService } from "../../api/content/services.js";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import clsx from "clsx";
import Button from "../../components/Button/Button.jsx";
import OrderServiceModal from "../../components/OrderServiceModal/OrderServiceModal.jsx";

const ServicesItemPage = ({ showModal = false }) => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(showModal);

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

  useEffect(() => {
    if (showModal) {
      setIsModalOpen(true);
    }
  }, [showModal]);

  const handleOpenModal = () => {
    // Вручну відкриваємо модалку та оновлюємо URL
    setIsModalOpen(true);
    window.history.pushState(null, "", "/order");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    window.history.pushState(null, "", "/");
  };

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

      <div className={styles.orderSection}>
        <div className={clsx(styles.orderDescription, "container")}>
          <h2 className={styles.orderTitle}>
            Chcete využít některou službu, nebo se na něco jenom zeptat?
          </h2>
          <Button className={styles.orderButton} onClick={handleOpenModal}>
            Objednat službu
          </Button>
        </div>
      </div>

      {isModalOpen && <OrderServiceModal onClose={handleCloseModal} />}
    </section>
  );
};

export default ServicesItemPage;
