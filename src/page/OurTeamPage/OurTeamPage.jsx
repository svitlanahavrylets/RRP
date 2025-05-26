import styles from "./OurTeamPage.module.css";
import { useEffect, useState } from "react";
import { fetchTeamData } from "../../api/content/team.js";
import TeamCardItem from "../../components/TeamCardItem/TeamCardItem.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const OurTeamPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTeamData = async () => {
      try {
        const data = await fetchTeamData();

        if (data) {
          const sortedData = data.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          );
          setTeamMembers(sortedData || []);
        }
      } catch (err) {
        const errorMessage =
          err?.message || "Něco se pokazilo. Zkuste to prosím znovu později.";

        setError(errorMessage);

        iziToast.error({
          title: "Chyba",
          message: errorMessage,
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadTeamData();
  }, []);

  const jednatel = teamMembers.find((member) => member.position === "Jednatel");
  const employees = teamMembers.filter(
    (member) => member.position !== "Jednatel"
  );

  return (
    <section className={styles.teamSection}>
      <div className="container">
        <h2 className={styles.teamTitle}>Náš tým</h2>

        {isLoading ? (
          <Loader />
        ) : (
          <>
            {/* Відображаємо jednatel окремо */}
            {jednatel && (
              <div className={styles.jednatelWrapper}>
                <div className={styles.teamCardItem}>
                  <TeamCardItem member={jednatel} />
                </div>
              </div>
            )}

            {/* Відображаємо всіх інших працівників в рядок */}

            {employees.length > 0 && (
              <ul className={styles.teamCard}>
                {employees.map((member) => (
                  <li key={member._id} className={styles.teamCardItem}>
                    <TeamCardItem member={member} />
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
    </section>
  );
};

export default OurTeamPage;
