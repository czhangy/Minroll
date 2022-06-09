// Stylesheet
import styles from "@/styles/Planner/SkillsPage.module.scss";
// Local component
import SkillDropdown from "@/components/Planner/SkillDropdown";
import RuneDropdown from "@/components/Planner/RuneDropdown";
// TS
import Skill from "@/models/Skill";
import Rune from "@/models/Rune";

type Props = {
    skillList: Skill[];
    runeLists: Rune[][];
    savedSkills: Array<Skill | null>;
    onSkillSelect: (ind: number, skill: Skill) => void;
    onRuneSelect: (ind: number, rune: Rune) => void;
};

const SkillsPage: React.FC<Props> = (props: Props) => {
    return (
        <div id={styles["skills-page"]}>
            <div className={styles["skills-container"]}>
                <h3 className={styles["skills-header"]}>Skills Selection</h3>
                {props.runeLists.map((runeList: Rune[], i: number) => {
                    return (
                        <div className={styles.skill} key={i}>
                            <div className={styles["skill-dropdown"]}>
                                <SkillDropdown
                                    skillList={props.skillList}
                                    placeholder="Select a skill..."
                                    onSelect={(skill: Skill) =>
                                        props.onSkillSelect(i, skill)
                                    }
                                    savedSkill={props.savedSkills[i]?.slug}
                                />
                            </div>
                            <div className={styles["rune-dropdown"]}>
                                <RuneDropdown
                                    runeList={runeList}
                                    placeholder="Select a rune..."
                                    onSelect={(rune: Rune) =>
                                        props.onRuneSelect(i, rune)
                                    }
                                    savedRune={props.savedSkills[i]?.rune}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className={styles["skills-container"]}>
                <h3 className={styles["skills-header"]}>Passives Selection</h3>
            </div>
        </div>
    );
};

export default SkillsPage;
