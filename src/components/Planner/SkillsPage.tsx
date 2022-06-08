// Stylesheet
import styles from "@/styles/Planner/SkillsPage.module.scss";
// Local component
import SkillDropdown from "@/components/Planner/SkillDropdown";
// TS
import Skill from "@/models/Skill";

type Props = {
    skills: Skill[];
    onSkillSelect: (ind: number, skill: Skill) => void;
};

const SkillsPage: React.FC<Props> = ({ skills, onSkillSelect }: Props) => {
    const t = () => {};

    return (
        <div id={styles["skills-page"]}>
            <div className={styles["skills-container"]}>
                <h3 className={styles["skills-header"]}>Skills Selection</h3>
                <div className={styles["gear-dropdown"]}>
                    <SkillDropdown
                        skills={skills}
                        placeholder="Select a skill..."
                        onSelect={(skill) => onSkillSelect(0, skill)}
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
