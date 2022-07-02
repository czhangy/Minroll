// Stylesheet
import styles from "@/styles/Profile/Profile.module.scss";
// TS
import { NextPage } from "next";
import AuthContext from "@/models/AuthContext";
import CurrentUser from "@/models/CurrentUser";
import Build from "@/models/Build";
import { SyntheticEvent } from "react";
// React Context
import { useAuth } from "@/contexts/AuthContext";
// Next
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
// React
import { useState, useEffect } from "react";
// Axios
import axios from "axios";
// Global components
import BuildCard from "@/components/Global/BuildCard";
import Pagination from "@/components/Global/Pagination";
// Local component
import DeleteModal from "@/components/Profile/DeleteModal";
import SortMenu from "@/components/Profile/SortMenu";

const Profile: NextPage = () => {
    // Hooks
    const { user, logoutUser } = useAuth() as AuthContext;
    const router = useRouter();

    // Component state
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [buildList, setBuildList] = useState<Build[]>([]);
    const [currentList, setCurrentList] = useState<Build[]>([]);
    const [page, setPage] = useState<number>(1);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const [buildToDelete, setBuildToDelete] = useState<Build | null>(null);
    const [sortMenuOpen, setSortMenuOpen] = useState<boolean>(false);
    const [sortOption, setSortOption] = useState<string>("Most Recent");

    // Fetch user's builds => called on page load
    const fetchBuilds = () => {
        // Set loading state
        setIsLoading(true);
        // Fetch from DB using user ID
        axios
            .get("/api/builds", { params: { id: user!.id } })
            .then((response) => {
                setBuildList(response.data);
                setIsLoading(false);
            })
            .catch((err) => console.log(err));
    };

    // Delete the selected build => called from delete modal confirm
    const deleteBuild = () => {
        // Close delete modal
        setDeleteModalOpen(false);
        // Send DELETE request with build's ID
        axios
            .delete("/api/builds", { params: { id: buildToDelete!.id } })
            // Refetch the master list to refresh displayed builds
            .then(() => fetchBuilds())
            .catch((err) => console.log(err));
    };

    // Sort menu state modifiers
    const openSortMenu = (event: SyntheticEvent) => {
        // Safari focus workaround
        (event.target as HTMLButtonElement).focus();
        setSortMenuOpen(true);
    };
    const closeSortMenu = () => {
        // Allow buttons to be clicked before menu close
        setTimeout(() => setSortMenuOpen(false), 100);
    };

    // Handle log out => called on logout button press
    const onLogout = () => {
        logoutUser();
        router.push("/");
    };

    // Fetch current user's builds on page start
    useEffect(() => {
        if (user) fetchBuilds();
    }, [user]);

    // Jump to top on page change
    useEffect(() => {
        document.getElementById(styles["header-container"])!.scrollIntoView();
    }, [page]);

    // Update build list on page change + master build list fetch/refetch
    useEffect(() => {
        // Handle case where deleting a build causes page overflow
        if (page > Math.ceil(buildList.length / 5) && page !== 1)
            setPage(page - 1);
        setCurrentList(buildList.slice((page - 1) * 5, page * 5));
    }, [page, buildList]);

    // Sort builds by selected sort option
    useEffect(() => {
        let newList: Build[] = [...buildList];
        if (sortOption === "Most Recent")
            newList.sort((a: Build, b: Build) =>
                a.timestamp! < b.timestamp! ? 1 : -1
            );
        else if (sortOption === "Least Recent")
            newList.sort((a: Build, b: Build) =>
                a.timestamp! > b.timestamp! ? 1 : -1
            );
        else if (sortOption === "A → Z")
            newList.sort((a: Build, b: Build) => (a.name! > b.name! ? 1 : -1));
        else if (sortOption === "Z → A")
            newList.sort((a: Build, b: Build) => (a.name! < b.name! ? 1 : -1));
        setBuildList(newList);
    }, [sortOption]);

    // Redirect to /login if not logged in => client-side
    useEffect(() => {
        if (!user) router.push("/login");
    }, [user]);

    return (
        <div id={styles.profile}>
            <Head>
                <title>My Profile | Minroll</title>
            </Head>

            <DeleteModal
                open={deleteModalOpen}
                buildName={buildToDelete?.name}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={deleteBuild}
            />
            <div id={styles["profile-header"]}>
                <div id={styles["header-container"]}>
                    <h2 id={styles.username}>
                        {(user as CurrentUser)?.username}
                    </h2>
                    <button id={styles["logout-button"]} onClick={onLogout}>
                        Log Out
                    </button>
                </div>
            </div>
            <div id={styles["profile-content"]}>
                <div id={styles["content-container"]}>
                    <div id={styles["content-header"]}>
                        <div id={styles["header-left"]}>
                            <h3 id={styles["content-text"]}>Your Builds</h3>
                            {isLoading ? (
                                <div id={styles["loading-icon"]}>
                                    <Image
                                        src="/icons/loading.gif"
                                        alt="Loading"
                                        layout="fill"
                                        objectFit="contain"
                                    />
                                </div>
                            ) : (
                                <div id={styles["menu-container"]}>
                                    <button
                                        id={styles["menu-button"]}
                                        onClick={(event: SyntheticEvent) =>
                                            openSortMenu(event)
                                        }
                                        onBlur={closeSortMenu}
                                    >
                                        <p id={styles["sort-option"]}>
                                            {sortOption}
                                        </p>
                                        <div id={styles["sort-icon"]}>
                                            <Image
                                                src="/icons/sort.svg"
                                                alt=""
                                                layout="fill"
                                                objectFit="contain"
                                            />
                                        </div>
                                    </button>
                                    <SortMenu
                                        open={sortMenuOpen}
                                        selected={sortOption}
                                        onSelect={(option: string) =>
                                            setSortOption(option)
                                        }
                                    />
                                </div>
                            )}
                        </div>
                        <Link href="/planner">
                            <a id={styles["planner-link"]}>
                                <div id={styles["link-icon"]}>
                                    <Image
                                        src="/icons/plus.svg"
                                        alt=""
                                        layout="fill"
                                        objectFit="contain"
                                    />
                                </div>
                                New Build
                            </a>
                        </Link>
                    </div>
                    {buildList.length > 0 ? (
                        <ul id={styles["builds-list"]}>
                            {currentList.map((build: Build, i: number) => {
                                return (
                                    <li className={styles.build} key={i}>
                                        <BuildCard
                                            build={build}
                                            onDelete={(build: Build) => {
                                                setBuildToDelete(build);
                                                setDeleteModalOpen(true);
                                            }}
                                        />
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <p id={styles["alt-text"]}>
                            You haven&apos;t saved any builds yet!
                        </p>
                    )}
                    {buildList.length > 5 ? (
                        <Pagination
                            page={page}
                            maxPage={Math.ceil(buildList.length / 5)}
                            onPrev={() => setPage(page - 1)}
                            onNext={() => setPage(page + 1)}
                        />
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
