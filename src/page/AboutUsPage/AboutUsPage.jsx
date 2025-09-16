import { useEffect, useState } from "react";
import { fetchAboutData } from "../../api/content/about";
import styles from "./AboutUsPage.module.css";
import Loader from "../../components/Loader/Loader.jsx";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const AboutUsPage = () => {
  const [about, setAbout] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchAboutData();

        const aboutObj = res.data;
        const fixedText = aboutObj.text.replace(/<p>&nbsp;<\/p>/g, "<p></p>");
        setAbout({ ...aboutObj, text: fixedText });
      } catch (err) {
        const errorMessage =
          err?.message || "Něco se pokazilo. Zkuste to prosím znovu později.";

        setError(errorMessage);

        iziToast.error({
          title: "Chyba",
          message: errorMessage,
          error,
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <section className={styles.aboutSection}>
      <div className="container">
        <h1 className={styles.aboutTitle}>O nás</h1>

        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className={styles.imgAndTextWrapper}>
              <div className={styles.img}>
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
            </div>
            {about?.youtubeLink && (
              <div className={styles.video}>
                <iframe
                  width="100%"
                  height="315"
                  src={`https://www.youtube-nocookie.com/embed/${
                    about.youtubeLink.includes("watch?v=")
                      ? about.youtubeLink.split("watch?v=")[1]
                      : about.youtubeLink.split("/embed/")[1]
                  }`}
                  title="Úvodní video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default AboutUsPage;
