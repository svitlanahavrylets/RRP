import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./ContactPage.module.css";

const position = [50.1976, 14.9073]; // Координати (широта, довгота)

// Кастомна іконка маркера
const customIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const ContactPage = () => {
  useEffect(() => {
    // Перевіряємо, чи карта вже створена, щоб уникнути дублювання
    if (!document.getElementById("map").hasChildNodes()) {
      const map = L.map("map").setView(position, 15);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker(position, { icon: customIcon })
        .addTo(map)
        .bindPopup("RRP s.r.o. - č.p. 181, Písková Lhota")
        .openPopup();
    }
  }, []);

  return (
    <div className={styles.contact}>
      <div className="container">
        <address className={styles.info}>
          <h3 className={styles.addressTitle}>
            Kontaktní a fakturační adresa:
          </h3>
          <p>RRP s.r.o.</p>
          <p className={styles.address}>č.p. 181, 294 31 Písková Lhota</p>

          <p className={styles.tel}>
            tel.: <a href="tel:+420604698135">+420 604 698 135</a>
          </p>
          <p className={styles.email}>
            e-mail: <a href="mailto:Inforrp@seznam.cz">Inforrp@seznam.cz</a>
          </p>
          <p>IČ: 22634274</p>
          <p className={styles.dic}>DIČ: CZ22634274</p>
        </address>

        <p className={styles.contactText}>
          Společnost RRP s.r.o. se sídlem č.p. 181, 294 31 Písková Lhota zapsaná
          v obchodním rejstříku vedeném Městským soudem v Praze.
        </p>

        {/* Контейнер для карти */}
        <div id="map" className={styles.mapContainer}></div>
      </div>
    </div>
  );
};

export default ContactPage;
