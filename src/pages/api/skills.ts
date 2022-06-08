// TS
import type { NextApiRequest, NextApiResponse } from "next";
import Rune from "@/models/Rune";
import Skill from "@/models/Skill";
// BlizzAPI
import { BlizzAPI, RegionIdOrName } from "blizzapi";

const getRunesBySkill = async (className: string, skillName: string) => {
    // Init BAPI
    const api = new BlizzAPI({
        region: "us" as RegionIdOrName,
        clientId: process.env.BNET_ID as string,
        clientSecret: process.env.BNET_SECRET as string,
    });
    // Fetch runes
    let runes: any = await api.query(
        `/d3/data/hero/${className}/skill/${skillName}`
    );
    runes = runes.runes;
    runes = runes.map((rune: any) => {
        return {
            name: rune.name,
            type: rune.type,
            description: rune.description,
        };
    });
    return runes;
};

const getSkillsByClass = async (className: string) => {
    // Init BAPI
    const api = new BlizzAPI({
        region: "us" as RegionIdOrName,
        clientId: process.env.BNET_ID as string,
        clientSecret: process.env.BNET_SECRET as string,
    });
    // Fetch skills
    let skills: any = await api.query(`/d3/data/hero/${className}`);
    skills = skills.skills.active;
    skills = skills.map((skill: any) => {
        return {
            slug: skill.slug,
            icon: skill.icon,
            description: skill.description,
        };
    });
    return skills;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Handle GET /api/skills
    if (req.method === "GET") {
        try {
            if (req.query.skillName && req.query.className) {
                // Get all runes for a specific skill
                const runes: Rune[] = await getRunesBySkill(
                    req.query.className as string,
                    req.query.skillName as string
                );
                res.json(runes);
            } else if (req.query.className) {
                // Get all skills for a specific class
                const skills: Skill[] = await getSkillsByClass(
                    req.query.className as string
                );
                res.json(skills);
            } else {
                res.status(400).send({
                    success: false,
                    message: "Invalid request",
                });
            }
        } catch (err) {
            res.status(400).send({ success: false, message: err });
        }
        // Handle POST /api/gear
    } else res.status(405).send({ success: false });
}
