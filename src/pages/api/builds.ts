// TS
import type { NextApiRequest, NextApiResponse } from "next";
import Build from "@/models/Build";
// Prisma
import prisma from "@/lib/prisma";

// Post a build to the DB
const postBuild = async (build: Build) => {
    // Strip out gear names
    let gear: string[] = [];
    Object.keys(build.gear).forEach((key) => {
        if (build.gear[key as keyof typeof build.gear])
            gear.push(
                build.gear[key as keyof typeof build.gear]?.name as string
            );
        else gear.push("");
    });
    let cube: string[] = [];
    Object.keys(build.cube).forEach((key) => {
        if (build.cube[key as keyof typeof build.cube])
            cube.push(
                build.cube[key as keyof typeof build.cube]?.name as string
            );
        else cube.push("");
    });
    // Strip out slugs
    let skills: string[] = [];
    let runes: string[] = [];
    build.skills.map((skill) => {
        skills.push(skill ? skill.slug : "");
        runes.push(skill && skill.rune ? skill.rune.name : "");
    });
    let passives: string[] = [];
    for (const passive of build.passives)
        passives.push(passive ? passive.slug : "");
    let gems: string[] = [];
    for (const gem of build.gems) gems.push(gem ? gem.name : "");
    // Send to DB
    const response = await prisma.build.create({
        data: {
            name: build.name,
            class: build.class,
            description: build.description,
            gear: gear,
            cube: cube,
            skills: skills,
            runes: runes,
            passives: passives,
            gems: gems,
            userId: build.userId as string,
        },
    });
    return response;
};

// Fetch all builds by userId
const getBuildsByID = async (id: string) => {
    const builds: Build[] = await prisma.build.findMany({
        where: {
            userId: id,
        },
        select: {
            id: true,
            name: true,
            class: true,
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
            const response: Build[] = await getBuildsByID(
                req.query.id as string
            );
            res.json(response);
        } catch (err) {
            console.log(err);
            res.status(400).send({ success: false, message: err });
        }
    } else res.status(405).send({ success: false });
}
