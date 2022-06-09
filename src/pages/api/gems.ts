// TS
import type { NextApiRequest, NextApiResponse } from "next";
import Gem from "@/models/Gem";
// BlizzAPI
import { BlizzAPI, RegionIdOrName } from "blizzapi";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const bannedGems = ["Whisper of Atonement", "Red Soul Shard"];
    // Handle GET /api/gems
    if (req.method === "GET") {
        try {
            // Init BAPI
            const api = new BlizzAPI({
                region: "us" as RegionIdOrName,
                clientId: process.env.BNET_ID as string,
                clientSecret: process.env.BNET_SECRET as string,
            });
            // Fetch gems
            const gems: any = await api.query(
                `/d3/data/item-type/upgradeablejewel`
            );
            let gemArray: Gem[] = [];
            for (let key of Object.keys(gems)) {
                if (
                    !gems[key].id.includes("PTR") &&
                    !bannedGems.includes(gems[key].name)
                )
                    gemArray.push({
                        name: gems[key].name,
                        slug: gems[key].slug,
                        icon: gems[key].icon,
                    });
            }
            res.json(gemArray);
        } catch (err) {
            res.status(400).send({ success: false, message: err });
        }
    } else res.status(405).send({ success: false });
}
