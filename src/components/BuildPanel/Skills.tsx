// Stylesheet
import styles from "@/styles/BuildPanel/Skills.module.scss";

const Skills: React.FC = () => {
    return (
        <div id={styles.skills}>
            <button className={styles["skill-button"]} />
            <button className={styles["skill-button"]} />
            <button className={styles["skill-button"]} />
            <button className={styles["skill-button"]} />
            <button className={styles["skill-button"]} />
            <button className={styles["skill-button"]} />
        </div>
    );
};

export default Skills;
