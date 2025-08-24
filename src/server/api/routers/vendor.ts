import { z } from "zod";
import { publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const vendorRouter = {

    getAll: publicProcedure.query(async () => {
        try {
            const vendors = await db.vendor.findMany({
                // include: {
                //     role: true,         // include role info
                //     business: true,     // include business (if linked)
                //     modules: true,      // include assigned modules
                //     store: true,        // include store details
                // },
                // orderBy: {
                //     createdAt: "desc",
                // },
            });
            return vendors;
        } catch (error) {
            console.error("Error fetching vendors:", error);
            throw new Error("Failed to fetch vendors");
        }
    }),







    getProfile: publicProcedure
        .input(z.object({ vendorId: z.string() })) // require lead ID
        .query(async ({ input }) => {
                // console.log('input========', input);

            try {
                const vendor = await db.vendor.findUnique({
                    where: { id: input?.vendorId },
                   
                });

                if (!vendor) return null;

                return {
                    profile: {
                        name: vendor.name,
                        email: vendor.email,
                        mobile: vendor.mobile,
                        createdAt: vendor.createdAt,
                        companyName: vendor.store?.name || "N/A",
                    },
                    wallet: vendor.wallet
                        ? {
                            balance: vendor.wallet.balance,
                            locked: vendor.wallet.lockedAmount,
                        }
                        : null,
                    storeInfo: vendor.store
                        ? {
                            storeId: vendor.store.id,
                            status: vendor.store.isActive ? "Open" : "Closed",
                        }
                        : null,
                };
            } catch (err) {
                console.error("Error in getVendorProfile:", err);
                throw err;
            }
        }),


















};
