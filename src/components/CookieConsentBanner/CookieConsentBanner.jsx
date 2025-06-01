// import { useEffect, useState } from "react";
// import styles from "./CookieConsentBanner.module.css";
// import { loadGoogleAnalytics } from "../../utils/loadGoogleAnalytics.js";

// const CookieConsentBanner = () => {
//   const [showBanner, setShowBanner] = useState(false);

//   useEffect(() => {
//     const consent = localStorage.getItem("cookie-consent");
//     if (!consent) {
//       setShowBanner(true);
//     } else {

//       loadGoogleAnalytics();
//     }
//   }, []);

//   const handleAccept = () => {
//     localStorage.setItem("cookie-consent", "true");
//     loadGoogleAnalytics();
//     setShowBanner(false);
//   };

//   if (!showBanner) return null;

//   return (
//     <div className={styles.banner}>
//       <p className={styles.text}>
//         Používáme Cookies, abychom vylepšili Váš zážitek z prohlížení webu.{" "}
//         <a href="/privacy-policy" className={styles.link}>
//           Více informací
//         </a>
//       </p>
//       <button onClick={handleAccept} className={styles.button}>
//         Souhlasím
//       </button>
//     </div>
//   );
// };

// export default CookieConsentBanner;

import { useEffect } from "react";
import { loadGoogleAnalytics } from "../../utils/loadGoogleAnalytics.js";

const CookieBanner = () => {
  useEffect(() => {
    if (window.$) {
      const options = {
        box_umisteni: "right:0;bottom:0;",
        box_sirka: "350px ",
        box_odsazeni: "10px ",
        box_odsazeni_obsah: "20px ",
        box_lhz: "4px ",
        box_phz: "4px ",
        box_psz: "4px ",
        box_lsz: "4px ",
        box_stin_hor: "0px ",
        box_stin_ver: "1px ",
        box_stin_roz: "13px ",
        box_stin_barva: "rgba(0,0,0,0.33)",
        pozadi_obrazek: "",
        pozadi_pruhlednost: "100",
        pozadi_umisteni: "",
        pozadi_velikost: "",
        pozadi_opakovani: "",
        pozadi_barva: "rgba(104,111,115,0.63)",
        zavrit_text: "Х",
        zavrit_color: "rgb(0,0,0)",
        zavrit_size: "16px ",
        zavrit_pozadi: "rgba(237,237,237,1)",
        zavrit_padding: "6px ",
        zavrit_zaobleni: "4px ",
        zavrit_marginleft: "338px ",
        zavrit_marginright: "0px ",
        zavrit_margintop: "-10px ",
        zavrit_marginbottom: "0px ",
        title: "Používáme Cookies",
        title_color: "rgb(0,0,0)",
        title_size: "27px ",
        popis:
          "Používáme Cookies, abychom vylepšili Váš zážitek z prohlížení webu.",
        popis_color: "rgb(255,255,255)",
        popis_size: "16px ",
        odkaz_text: "Více ...",
        odkaz_url: "https://www.cookie-lista.cz/co-je-cookies.html",
        odkaz_color: "rgb(214,182,90)",
        odkaz_color_hover: "rgb(26,54,91)",
        odkaz_size: "14px ",
        session_nadpis: "Vyberte, které soubory cookie chcete přijmout",
        session_nadpis_velikost: "12px ",
        session_nadpis_barva: "rgb(214,182,90)",
        session_text_barva: "rgb(255,255,255)",
        session_pozadi_barva: "rgba(0,0,0,0.58)",
        session_margin: "0px ",
        session_padding: "10px ",
        session_maxheight: "40vh ",
        tlacitko_1_text: "Povolit cookies",
        tlacitko_1_padding: "5px ",
        tlacitko_1_margin: "0px ",
        tlacitko_1_text_barva: "rgb(255,255,255)",
        tlacitko_1_pozadi: "rgb(214,182,90)",
        tlacitko_1_text_velikost: "14px ",
        tlacitko_1_text_barva_hover: "rgb(0,0,0)",
        tlacitko_1_pozadi_hover: "rgb(216,176,54)",
        tlacitko_1_radius: "4px ",
        tlacitko_2_text: "Vybrat cookies",
        tlacitko_2_padding: "5px ",
        tlacitko_2_margin: "15px ",
        tlacitko_2_text_barva: "rgb(255,255,255)",
        tlacitko_2_pozadi: "rgb(26,54,91)",
        tlacitko_2_text_velikost: "15px ",
        tlacitko_2_text_barva_hover: "rgb(148,148,148)",
        tlacitko_2_pozadi_hover: "rgb(26,54,91)",
        tlacitko_2_radius: "4px ",
        odkaz_1_nazev: "Zásady ochrany osobních údajů",
        odkaz_1_url: "https://rrp-it.cz/privacy-policy",
        odkaz_2_nazev: "",
        odkaz_2_url: "",
        odkaz_barva: "rgb(255,255,255)",
        odkaz_barva_hover: "rgb(0,0,0)",
        odkaz_mezera: "25px ",
        odkaz_velikost: "12px ",
        odkaz_target: "_blank",
        expirace: "365",
        zmena: "ano",
        tvurce: "ano",
        undefined: "",
        delay: 0,
        expires: "365",
        uncheckBoxes: true,
      };

      window.$(document).ready(function () {
        try {
          window.$("body").ihavecookies(options);

          // Аналітика та маркетинг
          const preferences = window.$.fn.ihavecookies.preference;
          if (preferences("analytics")) {
            loadGoogleAnalytics();
          }
          if (preferences("marketing")) {
            // TODO: додати сюди завантаження маркетингових скриптів
          }
          if (preferences("preferences")) {
            // TODO: додати завантаження додаткових скриптів
          }

          // кнопка для перезапуску банера (опційно)
          window.$("#ihavecookiesBtn").on("click", function () {
            window.$("#malybox").remove();
            window.$("body").ihavecookies(options, "reinit");
          });
        } catch (error) {
          console.error("Помилка ініціалізації банера cookies:", error);
        }
      });
    }
  }, []);

  return null; // бо банер малюється через jQuery, а не React
};

export default CookieBanner;
