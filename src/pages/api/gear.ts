// TS
import type { NextApiRequest, NextApiResponse } from "next";
// Prisma
import prisma from "@/lib/prisma";
import { create } from "domain";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Handle GET /api/gear
    if (req.method === "GET") {
        try {
        } catch (err) {
            res.status(400).send({ success: false, message: err });
        }
        // Handle POST /api/gear
    } else if (req.method === "POST") {
        const { name, category, rarity, effect, description, src } = req.body;
        const result = await prisma.gear.create({
            data: {
                name: name,
                category: category,
                rarity: rarity,
                effect: effect,
                description: description,
                src: src,
            },
        });
        res.json(result);
    } else res.status(405).send({ success: false });
}
