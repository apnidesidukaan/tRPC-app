import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const deliveryRouter = createTRPCRouter({

  getAllRules: publicProcedure.query(({ ctx }) => {
    return ctx.db.deliveryRule.findMany();
  }),

  createRule: publicProcedure
    .input(z.object({
      minDistance: z.number(),
      maxDistance: z.number(),
      baseCharge: z.number(),
      expressCharge: z.number(),
      freeAbove: z.number(),
    }))
    .mutation(({ ctx, input }) => {
      return ctx.db.deliveryRule.create({ data: input });
    }),

  updateRule: publicProcedure
    .input(z.object({
      id: z.string(),
      baseCharge: z.number().optional(),
      expressCharge: z.number().optional(),
      freeAbove: z.number().optional(),
    }))
    .mutation(({ ctx, input }) => {
      return ctx.db.deliveryRule.update({
        where: { id: input.id },
        data: input,
      });
    }),

  deleteRule: publicProcedure
    .input(z.string())
    .mutation(({ ctx, input }) => {
      return ctx.db.deliveryRule.delete({ where: { id: input } });
    }),










  calculatePrice: publicProcedure
    .input(z.object({
      distance: z.number(),
      cartValue: z.number(),
      express: z.boolean().optional(),
    }))
    .query(async ({ ctx, input }) => {
      const rules = await ctx.db.deliveryRule.findMany();
      const config = await ctx.db.platformConfig.findFirst();
      console.log('rules ====', input.distance);

      // 1. find matching delivery rule
      const rule = rules.find(r => input.distance >= r.minDistance && input.distance <= r.maxDistance);
      if (!rule) throw new Error("No delivery rule for this distance");

      // 2. check free delivery
      let deliveryCharge = input.express ? rule.expressCharge : rule.baseCharge;
      if (input.cartValue >= rule.freeAbove) deliveryCharge = 0;

      // 3. vendor selling price
      const openMarketPrice = input.cartValue;
      const vsp = openMarketPrice + (config.vendorMargin * openMarketPrice);

      // 4. platform fee
      const pf = config.platformMargin * (vsp + deliveryCharge);

      // 5. final price
      const fsp = vsp + deliveryCharge + pf;

      return {
        vsp,
        deliveryCharge,
        platformFee: pf,
        finalPrice: Math.round(fsp),
      };
    })
});
