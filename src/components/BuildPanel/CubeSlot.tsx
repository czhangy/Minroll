// Stylesheet
import styles from "@/styles/BuildPanel/Cube.module.scss";
// TS
import Gear from "@/models/Gear";
// Next
import Image from "next/image";
// Local component
import GearPanel from "@/components/BuildPanel/GearPanel";
// React
import { useState } from "react";

type Props = {
    gear: Gear | null;
};

const CubeSlot: React.FC<Props> = ({ gear }: Props) => {
    // Hover state
    const [hover, setHover] = useState<boolean>(false);

    return (
        <div
            className={`${styles["cube-slot"]} ${
                gear ? styles["legendary"] : ""
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
            <GearPanel gear={gear} show={hover} inverted={true} cube={true} />
        </div>
    );
};

export default CubeSlot;
