// Stylesheet
import styles from "@/styles/Planner/SkillsPage.module.scss";
// Local component
import SkillDropdown from "@/components/Planner/SkillDropdown";
// TS
import Skill from "@/models/Skill";

type Props = {
    skillList: Skill[];
    savedSkills: Array<Skill | null>;
    onSkillSelect: (ind: number, skill: Skill) => void;
};

const SkillsPage: React.FC<Props> = (props: Props) => {
    return (
        <div id={styles["skills-page"]}>
            <div className={styles["skills-container"]}>
                <h3 className={styles["skills-header"]}>Skills Selection</h3>
                <div className={styles["gear-dropdown"]}>
                    <SkillDropdown
                        skillList={props.skillList}
                        placeholder="Select a skill..."
                        onSelect={(skill) => props.onSkillSelect(0, skill)}
                        savedSkill={props.savedSkills[0]?.slug}
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
