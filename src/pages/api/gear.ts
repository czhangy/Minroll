// TS
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Handle GET /api/gear
    if (req.method === "GET") {
        try {
            const q = await prisma.set.findUnique({
                where: {
                    name: "Embodiment of the Marauder",
                },
                include: {
                    items: true,
                },
            });
            res.json(q);
        } catch (err) {
            res.status(400).send({ success: false, message: err });
        }
        // Handle POST /api/gear
    } else if (req.method === "POST") {
        try {
        } catch (err) {
            res.status(400).send({ success: false, message: err });
        }
    } else res.status(405).send({ success: false });
}
