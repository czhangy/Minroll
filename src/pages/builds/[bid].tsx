// Stylesheet
import styles from "@/styles/Builds/BuildDisplay.module.scss";
// TS
import { GetServerSideProps, NextPage } from "next";
import Build from "@/models/Build";
import Gem from "@/models/Gem";
import Skill from "@/models/Skill";
import BuildGear from "@/models/BuildGear";
import BuildCube from "@/models/BuildCube";
import CurrentUser from "@/models/CurrentUser";
// Prisma
import prisma from "@/lib/prisma";
// Next
import Image from "next/image";
import Head from "next/head";
// Local component
import BuildPanel from "@/components/BuildPanel/BuildPanel";
// BlizzAPI
import { BlizzAPI, RegionIdOrName } from "blizzapi";

type Props = {
    build: Build | null;
    user: CurrentUser | null;
};

const BuildDisplay: NextPage<Props> = ({ build, user }: Props) => {
    return (
        <div id={styles.container}>
            {build ? (
                <div id={styles["build-display"]}>
                    <Head>
                        <title>
                            {build.name} by {user?.username} | Minroll
                        </title>
                    </Head>
                    <div id={styles["display-header"]}>
                        <h2 id={styles["build-name"]}>{build.name}</h2>
                        <em id={styles.author}>by {user?.username}</em>
                    </div>
                    <div id={styles["display-content"]}>
                        <BuildPanel
                            gear={build.gear as BuildGear}
                            cube={build.cube as BuildCube}
                            skills={build.skills as (Skill | null)[]}
                            passives={build.passives as (Skill | null)[]}
                            gems={build.gems as (Gem | null)[]}
                        />
                        <p id={styles["build-desc"]}>{build.description}</p>
                    </div>
                </div>
            ) : (
                <div id={styles["loading-container"]}>
                    <Head>
                        <title>Loading Build... | Minroll</title>
                    </Head>
                    <Image
                        src="/icons/loading.gif"
                        alt=""
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
            )}
        </div>
    );
};

// Fetch post
export const getServerSideProps: GetServerSideProps = async (context) => {
    // Get build ID from route
    const { bid } = context.query;
    try {
        // Init BAPI
        const api = new BlizzAPI({
            region: "us" as RegionIdOrName,
            clientId: process.env.BNET_ID as string,
            clientSecret: process.env.BNET_SECRET as string,
        });
        // Fetch build from DB using bid
        const build: Build | null = await prisma.build.findUnique({
            where: {
                id: bid as string,
            },
            select: {
                id: true,
                name: true,
                class: true,
                description: true,
                gear: true,
                cube: true,
                skills: true,
                runes: true,
                passives: true,
                gems: true,
                userId: true,
            },
        });
        if (build) {
            // Fetch user from DB using userId
            const user: CurrentUser | null = await prisma.user.findUnique({
                where: {
                    id: build.userId!,
                },
            });
            // Get all build gear
            let gear: BuildGear = {
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
            };
            let gearInd: number = 0;
            for (const slot in gear) {
                if ((build.gear as string[])[gearInd])
                    gear[slot as keyof typeof gear] =
                        await prisma.gear.findUnique({
                            where: {
                                name: (build.gear as string[])[gearInd],
                            },
                        });
                gearInd++;
            }
            build.gear = gear;
            // Get all build skills
            let skills: (Skill | null)[] = [];
            for (let i = 0; i < 6; i++) {
                if ((build.skills as string[])[i] !== "") {
                    let skillData: any = await api.query(
                        `/d3/data/hero/${build!.class}/skill/${
                            (build.skills as string[])[i]
                        }`
                    );
                    // Fetch rune
                    let rune = null;
                    if ((build.runes as string[])[i] !== "") {
                        rune = skillData.runes.find(
                            (r: any) => r.name === (build.runes as string[])[i]
                        );
                    }
                    skillData = {
                        name: skillData.skill.name,
                        slug: skillData.skill.slug,
                        icon: skillData.skill.icon,
                        description: skillData.skill.description,
                        rune: rune,
                    };
                    skills.push(skillData);
                } else skills.push(null);
            }
            build.skills = skills;
            // Get all build passives
            let passives: (Skill | null)[] = [];
            for (let i = 0; i < 4; i++) {
                if ((build.passives as string[])[i] !== "") {
                    let passiveData: any = await api.query(
                        `/d3/data/hero/${build!.class}/skill/${
                            (build.passives as string[])[i]
                        }`
                    );
                    passiveData = {
                        name: passiveData.skill.name,
                        slug: passiveData.skill.slug,
                        icon: passiveData.skill.icon,
                        description: passiveData.skill.description,
                    };
                    passives.push(passiveData);
                } else passives.push(null);
            }
            build.passives = passives;
            // Get all build gems
            let gems: (Gem | null)[] = [];
            for (let i = 0; i < 3; i++) {
                const gem = await prisma.gem.findUnique({
                    where: {
                        name: (build.gems as string[])[i],
                    },
                });
                gems.push(gem);
            }
            build.gems = gems;
            // Get all build cube items
            let cube: BuildCube = {
                weapon: null,
                armor: null,
                jewelry: null,
            };
            let cubeInd: number = 0;
            for (const slot in cube) {
                if ((build!.cube! as string[])[cubeInd] !== null)
                    cube[slot as keyof typeof cube] =
                        await prisma.gear.findUnique({
                            where: {
                                name: (build!.cube as string[])[cubeInd],
                            },
                        });
                cubeInd++;
            }
            build!.cube = cube as any;

            return {
                props: { build, user },
            };
        } else
            return {
                props: {},
            };
    } catch (err) {
        console.log(err);
        return {
            props: {},
        };
    }
};

export default BuildDisplay;
