import styles from "./ServiceCardItem.module.css";

const ServiceCardItem = ({ service }) => {
  if (!service) {
    return <p>Žádná data o službách</p>;
  }
  return (
    <div>
      <h3 className={styles.benefitsTitle}>{service.title}</h3>
      <p className={styles.benefitsText}>{service.description}</p>
      <img src={service.imageUrl} alt={service.title} />
    </div>
  );
};

export default ServiceCardItem;
