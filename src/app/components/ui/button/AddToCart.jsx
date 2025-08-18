'use client'
import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useSession } from "next-auth/react";
import { api } from '~/trpc/react';

const AddToCart = ({ inventoryItem }) => {
  const [quantity, setQuantity] = useState(1);
  const { data: session } = useSession();
  
  // tRPC cart hooks
  const utils = api.useUtils();
  const addItemToServerCart = api.cart.addItem.useMutation({
    onSuccess: () => utils.cart.get.invalidate(),
  });
  
  // Add to cart function that handles both authenticated and non-authenticated users
  const handleAddToCart = () => {
    const cartItem = {
      inventoryId: inventoryItem.id,
      name: inventoryItem.name,
      price: inventoryItem.price,
      image: inventoryItem.metaImage,
      quantity: quantity,
    };
    
    if (session?.user) {
      // User is authenticated, add to server cart
      addItemToServerCart.mutate({
        inventoryId: inventoryItem.id,
        quantity: quantity,
      });
    } else {
      // User is not authenticated, save to localStorage
      const existingCart = JSON.parse(localStorage.getItem("cart_product")) || [];
      const updatedCart = [...existingCart, cartItem];
      localStorage.setItem("cart_product", JSON.stringify(updatedCart));
    }
  };
  
  return (
    // ... rest of your component JSX
    <button
      className="w-full py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
      onClick={handleAddToCart}
    >
      <ShoppingCart className="w-5 h-5" />
      Add to Cart
    </button>
  );
};

export default AddToCart;

