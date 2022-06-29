// Stylesheet
import styles from "@/styles/Planner/GearPage.module.scss";
// React
import { useState, useEffect } from "react";
// Local components
import Dropdown from "@/components/Planner/Dropdown";
import GearDropdown from "@/components/Planner/GearDropdown";
import GemDropdown from "@/components/Planner/GemDropdown";
// TS
import Gear from "@/models/Gear";
import Gem from "@/models/Gem";
import BuildGear from "@/models/BuildGear";
import BuildCube from "@/models/BuildCube";

type Props = {
    gearList: Gear[];
    gemList: Gem[];
    savedGear: BuildGear;
    savedCube: BuildCube;
    savedGems: Array<Gem | null>;
    onGearSelect: (slot: string, item: Gear | null) => void;
    onCubeSelect: (slot: string, item: Gear | null) => void;
    onGemSelect: (ind: number, gem: Gem | null) => void;
};

const GearPage: React.FC<Props> = (props: Props) => {
    // Component state
    const [slot, setSlot] = useState<string | null>(null);
    const [filteredGearList, setFilteredGearList] = useState<Gear[]>([]);
    const [cubeWeaponList, setCubeWeaponList] = useState<Gear[]>([]);
    const [cubeArmorList, setCubeArmorList] = useState<Gear[]>([]);
    const [cubeJewelryList, setCubeJewelryList] = useState<Gear[]>([]);

    // Constants
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

    // Filter gear by slot => change on slot or class change
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

    // Update cube lists with new gear => change on class change
    useEffect(() => {
        const cubeGearList = props.gearList.filter((item) => item.effect);
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
                        onSelect={(item: Gear) =>
                            props.onGearSelect(slot as string, item)
                        }
                        placeholder="Select an item..."
                        savedItem={
                            slot
                                ? props.savedGear[slot as keyof BuildGear]?.name
                                : null
                        }
                        buildGear={Object.values(props.savedGear)}
                    />
                </div>
            </div>
            <div className={styles["gear-container"]}>
                <h3 className={styles["gear-header"]}>
                    Legendary Gem Selection
                </h3>
                <div className={styles["gear-dropdown"]}>
                    <GemDropdown
                        gemList={props.gemList}
                        gearList={props.gearList}
                        onSelect={(gem: Gem) => props.onGemSelect(0, gem)}
                        placeholder="Select a legendary gem..."
                        savedGem={props.savedGems[0]}
                        buildGems={props.savedGems}
                    />
                </div>
                <div className={styles["gear-dropdown"]}>
                    <GemDropdown
                        gemList={props.gemList}
                        gearList={props.gearList}
                        onSelect={(gem: Gem) => props.onGemSelect(1, gem)}
                        placeholder="Select a legendary gem..."
                        savedGem={props.savedGems[1]}
                        buildGems={props.savedGems}
                    />
                </div>
                <div className={styles["gear-dropdown"]}>
                    <GemDropdown
                        gemList={props.gemList}
                        gearList={props.gearList}
                        onSelect={(gem: Gem) => props.onGemSelect(2, gem)}
                        placeholder="Select a legendary gem..."
                        savedGem={props.savedGems[2]}
                        buildGems={props.savedGems}
                    />
                </div>
            </div>
            <div className={styles["gear-container"]}>
                <h3 className={styles["gear-header"]}>Cube Selection</h3>
                <div className={styles["gear-dropdown"]}>
                    <GearDropdown
                        gearList={cubeWeaponList}
                        onSelect={(item: Gear) =>
                            props.onCubeSelect("weapon", item)
                        }
                        placeholder="Select a weapon item..."
                        savedItem={props.savedCube["weapon"]?.name}
                        buildGear={Object.values(props.savedCube)}
                        inverted={true}
                    />
                </div>
                <div className={styles["gear-dropdown"]}>
                    <GearDropdown
                        gearList={cubeArmorList}
                        onSelect={(item: Gear) =>
                            props.onCubeSelect("armor", item)
                        }
                        placeholder="Select an armor item..."
                        savedItem={props.savedCube["armor"]?.name}
                        buildGear={Object.values(props.savedCube)}
                        inverted={true}
                    />
                </div>
                <div className={styles["gear-dropdown"]}>
                    <GearDropdown
                        gearList={cubeJewelryList}
                        onSelect={(item: Gear) =>
                            props.onCubeSelect("jewelry", item)
                        }
                        placeholder="Select a jewelry item..."
                        savedItem={props.savedCube["jewelry"]?.name}
                        buildGear={Object.values(props.savedCube)}
                        inverted={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default GearPage;
