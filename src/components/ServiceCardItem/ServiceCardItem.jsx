import styles from "./ServiceCardItem.module.css";
import { Link } from "react-router-dom";

const ServiceCardItem = ({ service }) => {
  if (!service) {
    return <p>Žádná data o službách</p>;
  }

  return (
    <Link to={`/our-services/${service._id}`} className={styles.link}>
      <img
        src={service.imageUrl}
        alt={service.title}
        className={styles.cardImg}
      />
      <div className={styles.cardContainer}>
        <h2 className={styles.title}>{service.title}</h2>
        <p className={styles.text}>{service.text}</p>
      </div>
    </Link>
  );
};

export default ServiceCardItem;
