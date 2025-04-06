import clsx from "clsx";
import styles from "./PrivacyPolicyPage.module.css";

const PrivacyPolicyPage = () => {
  return (
    <div className={clsx("container", styles.pageContainer)}>
      <h1 className={styles.pageTitle}>Zásady ochrany osobních údajů</h1>

      <p className={styles.pageText}>
        <span className={styles.strongText}>1. Správce osobních údajů</span>
        Správcem osobních údajů je RRP s.r.o. se sídlem na adrese Písková Lhota
        181, Písková Lhota, 29431, IČO: 226 34 274, DIČ: CZ 226 34 274 (dále jen
        „Správce“).
      </p>

      <p className={styles.pageText}>
        <span className={styles.strongText}>2. Kontaktní údaje</span>
        Správce lze kontaktovat na e-mailové adrese:{" "}
        <a className={styles.pageLink} href="mailto:info@rrp-it.cz">
          info@rrp-it.cz
        </a>{" "}
        nebo na telefonním čísle:{" "}
        <a className={styles.pageLink} href="tel:+420604698135">
          +420 604 698 135
        </a>
        .{" "}
      </p>

      <p className={styles.pageText}>
        <span className={styles.strongText}>
          3. Rozsah zpracovávaných osobních údajů
        </span>
      </p>
      <ul className={styles.pageList}>
        <li>Jméno a příjmení</li>
        <li>Telefonní číslo</li>
        <li>E-mailová adresa</li>
      </ul>

      <p className={styles.pageText}>
        <span className={styles.strongText}>
          4. Účel zpracování osobních údajů
        </span>
      </p>
      <ul className={styles.pageList}>
        <li>
          Zpracování a vyřízení poptávky zaslané prostřednictvím poptávkového
          formuláře.
        </li>
        <li>Komunikace se zákazníkem ohledně jeho poptávky.</li>
      </ul>

      <p className={styles.pageText}>
        <span className={styles.strongText}>5. Právní základ zpracování</span>
        Právním základem pro zpracování osobních údajů je souhlas zákazníka,
        který uděluje odesláním poptávkového formuláře.
      </p>

      <p className={styles.pageText}>
        <span className={styles.strongText}>
          6. Doba uchovávání osobních údajů
        </span>
        Osobní údaje budou uchovávány po dobu nezbytnou pro vyřízení poptávky a
        následnou komunikaci, nejdéle však po dobu 5 let od odeslání poptávky,
        pokud zákazník svůj souhlas neodvolá dříve.
      </p>

      <p className={styles.pageText}>
        <span className={styles.strongText}>
          7. Způsob zpracování osobních údajů
        </span>
        Osobní údaje jsou zpracovávány elektronicky, a to automatizovaně i
        manuálně.
      </p>

      <p className={styles.pageText}>
        <span className={styles.strongText}>8. Zabezpečení osobních údajů</span>
        Správce přijal technická a organizační opatření k zabezpečení osobních
        údajů, aby nedošlo k neoprávněnému přístupu, ztrátě nebo zničení.
      </p>

      <p className={styles.pageText}>
        <span className={styles.strongText}>9. Předávání osobních údajů</span>
        Osobní údaje mohou být předány zpracovatelům, kteří pro Správce
        zajišťují technickou podporu, hosting nebo jiné služby nezbytné pro
        provoz webových stránek a zpracování poptávek. S těmito zpracovateli má
        Správce uzavřeny smlouvy o zpracování osobních údajů, které zajišťují
        jejich ochranu.
      </p>

      <p className={styles.pageText}>
        <span className={styles.strongText}>10. Práva zákazníka</span>
      </p>
      <ul className={styles.pageList}>
        <li>Odvolat svůj souhlas se zpracováním osobních údajů.</li>
        <li>Požadovat přístup ke svým osobním údajům.</li>
        <li>Požadovat opravu nebo výmaz svých osobních údajů.</li>
        <li>Požadovat omezení zpracování svých osobních údajů.</li>
        <li>Vznést námitku proti zpracování svých osobních údajů.</li>
        <li>Podat stížnost u Úřadu pro ochranu osobních údajů.</li>
      </ul>

      <p className={styles.pageText}>
        <span className={styles.strongText}>11. Odvolání souhlasu</span>
        Souhlas se zpracováním osobních údajů může zákazník kdykoliv odvolat, a
        to zasláním e-mailu na adresu:{" "}
        <a className={styles.pageLink} href="mailto:info@rrp-it.cz">
          info@rrp-it.cz
        </a>{" "}
        nebo telefonicky na čísle:{" "}
        <a className={styles.pageLink} href="tel:+420604698135">
          +420 604 698 135
        </a>
        .{" "}
      </p>

      <p className={styles.pageText}>
        <span className={styles.strongText}>
          12. Změny zásad ochrany osobních údajů
        </span>
        Správce si vyhrazuje právo tyto zásady ochrany osobních údajů měnit.
        Aktuální verze bude vždy dostupná na webových stránkách.
      </p>
    </div>
  );
};

export default PrivacyPolicyPage;
