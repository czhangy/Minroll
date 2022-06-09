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

const BuildPanel: React.FC<Props> = ({
    gear,
    skills,
    passives,
    cube,
    gems,
}: Props) => {
    return (
        <div id={styles["build-panel"]}>
            <Gear gear={gear} gems={gems} />
            <Skills skills={skills} />
            <Passives passives={passives} />
            <Cube cube={cube} />
        </div>
    );
};

export default BuildPanel;
