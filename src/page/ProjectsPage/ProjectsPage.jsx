import { motion } from "framer-motion";
import styles from "./ProjectsPage.module.css";
import { projects } from "../../data/projects.js";

const ProjectsPage = () => {
  return (
    <section className={styles.portfolioSection}>
      <div className="container">
        <h2 className={styles.portfolioTitle}>Naše portfolio</h2>
        <ul className={styles.projectCard}>
          {projects.map((project, index) => (
            <li key={index} className={styles.projectCardItem}>
              <motion.div
                className={styles.portfolioOverlayImages}
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className={styles.image}
                />
                <motion.p
                  className={styles.portfolioOverlayText}
                  initial={{ opacity: 0, y: 100 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {project.description}
                </motion.p>
              </motion.div>
              <div className={styles.projectCardContainer}>
                <h3 className={styles.projectCardTitle}>{project.title}</h3>
                <p className={styles.projectCardText}>{project.category}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ProjectsPage;
