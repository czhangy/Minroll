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
    gearList: Gear[];
    placeholder: string;
    onSelect: (item: Gear) => void;
    savedItem: string | null | undefined;
    buildGear: Array<Gear | null>;
};

const GearDropdown: React.FC<Props> = (props: Props) => {
    // Component state
    const [open, setOpen] = useState<boolean>(false);
    const [searchedItem, setSearchedItem] = useState<string>("");
    const [filteredGear, setFilteredGear] = useState<Gear[]>([]);

    // Dropdown state modifiers => called on dropdown click
    const openDropdown = (e: SyntheticEvent) => {
        (e.target as HTMLButtonElement).focus();
        setOpen(true);
    };
    const closeDropdown = () => setTimeout(() => setOpen(false), 120);

    // Handle gear selection => called on input field change
    const selectItem = (item: Gear) => {
        // Set dropdown value
        setSearchedItem(item.name);
        // Pass to parent
        props.onSelect(item);
    };

    // Highlight matching substrings in list
    const highlightMatch = (name: string) => {
        const split = name.toLowerCase().indexOf(searchedItem.toLowerCase());
        return (
            <p className={styles["gear-name"]}>
                {name.substring(0, split)}
                <span className={styles.highlight}>
                    {name.substring(split, split + searchedItem.length)}
                </span>
                {name.substring(split + searchedItem.length)}
            </p>
        );
    };

    // Filter gear list by search => change when filter or gear list changes
    useEffect(() => {
        // Get names of equipped gear
        const names = props.buildGear
            .filter((gear: Gear | null) => gear !== null)
            .map((gear) => (gear as Gear).name);
        setFilteredGear(
            props.gearList.filter(
                (item: Gear) =>
                    item.name === props.savedItem ||
                    (item.name
                        .toLowerCase()
                        .includes(searchedItem.toLowerCase()) &&
                        !names.includes(item.name))
            )
        );
    }, [props.gearList, searchedItem]);

    // Clear/revert input on class/slot change
    useEffect(() => {
        setSearchedItem(props.savedItem ? props.savedItem : "");
    }, [props.gearList]);

    return (
        <div className={styles["gear-dropdown"]}>
            <input
                className={styles["gear-input"]}
                placeholder={props.placeholder}
                disabled={props.gearList.length === 0}
                spellCheck={false}
                value={searchedItem}
                onChange={(e) => setSearchedItem(e.target.value)}
                onClick={openDropdown}
                onBlur={closeDropdown}
            />
            {props.gearList.length === 0 ? (
                <div className={styles["disabled-icon"]}>
                    <Image
                        src="/icons/lock.svg"
                        alt=""
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
            ) : (
                ""
            )}
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
                            {highlightMatch(item.name)}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default GearDropdown;
