// Stylesheet
import styles from "@/styles/Builds/Builds.module.scss";
// TS
import { NextPage } from "next";
import Build from "@/models/Build";
import { SyntheticEvent } from "react";
// Next
import Head from "next/head";
import Image from "next/image";
// Global components
import BuildCard from "@/components/Global/BuildCard";
import Pagination from "@/components/Global/Pagination";
// Local component
import FilterMenu from "@/components/Builds/FilterMenu";
// Prisma
import prisma from "@/lib/prisma";
// React
import { useState, useEffect } from "react";

type Props = {
    builds: Build[]; // Official builds, fetched from DB
};

const Builds: NextPage<Props> = ({ builds }: Props) => {
    // Component state
    const [page, setPage] = useState<number>(1);
    const [currentList, setCurrentList] = useState<Build[]>([]);
    const [filteredList, setFilteredList] = useState<Build[]>([]);
    const [filterMenuOpen, setFilterMenuOpen] = useState<boolean>(false);
    const [filterOption, setFilterOption] = useState<string>("");

    // Filter menu state modifiers
    const openFilterMenu = (event: SyntheticEvent) => {
        // Safari focus workaround
        (event.target as HTMLButtonElement).focus();
        setFilterMenuOpen(true);
    };
    const closeFilterMenu = () => {
        // Allow nav links to be clicked before menu close
        setTimeout(() => setFilterMenuOpen(false), 100);
    };

    // Capitalize words and remove spaces from class name => called for display
    const formatClassName = (name: string) => {
        const words = name.replace(/-/g, " ").split(" ");
        return words
            .map((word) => word[0].toUpperCase() + word.substring(1))
            .join(" ");
    };

    // Jump to top on page change
    useEffect(() => window.scrollTo(0, 0), [page]);
    // Filter master builds list => change when filter changes or when builds changes
    useEffect(() => {
        setFilteredList(
            builds.filter((build: Build) => build.class.includes(filterOption))
        );
    }, [builds, filterOption]);
    // Set visible builds => change on page change or filter change
    useEffect(() => {
        // Handle case where deleting a build causes page overflow
        if (page > Math.ceil(filteredList.length / 5) && page !== 1)
            setPage(page - 1);
        setCurrentList(filteredList.slice((page - 1) * 5, page * 5));
    }, [page, filteredList]);

    return (
        <div id={styles.builds}>
            <Head>
                <title>Official Builds | Minroll</title>
            </Head>
            <div id={styles["builds-container"]}>
                <div id={styles["builds-header"]}>
                    <h2 id={styles["header-text"]}>Official Builds</h2>
                    <div id={styles["menu-container"]}>
                        {filterOption !== "" ? (
                            <button
                                id={styles["x-icon"]}
                                onClick={() => setFilterOption("")}
                            >
                                <Image
                                    src="/icons/x.svg"
                                    alt=""
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </button>
                        ) : (
                            ""
                        )}
                        <button
                            id={styles["menu-button"]}
                            onClick={(event: SyntheticEvent) =>
                                openFilterMenu(event)
                            }
                            onBlur={closeFilterMenu}
                        >
                            <p id={styles["filter-option"]}>
                                {filterOption === ""
                                    ? "Filter By..."
                                    : formatClassName(filterOption)}
                            </p>
                            <div id={styles["filter-icon"]}>
                                <Image
                                    src="/icons/filter.svg"
                                    alt=""
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </div>
                        </button>
                        <FilterMenu
                            open={filterMenuOpen}
                            selected={filterOption}
                            onSelect={(option: string) =>
                                setFilterOption(option)
                            }
                        />
                    </div>
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
                    maxPage={Math.ceil(filteredList.length / 5)}
                    onPrev={() => setPage(page - 1)}
                    onNext={() => setPage(page + 1)}
                />
            </div>
        </div>
    );
};

// Fetch builds from DB
export async function getStaticProps() {
    try {
        // Fetch all builds created by admin, sorted from newest to oldest
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
            // Delete excess fields
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
