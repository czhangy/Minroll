// Stylesheet
import styles from "@/styles/BuildPanel/Passives.module.scss";
// Local components

const Passives = () => {
    return (
        <div id={styles.passives}>
            <button className={styles["passive-button"]} />
            <button className={styles["passive-button"]} />
            <button className={styles["passive-button"]} />
            <button className={styles["passive-button"]} />
        </div>
    );
};

export default Passives;
