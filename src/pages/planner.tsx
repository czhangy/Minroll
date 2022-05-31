// Stylesheet
import styles from "@/styles/Planner/Planner.module.scss";
// TS
import { NextPage } from "next";
import Build from "@/models/Build";
import AuthContext from "@/models/AuthContext";
import { SyntheticEvent } from "react";
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

    // Page state
    const [page, setPage] = useState<number>(0);
    const goToPage = (newPage: number) => {
        setPage(newPage);
    };

    // Handle submission
    const saveBuild = () => {
        if (validateBuild()) console.log(build);
    };
    const validateBuild: () => boolean = () => {
        let newErrors = {
            name: false,
            class: false,
            submit: false,
        };
        // Build name
        if (build.name.length === 0) newErrors.name = true;
        // Class selected
        if (!build.class) newErrors.class = true;
        return Object.values(newErrors).every((error) => !error);
    };

    // Page names
    const pageNames = ["Gear", "Skills", "Description"];

    return (
        <div id={styles.planner}>
            <div id={styles["planner-build"]}>
                <ClassDropdown onSelect={selectClass} />
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
            <div id={styles["planner-content"]}>
                <nav id={styles["content-nav"]}>
                    {pageNames.map((name, i) => {
                        return (
                            <button
                                className={`${styles["nav-button"]} ${
                                    page === i ? styles.active : ""
                                }`}
                                onClick={() => goToPage(i)}
                            >
                                {name}
                            </button>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
};

export default Planner;
