// Stylesheet
import styles from "@/styles/BuildPanel/Passives.module.scss";
// TS
import Skill from "@/models/Skill";
// Next
import Image from "next/image";

type Props = {
    passive: Skill | null;
};

const PassiveSlot: React.FC<Props> = ({ passive }: Props) => {
    return (
        <div className={styles["passive-slot"]}>
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
        </div>
    );
};

export default PassiveSlot;
