// Stylesheet
import styles from "@/styles/Planner/Planner.module.scss";
// TS
import { NextPage } from "next";
// Global components
import BuildPanel from "@/components/BuildPanel/BuildPanel";

const Planner: NextPage = () => {
    return (
        <div id={styles.planner}>
            <BuildPanel />
        </div>
    );
};

export default Planner;
