// Stylesheet
import styles from "@/styles/BuildPanel/SkillPanel.module.scss";
// TS
import Skill from "@/models/Skill";
// Next
import Image from "next/image";

type Props = {
    skill: Skill | null;
    show: boolean;
    passive?: boolean;
};

const SkillPanel: React.FC<Props> = ({ skill, show, passive }: Props) => {
    // Line break workaround
    const parseDescription = () => (skill as Skill).description.split("\n");

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
                    {parseDescription().map((content: string) => {
                        return content === "" ? (
                            <br />
                        ) : (
                            <p className={styles["skill-description"]}>
                                {content}
                            </p>
                        );
                    })}
                    {skill.rune ? (
                        <div className={styles["skill-rune"]}>
                            <hr className={styles.separator} />
                            <div className={styles["rune-info"]}>
                                <div className={styles["rune-icon"]}>
                                    <Image
                                        src={`/icons/rune-${skill.rune.type}.webp`}
                                        alt=""
                                        layout="fill"
                                        objectFit="contain"
                                    />
                                </div>
                                <div className={styles["rune-content"]}>
                                    <p className={styles["rune-name"]}>
                                        {skill.rune.name}
                                    </p>
                                    <p className={styles["rune-description"]}>
                                        {skill.rune.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default SkillPanel;
