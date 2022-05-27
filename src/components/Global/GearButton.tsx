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

        const newGear = {
            name: "Warhelm of Kassar",
            category: "head",
            rarity: "legendary",
            effect: "Reduces the cooldown and increase the damage of Phalanx by 60%",
            description:
                "At Akkhan's request, Kassar trained the first Crusaders, turning them into skillful warriors through his rigorous methods. His own apprentices faced harsher trials and were each lost in training, unable to carry on his name. — Abd al-Hazir, The Crusaders",
            src: "https://static.wikia.nocookie.net/diablo/images/b/b1/KassarHelm.png/revision/latest?cb=20160115152518",
        };

        await axios.post("/api/gear", newGear);
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
