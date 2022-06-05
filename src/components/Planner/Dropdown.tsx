// Stylesheet
import styles from "@/styles/Planner/Dropdown.module.scss";
// React
import { useState, useEffect } from "react";
// TS
import { SyntheticEvent } from "react";
import Gear from "@/models/Gear";
// Next
import Image from "next/image";

type Props = {
    content: string[] | Gear[];
    onSelect: (slot: any) => void;
    hasIcon: boolean;
    placeholder: string;
    value?: string | null;
    isSearchable: boolean;
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
    const selectValue = (value: string | Gear) => {
        // Set dropdown value
        if (props.isSearchable) setSearchedValue((value as Gear).name);
        else setSelectedValue(value as string);
        // Pass to parent
        props.onSelect(value);
    };

    // Input field display state
    const [searchedValue, setSearchedValue] = useState<string>("");
    const updateValue = (e: SyntheticEvent) =>
        setSearchedValue((e.target as HTMLInputElement).value);

    // Filter content by search
    const [filteredContent, setFilteredContent] = useState<Gear[]>([]);
    useEffect(() => {
        if (props.isSearchable)
            setFilteredContent(
                (props.content as Gear[]).filter((item: Gear) =>
                    item.name
                        .toLowerCase()
                        .includes(searchedValue.toLowerCase())
                )
            );
    }, [props.content, searchedValue]);

    // Clear/revert input on class/slot change
    useEffect(() => {
        if (props.isSearchable)
            setSearchedValue(props.value ? props.value : "");
    }, [props.content]);

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

    // Generate list options
    const getDropdownOptions = () => {
        // Handle Gear
        if (props.isSearchable) {
            return filteredContent.map((value, i) => {
                return (
                    <li
                        className={styles["dropdown-option"]}
                        key={i}
                        onClick={() => selectValue(value)}
                    >
                        {props.hasIcon ? (
                            <div className={styles["option-image"]}>
                                <Image
                                    src={value.src}
                                    alt=""
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </div>
                        ) : (
                            ""
                        )}
                        <p className={styles["option-text"]}>{value.name}</p>
                    </li>
                );
            });
            // Handle strings
        } else
            return (props.content as string[]).map((value, i) => {
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
            });
    };

    return (
        <div className={styles.dropdown}>
            {props.isSearchable ? (
                <input
                    className={styles["dropdown-input"]}
                    placeholder={props.placeholder}
                    disabled={props.content.length === 0}
                    spellCheck={false}
                    value={searchedValue}
                    onChange={updateValue}
                    onClick={openDropdown}
                    onBlur={closeDropdown}
                />
            ) : (
                <button
                    className={styles["dropdown-button"]}
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
                            src="/icons/chevron-down.svg"
                            alt=""
                            height={20}
                            width={20}
                        />
                    </div>
                </button>
            )}
            <ul
                className={`${styles["dropdown-options"]} ${
                    open ? styles.show : ""
                }`}
            >
                {getDropdownOptions()}
            </ul>
        </div>
    );
};

export default Dropdown;
