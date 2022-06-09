// Stylesheet
import styles from "@/styles/BuildPanel/Passives.module.scss";
// TS
import Skill from "@/models/Skill";
// Local components
import PassiveSlot from "@/components/BuildPanel/PassiveSlot";

type Props = {
    passives: Array<Skill | null>;
};

const Passives: React.FC<Props> = ({ passives }: Props) => {
    return (
        <div id={styles.passives}>
            {passives.map((passive: Skill | null, i: number) => (
                <PassiveSlot passive={passive} key={i} />
            ))}
        </div>
    );
};

export default Passives;
