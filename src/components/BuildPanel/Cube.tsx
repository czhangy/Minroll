// Stylesheet
import styles from "@/styles/BuildPanel/Cube.module.scss";

const Skills = () => {
    return (
        <div id={styles.cube}>
            <button className={styles["cube-button"]} />
            <button className={styles["cube-button"]} />
            <button className={styles["cube-button"]} />
        </div>
    );
};

export default Skills;
