// Stylesheet
import styles from "@/styles/Planner/Dropdown.module.scss";
// React
import { useState, useEffect } from "react";
// TS
import { SyntheticEvent } from "react";
// Next
import Image from "next/image";
// Local component
import ResetModal from "@/components/Planner/ResetModal";

type Props = {
    content: string[];
    savedValue?: string | null;
    onSelect: (value: string) => void;
    onReset?: () => void;
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
        setTimeout(() => setOpen(false), 120);
    };

    // Dropdown selected value state
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const selectValue: (value: string) => void = (value: string) => {
        // Set dropdown value
        setSelectedValue(value as string);
        // Pass to parent
        props.onSelect(value);
    };
    // Get saved value
    useEffect(() => {
        if (props.savedValue) selectValue(props.savedValue);
    }, [props.savedValue]);

    // Reset build
    const [resetModalOpen, setResetModalOpen] = useState<boolean>(false);
    const resetBuild = () => {
        setResetModalOpen(false);
        setSelectedValue(null);
        (props.onReset as () => void)();
    };

    // Name formatting => remove hyphens and capitalize words
    const formatValue: (value: string) => string = (value: string) => {
        const words = value.replace(/-/g, " ").split(" ");
        return words
            .map((word) => word[0].toUpperCase() + word.substring(1))
            .join(" ");
    };

    return (
        <>
            {props.onReset ? (
                <ResetModal
                    open={resetModalOpen}
                    onConfirm={resetBuild}
                    onClose={() => setResetModalOpen(false)}
                />
            ) : (
                ""
            )}
            <div className={styles.dropdown}>
                {props.onReset && selectedValue ? (
                    <div className={styles["dropdown-button"]}>
                        <div className={styles["dropdown-selection"]}>
                            <Image
                                src={`/icons/${selectedValue}.webp`}
                                alt=""
                                height={25}
                                width={30}
                            />
                            <p className={styles["dropdown-text"]}>
                                {formatValue(selectedValue)}
                            </p>
                        </div>
                        <button
                            className={styles["reset-button"]}
                            onClick={() => setResetModalOpen(true)}
                        >
                            <Image
                                src={
                                    props.isLoading
                                        ? "/icons/loading.gif"
                                        : "/icons/reset.svg"
                                }
                                alt=""
                                layout="fill"
                                objectFit="contain"
                            />
                        </button>
                    </div>
                ) : (
                    <button
                        className={styles["dropdown-button"]}
                        onClick={openDropdown}
                        onBlur={closeDropdown}
                        disabled={props.isLoading}
                    >
                        {selectedValue ? (
                            <div className={styles["dropdown-selection"]}>
                                <p className={styles["dropdown-text"]}>
                                    {formatValue(selectedValue)}
                                </p>
                            </div>
                        ) : (
                            <p
                                className={`${styles["dropdown-text"]} ${styles.placeholder}`}
                            >
                                {props.placeholder}
                            </p>
                        )}
                        <div
                            className={`${styles["dropdown-icon"]} ${
                                open ? styles.rotated : ""
                            }`}
                        >
                            <Image
                                src="/icons/chevron-down.svg"
                                alt=""
                                layout="fill"
                                objectFit="contain"
                            />
                        </div>
                    </button>
                )}
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
        </>
    );
};

export default Dropdown;
