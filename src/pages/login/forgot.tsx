// Stylesheet
import styles from "@/styles/Auth/Auth.module.scss";
// React
import { useState } from "react";
// Next
import Head from "next/head";
import Link from "next/link";
// TS
import { NextPage } from "next";

const Forgot: NextPage = () => {
    // Form state
    const [email, setEmail] = useState<string>("");
    const updateForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue: string = e.target.value;
        setEmail(newValue);
    };
    const clearForm = () => setEmail("");

    // Submit register form handler
    const submitForgotPassword = (e: React.FormEvent<HTMLFormElement>) => {
        // Prevent page refresh on click
        e.preventDefault();
        console.log(email);
        // Change button text and disable
        const button: HTMLInputElement = document.getElementById(
            styles["submit-button"]
        ) as HTMLInputElement;
        button.value = "SENT!";
        button.classList.remove(styles["active"]);
        button.disabled = true;
        // Clear form after submission
        clearForm();
    };

    return (
        <div id={styles.auth}>
            <Head>
                <title>Forgot Password</title>
            </Head>
            <form
                id={styles["auth-form"]}
                onSubmit={(e) => submitForgotPassword(e)}
            >
                <h2 id={styles["form-header"]}>FORGOT PASSWORD</h2>
                <input
                    className={styles["form-input"]}
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={updateForm}
                />
                <input
                    id={styles["submit-button"]}
                    type="submit"
                    value="SEND"
                    className={styles.active}
                />
                <div id={styles["nav-links"]}>
                    <Link href="/login">
                        <a className={styles["nav-link"]}>BACK TO LOGIN</a>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Forgot;
