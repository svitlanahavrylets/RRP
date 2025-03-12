import { useState } from "react";
import styles from "./HomePage.module.css";
import Button from "../../components/Button/Button.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import OrderServiceModal from "../../components/OrderServiceModal/OrderServiceModal.jsx";
import { LiaProjectDiagramSolid } from "react-icons/lia";
import { PiChartLineUp } from "react-icons/pi";
import { IoRocketOutline } from "react-icons/io5";
// import clsx from "clsx";

const benefitsData = [
  {
    id: 1,
    title: "Projekty",
    text: "Realizujeme inovativní IT projekty, které mění byznys.",
    icon: <LiaProjectDiagramSolid />,
  },

  {
    id: 2,
    title: "Poradenstvi",
    text: "Poskytujeme odborné konzultace pro efektivní rozvoj vašich IT řešení.",
    icon: <PiChartLineUp />,
  },
  {
    id: 3,
    title: "Podpora",
    text: "Zajišťujeme spolehlivou technickou podporu a správu vašich systémů.",
    icon: <IoRocketOutline />,
  },
];
const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <section className={styles.heroImage}>
        <h1 className={styles.heroTitle}>
          Efektivní řešení pro vaše podnikání
        </h1>
        <Button onClick={handleOpenModal}>Objednat službu</Button>
      </section>
      <section className={styles.benefitsContainer}>
        <div className="container">
          <h2 className={styles.visuallyHidden}>Our benefits</h2>
          <ul className={styles.benefitsList}>
            {benefitsData.map(({ id, title, text, icon }) => (
              <li key={id} className={styles.benefitsCard}>
                <div className={styles.iconWrapper}>{icon}</div>
                <h3 className={styles.benefitsTitle}>{title}</h3>
                <p className={styles.benefitsText}>{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <OrderServiceModal onClose={handleCloseModal} />
        </Modal>
      )}
    </>
  );
};
export default HomePage;
