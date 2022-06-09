// Stylesheet
import styles from "@/styles/BuildPanel/Gear.module.scss";
// TS
import Gear from "@/models/Gear";
// Next
import Image from "next/image";
// Local component
import GemSocket from "@/components/BuildPanel/GemSocket";

type Props = {
    type: string;
    gear: Gear | null;
};

const GearSlot: React.FC<Props> = ({ type, gear }: Props) => {
    const sockets: String[] = ["left-finger", "right-finger", "neck"];
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
            {sockets.includes(type) ? <GemSocket gem={null} /> : ""}
        </div>
    );
};

export default GearSlot;
