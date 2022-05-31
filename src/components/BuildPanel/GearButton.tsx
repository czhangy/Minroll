// Stylesheet
import styles from "@/styles/BuildPanel/Gear.module.scss";
// TS
import { SyntheticEvent } from "react";
// Axios
import axios from "axios";

type Props = {
    type: string;
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
        axios.get("/api/gear");
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
