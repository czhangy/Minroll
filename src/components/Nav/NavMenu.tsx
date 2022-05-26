// Stylesheet
import styles from "@/styles/Nav/NavMenu.module.scss";
// React
import { useState } from "react";
// Next
import Link from "next/link";

const NavMenu: React.FC = () => {
    // Menu state
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const openMenu = () => setIsOpen(true);
    const closeMenu = () => setIsOpen(false);

    return (
        <>
            <button
                id={styles["menu-button"]}
                data-testid="menu-button"
                onClick={openMenu}
            >
                <hr className={styles["menu-icon-line"]} />
                <hr className={styles["menu-icon-line"]} />
                <hr className={styles["menu-icon-line"]} />
            </button>
            <div
                id={styles["nav-menu-overlay"]}
                className={`${isOpen ? styles.open : ""}`}
                onClick={closeMenu}
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
                    <Link href="/login">
                        <a className={styles["nav-link"]}>LOGIN</a>
                    </Link>
                </nav>
            </div>
        </>
    );
};

export default NavMenu;
