import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

export const platformConfigRouter = createTRPCRouter({
  // Get first config (you only expect one row)
  get: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.platformConfig.findFirst();
  }),

  // Create new config (only if none exists ideally)
  create: protectedProcedure
    .input(
      z.object({
        ratePerKm: z.number().default(10),
        platformMargin: z.number().default(0.1),
        vendorMargin: z.number().default(0.1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Optional safety check: allow only one config
      const existing = await ctx.db.platformConfig.findFirst();
      if (existing) {
        throw new Error("PlatformConfig already exists. Please update instead.");
      }

      return ctx.db.platformConfig.create({
        data: input,
      });
    }),

  // Update existing config
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        ratePerKm: z.number().optional(),
        platformMargin: z.number().optional(),
        vendorMargin: z.number().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { id, ...rest } = input;
      return ctx.db.platformConfig.update({
        where: { id },
        data: rest,
      });
    }),
});
