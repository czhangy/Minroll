// Stylesheet
import styles from "@/styles/Planner/ClassDropdown.module.scss";
// Next
import Image from "next/image";
// React
import { useState } from "react";
// Local components
import Dropdown from "@/components/Planner/Dropdown";
// TS
import { SyntheticEvent } from "react";

type Props = {
    onSelect: (newClass: string) => void;
};

const ClassDropdown = ({ onSelect }: Props) => {
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
        if (document.activeElement !== document.body)
            (document.activeElement as HTMLElement).blur();
        // Pass new class to Planner
        onSelect(newClass);
    };

    // Name formatting => remove hyphens and capitalize words
    const formatClassName: (name: string | null) => string | null = (
        name: string | null
    ) => {
        if (!name) return null;
        const words = name.replace(/-/g, " ").split(" ");
        return words
            .map((word) => {
                return word[0].toUpperCase() + word.substring(1);
            })
            .join(" ");
    };

    // All classes
    const classNames = [
        "barbarian",
        "crusader",
        "demon-hunter",
        "monk",
        "necromancer",
        "witch-doctor",
        "wizard",
    ];

    return (
        <Dropdown
            open={dropdownOpen}
            value={formatClassName(curClass)}
            src={`/icons/${curClass}.webp`}
            onOpen={openDropdown}
            onClose={closeDropdown}
        >
            <ul
                id={styles["class-options"]}
                className={dropdownOpen ? styles.show : ""}
            >
                {classNames.map((className, i) => {
                    return (
                        <li
                            className={styles["class-option"]}
                            key={i}
                            onClick={() => selectClass(className)}
                        >
                            <Image
                                src={`/icons/${className}.webp`}
                                alt=""
                                height={30}
                                width={30}
                            />
                            <p className={styles["class-text"]}>
                                {formatClassName(className)}
                            </p>
                        </li>
                    );
                })}
            </ul>
        </Dropdown>
    );
};

export default ClassDropdown;
