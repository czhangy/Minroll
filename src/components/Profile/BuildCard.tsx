// Stylesheet
import styles from "@/styles/Profile/BuildCard.module.scss";
// TS
import Build from "@/models/Build";
// Link
import Link from "next/link";
import Image from "next/image";

type Props = {
    build: Build;
};

const BuildCard: React.FC<Props> = ({ build }: Props) => {
    // Capitalize words and remove spaces from class name
    const formatClassName = (name: string) => {
        const words = name.replace(/-/g, " ").split(" ");
        return words
            .map((word) => word[0].toUpperCase() + word.substring(1))
            .join(" ");
    };

    return (
        <Link href={`/builds/${build.id}`}>
            <a className={styles["build-card"]}>
                <div className={styles["build-icon"]}>
                    <Image
                        src={`/icons/${build.class}.webp`}
                        alt={build.class}
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
                <div className={styles["build-info"]}>
                    <h5 className={styles["build-name"]}>{build.name}</h5>
                    <em className={styles["build-class"]}>
                        {formatClassName(build.class)} Build
                    </em>
                </div>
            </a>
        </Link>
    );
};

export default BuildCard;
