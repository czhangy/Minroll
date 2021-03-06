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
    // Hooks
    const { user } = useAuth() as AuthContext;
    const router = useRouter();

    // Constants
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
    const pageNames: string[] = ["Gear", "Skills", "Description"];
    const classNames: string[] = [
        "barbarian",
        "crusader",
        "demon-hunter",
        "monk",
        "necromancer",
        "witch-doctor",
        "wizard",
    ];

    // Component state
    const [build, setBuild] = useState<Build>(defaultBuild);
    const [gearList, setGearList] = useState<Gear[]>([]);
    const [skillList, setSkillList] = useState<Skill[]>([]);
    const [passiveList, setPassiveList] = useState<Skill[]>([]);
    const [gemList, setGemList] = useState<Gem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);
    const [error, setError] = useState<boolean>(false);
    const [buttonText, setButtonText] = useState<string>("SAVE");
    const [isModified, setIsModified] = useState<boolean>(true);

    // Build state modifiers => called from dropdowns/input fields
    const selectClass = (newClass: string) => {
        setBuild({
            ...build,
            class: newClass,
        });
        // Fetch all relevant data based on selected class
        fetchData(newClass);
    };
    const selectGear = (slot: string, item: Gear | null) => {
        setBuild({
            ...build,
            gear: {
                ...(build.gear as BuildGear),
                [slot]: item,
            },
        });
    };
    const selectCube = (slot: string, item: Gear | null) => {
        setBuild({
            ...build,
            cube: {
                ...(build.cube as BuildCube),
                [slot]: item,
            },
        });
    };
    const selectSkill = (ind: number, skill: Skill | null) => {
        // Fetch runes and save with skill
        if (skill)
            axios
                .get("/api/skills", {
                    params: { className: build.class, skillName: skill.slug },
                })
                .then((response) => {
                    skill.runeList = response.data;
                    // Set state of skills
                    const newSkills = [
                        ...build.skills!.slice(0, ind),
                        skill,
                        ...build.skills!.slice(ind + 1, 6),
                    ];
                    setBuild({
                        ...build,
                        skills: newSkills as (Skill | null)[],
                    });
                });
        else {
            // Clear rune list
            const newSkills = [
                ...build.skills!.slice(0, ind),
                null,
                ...build.skills!.slice(ind + 1, 6),
            ];
            setBuild({
                ...build,
                skills: newSkills as (Skill | null)[],
            });
        }
    };
    const selectRune = (ind: number, rune: Rune | null) => {
        let newSkill: Skill = build!.skills![ind] as Skill;
        newSkill.rune = rune;
        const newSkills = [
            ...build!.skills!.slice(0, ind),
            newSkill,
            ...build!.skills!.slice(ind + 1, 6),
        ];
        setBuild({
            ...build,
            skills: newSkills as (Skill | null)[],
        });
    };
    const selectPassive = (ind: number, passive: Skill | null) => {
        // Set state of passives
        const newPassives = [
            ...build.passives!.slice(0, ind),
            passive,
            ...build.passives!.slice(ind + 1, 4),
        ];
        setBuild({
            ...build,
            passives: newPassives as (Skill | null)[],
        });
    };
    const selectGem = (ind: number, gem: Gem | null) => {
        // Set state of gems
        const newGems = [
            ...build.gems!.slice(0, ind),
            gem,
            ...build.gems!.slice(ind + 1, 3),
        ];
        setBuild({
            ...build,
            gems: newGems as (Gem | null)[],
        });
    };
    const updateName = (e: SyntheticEvent) => {
        setBuild({
            ...build,
            name: (e.target as HTMLInputElement).value,
        });
    };
    const updateDescription = (e: SyntheticEvent) => {
        const newDescription: string = (e.target as HTMLTextAreaElement).value;
        setBuild({
            ...build,
            description: newDescription,
        });
    };

    // Fetch class data => called on class selection
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

    // Page navigation handler => render component based on page #
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

    // Submission handler => called on save button press
    const saveBuild = () => {
        // Redirect to login page if not logged in
        if (!user) {
            router.push("/login");
            return;
        }
        // Reset errors
        setError(false);
        if (validateBuild()) {
            // Disable save button (until build changes)
            setButtonText("SAVING");
            setIsModified(false);
            // Send request to backend
            axios({
                // PUT/POST based on if router.query.id exists
                method: router.query.id ? "PUT" : "POST",
                url: "/api/builds",
                data: {
                    build: JSON.stringify({
                        ...build,
                        // Include current user's ID as identifier
                        userId: (user as CurrentUser).id,
                    }),
                    id: router.query.id,
                },
            })
                .then((response) => {
                    setButtonText("SAVED!");
                    // Set planner to edit mode with recently saved build
                    router.replace({ query: { id: response.data.id } });
                    localStorage.setItem("bid", response.data.id);
                })
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

    // Reset planner to default state => called on reset button confirm
    const resetPlanner = () => {
        // Reset route
        router.replace({ query: null });
        // Reset state
        setBuild(defaultBuild);
        setGearList([]);
        setSkillList([]);
        setPassiveList([]);
        setButtonText("SAVE");
        setIsModified(true);
        // Reset local storage
        localStorage.setItem("build", JSON.stringify(defaultBuild));
        localStorage.removeItem("bid");
    };

    // Check local storage for a previous/redirected build
    useEffect(() => {
        const savedBuild: string | null = localStorage.getItem("build");
        const savedBID: string | null = localStorage.getItem("bid");
        if (savedBuild) setBuild(JSON.parse(savedBuild));
        if (savedBID) router.replace({ query: { id: savedBID } });
    }, []);
    // Fetch gem list at mount
    useEffect(() => {
        axios
            .get("/api/gems")
            .then((response) => setGemList(response.data))
            .catch((error) => console.log(error));
    }, []);
    // Re-enable save button + write to local storage on build change
    useEffect(() => {
        // Set button state
        setButtonText("SAVE");
        setIsModified(true);
        if (build.class || build.name)
            localStorage.setItem("build", JSON.stringify(build));
    }, [build]);

    return (
        <div id={styles.planner}>
            <Head>
                <title>Build Planner | Minroll</title>
            </Head>
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
                        onChange={updateName}
                    />
                    <button
                        id={styles["save-button"]}
                        onClick={saveBuild}
                        disabled={!isModified}
                    >
                        {buttonText}
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
                                onClick={() => setPage(i)}
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
