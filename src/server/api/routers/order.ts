import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import Razorpay from "razorpay";
import { z } from "zod";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.NEXT_PUBLIC_RAZORPAY_SECRET!,
})

export const orderRouter = createTRPCRouter({
  getRazorPayId: protectedProcedure
    .input(
      z.object({

        amount: z.number().optional(),

      })
    )
    .mutation(async ({ ctx, input }) => {
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
        // let groupedCartItem = {};

        // cartItem.forEach((item) => {
        //   groupedCartItem[item.vendorId!] = groupedCartItem[item.vendorId!] || [];
        //   groupedCartItem[item.vendorId!].push(item);
        // })

        //  now calculate the amount of the each cartItems group
        // const amountInPaise=Object.values(groupedCartItem).map((items: any) => {
        //   return items.reduce((sum: number, item: any) => sum + item.price * item.quantity*100, 0);
        // });


        // console.log(typeof totalAmount)
        let totalAmount = input.amount
        // money should be in paise 
        let amountInPaise = Math.round(totalAmount * 100)

        const razorpayOrder = await razorpay.orders.create({
          amount: totalAmount,
          currency: "INR",
          receipt: "receipt_" + Date.now(),
        });
        // console.log(razorpayOrder, 'razorpayOrder ===========');

        // return razorpayOrder;
        // const nextOrderNo = `ORD${(lastOrder?.id ?? 0) + 1}`;
        // 3. Create order
        // const order = await ctx.db.order.create({
        //   data: {

        //     subtotal: totalAmount,
        //     tax: 0,
        //     user: { connect: { id: ctx.session.user.id } },
        //     shippingFee: 0,
        //     discountTotal: 0,
        //     total: totalAmount,
        //     currency: "INR",
        //     status: "pending", // Later update when payment confirmed
        //     items: {
        //       create: cartItem.map((item) => ({
        //         orderId: razorpayOrder?.id,
        //         name: item.name,
        //         inventoryId: item.inventoryId,
        //         quantity: item.quantity,
        //         price: item.price,
        //         total: item.price * item.quantity,
        //       })),
        //     },
        //     // orderNo
        //   },
        // });
        // first clear the cart items in the cart once the order has been placed
        // ctx.db.cartItem.deleteMany({ where: { cartId: { in: carts.map(({ id }) => id) } } });

        return {
          success: true,
          orderId: razorpayOrder?.id,
        };
      } catch (err) {
        console.error(err);
        throw new Error("Failed to place order");
      }
    }),


  createOrders: protectedProcedure
    .input(
      z.object({
        cartId: z.string(),
        addressId: z.string(),
        cartItems: z.array(
          z.object({
            inventoryId: z.string(),
            vendorId: z.string(),
            quantity: z.number().min(1),
            name: z.string(),        // ✅ required for order items
            price: z.number().min(0) // ✅ required for totals
          })
        ),
        vendorId: z.string(),
        razorpay_order_id: z.string(),
        razorpay_payment_id: z.string(),
        razorpay_signature: z.string(),
        paymentMethod: z.enum(["upi", "card", "wallet", "cod"]).default("upi"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        console.log(" ============ kya naaali jaam hao ??: ========", input)

        // ✅ Get cart and items

        // const cart = await ctx.db.cart.findFirst({
        //   where: { userId: ctx?.session?.user?.id },

        // });

        // const cartItems = await ctx.db.cartItem.findMany({
        //   where: { cartId: cart?.id },

        // });



        // if (!cart || cartItems.length === 0) {
        //   throw new Error("Cart not found or empty");
        // }

        // 📦 Calculate totals
        const subtotal = input?.cartItems?.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        const taxes = 0; // you can extend later
        const deliveryCharge = 25;
        const surcharge = 4;
        const grandTotal = subtotal + deliveryCharge + surcharge;

        // ✅ Create order
        const order = await ctx.db.order.create({
          data: {
            orderId: `ORD-${Date.now()}`, // unique ID
            customerId: ctx?.session?.user?.id,
            vendorId: input.vendorId,
            addressId: input.addressId,
            subtotalAmount: subtotal,
            taxes,
            deliveryCharge,
            surcharge,
            grandTotal,
            totalQuantity: input?.cartItems?.reduce((sum, item) => sum + item.quantity, 0),
            paymentMethod: input.paymentMethod,
            paymentStatus: "paid",
            razorpay_order_id: input.razorpay_order_id,
            razorpay_payment_id: input.razorpay_payment_id,
            razorpay_signature: input.razorpay_signature,
            items: {
              create: input.cartItems.map((item) => ({
                productId: item.productId,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                subtotal: item.price * item.quantity,
              })),
            },
          },
          include: { items: true },
        });

        // ✅ Mark cart as checked out
        await ctx.db.cart.update({
          where: { id: input?.cartId },
          data: { status: "checkedOut" },
        });

        return order;
      } catch (err) {
        console.error("❌ Failed to create order:", err);
        throw new Error("Failed to create order");
      }
    }),


  // Create Lead
  createStatusHistory: publicProcedure
    .input(
      z.object({

        orderId: z.string().optional(),
        vendorId: z.string().optional(),
        customerId: z.string().optional(),

      })
    )
    .mutation(async ({ ctx, input }) => {
      console.log('session', ctx.session?.user);

      const { id: userId, name } = ctx.session?.user;
      const { orderId } = input
      if (!userId) {
        throw new Error("Unauthorized");
      }

      // Step 1: Create the lead
      const lead = await ctx.db.statusHistory.create({
        data: {
          orderId: orderId,
          status: "created",
          timestamp: new Date(),
          remarks: `Order Created By : ${name}.`,
          updatedById: userId,
          updatedByRole: "User",
        },
      });

      return {
        status: 201,
        message: "Lead created successfully",
        data: lead,
      };
    }),
});














export type OrderRouter = typeof orderRouter;


