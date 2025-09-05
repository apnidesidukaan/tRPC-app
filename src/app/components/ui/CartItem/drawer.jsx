import React from 'react'
import { api } from '~/trpc/react';
import { useSession } from "next-auth/react";
export default function drawer({
  item,

}) {


  const { data: session } = useSession();



  const utils = api.useUtils()

  const addItemToServerCart = api.cart.addItem.useMutation({
    onSuccess: () => {
      console.log('========================== addItem onSuccess ==========================');
      utils.cart.getCartItemsByCartId.invalidate(); // simpler: refresh whole cart
    },
  });

  const updateItemInServerCart = api.cart.updateItem.useMutation({
    onSuccess: () => {
      console.log('========================== updateItem onSuccess ==========================');
      utils.cart.getCartItemsByCartId.invalidate();
    },
  });

  const removeItemFromServerCart = api.cart.remove.useMutation({
    onSuccess: () => {
      console.log('========================== removeItem onSuccess ==========================');
      utils.cart.getCartItemsByCartId.invalidate();
    },
  });

  const { data: cart } = api.cart.get.useQuery();


  const { data: cartItems, isLoading, refetch } = api.cart.getCartItemsByCartId.useQuery(
    String(cart?.id),
    {
      enabled: !!cart?.id, // only run when cart.id exists
    }
  );


  const addItemToCart = (inventory, qty) => {
    console.log(inventory);
    
    const data = {
      price: inventory.price,
      name: inventory.name,
      quantity: qty,
      inventoryId: inventory?.id,
      vendorId: inventory?.vendorId,
      image: inventory?.image,
    };

    if (session?.user) {
      // Find if item already exists in serverCart
      const existingItem = cartItems?.find(
        (item) => item.inventoryId === inventory.inventoryId
      );

      if (!existingItem && qty > 0) {
        // ✅ New item
        addItemToServerCart.mutate(data);
      } else if (existingItem) {
        const newQuantity = existingItem.quantity + qty;

        if (newQuantity > 0) {
          // ✅ Update existing with new quantity
          updateItemInServerCart.mutate({
            cartItemId: existingItem.id,
            quantity: newQuantity,
          });
        } else {
          // ✅ Remove if qty goes 0 or below
          removeItemFromServerCart.mutate({ cartItemId: existingItem.id });
        }
      }
    } else {
      // Guest cart in localStorage
      const cart = getLocalStorageCart();
      const existingItem = cart.find((item) => item.inventoryId === inventory.id);

      if (!existingItem && qty > 0) {
        // ✅ Add new
        const cartItem = {
          ...data,
          id: `${data.inventoryId}-${Date.now()}`,
          addedAt: new Date().toISOString(),
        };
        saveToLocalStorage(cartItem);
      } else if (existingItem) {
        const newQuantity = existingItem.quantity + qty;

        if (newQuantity > 0) {
          // ✅ Update existing
          const updatedCart = cart.map((item) =>
            item.inventoryId === inventory.id
              ? { ...item, quantity: newQuantity }
              : item
          );
          localStorage.setItem("cart", JSON.stringify(updatedCart));
        } else {
          // ✅ Remove
          const updatedCart = cart.filter(
            (item) => item.inventoryId !== inventory.id
          );
          localStorage.setItem("cart", JSON.stringify(updatedCart));
        }
      }
    }
  };



  // keep this clean: always expect full item + delta
  const updateQuantity = (item, quantity) => {
    addItemToCart(item, quantity);
  };










  return (
    <div key={item.id} className="flex gap-3 border p-3 rounded-xl shadow-sm bg-gray-50">
      <img
        src={item?.inventory?.metaImag || item.image}
        alt={item.title}
        className="w-14 h-14 object-contain rounded bg-white border"
      />
      <div className="flex-1 text-sm">
        <div className="font-medium">{item.title}</div>
        <div className="text-xs text-muted mt-0.5">{item.quantityText}</div>

        {/* Qty Control */}
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => updateQuantity(item, -1)}   // pass full item + -1

            className="cursor-pointer bg-gray-200 px-2 py-1 rounded">−</button>
          <span className="min-w-[20px] text-center">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item, 1)}   // pass full item + -1
            className="cursor-pointer bg-gray-200 px-2 py-1 rounded">+</button>
        </div>
      </div>

      {/* Price */}
      <div className="text-right text-sm mt-1 min-w-[60px]">
        {item.discountedPrice && item.discountedPrice < item.price ? (
          <>
            <div className="line-through text-xs text-muted">₹{item.price}</div>
            <div className="text-green-600 font-semibold">₹{item.discountedPrice}</div>
          </>
        ) : (
          <div className="text-green-600 font-semibold">₹{item.price}</div>
        )}
      </div>
    </div>
  )
}
