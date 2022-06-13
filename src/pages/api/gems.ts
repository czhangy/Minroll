// TS
import type { NextApiRequest, NextApiResponse } from "next";
import Gem from "@/models/Gem";
// Prisma
import prisma from "@/lib/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Handle GET /api/gems
    if (req.method === "GET") {
        try {
            // Fetch gems
            const gems: Gem[] = await prisma.gem.findMany({
                select: {
                    name: true,
                    src: true,
                    effect: true,
                },
                // Sort A -> Z
                orderBy: {
                    name: "asc",
                },
            });
            res.json(gems);
        } catch (err) {
            res.status(400).send({ success: false, message: err });
        }
    } else res.status(405).send({ success: false });
}
