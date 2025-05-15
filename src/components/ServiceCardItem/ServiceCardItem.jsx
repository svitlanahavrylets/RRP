import styles from "./ServiceCardItem.module.css";

const ServiceCardItem = ({ services }) => {
  if (!services) {
    return <p>Žádná data o službách</p>;
  }
  return (
    <div>
      <div className={styles.iconWrapper}>{services.icon}</div>
      <h3 className={styles.benefitsTitle}>{services.title}</h3>
      <p className={styles.benefitsText}>{services.text}</p>
    </div>
  );
};

export default ServiceCardItem;
