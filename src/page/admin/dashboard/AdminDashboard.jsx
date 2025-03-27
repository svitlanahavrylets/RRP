import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { checkAdminAuth } from "../../../api/auth/auth.js";
// import iziToast from "izitoast";
import * as Yup from "yup";
import Button from "../../../components/Button/Button"; // Імпорт кнопки
import { Formik, Form, Field } from "formik";
import {
  createTeamData,
  deleteTeamData,
  fetchTeamData,
} from "../../../api/content/team.js";
// import { style } from "framer-motion/client";
import styles from "./AdminDashboard.module.css";
import TeamCardItem from "../../../components/TeamCardItem/TeamCardItem.jsx";
import Loader from "../../../components/Loader/Loader.jsx";
import { FaTrash } from "react-icons/fa";
import clsx from "clsx";

const TeamMemberSchema = Yup.object().shape({
  photoUrl: Yup.mixed().required("Фото обов'язкове"),
  // .test("fileSize", "Розмір файлу повинен бути менше 5MB", (value) => {
  //   return value && value.size <= 5 * 1024 * 1024; // Перевірка на розмір
  // })
  // .test("fileType", "Невірний тип файлу", (value) => {
  //   return (
  //     value &&
  //     ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(
  //       value.type
  //     )
  //   );
  // }),
  firstName: Yup.string().required("Ім'я обов'язкове"),
  lastName: Yup.string().required("Прізвище обов'язкове"),
  position: Yup.string().required("Посада обов'язкова"),
  // linkedin: Yup.string(),
  // facebook: Yup.string(),
  // instagram: Yup.string(),
  // whatsapp: Yup.string(),
});

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const loadTeamData = async () => {
      const data = await fetchTeamData();

      // if (data) {
      //   // Переконуємося, що нові працівники додаються в кінець
      //   const sortedData = data.sort(
      //     (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      //   );
      //   setTeamMembers(sortedData || []);
      // }
      setTeamMembers(data);
      setIsLoading(false);
    };

    loadTeamData();
  }, []);

  // useEffect(() => {
  //   const verifyAuth = async () => {
  //     try {
  //       await checkAdminAuth();
  //       setIsLoading(false);
  //     } catch (error) {
  //       iziToast.error({
  //         title: "Chyba",
  //         message: error || "Neplatné heslo. Zkuste to znovu",
  //         position: "topRight",
  //       });
  //       navigate("/admin"); // Якщо неавторизований — переадресація на логін
  //     }
  //   };
  //
  //   verifyAuth();
  // }, [navigate]);

  useEffect(() => {
    setIsLoading(false); // Прибираємо перевірку токена
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

  const logout = () => {
    localStorage.removeItem("authToken");
    navigate("/admin");
  };

  return (
    <div className={clsx("", styles.adminWrapper)}>
      {isLoading && <Loader />}
      <div className={styles.adminHeaderLogout}>
        <div className="container">
          <Button onClick={logout} className={styles.btnLogOut}>
            LogOut
          </Button>
        </div>
      </div>
      <h2 className={styles.teamTitle}>Správa týmu</h2>
      <Formik
        initialValues={{
          photoUrl: null,
          firstName: "",
          lastName: "",
          position: "",
          // linkedin: "",
          // facebook: "",
          // instagram: "",
          // whatsapp: "",
        }}
        validationSchema={TeamMemberSchema}
        onSubmit={async (values, { resetForm }) => {
          console.log("Форма сабмітиться!");
          console.log("дані на відправку:", values);

          // Створюємо форму для відправки даних
          const formData = new FormData();
          formData.append("image", values.photoUrl);
          formData.append("firstName", values.firstName);
          formData.append("lastName", values.lastName);
          formData.append("position", values.position);

          try {
            const newMember = await createTeamData(formData);
            setTeamMembers((prevMembers) => [...prevMembers, newMember]);
            resetForm();
          } catch (error) {
            console.error("Помилка при додаванні:", error);
          }
        }}
      >
        {({ setFieldValue, errors, touched }) => (
          <Form className={styles.formikAdminWrapper}>
            <label>Foto:</label>
            <input
              className={styles.input}
              name="photoUrl"
              type="file"
              onChange={(e) => {
                setFieldValue("photoUrl", e.currentTarget.files[0]);
              }}
            />
            {errors.photoUrl && touched.photoUrl && (
              <div>{errors.photoUrl}</div>
            )}

            <label className={styles.label}>Jméno</label>
            <Field
              className={styles.input}
              name="firstName"
              placeholder="Zadejte jméno"
            />
            {errors.firstName && touched.firstName && (
              <div>{errors.firstName}</div>
            )}

            <label className={styles.label}>Призвище: видалити!!!</label>
            <Field
              className={styles.input}
              name="lastName"
              placeholder="видалити!!!"
            />
            {errors.lastName && touched.lastName && (
              <div>{errors.lastName}</div>
            )}

            <label className={styles.label}>Pozice</label>
            <Field
              className={styles.input}
              name="position"
              placeholder="Uveďte pozici"
            />
            {errors.position && touched.position && (
              <div>{errors.position}</div>
            )}

            {/* <label>LinkedIn:</label>
          <Field name="linkedin" placeholder="Zadejte odkaz na LinkedIn" />
          {errors.linkedin && touched.linkedin && <div>{errors.linkedin}</div>}
          
          <label>Facebook:</label>
          <Field name="facebook" placeholder="Zadejte odkaz na Facebook" />
          {errors.facebook && touched.facebook && <div>{errors.facebook}</div>}
          
          <label>Instagram:</label>
          <Field name="instagram" placeholder="Zadejte odkaz na Instagram" />
          {errors.instagram && touched.instagram && (
            <div>{errors.instagram}</div>
            )}
            
            <label>WhatsApp:</label>
            <Field name="whatsapp" placeholder="Zadejte odkaz na WhatsApp" />
            {errors.whatsapp && touched.whatsapp && <div>{errors.whatsapp}</div>} */}
            <Button type="submit">Odeslat</Button>
            {/* <button ></button> */}
          </Form>
        )}
      </Formik>
      <ul className={styles.teamCard}>
        {teamMembers.map((member) => {
          console.log(member);

          return (
            <>
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
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default AdminDashboard;
