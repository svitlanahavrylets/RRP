import { Link } from "react-router-dom";
import styles from "./CareerPositionsItem.module.css";

const CareerPositionsItem = ({ position }) => {
  if (!position) {
    return <p>Žádná data o actualne pozice</p>;
  }
  return (
    <Link to={`/careers/${position._id}`} className={styles.link}>
      <div className={styles.careerCardContainer}>
        <h3 className={styles.careerListFullname}>{position.title}</h3>
        <p className={styles.careerCardText}>{position.text}</p>
      </div>
    </Link>
  );
};

export default CareerPositionsItem;
