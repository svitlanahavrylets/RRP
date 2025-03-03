import { PropagateLoader } from "react-spinners";
import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={css.loaderOverlay}>
      <PropagateLoader
        color="var(--primary-color-gold)" // Відповідає strokeColor
        size={16} // Аналог strokeWidth
        speedMultiplier={1.33} // Аналог animationDuration (стандарт = 0.75s, множник = 1.33)
      />
    </div>
  );
}
