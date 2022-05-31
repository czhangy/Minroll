// Stylesheet
import styles from "@/styles/Planner/Planner.module.scss";
// TS
import { NextPage } from "next";
import Build from "@/models/Build";
import AuthContext from "@/models/AuthContext";
// Local components
import BuildPanel from "@/components/BuildPanel/BuildPanel";
import ClassDropdown from "@/components/Planner/ClassDropdown";
// React
import { useState } from "react";
// React Context
import { useAuth } from "@/contexts/AuthContext";

const Planner: NextPage = () => {
    // Get user
    const { user } = useAuth() as AuthContext;

    const [build, setBuild] = useState<Build>({
        name: "",
        class: "",
        description: "",
        userId: user?.id || null,
    });
    const selectClass = (newClass: string) => {
        setBuild({
            ...build,
            class: newClass,
        });
    };

    return (
        <div id={styles.planner}>
            <div id={styles["planner-build"]}>
                <ClassDropdown onSelect={selectClass} />
                <BuildPanel />
            </div>
            <div id={styles["planner-content"]}></div>
        </div>
    );
};

export default Planner;
