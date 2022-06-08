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
    const [searchedItem, setSearchedItem] = useState<string>("");
    const selectItem = (item: Gear) => {
        // Set dropdown value
        setSearchedItem(item.name);
        // Pass to parent
        props.onSelect(item);
    };

    // Filter content by search
    const [filteredGear, setFilteredGear] = useState<Gear[]>([]);
    useEffect(() => {
        setFilteredGear(
            props.gearList.filter((item: Gear) =>
                item.name.toLowerCase().includes(searchedItem.toLowerCase())
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
                            <p className={styles["gear-name"]}>{item.name}</p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default GearDropdown;
