// Stylesheet
import styles from "@/styles/Profile/Profile.module.scss";
// TS
import { NextPage } from "next";
import AuthContext from "@/models/AuthContext";
import CurrentUser from "@/models/CurrentUser";
import Build from "@/models/Build";
// React Context
import { useAuth } from "@/contexts/AuthContext";
// Next
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
// React
import { useState, useEffect } from "react";
// Axios
import axios from "axios";
// Local component
import BuildCard from "@/components/Profile/BuildCard";

const Profile: NextPage = () => {
    // Grab user
    const { user, logoutUser } = useAuth() as AuthContext;
    // Set up router for redirect
    const router = useRouter();

    // Handle log out
    const onLogout = () => {
        router.push("/");
        logoutUser();
    };

    // Loading state
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Build list state
    const [buildList, setBuildList] = useState<Build[]>([]);
    useEffect(() => {
        if (user) {
            setIsLoading(true);
            axios
                .get("/api/builds", { params: { id: user.id } })
                .then((response) => {
                    setBuildList(response.data);
                    setIsLoading(false);
                })
                .catch((err) => console.log(err));
        }
    }, [user]);

    // List display state
    const [page, setPage] = useState<number>(1);

    return (
        <div id={styles.profile}>
            <Head>
                <title>My Profile | Minroll</title>
            </Head>
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
                            ""
                        )}
                    </div>
                    <ul id={styles["builds-list"]}>
                        {buildList.map((build: Build, i: number) => {
                            return (
                                <li className={styles.build} key={i}>
                                    <BuildCard build={build} />
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Profile;
