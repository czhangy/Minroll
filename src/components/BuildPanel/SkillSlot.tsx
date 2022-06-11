// Stylesheet
import styles from "@/styles/BuildPanel/Skills.module.scss";
// TS
import Skill from "@/models/Skill";
// Next
import Image from "next/image";
// Local component
import SkillPanel from "@/components/BuildPanel/SkillPanel";
// React
import { useState } from "react";

type Props = {
    skill: Skill | null;
};

const SkillSlot: React.FC<Props> = ({ skill }: Props) => {
    // Hover state
    const [hover, setHover] = useState<boolean>(false);

    return (
        <div
            className={styles["skill-slot"]}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
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
            <SkillPanel skill={skill} show={hover} />
        </div>
    );
};

export default SkillSlot;
