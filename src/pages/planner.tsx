// Stylesheet
import styles from "@/styles/Planner/Planner.module.scss";
// TS
import { NextPage } from "next";
import Build from "@/models/Build";
import AuthContext from "@/models/AuthContext";
import { SyntheticEvent } from "react";
// Local components
import BuildPanel from "@/components/BuildPanel/BuildPanel";
import Dropdown from "@/components/Planner/Dropdown";
import GearPage from "@/components/Planner/GearPage";
import DescriptionPage from "@/components/Planner/DescriptionPage";
// React
import { useState } from "react";
// React Context
import { useAuth } from "@/contexts/AuthContext";
// Next
import Head from "next/head";

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
    const updateDescription = (e: SyntheticEvent) => {
        const newDescription: string = (e.target as HTMLTextAreaElement).value;
        setBuild({
            ...build,
            description: newDescription,
        });
    };

    // Page state
    const [page, setPage] = useState<number>(0);
    const goToPage = (newPage: number) => {
        setPage(newPage);
    };
    const renderPage = () => {
        if (page === 0) return <GearPage className={build.class} />;
        if (page === 2)
            return (
                <DescriptionPage
                    value={build.description as string}
                    onChange={updateDescription}
                />
            );
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

    // All classes
    const classNames = [
        "barbarian",
        "crusader",
        "demon-hunter",
        "monk",
        "necromancer",
        "witch-doctor",
        "wizard",
    ];

    return (
        <div id={styles.planner}>
            <Head>
                <title>Develop Your Build</title>
            </Head>
            <div id={styles["planner-build"]}>
                <Dropdown
                    content={classNames}
                    placeholder="Select a class..."
                    hasIcon={true}
                    onSelect={selectClass}
                />
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
                                key={i}
                            >
                                {name}
                            </button>
                        );
                    })}
                </nav>
                {renderPage()}
            </div>
        </div>
    );
};

export default Planner;
