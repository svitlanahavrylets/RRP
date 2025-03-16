import styles from "./OurTeamPage.module.css";
import { teamMembers } from "../../data/teamMembers.js";
import { socialIcons } from "../../data/socialIcons.jsx";

const OurTeamPage = () => {
  return (
    <section className={styles.teamSection}>
      <div className="container">
        <h2 className={styles.teamTitle}>Náš tým</h2>
        <ul className={styles.teamCard}>
          {teamMembers.map((member) => (
            <li key={member.name} className={styles.teamCardItem}>
              <img
                srcSet={`${member.img} 1x, ${member.img2x} 2x`}
                src={member.img}
                alt={`${member.name} avatar`}
                width="264"
                height="260"
                className={styles.teamCardImg}
              />
              <div className={styles.teamCardContainer}>
                <h3 className={styles.teamListFullname}>{member.name}</h3>
                <p className={styles.teamCardText}>{member.role}</p>
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
