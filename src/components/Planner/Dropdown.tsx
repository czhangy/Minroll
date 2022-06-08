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
    isLoading?: boolean;
};

const Dropdown: React.FC<Props> = (props: Props) => {
    // Dropdown control
    const [open, setOpen] = useState<boolean>(false);
    const openDropdown = (e: SyntheticEvent) => {
        (e.target as HTMLButtonElement).focus();
        setOpen(true);
    };
    const closeDropdown = () => {
        setTimeout(() => {
            setOpen(false);
        }, 120);
    };

    // Dropdown selected value state
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const selectValue = (value: string) => {
        // Set dropdown value
        setSelectedValue(value as string);
        // Pass to parent
        props.onSelect(value);
    };

    // Name formatting => remove hyphens and capitalize words
    const formatValue: (value: string) => string = (value: string) => {
        const words = value.replace(/-/g, " ").split(" ");
        return words
            .map((word) => {
                return word[0].toUpperCase() + word.substring(1);
            })
            .join(" ");
    };

    return (
        <div className={styles.dropdown}>
            <button
                className={styles["dropdown-button"]}
                onClick={openDropdown}
                onBlur={closeDropdown}
                disabled={props.isLoading}
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
                    <p className={styles["dropdown-text"]}>
                        {props.placeholder}
                    </p>
                )}
                <div
                    className={`${styles["dropdown-icon"]} ${
                        open ? styles.rotated : ""
                    }`}
                >
                    <Image
                        src={
                            props.isLoading
                                ? "/icons/loading.gif"
                                : "/icons/chevron-down.svg"
                        }
                        alt=""
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
            </button>

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
                                <div className={styles["option-image"]}>
                                    <Image
                                        src={`/icons/${value}.webp`}
                                        alt=""
                                        layout="fill"
                                        objectFit="contain"
                                    />
                                </div>
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
        </div>
    );
};

export default Dropdown;
