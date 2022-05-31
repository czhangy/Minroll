// Stylesheet
import styles from "@/styles/BuildPanel/Cube.module.scss";

const Cube: React.FC = () => {
    return (
        <div id={styles.cube}>
            <button className={styles["cube-button"]} />
            <button className={styles["cube-button"]} />
            <button className={styles["cube-button"]} />
        </div>
    );
};

export default Cube;
