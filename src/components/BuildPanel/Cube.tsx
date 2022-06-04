// Stylesheet
import styles from "@/styles/BuildPanel/Cube.module.scss";
// TS
import BuildCube from "@/models/BuildCube";
// Local component
import CubeSlot from "@/components/BuildPanel/CubeSlot";

type Props = {
    cube: BuildCube;
};

const Cube: React.FC<Props> = ({ cube }: Props) => {
    return (
        <div id={styles.cube}>
            <CubeSlot gear={cube.weapon} />
            <CubeSlot gear={cube.armor} />
            <CubeSlot gear={cube.jewelry} />
        </div>
    );
};

export default Cube;
