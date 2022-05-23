// Stylesheet
import styles from "@/styles/Nav/Footer.module.scss";
// Next
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
    return (
        <div id={styles.footer}>
            <div id={styles["footer-container"]}>
                <div id={styles.credits}>
                    <div id={styles["profile-pic"]}>
                        <Image
                            src="/images/profile.jpeg"
                            alt=""
                            height={80}
                            width={80}
                        />
                    </div>
                    <p id={styles["credits-text"]}>
                        Developed by
                        <br />
                        Charles Zhang
                    </p>
                </div>
                <div id={styles.socials}>
                    <Link href="https://github.com/czhangy">
                        <a className={styles["social-link"]}>
                            <Image
                                src="/icons/github.svg"
                                alt="GitHub"
                                height={40}
                                width={40}
                            />
                        </a>
                    </Link>
                    <Link href="https://linkedin.com/in/czhangy">
                        <a className={styles["social-link"]}>
                            <Image
                                src="/icons/linkedin.svg"
                                alt="LinkedIn"
                                height={40}
                                width={40}
                            />
                        </a>
                    </Link>
                    <Link href="https://twitter.com/czhangy_">
                        <a
                            className={styles["social-link"]}
                            style={{ height: "30px" }}
                        >
                            <Image
                                src="/icons/twitter.svg"
                                alt="LinkedIn"
                                height={30}
                                width={40}
                            />
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Footer;
