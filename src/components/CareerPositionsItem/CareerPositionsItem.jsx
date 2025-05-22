import styles from "./CareerPositionsItem.module.css";

const CareerPositionsItem = ({ position }) => {
  return (
    <div className={styles.careerCardContainer}>
      <h3 className={styles.careerListFullname}>{position.title}</h3>
      <p className={styles.careerCardText}>{position.text}</p>
    </div>
  );
};

export default CareerPositionsItem;
