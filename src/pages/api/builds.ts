// TS
import type { NextApiRequest, NextApiResponse } from "next";
import Build from "@/models/Build";
// Prisma
import prisma from "@/lib/prisma";

// Post a build to the DB
const postBuild = async (build: Build) => {
    const buildData = {
        gear: build.gear,
        skills: build.skills,
        passives: build.passives,
        cube: build.cube,
        gems: build.gems,
    };
    // Send to DB
    const response = await prisma.build.create({
        data: {
            name: build.name,
            class: build.class,
            description: build.description as string,
            data: JSON.stringify(buildData),
            userId: build.userId as string,
            timestamp: new Date(),
        },
    });
    return response;
};

// Fetch all builds by userId
const getBuildsByUser = async (id: string) => {
    const builds: Build[] = await prisma.build.findMany({
        where: {
            userId: id,
        },
        select: {
            id: true,
            name: true,
            class: true,
            timestamp: true,
        },
        orderBy: {
            timestamp: "desc",
        },
    });
    return builds;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Handle POST /api/builds
    if (req.method === "POST") {
        try {
            const response = await postBuild(JSON.parse(req.body.data.build));
            res.json(response);
        } catch (err) {
            console.log(err);
            res.status(400).send({ success: false, message: err });
        }
        // Handle GET /api/builds
    } else if (req.method === "GET") {
        try {
            const response: Build[] = await getBuildsByUser(
                req.query.id as string
            );
            res.json(response);
        } catch (err) {
            console.log(err);
            res.status(400).send({ success: false, message: err });
        }
    } else res.status(405).send({ success: false });
}
