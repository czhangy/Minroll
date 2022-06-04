// Stylesheet
import styles from "@/styles/BuildPanel/Gear.module.scss";
// Global components
import GearSlot from "@/components/BuildPanel/GearSlot";
// TS
import BuildGear from "@/models/BuildGear";

type Props = {
    gear: BuildGear;
};

const Gear: React.FC<Props> = ({ gear }: Props) => {
    return (
        <div id={styles.gear}>
            <GearSlot type="head" gear={gear.head} />
            <GearSlot type="shoulders" gear={gear.shoulders} />
            <GearSlot type="neck" gear={gear.neck} />
            <GearSlot type="torso" gear={gear.torso} />
            <GearSlot type="hands" gear={gear.hands} />
            <GearSlot type="wrists" gear={gear.wrists} />
            <GearSlot type="waist" gear={gear.waist} />
            <GearSlot type="left-finger" gear={gear["left-finger"]} />
            <GearSlot type="legs" gear={gear.legs} />
            <GearSlot type="right-finger" gear={gear["right-finger"]} />
            <GearSlot type="main-hand" gear={gear["main-hand"]} />
            <GearSlot type="feet" gear={gear.feet} />
            <GearSlot type="off-hand" gear={gear["off-hand"]} />
        </div>
    );
};

export default Gear;
