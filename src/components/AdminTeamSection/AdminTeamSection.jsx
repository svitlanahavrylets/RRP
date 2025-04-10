import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./AdminTeamSection.module.css";
import {
  createTeamData,
  deleteTeamData,
  fetchTeamData,
} from "../../api/content/team.js";
import { useEffect, useState } from "react";
import Button from "../Button/Button.jsx";
import TeamCardItem from "../TeamCardItem/TeamCardItem.jsx";
import { FaTrash } from "react-icons/fa";
import Loader from "../Loader/Loader.jsx";
import clsx from "clsx";

const TeamMemberSchema = Yup.object().shape({
  photoUrl: Yup.mixed()
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
  name: Yup.string()
    .trim()
    .min(2, "Jméno musí mít alespoň 2 znaky")
    .max(32, "Jméno může mít maximálně 32 znaků")
    .matches(/\S/, "Jméno nemůže obsahovat pouze mezery")
    .required("Povinné pole"),
  position: Yup.string().required("Povinné pole"),
  socialLinks: Yup.object({
    linkedin: Yup.string("Neplatný odkaz"),
    facebook: Yup.string("Neplatný odkaz"),
    instagram: Yup.string("Neplatný odkaz"),
    whatsapp: Yup.string("Neplatný odkaz"),
  }),
});

const AdminTeamSection = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFileName, setSelectedFileName] = useState("");

  useEffect(() => {
    const loadTeamData = async () => {
      const data = await fetchTeamData();

      setTeamMembers(data || []);
      setIsLoading(false);
    };

    loadTeamData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTeamData(id);
      setTeamMembers((prevMembers) =>
        prevMembers.filter((member) => member._id !== id)
      );
    } catch (error) {
      console.error("Помилка при видаленні:", error);
    }
  };

  return (
    <div className={styles.teamWrapper}>
      <h2 className={styles.teamTitle}>Správa týmu</h2>
      <div className={styles.formCardWrapper}>
        <Formik
          initialValues={{
            photoUrl: null,
            name: "",
            position: "",

            linkedin: "",
            facebook: "",
            instagram: "",
            whatsapp: "",
          }}
          validationSchema={TeamMemberSchema}
          onSubmit={async (values, { resetForm }) => {
            console.log("Форма сабмітиться!");
            console.log("дані на відправку:", values);

            // Створюємо форму для відправки даних
            const formData = new FormData();
            formData.append("image", values.photoUrl);
            formData.append("name", values.name);
            formData.append("position", values.position);

            // Додаємо соцмережі до formData
            formData.append("linkedin", values.linkedin || "");
            formData.append("facebook", values.facebook || "");
            formData.append("instagram", values.instagram || "");
            formData.append("whatsapp", values.whatsapp || "");

            try {
              const newMember = await createTeamData(formData);

              if (newMember?.member) {
                setTeamMembers((prevMembers) => [
                  newMember.member,
                  ...prevMembers,
                ]);
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
              <label className={styles.label}>Foto</label>
              <div className={styles.fileInputWrapper}>
                <input
                  id="fileInputTeam"
                  className={clsx(styles.inputFile, styles.btnInput)}
                  name="photoUrl"
                  type="file"
                  onChange={(e) => {
                    const file = e.currentTarget.files[0];

                    setFieldValue("photoUrl", file);
                    setSelectedFileName(file ? file.name : ""); // Зберігаємо ім'я файлу
                  }}
                />
                <label
                  htmlFor="fileInputTeam"
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
                name="photoUrl"
                component="div"
                className={styles.error}
              />
              <label className={styles.label}>Jméno</label>
              <Field
                className={styles.input}
                name="name"
                placeholder="Zadejte jméno"
              />
              <ErrorMessage
                name="name"
                component="div"
                className={styles.error}
              />
              <label className={styles.label}>Pozice</label>
              <Field
                className={styles.input}
                name="position"
                placeholder="Uveďte pozici"
              />
              <ErrorMessage
                name="position"
                component="div"
                className={styles.error}
              />
              <label className={styles.label}>LinkedIn</label>
              <Field
                className={styles.input}
                name="linkedin"
                placeholder="Zadejte odkaz na LinkedIn"
              />
              <ErrorMessage
                name="linkedin"
                component="div"
                className={styles.error}
              />
              <label className={styles.label}>Facebook</label>
              <Field
                className={styles.input}
                name="facebook"
                placeholder="Zadejte odkaz na Facebook"
              />
              <ErrorMessage
                name="facebook"
                component="div"
                className={styles.error}
              />
              <label className={styles.label}>Instagram</label>
              <Field
                className={styles.input}
                name="instagram"
                placeholder="Zadejte odkaz na Instagram"
              />
              <ErrorMessage
                name="instagram"
                component="div"
                className={styles.error}
              />
              <label className={styles.label}>WhatsApp</label>
              <Field
                className={styles.input}
                name="whatsapp"
                placeholder="Zadejte odkaz na WhatsApp"
              />
              <ErrorMessage
                name="whatsapp"
                component="div"
                className={styles.error}
              />

              <Button type="submit">Odeslat</Button>
            </Form>
          )}
        </Formik>

        <ul className={styles.teamCard}>
          {isLoading ? (
            <Loader />
          ) : teamMembers?.length > 0 ? (
            teamMembers.map((member) =>
              member ? (
                <li key={member._id} className={styles.teamCardItem}>
                  <TeamCardItem member={member} />
                  <Button
                    onClick={() => handleDelete(member._id)}
                    className={styles.btnAdminDelete}
                    icon={<FaTrash />}
                  >
                    Smazat
                  </Button>
                </li>
              ) : null
            )
          ) : (
            <p>V databázi nebyl nalezen žádný zaměstnanec</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AdminTeamSection;
