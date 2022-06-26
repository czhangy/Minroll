// TS
import type { NextApiRequest, NextApiResponse } from "next";
import Build from "@/models/Build";
// Prisma
import prisma from "@/lib/prisma";

// Post a build to the DB
const postBuild = async (build: Build, id?: string) => {
    const buildData = {
        gear: build.gear,
        skills: build.skills,
        passives: build.passives,
        cube: build.cube,
        gems: build.gems,
    };
    // Send to DB
    const response = await prisma.build.upsert({
        where: {
            id: id ? id : "",
        },
        update: {
            name: build.name,
            class: build.class,
            description: build.description as string,
            data: JSON.stringify(buildData),
            userId: build.userId as string,
            timestamp: new Date(),
        },
        create: {
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
    let builds: Build[] = await prisma.build.findMany({
        where: {
            userId: id,
        },
        orderBy: {
            timestamp: "desc",
        },
    });
    // Flatten JSON
    for (let i = 0; i < builds.length; i++) {
        const buildData = JSON.parse(builds[i].data as string);
        builds[i] = {
            ...builds[i],
            gear: buildData.gear,
            skills: buildData.skills,
            passives: buildData.passives,
            cube: buildData.cube,
            gems: buildData.gems,
        };
        delete builds[i].data;
    }
    return builds;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Handle POST /api/builds
    if (req.method === "POST") {
        try {
            const response = await postBuild(JSON.parse(req.body.build));
            res.json(response);
        } catch (err) {
            console.log(err);
            res.status(400).send({ success: false, message: err });
        }
        // Handle GET /api/builds
    } else if (req.method === "GET") {
        try {
            // Fetch current user's builds
            const response: Build[] = await getBuildsByUser(
                req.query.id as string
            );
            res.json(response);
        } catch (err) {
            console.log(err);
            res.status(400).send({ success: false, message: err });
        }
        // Handle DELETE /api/builds
    } else if (req.method === "DELETE") {
        try {
            const response = await prisma.build.delete({
                where: {
                    id: req.query.id as string,
                },
            });
            res.json(response);
        } catch (err) {
            console.log(err);
            res.status(400).send({ success: false, message: err });
        }
        // Handle PUT /api/builds
    } else if (req.method === "PUT") {
        try {
            const response = await postBuild(
                JSON.parse(req.body.build),
                req.body.id
            );
            res.json(response);
        } catch (err) {
            console.log(err);
            res.status(400).send({ success: false, message: err });
        }
    } else res.status(405).send({ success: false });
}
