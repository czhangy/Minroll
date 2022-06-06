// TS
import type { NextApiRequest, NextApiResponse } from "next";
// BlizzAPI
import { BlizzAPI, RegionIdOrName } from "blizzapi";

const getSkillsByClass = async (className: string) => {
    // Init BAPI
    const api = new BlizzAPI({
        region: "us" as RegionIdOrName,
        clientId: process.env.BNET_ID as string,
        clientSecret: process.env.BNET_SECRET as string,
    });
    console.log(className);
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
    console.log(skills);
    return skills;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Handle GET /api/skills
    if (req.method === "GET") {
        try {
            if (req.query.className) {
                // Get all skills for a specific class
                const skills = await getSkillsByClass(
                    req.query.className as string
                );
                res.json(skills);
                // Get specific skill by name
            } else {
                console.log("Get by name");
            }
        } catch (err) {
            res.status(400).send({ success: false, message: err });
        }
        // Handle POST /api/gear
    } else res.status(405).send({ success: false });
}
