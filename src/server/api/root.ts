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
import { orderRouter } from "./routers/order";
import { leadRouter } from "./routers/lead";
import { vendorRouter } from "./routers/vendor";
import { discoveryRouter } from "./routers/discovery";
import { tripRouter } from "./routers/trip";
import { storeRouter } from "./routers/store";
import { walletRouter } from "./routers/wallet";
import { deliveryRouter } from "./routers/delivery";
import { platformConfigRouter } from "./routers/platform";
import  { transactionRouter } from "./routers/transaction";

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
  vendor: vendorRouter,
  discovery: discoveryRouter,
  trip: tripRouter,
  store: storeRouter,
  wallet: walletRouter,
  delivery: deliveryRouter,
  platform: platformConfigRouter,
  transaction: transactionRouter
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
