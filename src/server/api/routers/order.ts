import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
 


interface item{

}
export const orderRouter = createTRPCRouter({
  placeOrder: protectedProcedure.mutation(async({ctx,input}) =>{
    
   const userId = ctx.session?.user?.id;
      // 1. Get cart items
      const carts = await ctx.db.cart.findMany({
        where: { userId },
      });

      const cartItem=await ctx.db.cartItem.findMany({
        where: { cartId: { in: carts.map(({id})=> id) } },
      });
      console.log('Cart items:', cartItem);
      

      if (cartItems.length === 0) {
        throw new Error("Cart is empty!");
      }

      // 2. Calculate total
      const totalAmount = cartItems.reduce(
        (sum: number, item: { product: { price: number }; quantity: number }) => sum + item.product.price * item.quantity,
        0
      );

      // 3. Create order
      const order = await ctx.db.order.create({
        data: {
          userId,
          totalAmount,
          status: "PENDING", // Later update when payment confirmed
          items: {
            create: cartItems.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.product.price,
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