import styles from "./ServiceCardItem.module.css";

const ServiceCardItem = ({ service }) => {
  if (!service) {
    return <p>Žádná data o službách</p>;
  }
  return (
    <>
      <img
        src={service.imageUrl}
        alt={service.title}
        className={styles.cardImg}
      />
      <div className={styles.cardContainer}>
        <h2 className={styles.title}>{service.title}</h2>
        <p className={styles.description}>{service.description}</p>
      </div>
    </>
  );
};

export default ServiceCardItem;
