import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
// import { useSession } from "next-auth/react";

// const { data: session } = useSession()
export const cartRouter = createTRPCRouter({





  get: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user?.id;

    return ctx.db.cart.findFirst({
      where: { userId, status: "active" },
      include: {
        items: {
          include: {
            inventory: {
              include: {
                product: true, // full product info for UI
              },
            },
          },
        },
      },
    });
  }),

  // ➕ Add item to cart (or update if exists)
  addItem: publicProcedure
    .input(
      z.object({
        inventoryId: z.string(),
        quantity: z.number().min(1),
        name: z.string(),
        price: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {

      console.log('= addItemToCarddddddddddddt =======================:', input);

      const userId = ctx?.session?.user?.id;

      // find or create active cart
      let cart = await db.cart.findFirst({
        where: { userId, status: "active" },
      });

      if (!cart) {
        cart = await db.cart.create({
          data: { userId, status: "active" },
        });
      }

      // check if item exists
      const existing = await db.cartItem.findFirst({
        where: { cartId: cart.id, inventoryId: input.inventoryId },
      });

      if (existing) {
        return db.cartItem.update({
          where: { id: existing.id },
          data: { quantity: existing.quantity + input.quantity },
        });
      }

      return ctx.db.cartItem.create({
        data: {
          cartId: cart.id,
          inventoryId: input.inventoryId,
          quantity: input.quantity,
          name: input.name,
          price: input.price,
        },
      });
    }),

  // ✏️ Update item quantity
  updateItem: publicProcedure
    .input(
      z.object({
        cartItemId: z.string(),
        quantity: z.number().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.cartItem.update({
        where: { id: input.cartItemId },
        data: { quantity: input.quantity },
      });
    }),

  // ❌ Remove item
  remove: protectedProcedure
    .input(z.object({ cartItemId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.cartItem.delete({
        where: { id: input.cartItemId },
      });
    }),

  // ✅ Checkout (finalize cart)
  checkout: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const cart = await ctx.db.cart.findFirst({
      where: { userId, status: "active" },
    });

    if (!cart) throw new Error("No active cart found");

    return ctx.db.cart.update({
      where: { id: cart.id },
      data: { status: "checked_out" },
    });
  }),
});
