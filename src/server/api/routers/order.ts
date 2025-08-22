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
      console.log(cartItem)
      
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
      return
      
      const razorpayOrder = await razorpay.orders.create({
        amount: amountInPaise, // in paise
        currency: "INR",
        receipt: "receipt_" + Date.now(), // optional, for your own tracking
      });
      console.log(razorpayOrder)
      const lastOrder = await ctx.db.order.findFirst({
  orderBy: { createdAt: "desc" },
});

const nextOrderNo = `ORD${(lastOrder?.id ?? 0) + 1}`;
      // 3. Create order
      const order = await ctx.db.order.create({
        data: {
       
          subtotal: totalAmount,
          tax: 0,
          user:{connect:{id:ctx.session.user.id}},
          shippingFee: 0,
          discountTotal: 0,
          total: totalAmount,
          currency: "INR",
          status: "pending", // Later update when payment confirmed
          items: {
            create: cartItem.map((item) => ({
              name:item.name,
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
      ctx.db.cartItem.deleteMany({ where: { cartId: { in: carts.map(({id})=> id) } } });

      return { success: true, orderId: order.id };
    } catch (err) {
      console.error(err);
      throw new Error("Failed to place order");
    }
  }),
});

// I learnt that exporting only the type of router restricts the client from accessing the code
export type OrderRouter = typeof orderRouter;


// this function is of no use right now
// this is to get the number from the order id
function base62ToNumber(str:string) {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = 0n; // use BigInt to hold large numbers
  for (let char of str) {
    const value = chars.indexOf(char);
    if (value === -1) throw new Error(`Invalid character: ${char}`);
    result = result * 62n + BigInt(value);
  }
  return result;
}