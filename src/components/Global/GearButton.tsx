// Stylesheet
import styles from "@/styles/Global/GearButton.module.scss";
import { SyntheticEvent } from "react";

type Props = {
    type: string;
    inSlot: any;
};

const GearButton: React.FC<Props> = ({ type, inSlot }: Props) => {
    // Manage active button
    const setActive = (e: SyntheticEvent) => {
        // Disable other buttons
        const activeButtons = document.getElementsByClassName(styles["active"]);
        for (let button of activeButtons as any)
            button.classList.remove(styles["active"]);
        // Activate clicked button
        (e.target as HTMLButtonElement).classList.add(styles["active"]);
    };

    return (
        <button
            id={styles[type]}
            className={styles["gear-button"]}
            onClick={setActive}
        />
    );
};

export default GearButton;
