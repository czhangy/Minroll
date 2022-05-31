// Stylesheet
import styles from "@/styles/Planner/Planner.module.scss";
// TS
import { NextPage } from "next";
import Build from "@/models/Build";
import AuthContext from "@/models/AuthContext";
import { SyntheticEvent } from "react";
import BuildErrors from "@/models/BuildErrors";
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

    // Build state
    const [build, setBuild] = useState<Build>({
        name: "",
        class: "",
        description: "",
        gear: [],
    });
    const nameBuild = (e: SyntheticEvent) => {
        setBuild({
            ...build,
            name: (e.target as HTMLInputElement).value,
        });
    };
    const selectClass = (newClass: string) => {
        setBuild({
            ...build,
            class: newClass,
        });
    };

    // Handle submission
    const saveBuild = () => {
        console.log(build);
    };

    // Error state
    const [errors, setErrors] = useState<BuildErrors>({
        name: false,
        class: false,
        submit: false,
    });

    return (
        <div id={styles.planner}>
            <div id={styles["planner-build"]}>
                <ClassDropdown onSelect={selectClass} error={errors.class} />
                <BuildPanel />
                <div id={styles["build-footer"]}>
                    <input
                        id={styles["build-name"]}
                        placeholder="Name your build!"
                        value={build.name}
                        onChange={nameBuild}
                    />
                    <button id={styles["save-button"]} onClick={saveBuild}>
                        SAVE
                    </button>
                </div>
            </div>
            <div id={styles["planner-content"]}></div>
        </div>
    );
};

export default Planner;
