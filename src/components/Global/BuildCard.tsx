// Stylesheet
import styles from "@/styles/Global/BuildCard.module.scss";
// TS
import Build from "@/models/Build";
// Next
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
        <div className={`${styles["build-card"]} ${styles[build.class]}`}>
            <Link href={`/builds/${build.id}`}>
                <a className={styles["build-link"]}>
                    <h5 className={styles["build-name"]}>{build.name}</h5>
                    <em className={styles["build-class"]}>
                        {formatClassName(build.class)} Build
                    </em>
                </a>
            </Link>
            <button
                className={`${styles["build-icon"]} ${styles["edit-icon"]}`}
            >
                <Image
                    src="/icons/edit.svg"
                    alt="Edit"
                    layout="fill"
                    objectFit="cover"
                />
            </button>
            <button
                className={`${styles["build-icon"]} ${styles["delete-icon"]}`}
            >
                <Image
                    src="/icons/delete.svg"
                    alt="Delete"
                    layout="fill"
                    objectFit="cover"
                />
            </button>
        </div>
    );
};

export default BuildCard;
