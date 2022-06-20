// Stylesheet
import styles from "@/styles/Planner/SkillDropdown.module.scss";
// React
import { useState, useEffect } from "react";
// TS
import { SyntheticEvent } from "react";
import Skill from "@/models/Skill";
// Next
import Image from "next/image";

type Props = {
    skillList: Skill[];
    placeholder: string;
    onSelect: (item: Skill) => void;
    savedSkill: string | undefined;
    buildSkills: (Skill | null)[];
    inverted?: boolean;
};

const SkillDropdown: React.FC<Props> = (props: Props) => {
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
    const [searchedSkill, setSearchedSkill] = useState<string>("");
    const selectSkill = (skill: Skill) => {
        // Set dropdown value
        setSearchedSkill(skill.name);
        // Pass to parent
        props.onSelect(skill);
    };

    // Filter skills by search
    const [filteredSkills, setFilteredSkills] = useState<Skill[]>([]);
    useEffect(() => {
        // Get names of equipped skills
        const names = props.buildSkills
            .filter((skill: Skill | null) => skill !== null)
            .map((skill) => (skill as Skill).name);
        setFilteredSkills(
            props.skillList.filter(
                (skill: Skill) =>
                    skill.name === props.savedSkill ||
                    (skill.name
                        .toLowerCase()
                        .includes(searchedSkill.toLowerCase()) &&
                        !names.includes(skill.name))
            )
        );
    }, [props.skillList, searchedSkill, props.buildSkills]);

    // Clear input on class/page change
    useEffect(() => {
        setSearchedSkill(props.savedSkill ? props.savedSkill : "");
    }, [props.skillList]);

    // Match highlighting on option list
    const highlightMatch = (name: string) => {
        const split = name.toLowerCase().indexOf(searchedSkill.toLowerCase());
        return (
            <p className={styles["skill-name"]}>
                {name.substring(0, split)}
                <span className={styles.highlight}>
                    {name.substring(split, split + searchedSkill.length)}
                </span>
                {name.substring(split + searchedSkill.length)}
            </p>
        );
    };

    return (
        <div className={styles["skill-dropdown"]}>
            <input
                className={styles["skill-input"]}
                placeholder={props.placeholder}
                disabled={props.skillList.length === 0}
                spellCheck={false}
                value={searchedSkill}
                onChange={(e) => setSearchedSkill(e.target.value)}
                onClick={openDropdown}
                onBlur={closeDropdown}
            />
            {props.skillList.length === 0 ? (
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
                className={`${styles["skill-options"]} ${
                    open ? styles.show : ""
                } ${props.inverted ? styles.inverted : ""}`}
            >
                {filteredSkills.map((skill, i) => {
                    return (
                        <li
                            className={styles["skill-option"]}
                            key={i}
                            onClick={() => selectSkill(skill)}
                        >
                            <div className={styles["skill-icon"]}>
                                <Image
                                    src={`http://media.blizzard.com/d3/icons/skills/42/${skill.icon}.png`}
                                    alt=""
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </div>
                            {highlightMatch(skill.name)}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default SkillDropdown;
