import { FaTrash } from "react-icons/fa";
import Button from "../Button/Button.jsx";
import styles from "./AdminCareerSection.module.css";
import { useEffect, useState } from "react";
import {
  createCareerPosition,
  deleteCareerPosition,
  fetchCareerPositions,
} from "../../api/content/career.js";
import Loader from "../Loader/Loader.jsx";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TiptapComponent from "../TiptapComponent/TiptapComponent.jsx";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { useDefaultEditor } from "../../utils/editorConfig.js";
import CareerPositionsItem from "../CareerPositionsItem/CareerPositionsItem.jsx";

const CareerSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .min(2, "Název musí mít alespoň 2 znaky")
    .matches(/\S/, "Název nemůže obsahovat pouze mezery")
    .required("Povinné pole"),
  text: Yup.string()
    .trim()
    .min(2, "Kategorie musí mít alespoň 2 znaky")
    .matches(/\S/, "Kategorie nemůže obsahovat pouze mezery")
    .required("Povinné pole"),
  description: Yup.string()
    .trim()
    .min(2, "Popis musí mít alespoň 2 znaky")
    .matches(/\S/, "Popis nemůže obsahovat pouze mezery")
    .required("Povinné pole"),
});

const AdminCareerSection = () => {
  const [positions, setPositions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const editor = useDefaultEditor();

  useEffect(() => {
    const loadCareerPositions = async () => {
      try {
        const data = await fetchCareerPositions();
        setPositions(data || []);
      } catch (err) {
        const errorMessage =
          err?.message || "Chyba při načítání pracovních pozic";
        setError(errorMessage);
        iziToast.error({ title: "Chyba", message: errorMessage });
      } finally {
        setIsLoading(false);
      }
    };

    loadCareerPositions();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteCareerPosition(id);
      setPositions((prev) => prev.filter((pos) => pos._id !== id));
    } catch (error) {
      iziToast.error({
        title: "Chyba",
        message: error.message || "Nepodařilo se odstranit pozici.",
      });
    }
  };

  return (
    <div className="container">
      <h2 className={styles.projectsTitle}>Správa pracovních pozic</h2>
      <div className={styles.formCardWrapper}>
        {isLoading && <Loader />}
        {error && <p className={styles.errorMessage}>{error}</p>}
        <Formik
          initialValues={{
            title: "",
            text: "",
            description: "",
          }}
          validationSchema={CareerSchema}
          onSubmit={async (values, { resetForm }) => {
            try {
              const positionData = {
                ...values,
                description: editor?.getHTML() || "", // довгий опис
              };

              const newPosition = await createCareerPosition(positionData);

              setPositions((prev) => [...prev, newPosition]);
              iziToast.success({
                title: "Úspěch",
                message: "Pozice byla přidána!",
              });

              resetForm();
              editor?.commands.clearContent();
            } catch (error) {
              iziToast.error({
                title: "Chyba",
                message:
                  error.message ||
                  "Nepodařilo se přidat pozici. Zkuste to znovu.",
              });
            }
          }}
        >
          {() => (
            <Form className={styles.formikAdminWrapper}>
              <label className={styles.label}>Název pozice</label>
              <Field
                className={styles.input}
                name="title"
                placeholder="Zadejte název pozice"
              />
              <ErrorMessage
                name="title"
                component="div"
                className={styles.error}
              />

              <label className={styles.label}>Krátký text</label>
              <Field
                className={styles.input}
                name="text"
                placeholder="Zadejte krátký popis"
              />
              <ErrorMessage
                name="text"
                component="div"
                className={styles.error}
              />

              <TiptapComponent editor={editor} />
              <Button type="submit">Odeslat</Button>
            </Form>
          )}
        </Formik>

        <ul className={styles.projectsCard}>
          {positions.length > 0 ? (
            positions.map((position) => (
              <li key={position._id} className={styles.projectsCardItem}>
                <CareerPositionsItem position={position} />
                <Button
                  onClick={() => handleDelete(position._id)}
                  className={styles.btnAdminDelete}
                  icon={<FaTrash />}
                >
                  Smazat
                </Button>
              </li>
            ))
          ) : (
            <p className={styles.noInfoText}>
              Žádné pozice zatím nejsou k dispozici v databázi
            </p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AdminCareerSection;
