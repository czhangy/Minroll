// Stylesheet
import styles from "@/styles/Auth/Auth.module.scss";
// React
import { useState } from "react";
// Next
import Head from "next/head";
import Link from "next/link";
// TS
import { NextPage } from "next";
import LoginData from "@/models/LoginData";

const Login: NextPage = () => {
    // Form state
    const [formData, setFormData] = useState<LoginData>({
        username: "",
        password: "",
    });
    const updateForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue: string = e.target.value;
        const field: string = e.target.name;
        setFormData({
            ...formData,
            [field]: newValue,
        });
    };
    const clearForm = () => {
        setFormData({
            username: "",
            password: "",
        });
    };

    // Submit login form handler
    const submitLogin = (e: React.FormEvent<HTMLFormElement>) => {
        // Prevent page refresh on click
        e.preventDefault();
        console.log(formData);
        // Clear form after submission
        clearForm();
    };

    return (
        <div id={styles.auth}>
            <Head>
                <title>Log In to Minroll</title>
            </Head>
            <form id={styles["auth-form"]} onSubmit={(e) => submitLogin(e)}>
                <h2 id={styles["form-header"]}>LOGIN</h2>
                <input
                    className={styles["form-input"]}
                    placeholder="Username"
                    name="username"
                    value={formData.username}
                    onChange={updateForm}
                    autoComplete="username"
                />
                <input
                    className={styles["form-input"]}
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={updateForm}
                    autoComplete="current-password"
                />
                <input
                    id={styles["submit-button"]}
                    type="submit"
                    value="LOGIN"
                    className={styles.active}
                />
                <div
                    id={styles["nav-links"]}
                    style={{ justifyContent: "space-evenly" }}
                >
                    <Link href="/register">
                        <a className={styles["nav-link"]}>REGISTER</a>
                    </Link>
                    |
                    <Link href="/login/forgot">
                        <a className={styles["nav-link"]}>FORGOT PASSWORD</a>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
