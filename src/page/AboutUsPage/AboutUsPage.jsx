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
        const res = await fetchAboutData();
        console.log(res.data);

        const aboutObj = res.data;
        const fixedText = aboutObj.text.replace(/<p>&nbsp;<\/p>/g, "<p></p>");
        setAbout({ ...aboutObj, text: fixedText });
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
              {about?.imageUrl && (
                <img
                  src={about.imageUrl}
                  alt="Zakladatel"
                  className={styles.image}
                />
              )}
            </div>
            <div
              className={styles.text}
              dangerouslySetInnerHTML={{ __html: about?.text }}
            />
            {about?.youtubeLink && (
              <div className={styles.videoWrapper}>
                <iframe
                  width="100%"
                  height="315"
                  // 1) Вирізаємо ID відео
                  src={`https://www.youtube-nocookie.com/embed/${
                    // підтримуємо як формати watch?v=, так і вже embed/
                    about.youtubeLink.includes("watch?v=")
                      ? about.youtubeLink.split("watch?v=")[1]
                      : about.youtubeLink.split("/embed/")[1]
                  }`}
                  title="Úvodní video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
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
