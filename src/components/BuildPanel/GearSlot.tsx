// Stylesheet
import styles from "@/styles/BuildPanel/Gear.module.scss";
// TS
import Gear from "@/models/Gear";
// Next
import Image from "next/image";

type Props = {
    type: string;
    gear: Gear | null;
};

const GearSlot: React.FC<Props> = ({ type, gear }: Props) => {
    return (
        <div
            id={styles[type]}
            className={`${styles["gear-slot"]} ${
                gear ? styles[gear.rarity] : ""
            }`}
        >
            {gear ? (
                <div className={styles["image-container"]}>
                    <Image
                        src={gear.src}
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

export default GearSlot;
