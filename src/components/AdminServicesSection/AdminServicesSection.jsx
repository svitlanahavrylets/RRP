import { FaTrash } from "react-icons/fa";
import Button from "../Button/Button.jsx";
import ServiceCardItem from "../ServiceCardItem/ServiceCardItem.jsx";
import styles from "./AdminServicesSection.module.css";
import { useEffect, useState } from "react";
import {
  createServicesData,
  deleteServicesData,
  fetchServicesData,
} from "../../api/content/services.js";
import Loader from "../Loader/Loader.jsx";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import TiptapComponent from "../TiptapComponent/TiptapComponent.jsx";
import { useDefaultEditor } from "../../utils/editorConfig.js";

const ServiceSchema = Yup.object().shape({
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

const AdminServicesSection = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [error, setError] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");

  const editor = useDefaultEditor();

  useEffect(() => {
    const loadServicesData = async () => {
      try {
        const data = await fetchServicesData();
        setServices(data || []);
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

    loadServicesData();
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
      await deleteServicesData(id);
      setServices((prevServices) =>
        prevServices.filter((service) => service._id !== id)
      );
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Nepodařilo se odstranit službu.";

      iziToast.error({
        title: "Chyba",
        message: errorMessage,
      });
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
      <h2 className={styles.servicesTitle}>Správa služeb</h2>
      <div className={styles.formCardWrapper}>
        {isLoading && <Loader />}
        {error && <p className={styles.errorMessage}>{error}</p>}
        <Formik
          initialValues={{
            image: null,
            title: "",
            text: "",
            description: "",
          }}
          validationSchema={ServiceSchema}
          onSubmit={async (values, { resetForm }) => {
            const formData = new FormData();
            formData.append("image", values.image);
            formData.append("title", values.title);
            formData.append("text", values.text);
            formData.append(
              "description",
              values.description.replace(/\n/g, "\\n")
            );

            try {
              // const servicesData = {
              //   ...values,
              //   description: editor?.getHTML() || "", // довгий опис
              // };

              const newService = await createServicesData(formData);

              if (newService?.data) {
                setServices((prevServices) => [
                  newService.data,
                  ...prevServices,
                ]);
              } else {
                iziToast.error({
                  title: "Chyba",
                  message:
                    "Nová služba nebyla správně vytvořena. Zkuste to znovu.",
                });
              }

              resetForm();
              editor?.commands.clearContent();
              setSelectedFileName("");
            } catch (err) {
              const errorMessage =
                err?.message ||
                "Něco se pokazilo. Zkuste to prosím znovu později.";

              iziToast.error({
                title: "Chyba",
                message: errorMessage,
              });
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
                    setFieldValue("image", file);

                    setSelectedFileName(() => (file ? file.name : ""));
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
              <TiptapComponent editor={editor} name="description" />
              <Button type="submit">Odeslat</Button>
            </Form>
          )}
        </Formik>
        <ul className={styles.servicesCard}>
          {isLoading ? (
            <Loader />
          ) : services?.length > 0 ? (
            services.map((service) =>
              service ? (
                <li
                  key={service._id}
                  className={styles.serviceCardItem}
                  onClick={() => handleClick(service._id)}
                >
                  <ServiceCardItem
                    service={service}
                    isMobile={isMobile}
                    activeIndex={activeIndex}
                  />
                  <Button
                    onClick={() => handleDelete(service._id)}
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
              V databázi nebyla nalezena žádná služba
            </p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AdminServicesSection;
