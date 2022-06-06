// Stylesheet
import styles from "@/styles/Planner/SkillsPage.module.scss";
// React
import { useEffect } from "react";
// Axios
import axios from "axios";
// Local component
import SkillDropdown from "@/components/Planner/SkillDropdown";

type Props = {
    className: string;
};

const SkillsPage: React.FC<Props> = ({ className }: Props) => {
    useEffect(() => {
        if (className !== "")
            axios.get("/api/skills", { params: { className: className } });
    }, [className]);

    const t = () => {};

    return (
        <div id={styles["skills-page"]}>
            <div className={styles["skills-container"]}>
                <h3 className={styles["skills-header"]}>Skills Selection</h3>
                <div className={styles["gear-dropdown"]}>
                    <SkillDropdown
                        skills={[]}
                        placeholder="Select a skill..."
                        onSelect={t}
                    />
                </div>
            </div>
            <div className={styles["skills-container"]}>
                <h3 className={styles["skills-header"]}>Passives Selection</h3>
            </div>
        </div>
    );
};

export default SkillsPage;
