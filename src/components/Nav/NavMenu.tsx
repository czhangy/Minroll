// Stylesheet
import styles from "@/styles/Nav/NavMenu.module.scss";
// React
import { useState } from "react";
// Next
import Link from "next/link";
// React Context
import { useAuth } from "@/contexts/AuthContext";
// TS
import AuthContext from "@/models/AuthContext";

const NavMenu: React.FC = () => {
    // Hook
    const { user } = useAuth() as AuthContext;

    // Component state
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    return (
        <>
            <button
                id={styles["menu-button"]}
                data-testid="menu-button"
                onClick={() => setMenuOpen(true)}
            >
                <hr className={styles["menu-icon-line"]} />
                <hr className={styles["menu-icon-line"]} />
                <hr className={styles["menu-icon-line"]} />
            </button>
            <div
                id={styles["nav-menu-overlay"]}
                className={`${menuOpen ? styles.open : ""}`}
                onClick={() => setMenuOpen(false)}
            >
                <nav id={styles["nav-menu"]}>
                    <Link href="/builds">
                        <a className={styles["nav-link"]}>BUILDS</a>
                    </Link>
                    <Link href="/tiers">
                        <a className={styles["nav-link"]}>TIERS</a>
                    </Link>
                    <Link href="/planner">
                        <a className={styles["nav-link"]}>PLANNER</a>
                    </Link>
                    <Link href="/about">
                        <a className={styles["nav-link"]}>ABOUT</a>
                    </Link>
                    {user ? (
                        <Link href="/profile">
                            <a className={styles["nav-link"]}>PROFILE</a>
                        </Link>
                    ) : (
                        <Link href={user ? "/profile" : "/login"}>
                            <a className={styles["nav-link"]}>
                                {user ? "PROFILE" : "LOGIN"}
                            </a>
                        </Link>
                    )}
                </nav>
            </div>
        </>
    );
};

export default NavMenu;
