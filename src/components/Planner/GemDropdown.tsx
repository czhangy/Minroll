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
    onSelect: (gem: Gem | null) => void;
    savedGem: Gem | null | undefined;
    buildGems: (Gem | null)[];
};

const GemDropdown: React.FC<Props> = (props: Props) => {
    // Component state
    const [open, setOpen] = useState<boolean>(false);
    const [searchedGem, setSearchedGem] = useState<string>("");
    const [filteredGems, setFilteredGems] = useState<Gem[]>([]);

    // Dropdown state modifiers => called on dropdown click
    const openDropdown = (e: SyntheticEvent) => {
        (e.target as HTMLButtonElement).focus();
        setOpen(true);
    };
    const closeDropdown = () => setTimeout(() => setOpen(false), 120);

    // Handle gem selection => called on dropdown option select
    const selectGem = (gem: Gem | null) => {
        // Set dropdown value
        setSearchedGem(gem ? gem.name : "");
        // Pass to parent
        props.onSelect(gem);
    };

    // Highlight matching substrings in options
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

    // Build list of gem options => change on gem equip, planner reset, and filter change
    useEffect(() => {
        // Get names of equipped gems
        const names = props.buildGems
            .filter((gem: Gem | null) => gem !== null)
            .map((gem) => (gem as Gem).name);
        setFilteredGems(
            props.gemList.filter(
                (gem: Gem) =>
                    gem.name
                        .toLowerCase()
                        .includes(searchedGem.toLowerCase()) &&
                    (gem.name === props.savedGem?.name ||
                        !names.includes(gem.name))
            )
        );
    }, [props.gemList, searchedGem, props.buildGems]);

    // Clear input on class/page change
    useEffect(() => {
        setSearchedGem(props.savedGem ? props.savedGem.name : "");
    }, [props.gearList]);

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
                                    src={gem.src}
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
            {searchedGem.length > 0 ? (
                <button
                    className={styles["clear-button"]}
                    onClick={() => selectGem(null)}
                >
                    <Image
                        src="/icons/x.svg"
                        alt="Clear field"
                        layout="fill"
                        objectFit="contain"
                    />
                </button>
            ) : (
                ""
            )}
        </div>
    );
};

export default GemDropdown;
