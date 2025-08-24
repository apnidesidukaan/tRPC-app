import { db } from "~/server/db";

export async function getManyByIds(
    ids: string[],
    type: string,
    options?: { limit?: number; skip?: number }
) {
    if (!ids?.length) return [];

    const { limit, skip } = options || {};

    switch (type) {
        case "module":
            return await db.module.findMany({
                where: { id: { in: ids } },
                // take: limit,
                // skip,
            });

        case "category":
            return await db.category.findMany({
                where: { id: { in: ids } },
                // take: limit,
                // skip,
            });

        case "product":
            return await db.product.findMany({
                where: { id: { in: ids } },
                // take: limit,
                // skip,
            });

        case "inventory":
            return await db.inventory.findMany({
                where: { id: { in: ids } },
                // take: limit,
                // skip,
            });

        default:
            return [];
    }
}
