// Stylesheet
import styles from "@/styles/Planner/Planner.module.scss";
// TS
import { NextPage } from "next";
import Build from "@/models/Build";
import AuthContext from "@/models/AuthContext";
import { SyntheticEvent } from "react";
import Skill from "@/models/Skill";
import Gear from "@/models/Gear";
import Gem from "@/models/Gem";
import Rune from "@/models/Rune";
import CurrentUser from "@/models/CurrentUser";
import BuildGear from "@/models/BuildGear";
import BuildCube from "@/models/BuildCube";
// Local components
import BuildPanel from "@/components/BuildPanel/BuildPanel";
import Dropdown from "@/components/Planner/Dropdown";
import GearPage from "@/components/Planner/GearPage";
import SkillsPage from "@/components/Planner/SkillsPage";
import DescriptionPage from "@/components/Planner/DescriptionPage";
// React
import { useState, useEffect } from "react";
// React Context
import { useAuth } from "@/contexts/AuthContext";
// Next
import Head from "next/head";
import { useRouter } from "next/router";
// Axios
import axios from "axios";

const Planner: NextPage = () => {
    // Get user + router
    const { user } = useAuth() as AuthContext;
    const router = useRouter();

    // Build state
    const defaultBuild: Build = {
        name: "",
        class: "",
        description: "",
        gear: {
            head: null,
            shoulders: null,
            torso: null,
            hands: null,
            wrists: null,
            waist: null,
            legs: null,
            feet: null,
            neck: null,
            "left-finger": null,
            "right-finger": null,
            "main-hand": null,
            "off-hand": null,
        },
        cube: {
            weapon: null,
            armor: null,
            jewelry: null,
        },
        skills: new Array(6).fill(null),
        passives: new Array(4).fill(null),
        gems: new Array(3).fill(null),
    };
    const defaultRuneLists: Rune[][] = [[], [], [], [], [], []];
    const [build, setBuild] = useState<Build>(defaultBuild);
    const [runeLists, setRuneLists] = useState<Rune[][]>(defaultRuneLists);
    const selectClass = (newClass: string) => {
        setBuild({
            ...build,
            class: newClass,
        });
        fetchData(newClass);
    };
    const nameBuild = (e: SyntheticEvent) => {
        setBuild({
            ...build,
            name: (e.target as HTMLInputElement).value,
        });
    };
    const selectGear = (slot: string, item: Gear) => {
        setBuild({
            ...build,
            gear: {
                ...(build.gear as BuildGear),
                [slot]: item,
            },
        });
    };
    const selectCube = (slot: string, item: Gear) => {
        setBuild({
            ...build,
            cube: {
                ...(build.cube as BuildCube),
                [slot]: item,
            },
        });
    };
    const selectSkill = (ind: number, skill: Skill) => {
        // Fetch runes and set state
        axios
            .get("/api/skills", {
                params: { className: build.class, skillName: skill.slug },
            })
            .then((response) =>
                setRuneLists([
                    ...runeLists.slice(0, ind),
                    response.data,
                    ...runeLists.slice(ind + 1, 6),
                ])
            );
        // Set state of skills
        const newSkills: Array<Skill | null> = [
            ...build.skills!.slice(0, ind),
            skill,
            ...build.skills!.slice(ind + 1, 6),
        ];
        setBuild({
            ...build,
            skills: newSkills,
        });
    };
    const selectRune = (ind: number, rune: Rune) => {
        let newSkill: Skill = build.skills[ind] as Skill;
        newSkill.rune = rune;
        const newSkills: Array<Skill | null> = [
            ...build.skills.slice(0, ind),
            newSkill,
            ...build.skills.slice(ind + 1, 6),
        ];
        setBuild({
            ...build,
            skills: newSkills,
        });
    };
    const selectPassive = (ind: number, passive: Skill) => {
        // Set state of passives
        const newPassives: Array<Skill | null> = [
            ...build.passives.slice(0, ind),
            passive,
            ...build.passives.slice(ind + 1, 4),
        ];
        setBuild({
            ...build,
            passives: newPassives,
        });
    };
    const selectGem = (ind: number, gem: Gem) => {
        // Set state of gems
        const newGems: Array<Gem | null> = [
            ...build.gems.slice(0, ind),
            gem,
            ...build.gems.slice(ind + 1, 3),
        ];
        setBuild({
            ...build,
            gems: newGems,
        });
    };
    const updateDescription = (e: SyntheticEvent) => {
        const newDescription: string = (e.target as HTMLTextAreaElement).value;
        setBuild({
            ...build,
            description: newDescription,
        });
    };

    // Fetch previous build if it exists
    useEffect(() => {
        const savedBuild: string | null = localStorage.getItem("build");
        if (savedBuild) setBuild(JSON.parse(savedBuild));
        const savedRuneLists: string | null = localStorage.getItem("runeLists");
        if (savedRuneLists) setRuneLists(JSON.parse(savedRuneLists));
    }, []);

    // Fetch class data
    const fetchData = (className: string) => {
        setIsLoading(true);
        // Fetch gear
        const gear: Promise<void> = axios
            .get("/api/gear", { params: { className: className } })
            .then((response) => setGearList(response.data))
            .catch((error) => console.log(error));
        // Fetch skills
        const skills: Promise<void> = axios
            .get("/api/skills", { params: { className: className } })
            .then((response) => setSkillList(response.data))
            .catch((error) => console.log(error));
        // Fetch passives
        const passives: Promise<void> = axios
            .get("/api/passives", { params: { className: className } })
            .then((response) => setPassiveList(response.data))
            .catch((error) => console.log(error));
        // Loading complete
        Promise.all([gear, skills, passives]).then(() => setIsLoading(false));
    };

    // Page state
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Class data
    const [gearList, setGearList] = useState<Gear[]>([]);
    const [skillList, setSkillList] = useState<Skill[]>([]);
    const [passiveList, setPassiveList] = useState<Skill[]>([]);
    const [gemList, setGemList] = useState<Gem[]>([]);

    // Fetch gems at beginning
    useEffect(() => {
        axios
            .get("/api/gems")
            .then((response) => setGemList(response.data))
            .catch((error) => console.log(error));
    }, []);

    // Reset planner
    const resetPlanner = () => {
        // Reset state
        setBuild(defaultBuild);
        setRuneLists(defaultRuneLists);
        setGearList([]);
        setSkillList([]);
        setPassiveList([]);
        // Reset local storage
        localStorage.setItem("build", JSON.stringify(defaultBuild));
        localStorage.setItem("runeLists", JSON.stringify(defaultRuneLists));
    };

    // Page state
    const [page, setPage] = useState<number>(0);
    const [error, setError] = useState<boolean>(false);
    const goToPage = (newPage: number) => {
        setPage(newPage);
    };
    const renderPage = () => {
        if (page === 0)
            return (
                <GearPage
                    gearList={gearList}
                    gemList={gemList}
                    savedGear={build.gear as BuildGear}
                    savedCube={build.cube as BuildCube}
                    savedGems={build.gems as Gem[]}
                    onGearSelect={selectGear}
                    onCubeSelect={selectCube}
                    onGemSelect={selectGem}
                />
            );
        if (page === 1)
            return (
                <SkillsPage
                    skillList={skillList}
                    runeLists={runeLists}
                    passiveList={passiveList}
                    savedSkills={build.skills as Skill[]}
                    savedPassives={build.passives as Skill[]}
                    onSkillSelect={selectSkill}
                    onRuneSelect={selectRune}
                    onPassiveSelect={selectPassive}
                />
            );
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
        // Redirect if not logged in
        if (!user) {
            router.push("/login");
            return;
        }
        setError(false);
        if (validateBuild()) {
            const saveButton: HTMLButtonElement = document.getElementById(
                styles["save-button"]
            ) as HTMLButtonElement;
            saveButton.innerHTML = "SAVING";
            saveButton.disabled = true;
            axios
                .post("/api/builds", {
                    data: {
                        build: JSON.stringify({
                            ...build,
                            userId: (user as CurrentUser).id,
                        }),
                    },
                })
                .then(() => (saveButton.innerHTML = "SAVED!"))
                .catch((err) => console.log(err));
        } else setError(true);
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

    // Re-enable save button on build change
    useEffect(() => {
        const saveButton: HTMLButtonElement = document.getElementById(
            styles["save-button"]
        ) as HTMLButtonElement;
        saveButton.innerHTML = "SAVE";
        saveButton.disabled = false;
        // Save to local storage
        if (build.class || build.name) {
            localStorage.setItem("build", JSON.stringify(build));
            localStorage.setItem("runeLists", JSON.stringify(runeLists));
        }
    }, [build]);

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
                <title>Build Planner | Minroll</title>
            </Head>
            <p id={styles["planner-error"]}>
                Sorry!
                <br />
                <br />
                This page must be viewed on a larger screen.
            </p>
            <div id={styles["planner-build"]}>
                <Dropdown
                    content={classNames}
                    placeholder="Select a class..."
                    savedValue={build.class}
                    hasIcon={true}
                    onSelect={selectClass}
                    onReset={resetPlanner}
                    isLoading={isLoading}
                />
                <BuildPanel
                    gear={build.gear as BuildGear}
                    cube={build.cube as BuildCube}
                    skills={build.skills as Skill[]}
                    passives={build.passives as Skill[]}
                    gems={build.gems as Gem[]}
                />
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
                <p
                    id={styles["build-error"]}
                    className={error ? "" : styles.hidden}
                >
                    Please make sure you select a class and name your build.
                </p>
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
