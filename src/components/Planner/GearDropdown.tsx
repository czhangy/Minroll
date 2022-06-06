// Stylesheet
import styles from "@/styles/Planner/GearDropdown.module.scss";
// React
import { useState, useEffect } from "react";
// TS
import { SyntheticEvent } from "react";
import Gear from "@/models/Gear";
// Next
import Image from "next/image";

type Props = {
    gear: Gear[];
    placeholder: string;
    onSelect: (item: Gear) => void;
    savedValue: string | null | undefined;
};

const GearDropdown: React.FC<Props> = (props: Props) => {
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

    // Search bar display state
    const [searchedValue, setSearchedValue] = useState<string>("");
    const updateValue = (e: SyntheticEvent) =>
        setSearchedValue((e.target as HTMLInputElement).value);
    const selectItem = (item: Gear) => {
        // Set dropdown value
        setSearchedValue(item.name);
        // Pass to parent
        props.onSelect(item);
    };

    // Filter content by search
    const [filteredGear, setFilteredGear] = useState<Gear[]>([]);
    useEffect(() => {
        setFilteredGear(
            props.gear.filter((item: Gear) =>
                item.name.toLowerCase().includes(searchedValue.toLowerCase())
            )
        );
    }, [props.gear, searchedValue]);

    // Clear/revert input on class/slot change
    useEffect(() => {
        setSearchedValue(props.savedValue ? props.savedValue : "");
    }, [props.gear]);

    return (
        <div className={styles["gear-dropdown"]}>
            <input
                className={styles["gear-input"]}
                placeholder={props.placeholder}
                disabled={props.gear.length === 0}
                spellCheck={false}
                value={searchedValue}
                onChange={updateValue}
                onClick={openDropdown}
                onBlur={closeDropdown}
            />
            <ul
                className={`${styles["gear-options"]} ${
                    open ? styles.show : ""
                }`}
            >
                {filteredGear.map((item, i) => {
                    return (
                        <li
                            className={styles["gear-option"]}
                            key={i}
                            onClick={() => selectItem(item)}
                        >
                            <div className={styles["gear-icon"]}>
                                <Image
                                    src={item.src}
                                    alt=""
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </div>
                            <p className={styles["gear-name"]}>{item.name}</p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default GearDropdown;
