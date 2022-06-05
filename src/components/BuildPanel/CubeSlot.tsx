// Stylesheet
import styles from "@/styles/BuildPanel/Cube.module.scss";
// TS
import Gear from "@/models/Gear";
// Next
import Image from "next/image";

type Props = {
    gear: Gear | null;
};

const CubeSlot: React.FC<Props> = ({ gear }: Props) => {
    return (
        <div
            className={`${styles["cube-slot"]} ${
                gear ? styles["legendary"] : ""
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

export default CubeSlot;
