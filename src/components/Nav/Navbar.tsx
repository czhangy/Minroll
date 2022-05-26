// Stylesheet
import styles from "@/styles/Nav/Navbar.module.scss";
// Next
import Link from "next/link";
import Image from "next/image";
// Local component
import NavMenu from "@/components/Nav/NavMenu";
// React Context
import { useAuth } from "@/contexts/AuthContext";
// TS
import AuthContext from "@/models/AuthContext";

const Navbar: React.FC = () => {
    const { user } = useAuth() as AuthContext;
    return (
        <div id={styles.navbar}>
            <div id={styles["navbar-container"]}>
                <Link href="/">
                    <a id={styles.logo} data-testid="home-link">
                        <div id={styles["logo-container"]}>
                            <Image
                                src="/images/logo.webp"
                                alt=""
                                height={60}
                                width={60}
                            />
                        </div>
                        <p id={styles["logo-text"]}>minroll</p>
                    </a>
                </Link>
                <nav id={styles.nav}>
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
                <NavMenu />
            </div>
        </div>
    );
};

export default Navbar;
