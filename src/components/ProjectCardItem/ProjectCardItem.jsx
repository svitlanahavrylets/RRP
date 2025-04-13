import { motion } from "framer-motion";
import styles from "./ProjectCardItem.module.css";

const ProjectCardItem = ({ project, isMobile, activeIndex }) => {
  if (!project) {
    return <p>Помилка: немає даних про проєкт.</p>;
  }
  return (
    <>
      <motion.div
        className={styles.portfolioOverlayImages}
        whileHover={!isMobile ? { scale: 1.0 } : {}}
      >
        <img
          src={project.imageUrl}
          alt={project.title}
          className={styles.projectCardImg}
        />
        <motion.p
          className={`${styles.portfolioOverlayText} ${
            isMobile && activeIndex === project._id ? styles.active : ""
          }`}
          initial={{ opacity: 0, y: 100 }}
          animate={
            isMobile && activeIndex === project._id ? { opacity: 1, y: 0 } : {}
          }
          whileHover={!isMobile ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3 }}
        >
          {project.description}
        </motion.p>
      </motion.div>
      <div className={styles.projectCardContainer}>
        <h3 className={styles.projectCardTitle}>{project.title}</h3>
        <p className={styles.projectCardText}>{project.category}</p>
      </div>
    </>
  );
};

export default ProjectCardItem;
