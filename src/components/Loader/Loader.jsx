import { PropagateLoader } from "react-spinners";
import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={css.loaderOverlay}>
      <PropagateLoader
        color="var(--primary-color-gold)"
        size={16}
        speedMultiplier={1.33}
      />
    </div>
  );
}
