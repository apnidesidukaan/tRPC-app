import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const leadRouter = createTRPCRouter({

  // Create Lead
  create: publicProcedure
    .input(
      z.object({
        leadType: z.enum(["vendor", "deliveryAgent", "customer", "other"]),
        name: z.string().min(2),
        email: z.string().email(),
        phone: z.string().min(10).max(15),
        companyName: z.string().optional(),
        address: z.string().optional(),
        drivingLicense: z.string().optional(),
        aadharNumber: z.string().optional(),
        panNumber: z.string().optional(),
        region: z.string().optional(),
        source: z.enum([
          "referral",
          "web",
          "call",
          "other",
          "facebook",
          "google",
          "organic",
          "ads",
        ]),
        comments: z.string().optional(),
        modules: z.array(z.string()), // Module ids
        documents: z.array(z.string()).optional(), // file ids if any
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user?.id;
      if (!userId) {
        throw new Error("Unauthorized");
      }

      // Step 1: Create the lead
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
          assignedToId: userId,
        },
      });

      // Step 2: Store Lead → Modules in junction table
      if (input.modules && input.modules.length > 0) {
        await db.leadModule.createMany({
          data: input.modules.map((moduleId) => ({
            leadId: lead.id,
            moduleId: moduleId,
          })),
        });
      }

      // Step 3: Store Lead → Documents (if needed, also via junction or direct reference)
      // if (input.documents && input.documents.length > 0) {
      //   await db.leadDocument.createMany({
      //     data: input.documents.map((docId) => ({
      //       leadId: lead.id,
      //       documentId: docId,
      //     })),
      //   });
      // }

      return {
        status: 201,
        message: "Lead created successfully",
        data: lead,
      };
    }),

  getAllLeads: publicProcedure.query(async ({ ctx }) => {
    return await db.lead.findMany(); // make sure `db.lead` exists
  }),




});
