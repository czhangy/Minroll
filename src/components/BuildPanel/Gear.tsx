// Stylesheet
import styles from "@/styles/BuildPanel/Gear.module.scss";
// Global components
import GearSlot from "@/components/BuildPanel/GearSlot";
// TS
import BuildGear from "@/models/BuildGear";
import Gem from "@/models/Gem";

type Props = {
    gear: BuildGear;
    gems: Array<Gem | null>;
};

const Gear: React.FC<Props> = ({ gear, gems }: Props) => {
    return (
        <div id={styles.gear}>
            <GearSlot type="head" gear={gear.head} />
            <GearSlot type="shoulders" gear={gear.shoulders} />
            <GearSlot type="neck" gear={gear.neck} gem={gems[0]} />
            <GearSlot type="torso" gear={gear.torso} />
            <GearSlot type="hands" gear={gear.hands} />
            <GearSlot type="wrists" gear={gear.wrists} />
            <GearSlot type="waist" gear={gear.waist} />
            <GearSlot
                type="left-finger"
                gear={gear["left-finger"]}
                gem={gems[1]}
            />
            <GearSlot type="legs" gear={gear.legs} />
            <GearSlot
                type="right-finger"
                gear={gear["right-finger"]}
                gem={gems[2]}
            />
            <GearSlot type="main-hand" gear={gear["main-hand"]} />
            <GearSlot type="feet" gear={gear.feet} />
            <GearSlot type="off-hand" gear={gear["off-hand"]} />
        </div>
    );
};

export default Gear;
