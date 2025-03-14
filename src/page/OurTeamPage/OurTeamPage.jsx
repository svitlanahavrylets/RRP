import styles from "./OurTeamPage.module.css";
import { teamMembers } from "../../data/teamMembers.js";
// import { socialIcons } from "../../data/socialIcons.js";
import { TfiLinkedin } from "react-icons/tfi";

const OurTeamPage = () => {
  const socialIcons = [
    {
      icon: <TfiLinkedin />,
      id: "linkedin",
    },
  ];
  return (
    <section className={styles.teamSection}>
      <div className="container">
        <h2 className={styles.teamTitle}>Náš tým</h2>
        <ul className={styles.teamCard}>
          {teamMembers.map((members) => (
            <li key={members.name} className={styles.teamCardItem}>
              <img
                srcSet={`${members.img} 1x, ${members.img2x} 2x`}
                src={members.img}
                alt={`${members.name} avatar`}
                width="264"
                height="260"
              />
              <div className={styles.teamCardContainer}>
                <h3 className={styles.teamListFullname}>{members.name}</h3>
                <p className={styles.teamCardText}>{members.role}</p>
                <ul className={styles.teamIconList}>
                  {socialIcons.map(({ icon, id }) => (
                    <li key={id} className={styles.teamIconItem}>
                      <a
                        href={members.socialLinks?.[id] || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                      >
                        {icon}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default OurTeamPage;
