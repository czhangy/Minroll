// Stylesheet
import styles from "@/styles/Planner/SkillsPage.module.scss";
// Local component
import SkillDropdown from "@/components/Planner/SkillDropdown";
import RuneDropdown from "@/components/Planner/RuneDropdown";
// TS
import Skill from "@/models/Skill";
import Rune from "@/models/Rune";
// React
import { useState } from "react";

type Props = {
    skillList: Skill[];
    savedSkills: Array<Skill | null>;
    onSkillSelect: (ind: number, skill: Skill) => void;
    onRuneSelect: (ind: number, rune: Rune) => void;
};

const SkillsPage: React.FC<Props> = (props: Props) => {
    // Rune state for selected skills
    const [runeLists, setRuneLists] = useState<Array<Rune[]>>([
        [],
        [],
        [],
        [],
        [],
        [],
    ]);

    return (
        <div id={styles["skills-page"]}>
            <div className={styles["skills-container"]}>
                <h3 className={styles["skills-header"]}>Skills Selection</h3>
                <div className={styles["skill-dropdown"]}>
                    <SkillDropdown
                        skillList={props.skillList}
                        placeholder="Select a skill..."
                        onSelect={(skill: Skill) =>
                            props.onSkillSelect(0, skill)
                        }
                        savedSkill={props.savedSkills[0]?.slug}
                    />
                </div>
                <div className={styles["rune-dropdown"]}>
                    <RuneDropdown
                        runeList={runeLists[0]}
                        placeholder="Select a rune..."
                        onSelect={(rune: Rune) => props.onRuneSelect(0, rune)}
                        savedRune={props.savedSkills[0]?.rune}
                    />
                </div>
            </div>
            <div className={styles["skills-container"]}>
                <h3 className={styles["skills-header"]}>Passives Selection</h3>
            </div>
        </div>
    );
};

export default SkillsPage;
