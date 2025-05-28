import { useEffect, useState } from "react";
import styles from "./CookieConsentBanner.module.css";
import { loadGoogleAnalytics } from "../../utils/loadGoogleAnalytics.js";

const CookieConsentBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    } else {
      // Pokud už byl souhlas udělen, načíst GA
      loadGoogleAnalytics();
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "true");
    loadGoogleAnalytics();
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className={styles.banner}>
      <p className={styles.text}>
        Používáme cookies pro zlepšení fungování webu.{" "}
        <a href="/privacy-policy" className={styles.link}>
          Více informací
        </a>
      </p>
      <button onClick={handleAccept} className={styles.button}>
        Souhlasím
      </button>
    </div>
  );
};

export default CookieConsentBanner;
