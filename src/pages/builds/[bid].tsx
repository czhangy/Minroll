// Stylesheet
import styles from "@/styles/Builds/BuildDisplay.module.scss";
// TS
import { GetServerSideProps, NextPage } from "next";
import Build from "@/models/Build";
import CurrentUser from "@/models/CurrentUser";
// Prisma
import prisma from "@/lib/prisma";
// Next
import Image from "next/image";

type Props = {
    build: Build | null;
    user: CurrentUser | null;
};

const BuildDisplay: NextPage<Props> = ({ build, user }: Props) => {
    return (
        <div id={styles.container}>
            {build ? (
                <div
                    id={styles["build-display"]}
                    className={build ? "" : styles.loading}
                >
                    <div id={styles["display-header"]}>
                        <h2 id={styles["build-name"]}>{build.name}</h2>
                        <em id={styles.author}>by {user?.username}</em>
                    </div>
                </div>
            ) : (
                <div id={styles["loading-container"]}>
                    <Image
                        src="/icons/loading.gif"
                        alt=""
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
            )}
        </div>
    );
};

// Fetch post
export const getServerSideProps: GetServerSideProps = async (context) => {
    // Get build ID from route
    const { bid } = context.query;
    try {
        // Fetch build from DB using bid
        const build = await prisma.build.findUnique({
            where: {
                id: bid as string,
            },
        });
        // Fetch user from DB using userId
        const user = await prisma.user.findUnique({
            where: {
                id: build!.userId,
            },
        });
        return {
            props: { build, user },
        };
    } catch (err) {
        console.log(err);
        return {
            props: { build: null },
        };
    }
};

export default BuildDisplay;
