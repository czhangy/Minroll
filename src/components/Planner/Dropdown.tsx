// Stylesheet
import styles from "@/styles/Planner/Dropdown.module.scss";
// React
import { useState } from "react";
// TS
import { SyntheticEvent } from "react";
// Next
import Image from "next/image";

type Props = {
    content: string[];
    onSelect: (value: string) => void;
    hasIcon: boolean;
    placeholder: string;
};

const Dropdown: React.FC<Props> = (props: Props) => {
    // Dropdown state
    const [open, setOpen] = useState<boolean>(false);
    const openDropdown = (e: SyntheticEvent) => {
        (e.target as HTMLButtonElement).focus();
        setOpen(true);
    };
    const closeDropdown = () => {
        setTimeout(() => {
            setOpen(false);
        }, 50);
    };

    // Value state
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const selectValue = (value: string) => {
        // Set dropdown and close
        setSelectedValue(value);
        if (document.activeElement !== document.body)
            (document.activeElement as HTMLElement).blur();
        // Pass to parent
        props.onSelect(value);
    };

    // Name formatting => remove hyphens and capitalize words
    const formatValue: (value: string | null) => string | null = (
        value: string | null
    ) => {
        if (!value) return null;
        const words = value.replace(/-/g, " ").split(" ");
        return words
            .map((word) => {
                return word[0].toUpperCase() + word.substring(1);
            })
            .join(" ");
    };

    return (
        <button
            className={styles.dropdown}
            onClick={openDropdown}
            onBlur={closeDropdown}
        >
            {selectedValue ? (
                <div className={styles["dropdown-selection"]}>
                    {props.hasIcon ? (
                        <Image
                            src={`/icons/${selectedValue}.webp`}
                            alt=""
                            height={25}
                            width={30}
                        />
                    ) : (
                        ""
                    )}
                    <p className={styles["dropdown-text"]}>
                        {formatValue(selectedValue)}
                    </p>
                </div>
            ) : (
                <p className={styles["dropdown-text"]}>{props.placeholder}</p>
            )}
            <div
                className={`${styles["dropdown-icon"]} ${
                    open ? styles.rotated : ""
                }`}
            >
                <Image
                    src="/icons/chevron-down.svg"
                    alt=""
                    height={20}
                    width={20}
                />
            </div>
            <ul
                className={`${styles["dropdown-options"]} ${
                    open ? styles.show : ""
                }`}
            >
                {props.content.map((value, i) => {
                    return (
                        <li
                            className={styles["dropdown-option"]}
                            key={i}
                            onClick={() => selectValue(value)}
                        >
                            {props.hasIcon ? (
                                <Image
                                    src={`/icons/${value}.webp`}
                                    alt=""
                                    height={30}
                                    width={30}
                                />
                            ) : (
                                ""
                            )}
                            <p className={styles["option-text"]}>
                                {formatValue(value)}
                            </p>
                        </li>
                    );
                })}
            </ul>
        </button>
    );
};

export default Dropdown;
