import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

// Common validation schema
const socialLinksSchema = z.object({
  instagram: z.string().url().optional(),
  facebook: z.string().url().optional(),
  linkedin: z.string().url().optional(),
}).optional();

const businessTypeEnum = z.enum([
  "agriculture",
  "mining",
  "manufacturing",
  "wholesale",
  "retail",
  "logistics",
  "service",
  "financial_services",
  "transportation",
  "utilities",
  "entertainment",
  "media",
  "sports",
  "real_estate",
  "construction",
  "technology",
  "healthcare",
  "education",
  "hospitality",
  "legal_services",
  "consulting",
  "non_profit",
  "government",
  "other"
]);

const createBusinessSchema = z.object({
  name: z.string().min(2).max(100),
  type: businessTypeEnum.default("other"),
  description: z.string().optional(),
  ownerId: z.string(), // MongoDB ObjectId as string
  modules: z.array(z.string()).optional(),
  logo: z.string().url().optional(),
  bannerImage: z.string().url().optional(),
  website: z.string().url().optional(),
  socialLinks: socialLinksSchema,
  isActive: z.boolean().default(true),
});

const updateBusinessSchema = createBusinessSchema.partial().extend({
  id: z.string(),
});

export const businessRouter = createTRPCRouter({
  // CREATE
  create: publicProcedure
    .input(createBusinessSchema)
    .mutation(async ({ ctx, input }) => {
      return db.business.create({
        data: {
          ...input,
          modules: {
            connect: input.modules?.map((id) => ({ id })) || [],
          },
        },
      });
    }),

  // READ ALL
  getAll: publicProcedure
    .query(async ({ ctx }) => {
      return db.business.findMany({
        where: { isDeleted: false },
        orderBy: { createdAt: "desc" },
      });
    }),

  // READ ONE
  getById: publicProcedure
  .input(z.string())  // Uncomment this line
    .query(async ({ ctx, input }) => {

  console.log("===== lo aaya ============", input);

      return db.business.findMany({
      where: { ownerId: input },
      });
    }),

  // UPDATE
  update: publicProcedure
    .input(updateBusinessSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, modules, ...rest } = input;
      return db.business.update({
        where: { id },
        data: {
          ...rest,
          ...(modules
            ? { modules: { set: modules.map((m) => ({ id: m })) } }
            : {}),
        },
      });
    }),

  // SOFT DELETE
  softDelete: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return db.business.update({
        where: { id: input },
        data: { isDeleted: true, isActive: false },
      });
    }),

  // RESTORE
  restore: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return db.business.update({
        where: { id: input },
        data: { isDeleted: false, isActive: true },
      });
    }),

  // HARD DELETE
  delete: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return db.business.delete({
        where: { id: input },
      });
    }),
});
