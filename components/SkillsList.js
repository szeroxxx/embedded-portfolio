import Image from "next/image";
import styles from "../styles/skills.module.css";

export default function SkillsList({ groups }) {
  return (
    <div className={styles.directory}>
      {groups.map(({ title, image, items }) => (
        <article className={styles.row} key={title}>
          <div className={styles.subject}>
            <Image className={styles.photo} src={image} alt="" width={256} height={192}
              sizes="(max-width: 700px) 76px, 112px" />
            <h3>{title}</h3>
          </div>
          <ul className={styles.skills}>
            {items.map(item => <li key={item}>{item}</li>)}
          </ul>
        </article>
      ))}
    </div>
  );
}
