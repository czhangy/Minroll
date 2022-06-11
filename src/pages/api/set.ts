// TS
import type { NextApiRequest, NextApiResponse } from "next";
import Set from "@/models/Set";
// Prisma
import prisma from "@/lib/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Handle GET /api/set
    if (req.method === "GET") {
        try {
            const set: Set | null = await prisma.set.findUnique({
                where: {
                    id: req.query.setId as string,
                },
                select: {
                    name: true,
                    twoPc: true,
                    threePc: true,
                    fourPc: true,
                    sixPc: true,
                },
            });
            res.json(set);
        } catch (err) {
            res.status(400).send({ success: false, message: err });
        }
    } else res.status(405).send({ success: false });
}
