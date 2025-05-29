import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader.jsx";
import ServiceCardItem from "../../components/ServiceCardItem/ServiceCardItem.jsx";
import styles from "./OurServicesPage.module.css";
import { fetchServicesData } from "../../api/content/services.js";
import Button from "../../components/Button/Button.jsx";
import OrderServiceModal from "../../components/OrderServiceModal/OrderServiceModal.jsx";
import clsx from "clsx";

const OurServicesPage = ({ showModal = false }) => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(showModal);

  useEffect(() => {
    const loadServicesData = async () => {
      try {
        const data = await fetchServicesData();
        if (data) {
          const sortedData = data.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          );

          setServices(sortedData || []);
        }
      } catch (err) {
        console.log(err);

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

    loadServicesData();
  }, []);

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

  return (
    <section className={styles.servicesSection}>
      <div className="container">
        <h2 className={styles.servicesTitle}>Naše klíčové služby</h2>
        {isLoading ? (
          <Loader />
        ) : (
          <ul className={styles.servicesCard}>
            {Array.isArray(services) &&
              services.map((service) => (
                <li
                  key={service._id}
                  className={styles.serviceCardItem}
                  // onClick={() => handleClick(service._id)}
                >
                  <ServiceCardItem
                    service={service}
                    // isMobile={isMobile}
                    // activeIndex={activeIndex}
                  />
                </li>
              ))}
          </ul>
        )}
        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
      <div className={styles.orderSection}>
        <div className={clsx(styles.orderDescription, "container")}>
          <h2 className={styles.orderTitle}>
            Chcete využít některou službu, nebo se na něco jenom zeptat?
          </h2>
          <Button onClick={handleOpenModal}>Objednat službu</Button>
        </div>
      </div>

      {isModalOpen && <OrderServiceModal onClose={handleCloseModal} />}
    </section>
  );
};

export default OurServicesPage;
