import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import Razorpay from "razorpay";
import {z }from "zod";
interface item { }

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_SECRET!,
})

export const orderRouter = createTRPCRouter({
  placeOrder: protectedProcedure.mutation(async ({ ctx, input }) => {
    try {
      const userId = ctx.session.user.id;

      // 1. Get cart items
      const carts = await ctx.db.cart.findMany({
        where: { userId },
      });
    // now get the cart items
      const cartItem = await ctx.db.cartItem.findMany({
        where: { cartId: { in: carts.map(({ id }) => id) } },
      });


      if (cartItem.length === 0) {
        throw new Error("Cart is empty!");
      }
      // grouping the cart on the basis of the vendor source
      let groupedCartItem={};
      
      cartItem.forEach((item) => {
        groupedCartItem[item.vendorId!] = groupedCartItem[item.vendorId!] || [];
        groupedCartItem[item.vendorId!].push(item);
      })
      
    //  now calculate the amount of the each cartItems group
      const amountInPaise=Object.values(groupedCartItem).map((items: any) => {
        return items.reduce((sum: number, item: any) => sum + item.price * item.quantity*100, 0);
      });


      // now calculate the total amount of all the cart items
      const totalAmount = amountInPaise.reduce((sum, item) => sum + item, 0);
      

      const razorpayOrder = await razorpay.orders.create({
        amount: totalAmount,
        currency: "INR",
        receipt: "receipt_" + Date.now(),
      });
      return razorpayOrder;
      const nextOrderNo = `ORD${(lastOrder?.id ?? 0) + 1}`;
      // 3. Create order
      const order = await ctx.db.order.create({
        data: {

          subtotal: totalAmount,
          tax: 0,
          user: { connect: { id: ctx.session.user.id } },
          shippingFee: 0,
          discountTotal: 0,
          total: totalAmount,
          currency: "INR",
          status: "pending", // Later update when payment confirmed
          items: {
            create: cartItem.map((item) => ({
              name: item.name,
              inventoryId: item.inventoryId,
              quantity: item.quantity,
              price: item.price,
              total: item.price * item.quantity,
            })),
          },
          orderNo
        },
      });
      // first clear the cart items in the cart once the order has been placed
      ctx.db.cartItem.deleteMany({ where: { cartId: { in: carts.map(({ id }) => id) } } });

      return { success: true, orderId: order.id };
    } catch (err) {
      console.error(err);
      throw new Error("Failed to place order");
    }
  }),

  getRazorPayId: publicProcedure.input(z.object({
    amount: z.number().min(1)
  })).query(async ({ ctx ,input}) => {
    try {
      const {amount} = input;
      const razorpayOrder = await razorpay.orders.create({
        amount, // in paise
        currency: "INR",
        receipt: "receipt_" + Date.now(), // optional, for your own tracking
      });
      return { success: true, orderId: razorpayOrder.id };
    } catch (err) {
      console.error(err);
      throw new Error("Failed to create Razorpay order");
    }
  }),
  // this procedure is yet in developement
  createOrders: protectedProcedure.mutation(async ({ ctx}) => {
    try {
      
   
    } catch (err) {
      console.error(err);
      throw new Error("Failed to create order");
    }
  }),
});

// I learnt that exporting only the type of router restricts the client from accessing the code
export type OrderRouter = typeof orderRouter;


// this function is of no use right now
// this is to get the number from the order id
function base62ToNumber(str: string) {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = 0n; // use BigInt to hold large numbers
  for (let char of str) {
    const value = chars.indexOf(char);
    if (value === -1) throw new Error(`Invalid character: ${char}`);
    result = result * 62n + BigInt(value);
  }
  return result;
}