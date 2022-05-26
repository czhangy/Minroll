// Stylesheet
import styles from "@/styles/Global/GearButton.module.scss";

type Props = {
    type: string;
};

const GearButton: React.FC<Props> = ({ type }: Props) => {
    return (
        <div className={styles["gear-button-container"]}>
            <button id={styles["gear-button"]} />
        </div>
    );
};

export default GearButton;
