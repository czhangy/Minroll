// Stylesheet
import styles from "@/styles/Profile/SortMenu.module.scss";

type Props = {
    open: boolean;
    onSelect: (option: string) => void;
};

const SortMenu: React.FC<Props> = ({ open, onSelect }: Props) => {
    return (
        <ul id={styles["sort-menu"]} className={open ? styles.open : ""}>
            <li>
                <button
                    className={styles["menu-option"]}
                    onClick={() => onSelect("Most Recent")}
                >
                    Most Recent
                </button>
            </li>
            <li>
                <button
                    className={styles["menu-option"]}
                    onClick={() => onSelect("Least Recent")}
                >
                    Least Recent
                </button>
            </li>
            <li>
                <button
                    className={styles["menu-option"]}
                    onClick={() => onSelect("Alpha")}
                >
                    A → Z
                </button>
            </li>
            <li>
                <button
                    className={styles["menu-option"]}
                    onClick={() => onSelect("Reverse Alpha")}
                >
                    Z → A
                </button>
            </li>
        </ul>
    );
};

export default SortMenu;
