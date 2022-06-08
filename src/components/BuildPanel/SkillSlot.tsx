// Stylesheet
import styles from "@/styles/BuildPanel/Skills.module.scss";
// TS
import Skill from "@/models/Skill";
// Next
import Image from "next/image";

type Props = {
    skill: Skill | null;
};

const SkillSlot: React.FC<Props> = ({ skill }: Props) => {
    return (
        <div className={styles["skill-slot"]}>
            {skill ? (
                <div className={styles["image-container"]}>
                    <Image
                        src={`http://media.blizzard.com/d3/icons/skills/64/${skill.icon}.png`}
                        alt=""
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default SkillSlot;
