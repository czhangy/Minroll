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
// Axios
import axios from "axios";

type Props = {
    className: string;
    gear: BuildGear;
    cube: BuildCube;
    onGearSelect: (slot: string, item: Gear) => void;
    onCubeSelect: (slot: string, item: Gear) => void;
};

const GearPage: React.FC<Props> = ({
    className,
    gear,
    cube,
    onGearSelect,
    onCubeSelect,
}: Props) => {
    // Hold gear slot state
    const [slot, setSlot] = useState<string | null>(null);

    // Hold gear state => gear master list based on class
    const [gearList, setGearList] = useState<Gear[]>([]);
    // Hold build gear state => gear that goes in slots
    const [buildGearList, setBuildGearList] = useState<Gear[]>([]);
    // Hold cube gear state
    const [cubeWeaponList, setCubeWeaponList] = useState<Gear[]>([]);
    const [cubeArmorList, setCubeArmorList] = useState<Gear[]>([]);
    const [cubeJewelryList, setCubeJewelryList] = useState<Gear[]>([]);

    // Fetch all items matching class => refresh on class change
    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(() => {
        if (className !== "") {
            setIsLoading(true);
            axios
                .get("/api/gear", { params: { className: className } })
                .then((response) => {
                    setGearList(response.data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setIsLoading(false);
                });
        }
    }, [className]);

    // Filter by slot => refresh on slot/class change
    useEffect(() => {
        if (slot)
            setBuildGearList(
                gearList.filter((item) => {
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
    }, [slot, gearList]);

    // Update cube lists on master list change
    useEffect(() => {
        const cubeGearList = gearList.filter((item) => item.effect);
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
    }, [gearList]);

    // Send data to Planner
    const selectGear = (gear: Gear) => onGearSelect(slot as string, gear);
    const selectCube = (slot: string, gear: Gear) => onCubeSelect(slot, gear);

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
                        gear={buildGearList}
                        onSelect={selectGear}
                        placeholder="Select an item..."
                        savedValue={
                            slot ? gear[slot as keyof BuildGear]?.name : null
                        }
                    />
                </div>
            </div>
            <div className={styles["gear-container"]}>
                <h3 className={styles["gear-header"]}>Cube Selection</h3>
                <div className={styles["gear-dropdown"]}>
                    <GearDropdown
                        gear={cubeWeaponList}
                        onSelect={(item) => selectCube("weapon", item)}
                        placeholder="Select a weapon item..."
                        savedValue={cube["weapon"]?.name}
                    />
                </div>
                <div className={styles["gear-dropdown"]}>
                    <GearDropdown
                        gear={cubeArmorList}
                        onSelect={(item) => selectCube("armor", item)}
                        placeholder="Select an armor item..."
                        savedValue={cube["armor"]?.name}
                    />
                </div>
                <div className={styles["gear-dropdown"]}>
                    <GearDropdown
                        gear={cubeJewelryList}
                        onSelect={(item) => selectCube("jewelry", item)}
                        placeholder="Select a jewelry item..."
                        savedValue={cube["jewelry"]?.name}
                    />
                </div>
            </div>
            {isLoading ? <div id={styles["gear-loading"]}>Loading...</div> : ""}
        </div>
    );
};

export default GearPage;
