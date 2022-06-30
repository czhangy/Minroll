// Stylesheet
import styles from "@/styles/Tiers/Tier.module.scss";
// TS
import Build from "@/models/Build";
// Next
import Link from "next/link";
import Image from "next/image";

type Props = {
    tier: string;
    builds: Build[];
    filter: string;
};

const Tier: React.FC<Props> = ({ tier, builds, filter }: Props) => {
    // Get halves of list
    const splitList = (leftList: boolean) => {
        const mid = Math.ceil(builds.length / 2);
        return leftList
            ? builds.slice(0, mid)
            : builds.slice(mid, builds.length);
    };

    return (
        <div className={styles.tier}>
            <h4 className={styles["tier-name"]}>
                {tier} <p className={styles["mobile-text"]}>TIER</p>
            </h4>
            <div className={styles["build-lists"]}>
                <div className={styles["build-list-container"]}>
                    <ul className={styles["build-list"]}>
                        {splitList(true).map((build: Build, i: number) => {
                            return (
                                <li
                                    className={`${styles.build} ${
                                        build.class.includes(filter)
                                            ? ""
                                            : styles.disabled
                                    }`}
                                    key={i}
                                >
                                    <div className={styles["build-class-icon"]}>
                                        <Image
                                            src={`/icons/${build.class}.webp`}
                                            alt={build.class}
                                            layout="fill"
                                            objectFit="contain"
                                        />
                                    </div>
                                    <Link href={`/builds/${build.id}`}>
                                        <a className={styles["build-name"]}>
                                            {build.name}
                                        </a>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                {builds.length > 1 ? (
                    <div className={styles["build-list-container"]}>
                        <ul className={styles["build-list"]}>
                            {splitList(false).map((build: Build, i: number) => {
                                return (
                                    <li
                                        className={`${styles.build} ${
                                            build.class.includes(filter)
                                                ? ""
                                                : styles.disabled
                                        }`}
                                        key={i}
                                    >
                                        <div
                                            className={
                                                styles["build-class-icon"]
                                            }
                                        >
                                            <Image
                                                src={`/icons/${build.class}.webp`}
                                                alt={build.class}
                                                layout="fill"
                                                objectFit="contain"
                                            />
                                        </div>
                                        <Link href={`/builds/${build.id}`}>
                                            <a className={styles["build-name"]}>
                                                {build.name}
                                            </a>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default Tier;
