// Stylesheet
import styles from "@/styles/BuildPanel/GearPanel.module.scss";
// TS
import Gear from "@/models/Gear";
import Set from "@/models/Set";
import Gem from "@/models/Gem";
// React
import { useState, useEffect } from "react";
// Axios
import axios from "axios";
// Next
import Image from "next/image";

type Props = {
    gear: Gear | null;
    gem: Gem | null | undefined;
    show: boolean;
    inverted: boolean;
    cube?: boolean;
};

const GearPanel: React.FC<Props> = ({
    gear,
    gem,
    inverted,
    show,
    cube,
}: Props) => {
    // Gearset state
    const [set, setSet] = useState<Set | null>(null);

    // Refetch set on change
    useEffect(() => {
        // Only refetch on set items in gear
        if (!cube && gear?.setId)
            axios
                .get("/api/set", { params: { setId: gear.setId } })
                .then((response) => setSet(response.data))
                .catch((err) => console.log(err));
    }, [gear]);

    // Format slug => remove hyphens
    const formatSlug = (slug: string) => {
        return slug.replace(/-/g, " ");
    };

    return (
        <div
            className={`${styles["gear-panel"]} ${
                show && gear ? "" : styles.hidden
            } ${inverted ? styles.inverted : ""}`}
        >
            {gear ? (
                <div
                    className={`${styles["gear-panel-container"]} ${
                        gear.rarity === "legendary"
                            ? styles.legendary
                            : styles.set
                    }`}
                >
                    <div className={styles["gear-header"]}>
                        <div className={styles["gear-icon"]}>
                            <Image
                                src={gear.src}
                                alt=""
                                layout="fill"
                                objectFit="contain"
                            />
                        </div>
                        <div className={styles["gear-content"]}>
                            <h6 className={styles["gear-name"]}>{gear.name}</h6>
                            <p className={styles["gear-type"]}>
                                {gear.rarity} {formatSlug(gear.category)}
                            </p>
                        </div>
                    </div>

                    <hr
                        className={`${styles.separator} ${
                            gear.rarity === "legendary"
                                ? styles.legendary
                                : styles.set
                        }`}
                    />
                    {gear.effect ? (
                        <p className={styles["gear-effect"]}>{gear.effect}</p>
                    ) : (
                        ""
                    )}
                    {set ? (
                        <div className={styles["gear-set"]}>
                            <p className={styles["set-name"]}>{set.name}</p>
                            {set.twoPc.length > 0 ? (
                                <div className={styles["set-bonus"]}>
                                    <p className={styles["bonus-num"]}>
                                        2 Piece Bonus:
                                    </p>
                                    <ul className={styles["bonus-list"]}>
                                        {set.twoPc.map(
                                            (bonus: string, i: number) => (
                                                <li
                                                    className={styles.bonus}
                                                    key={i}
                                                >
                                                    {bonus}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            ) : (
                                ""
                            )}
                            {set.threePc.length > 0 ? (
                                <div className={styles["set-bonus"]}>
                                    <p className={styles["bonus-num"]}>
                                        3 Piece Bonus:
                                    </p>
                                    <ul className={styles["bonus-list"]}>
                                        {set.threePc.map(
                                            (bonus: string, i: number) => (
                                                <li
                                                    className={styles.bonus}
                                                    key={i}
                                                >
                                                    {bonus}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            ) : (
                                ""
                            )}
                            {set.fourPc.length > 0 ? (
                                <div className={styles["set-bonus"]}>
                                    <p className={styles["bonus-num"]}>
                                        4 Piece Bonus:
                                    </p>
                                    <ul className={styles["bonus-list"]}>
                                        {set.fourPc.map(
                                            (bonus: string, i: number) => (
                                                <li
                                                    className={styles.bonus}
                                                    key={i}
                                                >
                                                    {bonus}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            ) : (
                                ""
                            )}
                            {set.sixPc.length > 0 ? (
                                <div className={styles["set-bonus"]}>
                                    <p className={styles["bonus-num"]}>
                                        6 Piece Bonus:
                                    </p>
                                    <ul className={styles["bonus-list"]}>
                                        {set.sixPc.map(
                                            (bonus: string, i: number) => (
                                                <li
                                                    className={styles.bonus}
                                                    key={i}
                                                >
                                                    {bonus}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                    ) : (
                        ""
                    )}
                    {gem ? (
                        <div className={styles["gear-gem"]}>
                            <hr
                                className={`${styles.separator} ${
                                    gear.rarity === "legendary"
                                        ? styles.legendary
                                        : styles.set
                                }`}
                            />
                            <div className={styles["gem-header"]}>
                                <div className={styles["gem-icon"]}>
                                    <Image
                                        src={gem.src}
                                        alt=""
                                        layout="fill"
                                        objectFit="contain"
                                    />
                                </div>
                                <p className={styles["gem-name"]}>{gem.name}</p>
                            </div>
                            <ul className={styles["gem-effects"]}>
                                {gem.effect.map((effect: string, i: number) => {
                                    return (
                                        <li
                                            className={styles["gem-effect"]}
                                            key={i}
                                        >
                                            {effect}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ) : (
                        ""
                    )}
                    <hr
                        className={`${styles.separator} ${
                            gear.rarity === "legendary"
                                ? styles.legendary
                                : styles.set
                        }`}
                    />
                    <em className={styles["gear-description"]}>
                        {gear.description}
                    </em>
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default GearPanel;
