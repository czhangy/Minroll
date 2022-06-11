// Stylesheet
import styles from "@/styles/BuildPanel/SkillPanel.module.scss";
// TS
import Skill from "@/models/Skill";

type Props = {
    skill: Skill | null;
    show: boolean;
    passive?: boolean;
};

const SkillPanel: React.FC<Props> = ({ skill, show, passive }: Props) => {
    return (
        <div
            className={`${styles["skill-panel"]} ${
                show && skill ? "" : styles.hidden
            }`}
        >
            {skill ? (
                <div className={styles["skill-panel-container"]}>
                    <h6 className={styles["skill-name"]}>{skill.name}</h6>
                    <hr className={styles.separator} />
                    <p className={styles["skill-description"]}>
                        {skill.description}
                    </p>
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default SkillPanel;
