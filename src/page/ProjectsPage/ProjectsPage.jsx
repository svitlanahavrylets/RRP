import { useState, useEffect } from "react";
import styles from "./ProjectsPage.module.css";
import { fetchProjectsData } from "../../api/content/projects.js";
import Loader from "../../components/Loader/Loader.jsx";
import ProjectCardItem from "../../components/ProjectCardItem/ProjectCardItem.jsx";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const loadProjectsData = async () => {
      const data = await fetchProjectsData();

      if (data) {
        const sortedData = data.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        setProjects(sortedData || []);
      }
      setIsLoading(false);
    };

    loadProjectsData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1158);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {}, [activeIndex]);

  const handleClick = (_id) => {
    if (isMobile) {
      setActiveIndex((prev) => {
        const newIndex = prev === _id ? null : _id;
        return newIndex;
      });
    }
  };

  return (
    <section className={styles.portfolioSection}>
      <div className="container">
        <h2 className={styles.portfolioTitle}>Portfolio</h2>
        {isLoading ? (
          <Loader />
        ) : (
          <ul className={styles.projectCard}>
            {projects.map((project) => (
              <li
                key={project._id}
                className={styles.projectCardItem}
                onClick={() => handleClick(project._id)}
              >
                <ProjectCardItem
                  project={project}
                  isMobile={isMobile}
                  activeIndex={activeIndex}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default ProjectsPage;
