// TS
import type { NextPage } from "next";
// Next
import Head from "next/head";
import Link from "next/link";
// Stylesheet
import styles from "@/styles/Home/Home.module.scss";

const Home: NextPage = () => {
    return (
        <div id={styles.home}>
            <Head>
                <title>Minroll</title>
            </Head>
            <div id={styles["home-container"]}>
                <p id={styles["home-text"]}>
                    Welcome to
                    <br />
                    <span id={styles["site-title"]}>Minroll</span>
                </p>
                <Link href="/login">
                    <a id={styles["get-started"]}>Get Started</a>
                </Link>
            </div>
        </div>
    );
};

export default Home;
