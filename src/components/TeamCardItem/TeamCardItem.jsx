import { socialIcons } from "../../data/socialIcons.jsx";
import styles from "./TeamCardItem.module.css";

const TeamCardItem = ({ member }) => {
  return (
    <>
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
              .filter(({ id }) => member.socialLinks?.[id])
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
    </>
  );
};

export default TeamCardItem;
