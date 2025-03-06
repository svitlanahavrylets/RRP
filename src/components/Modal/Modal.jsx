import clsx from "clsx";
import { VscClose } from "react-icons/vsc";
import styles from "./Modal.module.css";
import { useEffect } from "react";

const Modal = ({
  children,
  title,
  text,
  onClose,
  classNameModal,
  actionBtns,
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackDropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  return (
    <div onClick={handleBackDropClick} className={styles.backdrop}>
      <div className={clsx(styles.modal, classNameModal)}>
        <div className={styles.modalHeader}>
          <h3 className={styles.title}>{title}</h3>
          <button
            aria-label="Close modal button"
            className={styles.closeModalBtn}
            onClick={onClose}
          >
            <VscClose className={styles.closeIcon} />
          </button>
        </div>

        {text && <p className={styles.text}>{text}</p>}

        {children}

        {actionBtns && <div className={styles.actionBtns}>{actionBtns}</div>}
      </div>
    </div>
  );
};

export default Modal;
