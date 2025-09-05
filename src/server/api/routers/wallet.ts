// src/server/api/routers/wallet.ts
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const walletRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        userModel: z.enum(["customer", "vendor", "deliveryAgent", "areaManager"]), // same as UserRole
        balance: z.number().default(0),
        lockedAmount: z.number().default(0),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const wallet = await ctx.db.wallet.create({
        data: {
          userId: input.userId,
          userModel: input.userModel,
          balance: input.balance ?? 0,
          lockedAmount: input.lockedAmount ?? 0,
        },
      });
      return wallet;
    }),



  get: publicProcedure
    .input(z.object({
      userId: z.string(),
      userModel: z.enum(["customer", "vendor", "deliveryAgent", "areaManager"]),
    }))
    .mutation(async ({ ctx, input }) => {
      let wallet = await ctx.db.wallet.findFirst({
        where: { userId: input.userId, userModel: input.userModel },
      });

      if (!wallet) {
        wallet = await ctx.db.wallet.create({
          data: {
            userId: input.userId,
            userModel: input.userModel,
            balance: 0,
            lockedAmount: 0,
          },
        });
      }

      return wallet;
    }),









    

});
