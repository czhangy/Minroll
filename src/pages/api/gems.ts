// TS
import type { NextApiRequest, NextApiResponse } from "next";
// BlizzAPI
import { BlizzAPI, RegionIdOrName } from "blizzapi";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Handle GET /api/gems
    if (req.method === "GET") {
        try {
            if (req.query.className) {
                // Init BAPI
                const api = new BlizzAPI({
                    region: "us" as RegionIdOrName,
                    clientId: process.env.BNET_ID as string,
                    clientSecret: process.env.BNET_SECRET as string,
                });
                // Fetch gems
                let gems: any = await api.query(
                    `/d3/data/item-type/upgradeablejewel`
                );
                gems = gems.filter((gem: any) => {
                    gem.slug !== "whisper-of-atonement";
                });
                gems = gems.map((gem: any) => {
                    return {
                        name: gem.name,
                        slug: gem.slug,
                        icon: gem.icon,
                    };
                });
                res.json(gems);
            } else {
                res.status(400).send({
                    success: false,
                    message: "Invalid request",
                });
            }
        } catch (err) {
            res.status(400).send({ success: false, message: err });
        }
    } else res.status(405).send({ success: false });
}
