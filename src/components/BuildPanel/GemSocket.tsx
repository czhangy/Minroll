// Stylesheet
import styles from "@/styles/BuildPanel/GemSocket.module.scss";
// TS
import Gem from "@/models/Gem";
// Next
import Image from "next/image";

type Props = {
    gem: Gem | null | undefined;
};

const GemSocket: React.FC<Props> = ({ gem }: Props) => {
    return (
        <div className={styles["gem-socket"]}>
            {gem ? (
                <div className={styles["image-container"]}>
                    <Image
                        src={gem.src}
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
export default GemSocket;
