// Stylesheet
import styles from "@/styles/Builds/FilterMenu.module.scss";

type Props = {
    open: boolean;
    selected: string;
    onSelect: (option: string) => void;
};

const FilterMenu: React.FC<Props> = ({ open, selected, onSelect }: Props) => {
    // All classes
    const classNames: string[] = [
        "barbarian",
        "crusader",
        "demon-hunter",
        "monk",
        "necromancer",
        "witch-doctor",
        "wizard",
    ];

    // Capitalize words and remove spaces from class name
    const formatClassName = (name: string) => {
        const words = name.replace(/-/g, " ").split(" ");
        return words
            .map((word) => word[0].toUpperCase() + word.substring(1))
            .join(" ");
    };

    return (
        <ul id={styles["filter-menu"]} className={open ? styles.open : ""}>
            {classNames.map((className: string, i: number) => {
                return (
                    <li key={i}>
                        <button
                            className={`${styles["menu-option"]} ${
                                selected === className ? styles.active : ""
                            }`}
                            onClick={() => onSelect(className)}
                        >
                            {formatClassName(className)}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
};

export default FilterMenu;
