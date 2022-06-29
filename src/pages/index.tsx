// TS
import type { NextPage } from "next";
import AuthContext from "@/models/AuthContext";
// Next
import Head from "next/head";
import Link from "next/link";
// Stylesheet
import styles from "@/styles/Home/Home.module.scss";
// React Context
import { useAuth } from "@/contexts/AuthContext";

const Home: NextPage = () => {
    // Hook
    const { user } = useAuth() as AuthContext;

    return (
        <div id={styles.home}>
            {/* Metadata */}
            <Head>
                <title>Home | Minroll</title>
            </Head>
            <div id={styles["home-container"]}>
                {/* Main text */}
                <p id={styles["home-text"]}>
                    Welcome to
                    <br />
                    <span id={styles["site-title"]}>Minroll</span>
                </p>
                {/* Link to login/profile (based on user status) */}
                <Link href={user ? "/profile" : "/login"}>
                    <a id={styles["get-started"]}>Get Started</a>
                </Link>
            </div>
        </div>
    );
};

export default Home;
