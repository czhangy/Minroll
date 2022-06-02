// Stylesheet
import styles from "@/styles/Planner/SearchableDropdown.module.scss";

type Props = {
    placeholder: string;
};

const SearchableDropdown: React.FC<Props> = (props: Props) => {
    return (
        <div className={styles["searchable-dropdown"]}>
            <input placeholder={props.placeholder} />
        </div>
    );
};

export default SearchableDropdown;
