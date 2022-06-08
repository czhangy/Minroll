// Stylesheet
import styles from "@/styles/Planner/GearPage.module.scss";
// React
import { useState, useEffect } from "react";
// Local components
import Dropdown from "@/components/Planner/Dropdown";
import GearDropdown from "@/components/Planner/GearDropdown";
// TS
import Gear from "@/models/Gear";
import BuildGear from "@/models/BuildGear";
import BuildCube from "@/models/BuildCube";

type Props = {
    gearList: Gear[];
    savedGear: BuildGear;
    savedCube: BuildCube;
    onGearSelect: (slot: string, item: Gear) => void;
    onCubeSelect: (slot: string, item: Gear) => void;
    isLoading: boolean;
};

const GearPage: React.FC<Props> = (props: Props) => {
    // Hold gear slot state
    const [slot, setSlot] = useState<string | null>(null);
    // Hold build gear state => gear that goes in slots
    const [filteredGearList, setFilteredGearList] = useState<Gear[]>([]);
    // Hold cube gear state
    const [cubeWeaponList, setCubeWeaponList] = useState<Gear[]>([]);
    const [cubeArmorList, setCubeArmorList] = useState<Gear[]>([]);
    const [cubeJewelryList, setCubeJewelryList] = useState<Gear[]>([]);

    // Filter gear by slot
    useEffect(() => {
        if (slot)
            setFilteredGearList(
                props.gearList.filter((item) => {
                    if (slot === "main-hand")
                        return (
                            item.slot === "one-hand" || item.slot === "two-hand"
                        );
                    else if (slot === "off-hand")
                        return item.slot === slot || item.slot === "one-hand";
                    else if (slot === "left-finger" || slot === "right-finger")
                        return item.slot === "finger";
                    else return item.slot === slot;
                })
            );
    }, [slot, props.gearList]);

    // Update cube lists on master list change
    useEffect(() => {
        const cubeGearList = props.gearList.filter((item) => item.effect);
        const weaponCategories = ["one-hand", "two-hand", "off-hand"];
        const armorCategories = [
            "head",
            "shoulders",
            "torso",
            "hands",
            "wrists",
            "waist",
            "legs",
            "feet",
        ];
        const jewelryCategories = ["neck", "finger"];
        setCubeWeaponList(
            cubeGearList.filter((item) => weaponCategories.includes(item.slot))
        );
        setCubeArmorList(
            cubeGearList.filter((item) => armorCategories.includes(item.slot))
        );
        setCubeJewelryList(
            cubeGearList.filter((item) => jewelryCategories.includes(item.slot))
        );
    }, [props.gearList]);

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
                        onSelect={setSlot}
                        hasIcon={false}
                        placeholder="Select a slot..."
                    />
                </div>
                <div className={styles["gear-dropdown"]}>
                    <GearDropdown
                        gearList={filteredGearList}
                        onSelect={(item) =>
                            props.onGearSelect(slot as string, item)
                        }
                        placeholder="Select an item..."
                        savedItem={
                            slot
                                ? props.savedGear[slot as keyof BuildGear]?.name
                                : null
                        }
                    />
                </div>
            </div>
            <div className={styles["gear-container"]}>
                <h3 className={styles["gear-header"]}>Cube Selection</h3>
                <div className={styles["gear-dropdown"]}>
                    <GearDropdown
                        gearList={cubeWeaponList}
                        onSelect={(item) => props.onCubeSelect("weapon", item)}
                        placeholder="Select a weapon item..."
                        savedItem={props.savedCube["weapon"]?.name}
                    />
                </div>
                <div className={styles["gear-dropdown"]}>
                    <GearDropdown
                        gearList={cubeArmorList}
                        onSelect={(item) => props.onCubeSelect("armor", item)}
                        placeholder="Select an armor item..."
                        savedItem={props.savedCube["armor"]?.name}
                    />
                </div>
                <div className={styles["gear-dropdown"]}>
                    <GearDropdown
                        gearList={cubeJewelryList}
                        onSelect={(item) => props.onCubeSelect("jewelry", item)}
                        placeholder="Select a jewelry item..."
                        savedItem={props.savedCube["jewelry"]?.name}
                    />
                </div>
            </div>
            {props.isLoading ? (
                <div id={styles["gear-loading"]}>Loading...</div>
            ) : (
                ""
            )}
        </div>
    );
};

export default GearPage;
