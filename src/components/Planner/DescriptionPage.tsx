// Stylesheet
import styles from "@/styles/Planner/DescriptionPage.module.scss";
// TS
import { SyntheticEvent } from "react";

type Props = {
    value: string;
    onChange: (e: SyntheticEvent) => void;
};

const DescriptionPage: React.FC<Props> = ({ value, onChange }: Props) => {
    return (
        <div id={styles["description-page"]}>
            <textarea
                id={styles["description-input"]}
                placeholder="Describe your build here..."
            ></textarea>
        </div>
    );
};

export default DescriptionPage;
