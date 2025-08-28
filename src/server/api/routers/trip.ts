// src/server/api/routers/trip.ts
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const tripRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({
      cartId: z.string(),
      addressId: z.string(),
      vendorId: z.string(),
      orderId: z.string(),
      razorpay_order_id: z.string(),
      razorpay_payment_id: z.string(),
      razorpay_signature: z.string(),
      paymentMethod: z.enum(["upi", "card", "netbanking", "cod"]),
    }))
    .mutation(async ({ input, ctx }) => {
      const trip = await ctx.db.trip.create({
        data: {
          tripId: input.orderId,
          //cartId: input.cartId,
          // addressId: input.addressId,
          // vendorId: input.vendorId,
          order: input.orderId,
          // razorpay_order_id: input.razorpay_order_id,
          // razorpay_payment_id: input.razorpay_payment_id,
          // razorpay_signature: input.razorpay_signature,
          // paymentMethod: input.paymentMethod,
          status: "created", // trip starts as pending
        },
      });
      return trip;
    }),
});
