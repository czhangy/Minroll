// Stylesheet
import styles from "@/styles/BuildPanel/Passives.module.scss";
// TS
import Skill from "@/models/Skill";
// Next
import Image from "next/image";
// Local component
import SkillPanel from "@/components/BuildPanel/SkillPanel";
// React
import { useState } from "react";

type Props = {
    passive: Skill | null;
};

const PassiveSlot: React.FC<Props> = ({ passive }: Props) => {
    // Hover state
    const [hover, setHover] = useState<boolean>(false);

    return (
        <div
            className={styles["passive-slot"]}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {passive ? (
                <div className={styles["image-container"]}>
                    <Image
                        src={`http://media.blizzard.com/d3/icons/skills/64/${passive.icon}.png`}
                        alt=""
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
            ) : (
                ""
            )}
            <SkillPanel skill={passive} show={hover} passive={true} />
        </div>
    );
};

export default PassiveSlot;
