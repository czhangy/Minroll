// TS
import type { NextApiRequest, NextApiResponse } from "next";

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
        try {
        } catch (err) {
            res.status(400).send({ success: false, message: err });
        }
    } else res.status(405).send({ success: false });
}
