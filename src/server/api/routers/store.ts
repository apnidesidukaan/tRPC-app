import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";


export const storeRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.string()) // storeId as string
    .query(async ({ ctx, input }) => {
      const storeId = input;

      const store = await ctx.db.store.findFirst({
        where: { vendorId: storeId },

      });

      if (!store) {
        throw new Error("Store not found");
      }

      return store;
    }),





  getVendorCategories: publicProcedure
    .input(z.string().optional()) // storeId as optional string
    .query(async ({ ctx, input }) => {
      // 1. Find all requested modules for this store
      const storeModules = await ctx.db.requestedModule.findMany({
        where: { storeId: input },
        select: { moduleId: true },
      });

      // 2. Extract IDs
      const moduleIds = storeModules.map((m) => m?.moduleId);
      console.log(
        ' --- storeModules --- ', moduleIds
      );

      // 3. Find categories linked to these modules
      const categories = await ctx.db.category.findMany({
        where: {
          moduleId: { in: moduleIds },
        },
      });

      if (!categories || categories.length === 0) {
        throw new Error("No categories found for this store’s modules");
      }

      return categories;
    }),




});


