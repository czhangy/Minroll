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
    // Component state
    const [open, setOpen] = useState<boolean>(false);
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const [resetModalOpen, setResetModalOpen] = useState<boolean>(false);

    // Dropdown state modifiers => called on dropdown click
    const openDropdown = (e: SyntheticEvent) => {
        (e.target as HTMLButtonElement).focus();
        setOpen(true);
    };
    const closeDropdown = () => {
        setTimeout(() => setOpen(false), 120);
    };

    // Dropdown value state modifiers => called on dropdown option select
    const selectValue: (value: string) => void = (value: string) => {
        // Set dropdown value
        setSelectedValue(value as string);
        // Pass to parent
        props.onSelect(value);
    };

    // Reset build => called on reset modal confirm
    const resetBuild = () => {
        // Reset component state
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

    // Get current value of dropdown from build
    useEffect(() => {
        if (props.savedValue) selectValue(props.savedValue);
    }, [props.savedValue]);

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
                        {props.isLoading ? (
                            <div id={styles["loading-icon"]}>
                                <Image
                                    src="/icons/loading.gif"
                                    alt=""
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </div>
                        ) : (
                            <button
                                id={styles["reset-button"]}
                                onClick={() => setResetModalOpen(true)}
                            >
                                <Image
                                    src="/icons/reset.svg"
                                    alt=""
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </button>
                        )}
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
                                src="/icons/chevron.svg"
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
