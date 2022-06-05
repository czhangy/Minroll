// Stylesheet
import styles from "@/styles/Profile/Profile.module.scss";
// TS
import { NextPage } from "next";
import AuthContext from "@/models/AuthContext";
import CurrentUser from "@/models/CurrentUser";
// React Context
import { useAuth } from "@/contexts/AuthContext";
// Next
import { useRouter } from "next/router";
import Head from "next/head";

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

    return (
        <div id={styles.profile}>
            <Head>
                <title>Your Minroll Profile</title>
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
                        <li className={styles["placeholder"]}></li>
                        <li className={styles["placeholder"]}></li>
                        <li className={styles["placeholder"]}></li>
                        <li className={styles["placeholder"]}></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Profile;
