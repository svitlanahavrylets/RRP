import styles from "./OurTeamPage.module.css";
import { useEffect, useState } from "react";
import { fetchTeamData } from "../../api/content/team.js";
import TeamCardItem from "../../components/TeamCardItem/TeamCardItem.jsx";
import Loader from "../../components/Loader/Loader.jsx";

const OurTeamPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTeamData = async () => {
      const data = await fetchTeamData();

      if (data) {
        // Переконуємося, що нові працівники додаються в кінець

        const sortedData = data.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        setTeamMembers(sortedData || []);
      }
      setIsLoading(false);
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
                  {/* <img
                    src={jednatel.photoUrl}
                    alt={`${jednatel.name} avatar`}
                    width="264"
                    height="260"
                    className={styles.teamCardImg}
                  />
                  <div className={styles.teamCardContainer}>
                    <h3 className={styles.teamListFullname}>{jednatel.name}</h3>
                    <p className={styles.teamCardText}>{jednatel.position}</p>
                    {jednatel.socialLinks && (
                      <ul className={styles.teamIconList}>
                        {socialIcons
                          .filter(({ id }) => jednatel.socialLinks?.[id])
                          .map(({ icon, id }) => (
                            <li key={id} className={styles.teamIconItem}>
                              <a
                                href={jednatel.socialLinks[id]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialLink}
                              >
                                {icon}
                              </a>
                            </li>
                          ))}
                      </ul>
                    )}
                  </div> */}
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
      </div>
    </section>
  );
};

export default OurTeamPage;
