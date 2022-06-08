// Stylesheet
import styles from "@/styles/BuildPanel/Skills.module.scss";
// TS
import Skill from "@/models/Skill";
// Local component
import SkillSlot from "@/components/BuildPanel/SkillSlot";

type Props = {
    skills: Array<Skill | null>;
};

const Skills: React.FC<Props> = ({ skills }: Props) => {
    return (
        <div id={styles.skills}>
            {skills.map((skill) => (
                <SkillSlot skill={skill} />
            ))}
        </div>
    );
};

export default Skills;
