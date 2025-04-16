import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AiOutlineUser, AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import styles from "./OrderServiceModal.module.css";
import { submitOrderData } from "../../api/user/userApi.js";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import FormAutoSave from "../FormAutoSave.jsx";

const nameRegex = /^[A-Za-zА-Яа-яЁёІіЇїЄєČčĎďĚěŇňŘřŠšŤťŮůŽžÁáÉéÍíÓóÚúÝý' -]+$/;
const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegexp = /^\+?\d{10,15}$/;

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, "Jméno musí mít alespoň 2 znaky")
    .max(32, "Jméno může mít maximálně 32 znaků")
    .matches(/\S/, "Jméno nemůže obsahovat pouze mezery")
    .matches(nameRegex, "Neplatné jméno")
    .required("Povinné pole"),
  phone: Yup.string()
    .matches(phoneRegexp, "Neplatné telefonní číslo")
    .required("Povinné pole"),
  email: Yup.string()
    .matches(emailRegexp, "Neplatná e-mailová adresa")
    .required("Povinné pole"),
  message: Yup.string().trim(),
});

const STORAGE_KEY = "orderServiceFormData";

const loadFromStorage = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : null;
};

const clearStorage = () => {
  localStorage.removeItem(STORAGE_KEY);
};

const OrderServiceModal = ({ onClose }) => {
  const savedValues = loadFromStorage();

  const initialValues = savedValues || {
    name: "",
    phone: "",
    email: "",
    message: "",
  };

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
      document.activeElement?.blur();
    setSubmitting(true);

    try {
      const response = await submitOrderData(values);

      if (response?.status === 200 || response?.status === 201) {
        iziToast.success({
          title: "Úspěch",
          message: "Objednávka byla úspěšně odeslána!",
          position: "topRight",
        });
        resetForm({
          values: {
            name: "",
            phone: "",
            email: "",
            message: "",
          },
        });
        clearStorage();
      } else {
        iziToast.error({
          title: "Chyba",
          message: response?.data?.message || "Něco se pokazilo",
          position: "topRight",
        });
      }
    } catch (error) {
      iziToast.error({
        title: "Chyba",
        message:
          error.response?.data?.message ||
          "Nepodařilo se odeslat objednávku. Zkuste to znovu.",
        position: "topRight",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      title="Zanechte své kontakty a my vám zavoláme zpět"
      classNameModal={styles.modal}
      onClose={onClose}
    >
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid, isSubmitting }) => (
          <>
            <FormAutoSave />
            <Form>
              <label className={styles.label}>
                Jméno
                <div className={styles.inputWrapper}>
                  <AiOutlineUser className={styles.icon} size={20} />
                  <Field type="text" name="name" className={styles.input} />
                </div>
                <ErrorMessage
                  name="name"
                  component="div"
                  className={styles.error}
                />
              </label>

              <label className={styles.label}>
                Telefon
                <div className={styles.inputWrapper}>
                  <AiOutlinePhone className={styles.icon} size={20} />
                  <Field type="tel" name="phone" className={styles.input} />
                </div>
                <ErrorMessage
                  name="phone"
                  component="div"
                  className={styles.error}
                />
              </label>

              <label className={styles.label}>
                Email
                <div className={styles.inputWrapper}>
                  <AiOutlineMail className={styles.icon} size={20} />
                  <Field type="email" name="email" className={styles.input} />
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className={styles.error}
                />
              </label>

              <label className={styles.label}>
                Komentář
                <Field
                  as="textarea"
                  name="message"
                  className={styles.textarea}
                  placeholder="Text input"
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className={styles.error}
                />
              </label>

              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                className={styles.btnModal}
              >
                {isSubmitting ? "Odesílání..." : "Odeslat"}
              </Button>
            </Form>
          </>
        )}
      </Formik>
    </Modal>
  );
};

export default OrderServiceModal;
