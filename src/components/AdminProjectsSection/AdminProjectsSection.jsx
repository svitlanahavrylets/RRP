import { FaTrash } from "react-icons/fa";
import Button from "../Button/Button.jsx";
import ProjectCardItem from "../ProjectCardItem/ProjectCardItem.jsx";
import styles from "./AdminProjectsSection.module.css";
import { useEffect, useState } from "react";
import {
  createProjectsData,
  deleteProjectsData,
  fetchProjectsData,
} from "../../api/content/projects.js";
import Loader from "../Loader/Loader.jsx";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import clsx from "clsx";

const ProjectSchema = Yup.object().shape({
  image: Yup.mixed()
    .required("Required")
    .test(
      "fileType",
      "Invalid file type. Must be /jpeg /png /webp",
      (value) => {
        return (
          value &&
          ["image/jpeg", "image/png", "image/webp"].includes(value.type)
        );
      }
    ),
  title: Yup.string()
    .trim()
    .min(2, "Title must be at least 2 characters")

    .matches(/\S/, "Title cannot contain only spaces")
    .required("Required"),
  category: Yup.string()
    .trim()
    .min(2, "Title must be at least 2 characters")

    .matches(/\S/, "Title cannot contain only spaces")
    .required("Required"),
  description: Yup.string()
    .trim()
    .min(2, "Title must be at least 2 characters")
    .matches(/\S/, "Title cannot contain only spaces")
    .required("Required"),
});

const AdminProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");

  useEffect(() => {
    const loadProjectsData = async () => {
      const data = await fetchProjectsData();

      setProjects(data || []);
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

  const handleDelete = async (id) => {
    try {
      await deleteProjectsData(id);
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project._id !== id)
      );
    } catch (error) {
      console.error("Помилка при видаленні:", error);
    }
  };

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
    <div className="container">
      <h2 className={styles.projectsTitle}>Správa projektů</h2>
      <div className={styles.formCardWrapper}>
        {isLoading && <Loader />}
        <Formik
          initialValues={{
            image: null,
            title: "",
            category: "",
            description: "",
          }}
          validationSchema={ProjectSchema}
          onSubmit={async (values, { resetForm }) => {
            // Створюємо форму для відправки даних
            const formData = new FormData();
            formData.append("image", values.image);
            formData.append("title", values.title);
            formData.append("category", values.category);
            formData.append("description", values.description);

            try {
              const newProject = await createProjectsData(formData);

              if (newProject?.project) {
                setProjects((prevProjects) => [
                  newProject.project,
                  ...prevProjects,
                ]);
              } else {
                console.error("newProject.project не знайдено!", newProject);
              }

              resetForm();
              setSelectedFileName("");
            } catch (error) {
              console.error("Помилка при додаванні:", error);
            }
          }}
        >
          {({ setFieldValue }) => (
            <Form className={styles.formikAdminWrapper}>
              <label className={styles.label}>Obrázek</label>
              <div className={styles.fileInputWrapper}>
                <input
                  id="fileInputProject"
                  className={clsx(styles.inputFile, styles.btnInput)}
                  name="image"
                  type="file"
                  onChange={(e) => {
                    const file = e.currentTarget.files[0];
                    console.log("Selected file:", file);
                    setFieldValue("image", file);

                    setSelectedFileName(() => (file ? file.name : "")); // Зберігаємо ім'я файлу
                    console.log("Selected file name:", selectedFileName);
                  }}
                />
                <label
                  htmlFor="fileInputProject"
                  className={styles.fileInputButton}
                >
                  Vybrat soubor
                </label>
                {/* Виведення імені вибраного файлу */}
                {selectedFileName && (
                  <div className={styles.selectedFile}>{selectedFileName}</div>
                )}
              </div>
              <ErrorMessage
                name="image"
                component="div"
                className={styles.error}
              />
              <label className={styles.label}>Název</label>
              <Field
                className={styles.input}
                name="title"
                placeholder="Zadejte název"
              />
              <ErrorMessage
                name="title"
                component="div"
                className={styles.error}
              />
              <label className={styles.label}>Kategorie</label>
              <Field
                className={styles.input}
                name="category"
                placeholder="Zadejte kategorie"
              />
              <ErrorMessage
                name="category"
                component="div"
                className={styles.error}
              />
              <label className={styles.label}>Popis</label>
              <Field
                as="textarea"
                className={styles.textarea}
                name="description"
                placeholder="Zadejte popis"
              />
              <ErrorMessage
                name="description"
                component="div"
                className={styles.error}
              />

              <Button type="submit">Odeslat</Button>
            </Form>
          )}
        </Formik>
        <ul className={styles.projectsCard}>
          {isLoading ? (
            <Loader /> // Покажемо лоадер, коли завантажується дані
          ) : projects?.length > 0 ? (
            projects.map((project) =>
              project ? (
                <li
                  key={project._id}
                  className={styles.projectsCardItem}
                  onClick={() => handleClick(project._id)}
                >
                  <ProjectCardItem
                    project={project}
                    isMobile={isMobile}
                    activeIndex={activeIndex}
                  />
                  <Button
                    onClick={() => handleDelete(project._id)}
                    className={styles.btnAdminDelete}
                    icon={<FaTrash />}
                  >
                    Smazat
                  </Button>
                </li>
              ) : null
            )
          ) : (
            <p>V databázi nebyl nalezen žádný project</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AdminProjectsSection;
