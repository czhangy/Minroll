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

    // Build list state
    const [buildList, setBuildList] = useState<Build[]>([]);
    useEffect(() => {
        if (user)
            axios
                .get("/api/builds", { params: { id: user.id } })
                .then((response) => setBuildList(response.data))
                .catch((err) => console.log(err));
    }, [user]);

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
                    <h3 id={styles["content-header"]}>Your Builds</h3>
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
