
"use client";

import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";
import { getLocalStorageCart, saveToLocalStorage } from "../util/cartHelpers.js";
import { useCallback } from "react";
// import { getLocalStorageCart } from "~/utils/cartHelpers";

export const useCartManager = (setIsItemAdded,) => {
  const { data: session } = useSession();

  // console.log('session========session=', session);

  const utils = api.useUtils();

  // tRPC cart hooks for authenticated users
  const { data: serverCart } = api.cart.get.useQuery(undefined, {
    enabled: !!session?.user
  });

  const addItemToServerCart = api.cart.addItem.useMutation({
    onSuccess: () => {
      console.log('========================== onSuccess ==========================');
      utils.cart.getCartItemsByCartId.invalidate(String(serverCart?.id)); // ✅ force re-fetch
      // refetch
      return (
        setIsItemAdded(prev => !prev)
        // toggle to trigger refetch
      )
    },
  });





  

  // Function to add item to cart based on authentication status
  const addItemToCart = (inventory, qty) => {
    console.log('Adding item to cart =====', qty);
    const data = {
      price: inventory.price,
      name: inventory.name,
      quantity: qty,
      inventoryId: inventory?.id,
      vendorId: inventory?.vendorId,
      image: inventory?.image,
      // inventoryVendorId: inventory?.inventoryVendorId,
      // ..other requried fields will be here
    }
    if (session?.user) {
      // console.log(inventory)
      // console.log(data)
      // User is authenticated, add to server cart
      let res = addItemToServerCart.mutate(
        data
      );
      return res
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
  const getCartItems = useCallback(() => {
    if (session?.user) {
      return serverCart || [];
    } else {
      return getLocalStorageCart();
    }
  }, [serverCart, session]);

  return { addItemToCart, getCartItems };
};