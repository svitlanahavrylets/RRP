import styles from "./OurTeamPage.module.css";
// import { teamMembers } from "../../data/teamMembers.js";
import { socialIcons } from "../../data/socialIcons.jsx";
import { useEffect, useState } from "react";
import { fetchTeamData } from "../../api/content/team.js";

const OurTeamPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);

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

        {/* Відображаємо jednatel окремо */}
        {jednatel && (
          <div className={styles.jednatelWrapper}>
            <div className={styles.teamCardItem}>
              <img
                src={jednatel.photoUrl}
                alt={`${jednatel.firstName} avatar`}
                width="264"
                height="260"
                className={styles.teamCardImg}
              />
              <div className={styles.teamCardContainer}>
                <h3 className={styles.teamListFullname}>
                  {jednatel.firstName}
                </h3>
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
              </div>
            </div>
          </div>
        )}

        <ul className={styles.teamCard}>
          {teamMembers.map((member) => (
            <li key={member._id} className={styles.teamCardItem}>
              <img
                src={member.photoUrl}
                alt={`${member.firstName} avatar`}
                width="264"
                height="260"
                className={styles.teamCardImg}
              />
              <div className={styles.teamCardContainer}>
                <h3 className={styles.teamListFullname}>{member.firstName}</h3>
                <p className={styles.teamCardText}>{member.position}</p>
                {member.socialLinks && (
                  <ul className={styles.teamIconList}>
                    {socialIcons
                      .filter(({ id }) => member.socialLinks?.[id]) // Фільтруємо тільки ті, для яких є посилання
                      .map(({ icon, id }) => (
                        <li key={id} className={styles.teamIconItem}>
                          <a
                            href={member.socialLinks[id]}
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
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default OurTeamPage;
