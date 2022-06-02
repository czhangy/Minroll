// Stylesheet
import styles from "@/styles/Planner/GearPage.module.scss";
// React
import { useState } from "react";
// Local components
import Dropdown from "@/components/Planner/Dropdown";

type Props = {
    className: string;
};

const GearPage: React.FC<Props> = ({ className }: Props) => {
    // Hold gear slot state
    const [slot, setSlot] = useState<string | null>(null);
    const selectSlot = (slot: string) => setSlot(slot);

    // All slots
    const slots = [
        "head",
        "shoulders",
        "torso",
        "hands",
        "wrists",
        "waist",
        "legs",
        "feet",
        "neck",
        "left-finger",
        "right-finger",
        "main-hand",
        "off-hand",
    ];

    return (
        <div id={styles["gear-page"]}>
            <div className={styles["gear-container"]}>
                <h3 className={styles["gear-header"]}>Gear Selection</h3>
                <div className={styles["gear-dropdown"]}>
                    <Dropdown
                        content={slots}
                        onSelect={selectSlot}
                        hasIcon={false}
                        placeholder="Select a slot..."
                    />
                </div>
            </div>
            <div className={styles["gear-container"]}>
                <h3 className={styles["gear-header"]}>Cube Selection</h3>
            </div>
        </div>
    );
};

export default GearPage;
