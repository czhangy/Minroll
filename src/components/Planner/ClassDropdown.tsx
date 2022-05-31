// Stylesheet
import styles from "@/styles/Planner/ClassDropdown.module.scss";
// Next
import Image from "next/image";
import { SyntheticEvent } from "react";
// React
import { useState } from "react";

type Props = {
    onSelect: (newClass: string) => void;
    error: boolean | string;
};

const ClassDropdown = ({ onSelect, error }: Props) => {
    // Dropdown state
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const openDropdown = (e: SyntheticEvent) => {
        (e.target as HTMLButtonElement).focus();
        setDropdownOpen(true);
    };
    const closeDropdown = () => {
        setTimeout(() => {
            setDropdownOpen(false);
        }, 50);
    };

    // Class state
    const [curClass, setCurClass] = useState<string | null>(null);
    const selectClass = (newClass: string) => {
        // Set dropdown and close
        setCurClass(newClass);
        document.getElementById(styles["class-dropdown"])?.blur();
        // Pass new class to Planner
        onSelect(newClass);
    };

    // Name formatting => remove hyphens and capitalize words
    const formatClassName = (name: string) => {
        const words = name.replace(/-/g, " ").split(" ");
        return words
            .map((word) => {
                return word[0].toUpperCase() + word.substring(1);
            })
            .join(" ");
    };

    // All classes
    const classSlugs = [
        "barbarian",
        "crusader",
        "demon-hunter",
        "monk",
        "necromancer",
        "witch-doctor",
        "wizard",
    ];

    return (
        <button
            id={styles["class-dropdown"]}
            onClick={openDropdown}
            onBlur={closeDropdown}
        >
            {curClass ? (
                <div id={styles["dropdown-class"]}>
                    <Image
                        src={`/icons/${curClass}.webp`}
                        alt=""
                        height={25}
                        width={30}
                    />
                    <p id={styles["dropdown-text"]}>
                        {formatClassName(curClass)}
                    </p>
                </div>
            ) : (
                <p id={styles["dropdown-text"]}>Select a class...</p>
            )}
            <div
                id={styles["dropdown-icon"]}
                className={dropdownOpen ? styles.rotated : ""}
            >
                <Image
                    src="/icons/chevron-down.svg"
                    alt=""
                    height={20}
                    width={20}
                />
            </div>
            <ul
                id={styles["dropdown-options"]}
                className={dropdownOpen ? styles.show : ""}
            >
                {classSlugs.map((className) => {
                    return (
                        <li
                            className={styles["dropdown-option"]}
                            onClick={() => selectClass(className)}
                        >
                            <Image
                                src={`/icons/${className}.webp`}
                                alt=""
                                height={30}
                                width={30}
                            />
                            <p className={styles["option-text"]}>
                                {formatClassName(className)}
                            </p>
                        </li>
                    );
                })}
            </ul>
        </button>
    );
};

export default ClassDropdown;
