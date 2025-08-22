import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import Razorpay from "razorpay";

interface item {}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_SECRET!,
})

export const orderRouter = createTRPCRouter({
  placeOrder: protectedProcedure.mutation(async({ctx,input}) =>{
    try {
      const userId = ctx.session.user.id;

      // 1. Get cart items
      const carts = await ctx.db.cart.findMany({
        where: { userId },
      });
      
      console.log("executed")
      const cartItem=await ctx.db.cartItem.findMany({
        where: { cartId: { in: carts.map(({id})=> id) } },
      });
        
      if (cartItem.length === 0) {
        throw new Error("Cart is empty!");
      }

      // 2. Calculate total
      const totalAmount = cartItem.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      
      console.log(typeof totalAmount)

      // money should be in paise 
      let amountInPaise = Math.round(totalAmount * 100)
      
      const razorpayOrder = await razorpay.orders.create({
        amount: amountInPaise, // in paise
        currency: "INR",
        receipt: "receipt_" + Date.now(), // optional, for your own tracking
      });
      console.log(razorpayOrder)
      const orderNo = parseInt(razorpayOrder.id, 16);
      // 3. Create order
      const order = await ctx.db.order.create({
        data: {
       
          subtotal: totalAmount,
          tax: 0,
          user:ctx.session.user,
          shippingFee: 0,
          discountTotal: 0,
          total: totalAmount,
          currency: "INR",
          status: "pending", // Later update when payment confirmed
          items: {
            create: cartItem.map((item) => ({
              inventoryId: item.inventoryId,
              name: item.name,
              quantity: item.quantity,
              price: item.price,
              total: item.price * item.quantity,
            })),
          },
          orderNo
        },
      });

      // 4. Clear cart after checkout
      await ctx.db.cart.deleteMany({ where: { userId } });

      return { success: true, orderId: order.id };
    } catch (err) {
      console.error(err);
      throw new Error("Failed to place order");
    }
  }),
});

// I learnt that exporting only the type of router restricts the client from accessing the code
export type OrderRouter = typeof orderRouter;
