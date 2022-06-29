// Stylesheet
import styles from "@/styles/BuildPanel/BuildPanel.module.scss";
// Local components
import Gear from "@/components/BuildPanel/Gear";
import Skills from "@/components/BuildPanel/Skills";
import Passives from "@/components/BuildPanel/Passives";
import Cube from "@/components/BuildPanel/Cube";
// TS
import BuildGear from "@/models/BuildGear";
import BuildCube from "@/models/BuildCube";
import Skill from "@/models/Skill";
import Gem from "@/models/Gem";

type Props = {
    gear: BuildGear;
    skills: Array<Skill | null>;
    passives: Array<Skill | null>;
    cube: BuildCube;
    gems: Array<Gem | null>;
};

const BuildPanel: React.FC<Props> = (props: Props) => {
    return (
        <div id={styles["build-panel"]}>
            <Gear gear={props.gear} gems={props.gems} />
            <Skills skills={props.skills} />
            <Passives passives={props.passives} />
            <Cube cube={props.cube} />
        </div>
    );
};

export default BuildPanel;
