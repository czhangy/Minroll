// Stylesheet
import styles from "@/styles/Global/GearButton.module.scss";
import axios from "axios";
import { SyntheticEvent } from "react";
// Axios

type Props = {
    type: string;
    inSlot: any;
};

const GearButton: React.FC<Props> = ({ type }: Props) => {
    // Manage active button
    const setActive = async (e: SyntheticEvent) => {
        // Disable other buttons
        const activeButtons = document.getElementsByClassName(styles["active"]);
        for (let button of activeButtons as any)
            button.classList.remove(styles["active"]);
        // Activate clicked button
        (e.target as HTMLButtonElement).classList.add(styles["active"]);
        await axios.get("/api/gear");
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
