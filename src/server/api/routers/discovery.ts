import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

// --- Enums ---
const discoveryTypeEnum = z.enum(["module", "category", "product", "inventory"]);
const displayTypeEnum = z.enum(["carousel", "grid", "list"]);

// --- Schemas ---
const createDiscoverySchema = z.object({
  title: z.string().min(2).max(150),
  subtitle: z.string().optional(),
  image: z.string().url().optional(),
  displayType: displayTypeEnum.default("grid"),
  type: discoveryTypeEnum,
  refIds: z.array(z.string()).optional(), // IDs of modules/categories/products
  bgColor: z.string(),
  theme: z.string(),
  textColor: z.string(),
  accentColor: z.string(),
  filters: z.record(z.any()).optional(),  // flexible JSON filter
  priority: z.number().default(0),
  isActive: z.boolean().default(true),
});

const updateDiscoverySchema = createDiscoverySchema.partial().extend({
  id: z.string(),
});

// --- Router ---
export const discoveryRouter = createTRPCRouter({
  // CREATE
  create: publicProcedure
    .input(createDiscoverySchema)
    .mutation(async ({ input }) => {
      console.log(input);


      return db.discovery.create({
        data: {
          ...input,
        },
      });
    }),

  // GET ALL (for frontend / homepage)
  getAll: publicProcedure
    .query(async () => {
      return db.discovery.findMany({
        where: { isActive: true },
        orderBy: { priority: "asc" },
      });
    }),

  // GET ONE
  getById: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return db.discovery.findUnique({
        where: { id: input },
      });
    }),

  // UPDATE
  update: protectedProcedure
    .input(updateDiscoverySchema)
    .mutation(async ({ input }) => {
      const { id, ...rest } = input;
      return db.discovery.update({
        where: { id },
        data: rest,
      });
    }),

  // SOFT DELETE
  softDelete: protectedProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      return db.discovery.update({
        where: { id: input },
        data: { isActive: false },
      });
    }),

  // RESTORE
  restore: protectedProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      return db.discovery.update({
        where: { id: input },
        data: { isActive: true },
      });
    }),

  // HARD DELETE
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      return db.discovery.delete({
        where: { id: input },
      });
    }),
});
