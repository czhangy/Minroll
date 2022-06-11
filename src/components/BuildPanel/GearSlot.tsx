// Stylesheet
import styles from "@/styles/BuildPanel/Gear.module.scss";
// TS
import Gear from "@/models/Gear";
import Gem from "@/models/Gem";
// Next
import Image from "next/image";
// Local components
import GemSocket from "@/components/BuildPanel/GemSocket";
import GearPanel from "@/components/BuildPanel/GearPanel";
// React
import { useState } from "react";

type Props = {
    type: string;
    gear: Gear | null;
    gem?: Gem | null;
};

const GearSlot: React.FC<Props> = ({ type, gear, gem }: Props) => {
    // Hover state
    const [hover, setHover] = useState<boolean>(false);

    // Define slot attributes
    const sockets: String[] = ["left-finger", "right-finger", "neck"];
    const inverted: String[] = [
        "left-finger",
        "right-finger",
        "legs",
        "feet",
        "main-hand",
        "off-hand",
    ];

    return (
        <div
            id={styles[type]}
            className={`${styles["gear-slot"]} ${
                gear ? styles[gear.rarity] : ""
            }`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
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
            {sockets.includes(type) ? <GemSocket gem={gem} /> : ""}
            <GearPanel
                gear={gear}
                show={hover}
                inverted={inverted.includes(type)}
            />
        </div>
    );
};

export default GearSlot;
