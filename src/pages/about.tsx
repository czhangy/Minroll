// Stylesheet
import styles from "@/styles/About/About.module.scss";
// TS
import { NextPage } from "next";
// Next
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const About: NextPage = () => {
    return (
        <div id={styles.about}>
            <Head>
                <title>About | Minroll</title>
            </Head>
            <div id={styles["about-container"]}>
                <h2 id={styles["about-header"]}>About Minroll</h2>
                <hr className={styles.separator} />
                <h4 className={styles["about-subheader"]}>The Project</h4>
                <div className={styles["about-content"]}>
                    <p className={styles["about-paragraph"]}>
                        First and foremost, Minroll is designed to be a
                        all-in-one application for the Diablo III community.
                        While this app is clearly an emulation of the popular
                        platform{" "}
                        <Link href="https://maxroll.gg">
                            <a className={styles["about-link"]}>Maxroll</a>
                        </Link>
                        , the goals set in mind for its development were
                        twofold: to create a more minimalistic platform that
                        focuses on providing <em>utility</em> over all else, and
                        to gear said platform towards the lesser-supported{" "}
                        <em>console</em> community. The utility that this app
                        provides is targeted towards players looking to push
                        console leaderboards, ignoring other aspects of the game
                        in favor of providing a more relevant experience to that
                        playerbase.
                    </p>
                    <p className={styles["about-paragraph"]}>
                        <strong>Warning, nerd stuff ahead.</strong> This
                        application was also built as a summer project by yours
                        truly. It was developed using Next.js, TypeScript, SASS,
                        Prisma, and PostgreSQL, hosted on Vercel, and enabled by
                        sources/tools like Maxroll and BlizzAPI. Building this
                        provided a lot of great experience in industry-relevant
                        technologies (don't look at the dumpster-fire of a
                        codebase though), and I hope it can be of use to those
                        that stumble across it!
                    </p>
                </div>
                <h4 className={styles["about-subheader"]}>The Developer</h4>
                <div className={styles["about-content"]}>
                    <p className={styles["about-paragraph"]}>
                        Hi, my name is Charles Zhang! As I write this, I'm a
                        rising senior studying Computer Science at UCLA,
                        interning with Capital One as TIP on the Auto Refinance
                        team for the summer. Outside of programming, I have a
                        passion for video games and am a massive Warriors fan
                        (currently riding the high of Curry's first FMVP), and I
                        do what I can to let these passions guide my work. As a
                        result, the vast majority of my projects aim to serve my
                        local communities, both in-person and online. If you're
                        looking to learn more about me, check out the links in
                        the footer below!
                    </p>
                    <p className={styles["about-paragraph"]}>
                        I'm a huge fan of Diablo III, and have been an active
                        member of the game's console community for over 4 years.
                        Diablo III is unique in that versions distributed on
                        console are significantly different than versions on PC.
                        Over my years of playing the game, I came to notice a
                        distinct lack of documentation of the console
                        experience, most notably, that the undisputed best build
                        on console is completely irrelevant on PC, and has been
                        for years. I decided that this project would attempt to
                        fill that void. Admittedly, I'm no Wudi or Raxx, so the
                        quality of information here isn't going to be
                        world-class. Over 4 years of gameplay, I peaked at #3 on
                        Monk leaderboards for maybe 12 hours. But hopefully,
                        it's a start.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
