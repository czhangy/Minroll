// Stylesheet
import styles from "@/styles/Global/Gear.module.scss";
// Global components
import GearButton from "@/components/Global/GearButton";

const Gear: React.FC = () => {
    return (
        <div id={styles.gear}>
            <GearButton type="head" />
            <GearButton type="shoulders" />
            <GearButton type="neck" />
            <GearButton type="torso" />
            <GearButton type="hands" />
            <GearButton type="wrists" />
            <GearButton type="waist" />
            <GearButton type="left-finger" />
            <GearButton type="legs" />
            <GearButton type="right-finger" />
            <GearButton type="main-hand" />
            <GearButton type="feet" />
            <GearButton type="off-hand" />
        </div>
    );
};

export default Gear;
