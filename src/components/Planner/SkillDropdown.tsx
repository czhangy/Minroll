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
    skills: Skill[];
    placeholder: string;
    onSelect: (item: Skill) => void;
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
        setSearchedSkill(formatSlug(skill.slug));
        // Pass to parent
        props.onSelect(skill);
    };

    // Filter skills by search
    const [filteredSkills, setFilteredSkills] = useState<Skill[]>([]);
    useEffect(() => {
        setFilteredSkills(
            props.skills.filter((skill: Skill) =>
                formatSlug(skill.slug)
                    .toLowerCase()
                    .includes(searchedSkill.toLowerCase())
            )
        );
    }, [props.skills, searchedSkill]);

    // Name formatting => remove hyphens and capitalize words
    const formatSlug: (slug: string) => string = (slug: string) => {
        const words = slug.replace(/-/g, " ").split(" ");
        return words
            .map((word) => {
                return word[0].toUpperCase() + word.substring(1);
            })
            .join(" ");
    };

    // Clear input on class change
    useEffect(() => {
        setSearchedSkill("");
    }, [props.skills]);

    return (
        <div className={styles["skill-dropdown"]}>
            <input
                className={styles["skill-input"]}
                placeholder={props.placeholder}
                disabled={props.skills.length === 0}
                spellCheck={false}
                value={searchedSkill}
                onChange={(e) => setSearchedSkill(e.target.value)}
                onClick={openDropdown}
                onBlur={closeDropdown}
            />
            <ul
                className={`${styles["skill-options"]} ${
                    open ? styles.show : ""
                }`}
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
                            <p className={styles["skill-name"]}>
                                {formatSlug(skill.slug)}
                            </p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default SkillDropdown;
