// import { postRouter } from "~/server/api/routers/post";
import { productRouter } from "~/server/api/routers/product";
import { inventoryRouter } from "~/server/api/routers/inventory";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { businessRouter } from "./routers/business";
import { moduleRouter } from "./routers/categoryModule";
import { categoryRouter } from "./routers/categoryModule";
import { cartRouter } from "./routers/cart";
import { userRouter } from "./routers/user";
import { roleRouter } from "./routers/role";
import { checkoutRouter, orderRouter } from "./routers/order";
import { leadRouter } from "./routers/lead";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  // post: postRouter,
  inventory: inventoryRouter,
  product: productRouter,
  business: businessRouter,
  module: moduleRouter,
  category: categoryRouter,
  cart: cartRouter,
  user: userRouter,
  role: roleRouter,
  order: orderRouter,
  lead: leadRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
