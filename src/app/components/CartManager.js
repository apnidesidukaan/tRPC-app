
"use client";

import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";
import { getLocalStorageCart, saveToLocalStorage } from "../util/cartHelpers.js";
// import { getLocalStorageCart } from "~/utils/cartHelpers";

export const useCartManager = () => {
  const { data: session } = useSession();

  // console.log('session========session=', session);

  const utils = api.useUtils();

  // tRPC cart hooks for authenticated users
  const { data: serverCart } = api.cart.get.useQuery(undefined, {
    enabled: !!session?.user
  });

  const addItemToServerCart = api.cart.addItem.useMutation({
    onSuccess: () => utils.cart.get.invalidate(),
  });

  // Function to add item to cart based on authentication status
  const addItemToCart = (inventory, qty) => {
          const data={
        price:inventory.price,
        name:inventory.name,
        quantity:qty,
        inventoryId: inventory?.id,
        // ..other requried fields will be here
      }
    if (session?.user) {
      console.log(inventory)
      console.log(data)
      // User is authenticated, add to server cart
      addItemToServerCart.mutate(
        data
      );
    } else {
      // User is not authenticated, save to localStorage
      const cartItem = {
        ...data,
        id: `${data.inventoryId}-${Date.now()}`, // Generate unique ID for localStorage
        addedAt: new Date().toISOString(),
      };
      saveToLocalStorage(cartItem);
    }
  };

  // Function to get cart items based on authentication status
  const getCartItems = () => {
    if (session?.user) {
      return serverCart?.items || [];
    } else {
      return getLocalStorageCart();
    }
  };

  return { addItemToCart, getCartItems };
};