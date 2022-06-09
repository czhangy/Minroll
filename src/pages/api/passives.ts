// TS
import type { NextApiRequest, NextApiResponse } from "next";
// BlizzAPI
import { BlizzAPI, RegionIdOrName } from "blizzapi";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Handle GET /api/passives
    if (req.method === "GET") {
        try {
            if (req.query.className) {
                // Init BAPI
                const api = new BlizzAPI({
                    region: "us" as RegionIdOrName,
                    clientId: process.env.BNET_ID as string,
                    clientSecret: process.env.BNET_SECRET as string,
                });
                // Fetch passives
                let passives: any = await api.query(
                    `/d3/data/hero/${req.query.className}`
                );
                passives = passives.skills.passive;
                passives = passives.map((passive: any) => {
                    return {
                        name: passive.name,
                        slug: passive.slug,
                        icon: passive.icon,
                        description: passive.description,
                    };
                });
                res.json(passives);
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
