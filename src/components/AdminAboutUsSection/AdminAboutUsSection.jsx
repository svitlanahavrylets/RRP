import { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  createAboutData,
  deleteAboutData,
  fetchAboutData,
} from "../../api/content/about.js";
import { useDefaultEditor } from "../../utils/editorConfig.js";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import styles from "./AdminAboutUsSection.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Loader from "../Loader/Loader.jsx";
import clsx from "clsx";
import TiptapComponent from "../TiptapComponent/TiptapComponent.jsx";
import Button from "../Button/Button.jsx";
import { FaTrash } from "react-icons/fa";

const AboutSchema = Yup.object().shape({
  image: Yup.mixed().test(
    "fileType",
    "Neplatný typ souboru. Povolené: jpeg, png, webp",
    (value) => {
      return (
        value && ["image/jpeg", "image/png", "image/webp"].includes(value.type)
      );
    }
  ),
  text: Yup.string(),
  youtubeLink: Yup.string("Neplatný odkaz na YouTube"),
});

const AdminAboutUsSection = () => {
  const [about, setAbout] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchAboutData();
        console.log(res.data);

        const aboutObj = res.data;
        const fixedText = aboutObj.text.replace(/<p>&nbsp;<\/p>/g, "<p></p>");
        setAbout({ ...aboutObj, text: fixedText });
      } catch (error) {
        const errorMessage =
          error?.message || "Něco se pokazilo. Zkuste to prosím znovu později.";

        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleDelete = async () => {
    try {
      console.log();
      await deleteAboutData();
      setAbout(null);
      iziToast.success({
        title: "Úspěch",
        message: "Sekce O nás byla úspěšně odstraněna.",
        position: "topRight",
      });
    } catch (error) {
      iziToast.error({
        title: "Chyba",
        message: error.message || "Nepodařilo se odstranit příspěvek.",
        position: "topRight",
      });
    }
  };

  const editor = useDefaultEditor();

  return (
    <div className="container">
      <h2 className={styles.title}>Správa o nás</h2>

      {isLoading && <Loader />}
      {error && <p className={styles.errorMessage}>{error}</p>}
      <Formik
        initialValues={{
          image: null,
          text: "",
          youtubeLink: "",
        }}
        validationSchema={AboutSchema}
        onSubmit={async (values, { resetForm }) => {
          const formData = new FormData();
          formData.append("image", values.image);
          formData.append("text", values.text.replace(/\n/g, "\\n"));
          formData.append("youtubeLink", values.youtubeLink);

          for (let [key, value] of formData.entries()) {
            console.log(`FormData field: ${key}`, value);
          }

          try {
            const newAbout = await createAboutData(formData);

            if (newAbout.updated) {
              iziToast.success({
                title: "Úspěch",
                message: "Data byla úspěšně aktualizována!",
                position: "topRight",
              });
            } else if (newAbout.created) {
              iziToast.success({
                title: "Úspěch",
                message: "Data byla úspěšně vytvořena!",
                position: "topRight",
              });
            }

            resetForm();
            editor.commands.clearContent();

            setSelectedFileName("");
          } catch (error) {
            iziToast.error({
              title: "Chyba",
              message:
                error.message || "Nepodařilo se uložit data. Zkuste to znovu.",
              position: "topRight",
            });
          }
        }}
      >
        {({ setFieldValue }) => (
          <Form className={styles.formikAdminWrapper}>
            <label className={styles.label}>Obrázek</label>
            <div className={styles.fileInputWrapper}>
              <input
                id="fileInputAbout"
                className={clsx(styles.inputFile, styles.btnInput)}
                name="image"
                type="file"
                onChange={(e) => {
                  const file = e.currentTarget.files[0];
                  setFieldValue("image", file);
                  setSelectedFileName(() => (file ? file.name : ""));
                }}
              />
              <label
                htmlFor="fileInputAbout"
                className={styles.fileInputButton}
              >
                Vybrat soubor
              </label>
              {selectedFileName && (
                <div className={styles.selectedFile}>{selectedFileName}</div>
              )}
            </div>
            <ErrorMessage
              name="image"
              component="div"
              className={styles.error}
            />

            <label className={styles.label}>YouTube</label>
            <Field
              className={styles.input}
              name="youtubeLink"
              placeholder="Zadejte odkaz na YouTube"
            />
            <ErrorMessage
              name="youtubeLink"
              component="div"
              className={styles.error}
            />
            <TiptapComponent editor={editor} name="text" />
            <ErrorMessage
              name="text"
              component="div"
              className={styles.error}
            />

            <Button type="submit">Uložit</Button>
          </Form>
        )}
      </Formik>
      {isLoading ? (
        <Loader />
      ) : about ? (
        <div className={styles.wrapper}>
          <div className={styles.imgAndTextWrapper}>
            <div className={styles.img}>
              {about?.imageUrl && (
                <img
                  src={about.imageUrl}
                  alt="Zakladatel"
                  className={styles.image}
                />
              )}
            </div>
            <div
              className={styles.text}
              dangerouslySetInnerHTML={{ __html: about.text }}
            />
          </div>
          <Button
            onClick={handleDelete}
            className={styles.btnAdminDelete}
            icon={<FaTrash />}
          >
            Smazat
          </Button>
        </div>
      ) : (
        <p className={styles.noAboutText}>
          V databázi nebyla nalezena žádná informace
        </p>
      )}
    </div>
  );
};

export default AdminAboutUsSection;
