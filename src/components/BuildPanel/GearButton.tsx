// Stylesheet
import styles from "@/styles/BuildPanel/Gear.module.scss";

type Props = {
    type: string;
};

const GearButton: React.FC<Props> = ({ type }: Props) => {
    return <button id={styles[type]} className={styles["gear-button"]} />;
};

export default GearButton;
