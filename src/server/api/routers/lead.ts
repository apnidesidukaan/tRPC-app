import bcrypt from "bcryptjs";
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
        await db.requestedModule.createMany({
          data: input.modules.map((moduleId) => ({
            moduleId,
            // assign either leadId or vendorId depending on context
            requester: lead.id ?? null,
            // vendorId:  null,
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










  getLeadModules: publicProcedure
    .input(z.object({ leadId: z.string() })) // require lead ID
    .query(async ({ input }) => {
      // Fetch all module IDs for this lead from the junction table
      const leadModules = await db.requestedModule.findMany({
        where: { requester: input.leadId },
        select: { moduleId: true }, // just get the module IDs
      });

      // If you want full module details, fetch them from Module table
      const moduleIds = leadModules.map((lm) => lm.moduleId);

      const modules = await db.module.findMany({
        where: { id: { in: moduleIds } },
      });

      return modules; // array of module objects
    }),










  convertLeadToVendor: protectedProcedure
    .input(
      z.object({
        leadId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { leadId } = input;

      // Step 1: Find the lead
      const lead = await db.lead.findUnique({
        where: { id: leadId },
        include: { modules: true }, // include leadModule relations if needed
      });

      if (!lead) {
        throw new Error("Lead not found");
      }

      // Step 2: Get role ID for 'vendor'
      const vendorRole = await db.role.findFirst({ where: { name: "vendor" } });
      if (!vendorRole) {
        throw new Error("Vendor role not found in Role table");
      }

      // Step 3: Hash default password
      const hashedPassword = await bcrypt.hash("123", 10);

      // Step 4: Create vendor
      const newVendor = await db.vendor.create({
        data: {
          name: lead.name,
          email: lead.email,
          password: hashedPassword,
          // phone: lead.phone,
          addressStreet: lead.address,
          // roleId: vendorRole.id,
          role: {
            connect: { id: vendorRole.id }, // explicitly connect the role
          },
          agreementCheck: true,
          vendorType: lead?.details?.businessType || 'retailer_product',
          mobile: lead.phone,
        },
      });

      // Step 5: Create associated store
      const moduleIds = await db.requestedModule.findMany({
        where: { requester: lead.id },
        select: { moduleId: true },
      });

      // console.log('===========================', newVendor);
      const newStore = await db.store.create({
        data: {
          vendorId: newVendor.id,
          mobile: newVendor.mobile,
          name: lead.companyName || "Store",
          // modules: {   // 👈 lowercase "modules", matches schema field
          //   connect: moduleIds.map((m) => ({ id: m.moduleId })),
          // },
        },
      });


      // Step 5.1: Update requested modules to link them with store
      await db.requestedModule.updateMany({
        where: { requester: lead.id },
        data: { storeId: newStore.id },
      });

      // Step 6: Update lead status
      await db.lead.update({
        where: { id: lead.id },
        data: { status: "approved" },
      });

      return {
        message: "Lead converted to vendor and store created successfully",
        vendor: newVendor,
        store: newStore,
      };
    }),

});





