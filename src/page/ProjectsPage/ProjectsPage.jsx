import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./ProjectsPage.module.css";
import { projects } from "../../data/projects.js";

const ProjectsPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    console.log("Window resized:", window.innerWidth);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1158);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    console.log("Updated activeIndex:", activeIndex);
  }, [activeIndex]);

  const handleClick = (index) => {
    if (isMobile) {
      console.log("Clicked on project index:", index);
      console.log("Current activeIndex before update:", activeIndex);

      setActiveIndex((prev) => {
        const newIndex = prev === index ? null : index;
        console.log("New activeIndex inside setState:", newIndex);
        return newIndex;
      });
    }
  };
  console.log("Rendering, activeIndex:", activeIndex);
  return (
    <section className={styles.portfolioSection}>
      <div className="container">
        <h2 className={styles.portfolioTitle}>Portfolio</h2>
        <ul className={styles.projectCard}>
          {projects.map((project, index) => (
            <li
              key={index}
              className={styles.projectCardItem}
              onClick={() => handleClick(index)}
            >
              <motion.div
                className={styles.portfolioOverlayImages}
                whileHover={!isMobile ? { scale: 1.0 } : {}}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className={styles.image}
                />
                <motion.p
                  className={`${styles.portfolioOverlayText} ${
                    isMobile && activeIndex === index ? styles.active : ""
                  }`}
                  initial={!isMobile ? { opacity: 0, y: 100 } : {}}
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
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ProjectsPage;
