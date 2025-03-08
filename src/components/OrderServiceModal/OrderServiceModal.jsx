import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AiOutlineUser, AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import styles from "./OrderServiceModal.module.css";

const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegexp = /^\+?\d{10,15}$/;

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  phone: Yup.string()
    .matches(phoneRegexp, "Invalid phone number")
    .required("Required"),
  email: Yup.string()
    .matches(emailRegexp, "Invalid email address")
    .required("Required"),
  comment: Yup.string(),
});

const OrderServiceModal = ({ onClose }) => {
  const initialValues = {
    name: "",
    phone: "",
    email: "",
    comment: "",
    accepted: false,
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log("Form submitted:", values);
    resetForm();
  };

  return (
    <Modal
      title="Zanechte své kontakty a my vám zavoláme zpět"
      classNameModal={styles.modal}
      onClose={onClose}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid, dirty }) => (
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
                name="comment"
                className={styles.textarea}
                placeholder="Text input"
              />
              <ErrorMessage
                name="comment"
                component="div"
                className={styles.error}
              />
            </label>

            <Button
              type="submit"
              disabled={!isValid || !dirty}
              className={styles.btnModal}
            >
              Odeslat
            </Button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default OrderServiceModal;
