// Prisma
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
// TS
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // For password hashing
    const bcrypt = require("bcrypt");
    // Handle POST /api/register
    if (req.method === "POST") {
        const { email, username, password } = req.body;
        // Create account
        try {
            const result = await prisma.user.create({
                data: {
                    username: username,
                    email: email,
                    password: bcrypt.hashSync(password, 10),
                },
            });
            res.json(result);
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                // Handle duplicate fields
                if (e.code === "P2002") {
                    // Duplicate username
                    if (e.message.includes("username"))
                        res.status(460).send({
                            success: false,
                            message: "Duplicate username",
                        });
                    // Duplicate email
                    else if (e.message.includes("email"))
                        res.status(461).send({
                            success: false,
                            message: "Duplicate email",
                        });
                } else res.status(400).send({ success: false });
            } else res.status(400).send({ success: false });
        }
        // Handle invalid methods
    } else res.status(405).send({ success: false });
}
