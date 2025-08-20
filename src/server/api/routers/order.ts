import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
 


interface item{

}
export const orderRouter = createTRPCRouter({
  placeOrder: protectedProcedure.mutation(async({ctx,input}) =>{
    
   const userId = ctx.session.user.id;
      // 1. Get cart items
      const carts = await ctx.db.cart.findMany({
        where: { userId },
      });

      const cartItem=await ctx.db.cartItem.findMany({
        where: { cartId: { in: carts.map(({id})=> id) } },
      });
      console.log('Cart items:', cartItem);
      

      if (cartItem.length === 0) {
        throw new Error("Cart is empty!");
      }

      // 2. Calculate total
      const totalAmount = cartItem.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      // 3. Create order
      const order = await ctx.db.order.create({
        data: {
          userId,
          subtotal: totalAmount,
          tax: 0,
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
        },
      });

      // 4. Clear cart after checkout
      await ctx.db.cart.deleteMany({ where: { userId } });

      return { success: true, orderId: order.id };

  }),
});
 
// I learnt that exporting only the type of router restricts the client from accessing the code
export type OrderRouter = typeof orderRouter;