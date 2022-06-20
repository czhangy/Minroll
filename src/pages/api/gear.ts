// TS
import type { NextApiRequest, NextApiResponse } from "next";
import ClassMap from "@/models/ClassMap";
// Prisma
import prisma from "@/lib/prisma";

// Fetch all items by class
const getGearByClass = async (className: string) => {
    const exclusiveCategories = [
        "mighty-belt",
        "mighty-weapon",
        "crusader-shield",
        "flail",
        "hand-crossbow",
        "cloak",
        "quiver",
        "spirit-stone",
        "daibo",
        "fist-weapon",
        "source",
        "wizard-hat",
        "wand",
        "voodoo-mask",
        "mojo",
        "ceremonial-knife",
        "phylactery",
        "scythe",
    ];

    const classExclusives: ClassMap = {
        barbarian: ["mighty-belt", "mighty-weapon"],
        crusader: ["crusader-shield", "flail"],
        "demon-hunter": ["hand-crossbow", "cloak", "quiver"],
        monk: ["spirit-stone", "daibo", "fist-weapon"],
        necromancer: ["phylactery", "scythe"],
        "witch-doctor": ["voodoo-mask", "mojo", "ceremonial-knife"],
        wizard: ["source", "wand", "wizard-hat"],
    };

    const classBans: ClassMap = {
        barbarian: ["staff", "bow", "crossbow"],
        crusader: ["staff", "bow", "crossbow"],
        "demon-hunter": [],
        monk: [],
        necromancer: ["bow", "crossbow", "polearm"],
        "witch-doctor": [],
        wizard: ["polearm"],
    };

    let gear = await prisma.gear.findMany({
        // Get gear that is valid for className
        where: {
            OR: [
                // Class category exclusives
                {
                    category: {
                        in: classExclusives[className],
                    },
                },
                // Class name exclusives by effect/set
                {
                    classes: {
                        hasEvery: [className],
                    },
                },
                // Universal gear
                {
                    AND: {
                        classes: {
                            equals: null,
                        },
                        NOT: {
                            OR: {
                                category: {
                                    in: exclusiveCategories.concat(
                                        classBans[className]
                                    ),
                                },
                            },
                        },
                    },
                },
            ],
        },
        // Sort A -> Z
        orderBy: {
            name: "asc",
        },
    });
    // Handle DH 2-handed edge-cases
    if (className === "demon-hunter")
        gear = gear.filter(
            (item) =>
                item.slot !== "two-hand" ||
                item.category === "bow" ||
                item.category === "crossbow"
        );
    return gear;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Handle GET /api/gear
    if (req.method === "GET") {
        try {
            if (req.query.className) {
                // Get all items valid for a specific class
                const gear = await getGearByClass(
                    req.query.className as string
                );
                res.json(gear);
                // Get specific item by ID
            }
        } catch (err) {
            res.status(400).send({ success: false, message: err });
        }
    } else res.status(405).send({ success: false });
}
