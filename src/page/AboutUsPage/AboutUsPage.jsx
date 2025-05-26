import { useEffect, useState } from "react";
import { fetchAboutData } from "../../api/content/about";
import styles from "./AboutUsPage.module.css";
import Loader from "../../components/Loader/Loader.jsx";

const AboutUsPage = () => {
  const [about, setAbout] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAboutData();
        setAbout(data);
      } catch (error) {
        const errorMessage =
          error?.message || "Něco se pokazilo. Zkuste to prosím znovu později.";

        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <section className={styles.aboutSection}>
      <div className="container">
        <h2 className={styles.aboutTitle}>O nás</h2>

        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className={styles.imgAndTextWrapper}>
              {about?.image && (
                <img
                  src={about.image}
                  alt="Zakladatel"
                  className={styles.image}
                />
              )}
            </div>
            <p className={styles.text}>{about?.text}</p>
            {about?.youtubeUrl && (
              <div className={styles.videoWrapper}>
                <iframe
                  width="100%"
                  height="315"
                  src={about.youtubeUrl.replace("watch?v=", "embed/")}
                  title="Úvodní video"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
                {error && <p className={styles.errorMessage}>{error}</p>}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default AboutUsPage;
