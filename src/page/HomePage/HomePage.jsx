import { useState } from "react";
import styles from "./HomePage.module.css";
import Button from "../../components/Button/Button.jsx";
import Modal from "../../components/Modal/Modal.jsx";

// import clsx from "clsx";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <section className={styles.heroImage}>
        <h1 className={styles.heroTitle}>
          Efektivní řešení pro vaše podnikání
        </h1>
        <Button className={styles.button} onClick={handleOpenModal}>
          Objednat službu
        </Button>
      </section>
      <section className={styles.heroDesContainer}>
        <p className={styles.heroText}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis,
          minima. Laudantium sint mollitia, rem, qui ea pariatur et placeat
          veniam tempora, officiis beatae atque distinctio quas alias culpa
          deserunt asperiores.
        </p>
      </section>

      {isModalOpen && (
        <Modal
          title="Zanechte své kontaktní údaje a my vám zavoláme zpět"
          text="Введіть свої дані, щоб замовити послугу"
          classNameModal={styles.modal}
          onClose={handleCloseModal}
        >
          <p>Leave your contacts and we will call you back</p>
          <form name="contact-form">
            <div>
              <label>Name</label>
              <div>
                <input
                  type="text"
                  id="user-name"
                  name="user-name"
                  pattern="[a-zA-Za-яА-ЯіІїЇєЄґҐ']+"
                  title="Svitlana"
                  required
                />
                <svg width="18" height="24" aria-label="person-icon">
                  <use href="./images/icons.svg#icon-person-icon"></use>
                </svg>
              </div>
            </div>
            <div>
              <label>Phone</label>
              <div>
                <input
                  type="tel"
                  id="user-phone"
                  name="user-phone"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}"
                  title="xxx-xxx-xx-xx"
                  required
                />
                <svg width="18" height="24" aria-label="phone-icon">
                  <use href="./images/icons.svg#icon-phone-icon"></use>
                </svg>
              </div>
            </div>
            <div>
              <label>Email</label>
              <div>
                <input
                  type="email"
                  id="user-email"
                  name="user-email"
                  pattern="[a-zA-Za-яА-ЯіІїЇєЄґҐ']+"
                  title="svitlana.havrylets@gmail.com"
                  required
                />
                <svg width="18" height="24" aria-label="email-icon">
                  <use href="./images/icons.svg#icon-email-icon"></use>
                </svg>
              </div>
            </div>
            <div>
              <label>Comment</label>
              <textarea
                name="user-comment"
                id="user-comment"
                placeholder="Text input"
                required
              ></textarea>
            </div>
            <div>
              <input
                id="user-privacy"
                name="user-privacy"
                type="checkbox"
                value="true"
                required
              />
              <label>
                <span>
                  <svg width="10" height="8" aria-label="checkbox-icon">
                    <use href="./images/icons.svg#icon-vector-icon"></use>
                  </svg>
                </span>
                I accept the terms and conditions of the
                <a href="">Privacy Policy</a>
              </label>
            </div>
            <button>Send</button>
          </form>
        </Modal>
      )}
    </>
  );
};
export default HomePage;
