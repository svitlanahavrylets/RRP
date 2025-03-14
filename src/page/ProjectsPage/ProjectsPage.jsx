import { motion } from "framer-motion";
import styles from "./ProjectsPage.module.css";
import project1Img from "../../assets/proj.jpg";
import project2Img from "../../assets/projekt.jpg";

const projects = [
  {
    title: "Efektivní řízení IT projektů",
    category: "Projektové řízení v IT",
    image: project1Img,
    description:
      "Specializuji se na řízení IT projektů od plánování až po realizaci. Koordinuji vývojové týmy, optimalizuji procesy a zajišťuji včasné dodání s ohledem na obchodní cíle a technologické trendy.",
  },
  {
    title: "Úspěšné zavádění digitálních řešení",
    category: "IT management",
    image: project2Img,
    description:
      "Pomáhám firmám implementovat technologická řešení řízením IT projektů ve všech fázích. Definuji požadavky, koordinuji vývoj, testování a nasazení. Zajišťuji hladkou spolupráci týmu a soulad projektu s obchodními cíli.",
  },
  // Додай решту проєктів
];

const ProjectsPage = () => {
  return (
    <section className={styles.portfolioSection} id="our-portfolio">
      <div className={styles.container}>
        <h2 className={styles.portfolioTitle}>Naše portfolio</h2>
        <ul className={styles.projectCard}>
          {projects.map((project, index) => (
            <li key={index} className={styles.projectCardItem}>
              <div className={styles.portfolioOverlayImages}>
                <img
                  src={project.image}
                  alt={project.title}
                  className={styles.image}
                />
                <motion.p
                  className={styles.portfolioOverlayText}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {project.description}
                </motion.p>
              </div>
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
