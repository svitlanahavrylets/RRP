import styles from "./ContactPage.module.css";

const ContactPage = () => {
  return (
    <section className={styles.contactSection}>
      <h2 className={styles.title}>Kontakt</h2>
      <div className={styles.infoWrapper}>
        <div className={styles.info}>
          <p>
            <strong>Obchodní firma:</strong> RRP s.r.o.
          </p>
          <p>
            <strong>Identifikační číslo:</strong> 22634274
          </p>
          <p>
            <strong>Sídlo:</strong> č.p. 181, 294 31 Písková Lhota
          </p>
          <p>
            <strong>Telefon:</strong>{" "}
            <a href="tel:+420604698135">604 698 135</a>
          </p>
        </div>
        <div className={styles.mapWrapper}>
          <iframe
            className={styles.map}
            title="Google Map"
            src="https://www.google.com/maps/embed/v1/place?key=TVIY_API_KEY&q=%C4%8Dp.+181,+294+31+P%C3%ADskov%C3%A1+Lhota"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
