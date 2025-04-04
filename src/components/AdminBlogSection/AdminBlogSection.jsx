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
import * as Yup from "yup";
import clsx from "clsx";
// import EditorComponent from "../EditorComponent/EditorComponent.jsx";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import TiptapComponent from "../TiptapComponent/TiptapComponent.jsx";

const BlogSchema = Yup.object().shape({
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
  date: Yup.date().typeError("Invalid date format").required("Required"),
  description: Yup.string()
    .trim()
    .min(2, "Title must be at least 2 characters")
    .matches(/\S/, "Title cannot contain only spaces")
    .required("Required"),
  youtubeLink: Yup.string("Incorrect link"),
});

const AdminBlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [isMobile, setIsMobile] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");

  useEffect(() => {
    const loadBlogData = async () => {
      const data = await fetchBlogData();

      setBlogs(data || []);
      setIsLoading(false);
    };

    loadBlogData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteBlogData(id);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error("Помилка при видаленні:", error);
    }
  };

  // Ініціалізація редактора
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight, // Додає підсвічування тексту
    ],
    content: "",
    editorProps: {
      attributes: {
        style: "min-height: 200px; padding: 10px; margin: 0;   outline: none;",
      },
    },
  });

  return (
    <div className="container">
      <h2 className={styles.projectsTitle}>Správa blogu</h2>
      <div className={styles.formCardWrapper}>
        {isLoading && <Loader />}
        <Formik
          initialValues={{
            image: null,
            title: "",
            category: "",
            date: new Date().toISOString().split("T")[0], // Поточна дата у форматі "YYYY-MM-DD"
            description: "",
            youtubeLink: "",
          }}
          validationSchema={BlogSchema}
          onSubmit={async (values, { resetForm }) => {
            console.log("Форма сабмітиться!");
            console.log("дані на відправку:", values);

            // Форматуємо текст для збереження коректних абзаців
            // const formattedDescription = values.description.replace(
            //   /\n+/g,
            //   "\n\n"
            // );

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
              console.log("Отриманий проєкт після сабміту:", newBlog);

              if (newBlog?.post) {
                setBlogs((prevPost) => [
                  ...(Array.isArray(prevPost) ? prevPost : []),
                  newBlog.post,
                ]);
              } else {
                console.error("newBlog.post не знайдено!", newBlog);
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
                  id="fileInputBlog"
                  className={clsx(styles.inputFile, styles.btnInput)}
                  name="image"
                  type="file"
                  onChange={(e) => {
                    const file = e.currentTarget.files[0];

                    setFieldValue("image", file);

                    setSelectedFileName(() => (file ? file.name : "")); // Зберігаємо ім'я файлу
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
                onFocus={(e) => e.target.showPicker()} // ⬅ Використовуємо showPicker() для відкриття календаря
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
              <TiptapComponent editor={editor} />
              <Button type="submit">Odeslat</Button>
            </Form>
          )}
        </Formik>
        <ul className={styles.projectsCard}>
          {blogs?.length > 0 ? (
            blogs.map((blog) =>
              blog ? (
                <li
                  key={blog._id}
                  className={styles.projectsCardItem}
                  // onClick={() => handleClick(blog._id)}
                >
                  <BlogCardItem
                    blog={blog}
                    // isMobile={isMobile}
                    // activeIndex={activeIndex}
                  />
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
            <p>V databázi nebyl nalezen žádný článek</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AdminBlogSection;
