// Stylesheet
import styles from "@/styles/BuildPanel/BuildPanel.module.scss";
// Local components
import Gear from "@/components/BuildPanel/Gear";
import Skills from "@/components/BuildPanel/Skills";
import Passives from "@/components/BuildPanel/Passives";
import Cube from "@/components/BuildPanel/Cube";

const BuildPanel: React.FC = () => {
    return (
        <div id={styles["build-panel"]}>
            <Gear />
            <Skills />
            <Passives />
            <Cube />
        </div>
    );
};

export default BuildPanel;
