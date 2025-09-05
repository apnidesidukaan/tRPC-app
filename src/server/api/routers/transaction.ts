import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const transactionRouter = createTRPCRouter({

  // Create Transaction
  create: protectedProcedure
    .input(
      z.object({
        type: z.enum(["credit", "debit"]), // adjust enum names to match TransactionType
        amount: z.number().positive(),
        sourceType: z.enum(["order", "refund", "bonus", "withdrawal", "adjustment", "payout"]), // match your SourceType
        sourceRef: z.string().optional(),
        description: z.string().optional(),
        walletId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user?.id;
      if (!userId) throw new Error("Unauthorized");

      // Find the wallet
      const wallet = await db.wallet.findUnique({
        where: { id: input.walletId },
      });
      if (!wallet) throw new Error("Wallet not found");

      // Calculate balance after transaction
      const balanceAfter =
        input.type === "credit"
          ? wallet.balance + input.amount
          : wallet.balance - input.amount;

      if (balanceAfter < 0) {
        throw new Error("Insufficient balance");
      }

      // Create transaction record
      const transaction = await db.transaction.create({
        data: {
          type: input.type,
          amount: input.amount,
          balanceAfter,
          sourceType: input.sourceType,
          sourceRef: input.sourceRef,
          description: input.description,
          performedBy: userId,
          walletId: input.walletId,
        },
      });

      // Update wallet balance
      await db.wallet.update({
        where: { id: input.walletId },
        data: { balance: balanceAfter },
      });

      return {
        status: 201,
        message: "Transaction recorded successfully",
        data: transaction,
      };
    }),

  // Get all transactions
  getAll: publicProcedure
    .query(async () => {
      return await db.transaction.findMany({
        orderBy: { createdAt: "desc" },
        include: { wallet: true },
      });
    }),

  // Get transactions by Wallet ID
  getByWallet: publicProcedure
    .input(z.object({ walletId: z.string() }))
    .query(async ({ input }) => {
      return await db.transaction.findMany({
        where: { walletId: input.walletId },
        orderBy: { createdAt: "desc" },
      });
    }),
});
