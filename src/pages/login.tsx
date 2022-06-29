// Stylesheet
import styles from "@/styles/Auth/Auth.module.scss";
// React
import { useState } from "react";
// Next
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
// TS
import { NextPage } from "next";
import AuthErrors from "@/models/AuthErrors";
import LoginUser from "@/models/LoginUser";
import CurrentUser from "@/models/CurrentUser";
import AuthContext from "@/models/AuthContext";
// Axios
import axios from "axios";
// React Context
import { useAuth } from "@/contexts/AuthContext";

const Login: NextPage = () => {
    // Hooks
    const router = useRouter();
    const { loginUser } = useAuth() as AuthContext;

    // Component state
    const [formData, setFormData] = useState<LoginUser>({
        username: "",
        password: "",
    });
    const [formErrors, setFormErrors] = useState<AuthErrors>({
        username: false,
        password: false,
        form: false,
    });

    // Form state modifier => called on input field change
    const updateForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue: string = e.target.value;
        const field: string = e.target.name;
        setFormData({
            ...formData,
            [field]: newValue,
        });
    };

    // Error state modifier => called on received error codes
    const updateError = (field: string, value: string) => {
        setFormErrors({
            ...formErrors,
            [field]: value,
        });
    };

    // Login handler
    const submitLogin = (e: React.FormEvent<HTMLFormElement>) => {
        // Prevent page refresh on click
        e.preventDefault();
        // Query DB with provided username + password
        axios
            .post("/api/login", formData)
            .then((response) => {
                // Build fetched user
                const currentUser: CurrentUser = {
                    id: response.data.id,
                    username: response.data.username,
                };
                // Set context
                loginUser(currentUser);
                // Direct to profile on login
                router.push("/profile");
            })
            .catch((error) => {
                // Parse error
                const errorCode: number = error.response.status;
                if (errorCode === 462)
                    updateError("username", error.response.data.message);
                else if (errorCode === 463)
                    updateError("password", error.response.data.message);
                else {
                    updateError(
                        "form",
                        "Something went wrong, try again later"
                    );
                }
                console.log(error);
            });
    };

    return (
        <div id={styles.auth}>
            <Head>
                <title>Login | Minroll</title>
            </Head>
            <form id={styles["auth-form"]} onSubmit={(e) => submitLogin(e)}>
                <h2 id={styles["form-header"]}>LOGIN</h2>
                <input
                    className={`${styles["form-input"]} ${
                        formErrors.username ? styles["error-input"] : ""
                    }`}
                    placeholder="Username"
                    name="username"
                    value={formData.username}
                    onChange={updateForm}
                    autoComplete="username"
                />
                {formErrors.username ? (
                    <p className={styles["error-text"]}>
                        {formErrors.username}
                    </p>
                ) : (
                    ""
                )}
                <input
                    className={`${styles["form-input"]} ${
                        formErrors.password ? styles["error-input"] : ""
                    }`}
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={updateForm}
                    autoComplete="current-password"
                />
                {formErrors.password ? (
                    <p className={styles["error-text"]}>
                        {formErrors.password}
                    </p>
                ) : (
                    ""
                )}
                <input
                    id={styles["submit-button"]}
                    type="submit"
                    value="LOGIN"
                    className={styles.active}
                />
                {formErrors.form ? (
                    <p
                        className={styles["error-text"]}
                        style={{ textAlign: "center" }}
                    >
                        {formErrors.form}
                    </p>
                ) : (
                    ""
                )}
                <div id={styles["nav-links"]}>
                    <Link href="/register">
                        <a className={styles["nav-link"]}>
                            REGISTER FOR AN ACCOUNT
                        </a>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
