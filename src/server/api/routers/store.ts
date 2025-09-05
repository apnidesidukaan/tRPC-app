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



});


