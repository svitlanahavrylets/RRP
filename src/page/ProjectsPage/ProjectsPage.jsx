import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
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

  const handleClick = (_id) => {
    if (isMobile) {
      console.log("Clicked on project index:", _id);
      console.log("Current activeIndex before update:", activeIndex);

      setActiveIndex((prev) => {
        const newIndex = prev === _id ? null : _id;
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
