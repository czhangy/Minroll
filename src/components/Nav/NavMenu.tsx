// Stylesheet
import styles from "@/styles/Nav/NavMenu.module.scss";
// React
import { useState } from "react";
// Next
import Link from "next/link";

const NavMenu = () => {
    // Menu state
    const [isOpen, setIsOpen] = useState(false);
    const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        (event.target as HTMLButtonElement).focus();
        setIsOpen(true);
    };
    const closeMenu = () => setTimeout(() => setIsOpen(false), 50);

    return (
        <>
            <button
                id={styles["menu-button"]}
                data-testid="menu-button"
                onClick={openMenu}
                onBlur={closeMenu}
            >
                <hr className={styles["menu-icon-line"]} />
                <hr className={styles["menu-icon-line"]} />
                <hr className={styles["menu-icon-line"]} />
            </button>
            <div
                id={styles["nav-menu-overlay"]}
                className={`${isOpen ? styles.open : ""}`}
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
                    <Link href="/login">
                        <a className={styles["nav-link"]}>LOGIN</a>
                    </Link>
                </nav>
            </div>
        </>
    );
};

export default NavMenu;
