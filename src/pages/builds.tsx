// Stylesheet
import styles from "@/styles/Builds/Builds.module.scss";
// TS
import { NextPage } from "next";
import Build from "@/models/Build";
// Next
import Head from "next/head";
// Global components
import BuildCard from "@/components/Global/BuildCard";
import Pagination from "@/components/Global/Pagination";
// Prisma
import prisma from "@/lib/prisma";
// React
import { useState, useEffect } from "react";

type Props = {
    builds: Build[];
};

const Builds: NextPage<Props> = ({ builds }: Props) => {
    // List display state
    const [page, setPage] = useState<number>(1);
    const [currentList, setCurrentList] = useState<Build[]>([]);

    // Scroll to top on page change
    useEffect(() => window.scrollTo(0, 0), [page]);

    // Update build list on page change + master build list fetch/refetch
    useEffect(() => {
        // Handle case where deleting a build causes page overflow
        if (page > Math.ceil(builds.length / 5) && page !== 1)
            setPage(page - 1);
        setCurrentList(builds.slice((page - 1) * 5, page * 5));
    }, [page, builds]);

    return (
        <div id={styles.builds}>
            <Head>
                <title>Official Builds | Minroll</title>
            </Head>
            <div id={styles["builds-container"]}>
                <div id={styles["builds-header"]}>
                    <h2 id={styles["header-text"]}>Official Builds</h2>
                </div>
                <hr className={styles.separator} />
                <ul id={styles["builds-list"]}>
                    {currentList.map((build: Build, i: number) => {
                        return (
                            <li className={styles.build} key={i}>
                                <BuildCard build={build} />
                            </li>
                        );
                    })}
                </ul>
                <Pagination
                    page={page}
                    maxPage={Math.ceil(builds.length / 5)}
                    onPrev={() => setPage(page - 1)}
                    onNext={() => setPage(page + 1)}
                />
            </div>
        </div>
    );
};

export async function getStaticProps() {
    try {
        let builds: Build[] = await prisma.build.findMany({
            where: {
                userId: "cl3l5sriy0002ccwcskro6jwd",
            },
            orderBy: {
                timestamp: "desc",
            },
        });
        // Flatten JSON
        for (let i = 0; i < builds.length; i++) {
            const buildData = JSON.parse(builds[i].data as string);
            builds[i] = {
                ...builds[i],
                gear: buildData.gear,
                skills: buildData.skills,
                passives: buildData.passives,
                cube: buildData.cube,
                gems: buildData.gems,
            };
            delete builds[i].data;
            delete builds[i].timestamp;
        }
        return {
            props: { builds },
        };
    } catch (err) {
        console.log(err);
        return {
            props: {},
        };
    }
}

export default Builds;
