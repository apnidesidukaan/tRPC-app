import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
// import { useSession } from "next-auth/react";

// const { data: session } = useSession()
export const leadRouter = createTRPCRouter({




    // Create Lead
    create: publicProcedure
        .input(
            z.object({
                leadType: z.enum(["vendor", "deliveryAgent", "customer", "other"]), // match your LeadType enum
                name: z.string().min(2),
                email: z.string().email(),
                phone: z.string().min(10).max(15),
                companyName: z.string().optional(),
                address: z.string().optional(),
                drivingLicense: z.string().optional(),
                aadharNumber: z.string().optional(),
                panNumber: z.string().optional(),
                region: z.string().optional(), // adapt to your Region enum if exists
                source: z.enum(["referral", "web", "call", "other", "facebook", "google", "organic", "ads"]), // match LeadSource enum
                comments: z.string().optional(),
                modules: z.array(z.string()), // Module ids if any
                documents: z.array(z.string()).optional(), // file ids if any
            })
        )
        .mutation(async ({ ctx, input }) => {
            const userId = ctx.session?.user?.id;

            if (!userId) {
                throw new Error("Unauthorized");
            }

            const lead = await db.lead.create({
                data: {
                    leadType: input.leadType,
                    name: input.name,
                    email: input.email,
                    phone: input.phone,
                    companyName: input.companyName,
                    address: input.address,
                    drivingLicense: input.drivingLicense,
                    aadharNumber: input.aadharNumber,
                    panNumber: input.panNumber,
                    region: input.region,
                    source: input.source,
                    comments: input.comments,
                    assignedToId: userId, // default assign to current logged-in user
                    modules: {
                        connect: input.modules?.map((id) => ({ id })) ?? [],
                    },
                    documents: {
                        connect: input.documents?.map((id) => ({ id })) ?? [],
                    },
                },
            });

            return {
                status: 201,
                message: "Lead created successfully",
                data: lead,
            };
        }),

});
