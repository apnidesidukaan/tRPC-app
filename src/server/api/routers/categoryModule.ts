import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { getManyByIds } from "../../../service/discovery";

// -------------------
// Validation Schemas
// -------------------

const categorySchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  icon: z.string().url().optional(),
  moduleId: z.string(), // required: category belongs to a module
  isDeleted: z.boolean().optional(),
  isPromoted: z.boolean().optional(),
  createdBy: z.string().optional(),
  updatedBy: z.string().optional(),
});

const updateCategorySchema = categorySchema.partial().extend({
  id: z.string(),
});

const moduleSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  businessId: z.string(),
  icon: z.string().url().optional(),
  isActive: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  version: z.string().optional(),
  metadata: z.any().optional(),
  createdBy: z.string().optional(),
});

const updateModuleSchema = moduleSchema.partial().extend({
  id: z.string(),
});

// -------------------
// Category Router
// -------------------

export const categoryRouter = createTRPCRouter({
  // CREATE
  create: publicProcedure
    .input(categorySchema)
    .mutation(async ({ input }) => {
      return db.category.create({
        data: input,
      });
    }),

  // READ ALL
  getAll: publicProcedure.query(async () => {
    return db.category.findMany({
      // where: { isDeleted: false },
      // orderBy: { createdAt: "desc" },
      // include: { Module: true, Inventory: true },
    });
  }),

  // READ ONE
  getById: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return db.category.findUnique({
        where: { id: input },
        include: { Module: true, Inventory: true },
      });
    }),



  getByModuleId: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return db.category.findMany({
        where: { moduleId: input },
        // include: { Module: true, Inventory: true },
      });
    }),

  // UPDATE
  update: publicProcedure
    .input(updateCategorySchema)
    .mutation(async ({ input }) => {
      const { id, ...rest } = input;
      return db.category.update({
        where: { id },
        data: rest,
      });
    }),

  // SOFT DELETE
  softDelete: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      return db.category.update({
        where: { id: input },
        data: { isDeleted: true },
      });
    }),

  // HARD DELETE
  delete: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      return db.category.delete({
        where: { id: input },
      });
    }),


  getManyByIds: publicProcedure
    .input(
      z.object({
        ids: z.array(z.string()),   // array of refIds
        type: z.string(),           // "module" | "category" | "product" | "inventory"
        limit: z.number().optional(),
        skip: z.number().optional(),   // optional for pagination
      })
    )
    .query(async ({ input }) => {
      return await getManyByIds(input.ids, input.type, {
        limit: input.limit,
        skip: input.skip,
      });
    }),


});

// -------------------
// Module Router
// -------------------

export const moduleRouter = createTRPCRouter({
  // CREATE
  create: publicProcedure
    .input(moduleSchema)
    .mutation(async ({ input }) => {
      return db.module.create({
        data: input,
      });
    }),

  // READ ALL
  getAll: publicProcedure.query(async () => {
    return db.module.findMany({
      orderBy: { createdAt: "desc" },
      include: { Category: true },
    });
  }),

  // READ ONE
  getById: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return db.module.findUnique({
        where: { id: input },
        include: { Category: true },
      });
    }),



  getCategoriesForModule: publicProcedure
    .input(
      z.object({
        moduleId: z.string().min(1, "Module ID is required"),
      })
    )
    .query(async ({ input }) => {
      const { moduleId } = input;

      return db.category.findMany({
        where: { moduleId },
        orderBy: { createdAt: "desc" },
      });
    }),





  // UPDATE
  update: publicProcedure
    .input(updateModuleSchema)
    .mutation(async ({ input }) => {
      const { id, ...rest } = input;
      return db.module.update({
        where: { id },
        data: rest,
      });
    }),

  // DELETE (soft delete logic can be added if needed)
  delete: publicProcedure
    .input(z.string())
    .mutation(async ({ input }) => {
      return db.module.delete({
        where: { id: input },
      });
    }),









});
