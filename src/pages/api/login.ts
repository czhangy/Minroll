// Prisma
import prisma from "@/lib/prisma";
// TS
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // For password hashing
    const bcrypt = require("bcrypt");
    // Handle POST /api/login
    if (req.method === "POST") {
        const { username, password } = req.body;
        try {
            // Get user by username
            const result = await prisma.user.findUnique({
                where: {
                    username: username,
                },
            });
            // User not found
            if (result === null)
                res.status(462).send({
                    success: false,
                    message: "User not found",
                });
            // Check for password match
            else {
                if (bcrypt.compareSync(password, result.password))
                    res.json(result);
                // Wrong password
                else
                    res.status(463).send({
                        success: false,
                        message: "Incorrect password",
                    });
            }
        } catch {
            res.status(400).send({ success: false });
        }
        // Handle invalid methods
    } else res.status(405).send({ success: false });
}
