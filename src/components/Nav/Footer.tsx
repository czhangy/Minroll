// Stylesheet
import styles from "@/styles/Nav/Footer.module.scss";
// Next
import Link from "next/link";
import Image from "next/image";

const Footer: React.FC = () => {
    return (
        <div id={styles.footer}>
            <div id={styles["footer-container"]}>
                <div id={styles.credits}>
                    <div id={styles["profile-pic"]}>
                        <Image
                            src="/images/profile.jpeg"
                            alt=""
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>
                    <p id={styles["credits-text"]}>
                        Developed by
                        <br />
                        <Link href="https://czhangy.io">
                            <a id={styles["site-link"]}>Charles Zhang</a>
                        </Link>
                    </p>
                </div>
                <div id={styles.socials}>
                    <Link href="https://github.com/czhangy">
                        <a className={styles["social-link"]}>
                            <Image
                                src="/icons/github.svg"
                                alt="GitHub"
                                layout="fill"
                                objectFit="contain"
                            />
                        </a>
                    </Link>
                    <Link href="https://linkedin.com/in/czhangy">
                        <a className={styles["social-link"]}>
                            <Image
                                src="/icons/linkedin.svg"
                                alt="LinkedIn"
                                layout="fill"
                                objectFit="contain"
                            />
                        </a>
                    </Link>
                    <Link href="https://twitter.com/czhangy_">
                        <a className={styles["social-link"]}>
                            <Image
                                src="/icons/twitter.svg"
                                alt="LinkedIn"
                                layout="fill"
                                objectFit="contain"
                            />
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Footer;
