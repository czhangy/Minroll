// Stylesheet
import styles from "@/styles/Profile/SortMenu.module.scss";

type Props = {
    open: boolean;
    selected: string;
    onSelect: (option: string) => void;
};

const SortMenu: React.FC<Props> = ({ open, selected, onSelect }: Props) => {
    return (
        <ul id={styles["sort-menu"]} className={open ? styles.open : ""}>
            <li>
                <button
                    className={`${styles["menu-option"]} ${
                        selected === "Most Recent" ? styles.active : ""
                    }`}
                    onClick={() => onSelect("Most Recent")}
                >
                    Most Recent
                </button>
            </li>
            <li>
                <button
                    className={`${styles["menu-option"]} ${
                        selected === "Least Recent" ? styles.active : ""
                    }`}
                    onClick={() => onSelect("Least Recent")}
                >
                    Least Recent
                </button>
            </li>
            <li>
                <button
                    className={`${styles["menu-option"]} ${
                        selected === "A → Z" ? styles.active : ""
                    }`}
                    onClick={() => onSelect("A → Z")}
                >
                    A → Z
                </button>
            </li>
            <li>
                <button
                    className={`${styles["menu-option"]} ${
                        selected === "Z → A" ? styles.active : ""
                    }`}
                    onClick={() => onSelect("Z → A")}
                >
                    Z → A
                </button>
            </li>
        </ul>
    );
};

export default SortMenu;
