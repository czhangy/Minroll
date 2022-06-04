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

type Props = {
    gear: BuildGear;
    cube: BuildCube;
};

const BuildPanel: React.FC<Props> = ({ gear, cube }: Props) => {
    return (
        <div id={styles["build-panel"]}>
            <Gear gear={gear} />
            <Skills />
            <Passives />
            <Cube cube={cube} />
        </div>
    );
};

export default BuildPanel;
