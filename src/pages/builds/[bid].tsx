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
        // Fetch build from DB using bid
        let build: Build | null = await prisma.build.findUnique({
            where: {
                id: bid as string,
            },
            select: {
                id: true,
                name: true,
                class: true,
                description: true,
                data: true,
                userId: true,
            },
        });
        // Parse build data
        const buildData = JSON.parse(build!.data as string);
        build = {
            ...build!,
            gear: buildData.gear,
            skills: buildData.skills,
            passives: buildData.passives,
            cube: buildData.cube,
            gems: buildData.gems,
        };
        // Fetch user from DB using userId
        const user: CurrentUser | null = await prisma.user.findUnique({
            where: {
                id: build!.userId as string,
            },
        });
        return {
            props: { build, user },
        };
    } catch (err) {
        console.log(err);
        return {
            props: {},
        };
    }
};

export default BuildDisplay;
