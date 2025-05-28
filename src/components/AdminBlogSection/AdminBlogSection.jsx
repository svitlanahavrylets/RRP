import { FaTrash } from "react-icons/fa";
import Button from "../Button/Button.jsx";
import BlogCardItem from "../BlogCardItem/BlogCardItem.jsx";
import styles from "./AdminBlogSection.module.css";
import { useEffect, useState } from "react";
import {
  createBlogData,
  deleteBlogData,
  fetchBlogData,
} from "../../api/content/blog.js";
import Loader from "../Loader/Loader.jsx";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDefaultEditor } from "../../utils/editorConfig";
import * as Yup from "yup";
import clsx from "clsx";
import TiptapComponent from "../TiptapComponent/TiptapComponent.jsx";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const BlogSchema = Yup.object().shape({
  image: Yup.mixed()
    .required("Povinné pole")
    .test(
      "fileType",
      "Neplatný typ souboru. Povolené: jpeg, png, webp",
      (value) => {
        return (
          value &&
          ["image/jpeg", "image/png", "image/webp"].includes(value.type)
        );
      }
    ),
  title: Yup.string()
    .trim()
    .min(2, "Název musí mít alespoň 2 znaky")
    .matches(/\S/, "Název nemůže obsahovat pouze mezery")
    .required("Povinné pole"),
  category: Yup.string()
    .trim()
    .min(2, "Kategorie musí mít alespoň 2 znaky")
    .matches(/\S/, "Kategorie nemůže obsahovat pouze mezery")
    .required("Povinné pole"),
  date: Yup.date().typeError("Neplatný formát datumu").required("Povinné pole"),
  description: Yup.string()
    .trim()
    .min(2, "Popis musí mít alespoň 2 znaky")
    .matches(/\S/, "Popis nemůže obsahovat pouze mezery")
    .required("Povinné pole"),
  youtubeLink: Yup.string("Neplatný odkaz na YouTube"),
});

const AdminBlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");

  useEffect(() => {
    const loadBlogData = async () => {
      try {
        const data = await fetchBlogData();
        setBlogs(data || []);
        setIsLoading(false);
      } catch (err) {
        const errorMessage =
          err?.message || "Něco se pokazilo. Zkuste to prosím znovu později.";
        setError(errorMessage);

        iziToast.error({
          title: "Chyba",
          message: errorMessage,
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadBlogData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteBlogData(id);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
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
      <h2 className={styles.title}>Správa blogu</h2>
      <div className={styles.formCardWrapper}>
        {isLoading && <Loader />}
        {error && <p className={styles.errorMessage}>{error}</p>}
        <Formik
          initialValues={{
            image: null,
            title: "",
            category: "",
            date: new Date().toISOString().split("T")[0],
            description: "",
            youtubeLink: "",
          }}
          validationSchema={BlogSchema}
          onSubmit={async (values, { resetForm }) => {
            // Створюємо форму для відправки даних
            const formData = new FormData();
            formData.append("image", values.image);
            formData.append("title", values.title);
            formData.append("category", values.category);
            formData.append("date", values.date);
            formData.append(
              "description",
              values.description.replace(/\n/g, "\\n")
            );
            formData.append("youtubeLink", values.youtubeLink);

            try {
              const newBlog = await createBlogData(formData);

              if (newBlog?.post) {
                setBlogs((prevPost) => [
                  ...(Array.isArray(prevPost) ? prevPost : []),
                  newBlog.post,
                ]);
                iziToast.success({
                  title: "Úspěch",
                  message: "Blog byl úspěšně přidán!",
                  position: "topRight",
                });
              } else {
                iziToast.error({
                  title: "Chyba",
                  message: "Nepodařilo se získat přidaný blog ze serveru.",
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
                  error.message ||
                  "Nepodařilo se přidat blog. Zkuste to znovu.",
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
                  id="fileInputBlog"
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
                  htmlFor="fileInputBlog"
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
              <label className={styles.label}>Datum</label>
              <Field
                type="date"
                id="date"
                className={clsx(styles.input, styles.btnInput)}
                name="date"
                placeholder="Zadejte datum"
                onFocus={(e) => e.target.showPicker()}
              />
              <ErrorMessage
                name="date"
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
              <TiptapComponent editor={editor} name="description" />
              <Button type="submit">Odeslat</Button>
            </Form>
          )}
        </Formik>
        <ul className={styles.card}>
          {isLoading ? (
            <Loader />
          ) : blogs?.length > 0 ? (
            blogs.map((blog) =>
              blog ? (
                <li key={blog._id} className={styles.cardItem}>
                  <BlogCardItem blog={blog} />
                  <Button
                    onClick={() => handleDelete(blog._id)}
                    className={styles.btnAdminDelete}
                    icon={<FaTrash />}
                  >
                    Smazat
                  </Button>
                </li>
              ) : null
            )
          ) : (
            <p className={styles.noInfoText}>
              V databázi nebyl nalezen žádný článek
            </p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AdminBlogSection;
