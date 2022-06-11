// Stylesheet
import styles from "@/styles/Planner/GemDropdown.module.scss";
// React
import { useState, useEffect } from "react";
// TS
import { SyntheticEvent } from "react";
import Gem from "@/models/Gem";
import Gear from "@/models/Gear";
// Next
import Image from "next/image";

type Props = {
    gemList: Gem[];
    gearList: Gear[];
    placeholder: string;
    onSelect: (gem: Gem) => void;
    savedGem: Gem | null | undefined;
};

const GemDropdown: React.FC<Props> = (props: Props) => {
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
    const [searchedGem, setSearchedGem] = useState<string>("");
    const selectGem = (gem: Gem) => {
        // Set dropdown value
        setSearchedGem(gem.name);
        // Pass to parent
        props.onSelect(gem);
    };

    // Filter gems by search
    const [filteredGems, setFilteredGems] = useState<Gem[]>([]);
    useEffect(() => {
        setFilteredGems(
            props.gemList.filter((gem: Gem) =>
                gem.name.toLowerCase().includes(searchedGem.toLowerCase())
            )
        );
    }, [props.gemList, searchedGem]);

    // Clear input on class/page change
    useEffect(() => {
        setSearchedGem(props.savedGem ? props.savedGem.name : "");
    }, [props.gearList]);

    // Match highlighting on option list
    const highlightMatch = (name: string) => {
        const split = name.toLowerCase().indexOf(searchedGem.toLowerCase());
        return (
            <p className={styles["gem-name"]}>
                {name.substring(0, split)}
                <span className={styles.highlight}>
                    {name.substring(split, split + searchedGem.length)}
                </span>
                {name.substring(split + searchedGem.length)}
            </p>
        );
    };

    return (
        <div className={styles["gem-dropdown"]}>
            <input
                className={styles["gem-input"]}
                placeholder={props.placeholder}
                disabled={props.gemList.length === 0}
                spellCheck={false}
                value={searchedGem}
                onChange={(e) => setSearchedGem(e.target.value)}
                onClick={openDropdown}
                onBlur={closeDropdown}
            />
            <ul
                className={`${styles["gem-options"]} ${
                    open ? styles.show : ""
                }`}
            >
                {filteredGems.map((gem, i) => {
                    return (
                        <li
                            className={styles["gem-option"]}
                            key={i}
                            onClick={() => selectGem(gem)}
                        >
                            <div className={styles["gem-icon"]}>
                                <Image
                                    src={`http://media.blizzard.com/d3/icons/items/small/${gem.icon}.png`}
                                    alt=""
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </div>
                            {highlightMatch(gem.name)}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default GemDropdown;
