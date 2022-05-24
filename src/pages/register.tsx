// Stylesheet
import styles from "@/styles/Auth/Auth.module.scss";
// React
import { useState } from "react";
// Next
import Head from "next/head";
import Link from "next/link";

const Register = () => {
    // Form state
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    });
    const updateForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        const field = e.target.name;
        setFormData({
            ...formData,
            [field]: newValue,
        });
    };
    const clearForm = () => {
        setFormData({
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
        });
    };

    // Submit register form handler
    const submitRegister = (e: React.FormEvent<HTMLFormElement>) => {
        // Prevent page refresh on click
        e.preventDefault();
        console.log(formData);
        // Clear form after submission
        clearForm();
    };

    return (
        <div id={styles.auth}>
            <Head>
                <title>Register to Minroll</title>
            </Head>
            <form id={styles["auth-form"]} onSubmit={(e) => submitRegister(e)}>
                <h2 id={styles["form-header"]}>REGISTER</h2>
                <input
                    className={styles["form-input"]}
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={updateForm}
                />
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
                    className={styles["form-input"]}
                    placeholder="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={updateForm}
                    autoComplete="current-password"
                />
                <input
                    id={styles["submit-button"]}
                    className={styles.active}
                    type="submit"
                    value="REGISTER"
                />
                <div id={styles["nav-links"]}>
                    <Link href="/login">
                        <a className={styles["nav-link"]}>GO TO LOGIN</a>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Register;
