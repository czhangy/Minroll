// Stylesheet
import styles from "@/styles/Tiers/Tiers.module.scss";
// TS
import { NextPage } from "next";
import { SyntheticEvent } from "react";
import Build from "@/models/Build";
// Next
import Head from "next/head";
import Image from "next/image";
// React
import { useState } from "react";
// Prisma
import prisma from "@/lib/prisma";
// Global component
import FilterMenu from "@/components/Global/FilterMenu";
// Local component
import Tier from "@/components/Tiers/Tier";

type Props = {
    tierList: Object;
};

const Tiers: NextPage<Props> = ({ tierList }: Props) => {
    // Component state
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

    return (
        <div id={styles.tiers}>
            <Head>
                <title>Tier List | Minroll</title>
            </Head>
            <div id={styles["tiers-container"]}>
                <div id={styles["tiers-header"]}>
                    <h2 id={styles["header-text"]}>Official Tier List</h2>
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
                <ul id={styles["tier-list"]}>
                    {Object.keys(tierList).map((tier: string, i: number) => {
                        return (
                            <li className={styles.tier} key={i}>
                                <Tier
                                    tier={tier}
                                    builds={
                                        tierList[
                                            tier as keyof typeof tierList
                                        ] as unknown as Build[]
                                    }
                                    filter={filterOption}
                                ></Tier>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

// Fetch tier list from DB
export async function getStaticProps() {
    // Define tiers
    let tierList = {
        S: [] as Build[],
        A: [] as Build[],
        B: [] as Build[],
        C: [] as Build[],
        D: [] as Build[],
        F: [] as Build[],
    };
    // Fetch a given tier
    const fetchTier = async (tier: string) => {
        await prisma.build
            .findMany({
                where: {
                    tier: tier,
                },
                select: {
                    name: true,
                    class: true,
                    id: true,
                },
            })
            .then(
                (builds: Build[]) =>
                    (tierList[tier as keyof typeof tierList] = builds)
            );
    };
    try {
        // Await all tier fetches
        await Promise.all(Object.keys(tierList).map(fetchTier));
        return {
            props: { tierList },
        };
    } catch (err) {
        console.log(err);
        return {
            props: {},
        };
    }
}

export default Tiers;
