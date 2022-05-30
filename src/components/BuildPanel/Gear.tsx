// Stylesheet
import styles from "@/styles/BuildPanel/Gear.module.scss";
// Global components
import GearButton from "@/components/BuildPanel/GearButton";
// React
import { useState } from "react";

const Gear: React.FC = () => {
    const [gear, setGear] = useState({
        head: null,
        shoulders: null,
        neck: null,
        torso: null,
        hands: null,
        wrists: null,
        waist: null,
        leftFinger: null,
        legs: null,
        rightFinger: null,
        mainHand: null,
        feet: null,
        offHand: null,
    });

    return (
        <div id={styles.gear}>
            <GearButton type="head" inSlot={gear.head} />
            <GearButton type="shoulders" inSlot={gear.shoulders} />
            <GearButton type="neck" inSlot={gear.neck} />
            <GearButton type="torso" inSlot={gear.torso} />
            <GearButton type="hands" inSlot={gear.hands} />
            <GearButton type="wrists" inSlot={gear.wrists} />
            <GearButton type="waist" inSlot={gear.waist} />
            <GearButton type="left-finger" inSlot={gear.leftFinger} />
            <GearButton type="legs" inSlot={gear.legs} />
            <GearButton type="right-finger" inSlot={gear.rightFinger} />
            <GearButton type="main-hand" inSlot={gear.mainHand} />
            <GearButton type="feet" inSlot={gear.feet} />
            <GearButton type="off-hand" inSlot={gear.offHand} />
        </div>
    );
};

export default Gear;
