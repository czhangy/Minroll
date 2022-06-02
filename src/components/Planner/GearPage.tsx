// Stylesheet
import styles from "@/styles/Planner/GearPage.module.scss";
// React
import { useState } from "react";
// Local components
import Dropdown from "@/components/Planner/Dropdown";
// TS
import Gear from "@/models/Gear";

type Props = {
    className: string;
};

const GearPage: React.FC<Props> = ({ className }: Props) => {
    // Hold gear slot state
    const [slot, setSlot] = useState<string | null>(null);
    const selectSlot = (slot: string | Gear) => {
        // Handle slot selection
        if (typeof slot === "string") setSlot(slot);
        // Handle gear selection
        else console.log("Should send data to BuildSheet");
    };

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
                        isSearchable={false}
                        placeholder="Select a slot..."
                    />
                </div>
                {/* <div className={styles["gear-dropdown"]}>
                    <Dropdown
                        content={slots}
                        onSelect={selectSlot}
                        hasIcon={true}
                        isSearchable={true}
                        placeholder="Select an item..."
                    />
                </div> */}
            </div>
            <div className={styles["gear-container"]}>
                <h3 className={styles["gear-header"]}>Cube Selection</h3>
                {/* <div className={styles["gear-dropdown"]}>
                    <Dropdown
                        content={slots}
                        onSelect={selectSlot}
                        hasIcon={true}
                        isSearchable={true}
                        placeholder="Select a weapon item..."
                    />
                </div>
                <div className={styles["gear-dropdown"]}>
                    <Dropdown
                        content={slots}
                        onSelect={selectSlot}
                        hasIcon={true}
                        isSearchable={true}
                        placeholder="Select an armor item..."
                    />
                </div>
                <div className={styles["gear-dropdown"]}>
                    <Dropdown
                        content={slots}
                        onSelect={selectSlot}
                        hasIcon={true}
                        isSearchable={true}
                        placeholder="Select a jewelry item..."
                    />
                </div> */}
            </div>
        </div>
    );
};

export default GearPage;
