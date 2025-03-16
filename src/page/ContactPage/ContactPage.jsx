import styles from "./ContactPage.module.css";

const ContactPage = () => {
  return (
    <div className={styles.contact}>
      <div className="container">
        {/* <h2 className={styles.contactTitle}>Kontakt</h2> */}
        <address className={styles.info}>
          <h3 className={styles.addressTitle}>
            Kontaktní a fakturační adresa:
          </h3>
          <p>RRP s.r.o.</p>
          <p className={styles.address}>č.p. 181, 294 31 Písková Lhota</p>

          <p className={styles.tel}>
            tel.:
            <a href="tel:+420000000000">+420 000 000 000</a>
          </p>
          <p className={styles.email}>
            e-mail:
            <a href="mailto:Inforrp@seznam.cz">Inforrp@seznam.cz</a>
          </p>
          <p className={styles.ic}>IČ: 22634274</p>
        </address>

        <p>
          Společnost RRP s.r.o. se sídlem č.p. 181, 294 31 Písková Lhota zapsaná
          v obchodním rejstříku vedeném Městským soudem v Praze.
        </p>
      </div>
    </div>
  );
};

export default ContactPage;
