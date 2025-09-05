"use client";
import React, { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import InventoryStore from "./StoreDetail";
import { useSession } from "next-auth/react";

// =========================================================
export default function InventoryList({ inventoryItem }) {
  const { data: session } = useSession();

  const utils = api.useUtils()

  const addItemToServerCart = api.cart.addItem.useMutation({
    onSuccess: () => {
      console.log('========================== addItem onSuccess ==========================');
      utils.cart.getCartItemsByCartId.invalidate(); // simpler: refresh whole cart
      setIsItemAdded(prev => !prev);
    },
  });

  const updateItemInServerCart = api.cart.updateItem.useMutation({
    onSuccess: () => {
      console.log('========================== updateItem onSuccess ==========================');
      utils.cart.getCartItemsByCartId.invalidate();
      setIsItemAdded(prev => !prev);
    },
  });

  const removeItemFromServerCart = api.cart.remove.useMutation({
    onSuccess: () => {
      console.log('========================== removeItem onSuccess ==========================');
      utils.cart.getCartItemsByCartId.invalidate();
      setIsItemAdded(prev => !prev);
    },
  });



  const [isItemAdded, setIsItemAdded] = useState(false);

  const { data: cart } = api.cart.get.useQuery();
  const { data: cartItems, isLoading, refetch } = api.cart.getCartItemsByCartId.useQuery(
    String(cart?.id),
    {
      enabled: !!cart?.id, // only run when cart.id exists
    }
  );




  const cartMatches = cartItems?.filter(cart =>
    inventoryItem?.filter(inv => inv?.id === cart?.inventoryId)
  );




  // =========================================================
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [quantities, setQuantities] = useState({});
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  // =========================================================

  if (!inventoryItem || inventoryItem.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-12 max-w-md mx-auto">
          <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Inventory Items</h3>
          <p className="text-gray-500">Your inventory is empty. Add some products to get started.</p>
        </div>
      </div>
    );
  }
  // =========================================================


  // keep this clean: always expect full item + delta
  const updateQuantity = (item, quantity) => {
    addItemToCart(item, quantity);
    setIsItemAdded(true); // keep buttons enabled after adding
  };



  const getTotalAmount = () => {
    return Array.from(selectedItems).reduce((total, itemId) => {
      const item = inventoryItem.find(inv => inv.id === itemId);
      const quantity = quantities[itemId] || 1;
      return total + (item?.price || 0) * quantity;
    }, 0);
  };


  const getTotalItems = () => {
    return Array.from(cartMatches).reduce((total, itemId) => {
      return total + (quantities[itemId] || 1);
    }, 0);
  };

  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return { bg: 'bg-green-100', text: 'text-green-800', icon: '🟢' };
      case 'inactive':
        return { bg: 'bg-gray-100', text: 'text-gray-800', icon: '⚫' };
      default:
        return { bg: 'bg-blue-100', text: 'text-blue-800', icon: '🔵' };
    }
  };

  const getApprovalConfig = (approval) => {
    switch (approval?.toLowerCase()) {
      case 'approved':
        return { bg: 'bg-emerald-100', text: 'text-emerald-800', icon: '✅' };
      case 'pending':
        return { bg: 'bg-amber-100', text: 'text-amber-800', icon: '⏳' };
      case 'rejected':
        return { bg: 'bg-red-100', text: 'text-red-800', icon: '❌' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-800', icon: '❓' };
    }
  };



  const addItemToCart = (inventory, qty) => {
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
        (item) => item.inventoryId === inventory.id
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









  // =========================================================

  return (
    <div className="b-accent p-6 max-w-7xl mx-auto">

      {/* Cart Summary */}
      {/* {selectedItems.size > 0 && (
        <div className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 2.5M7 13l2.5 2.5m6-7a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="font-semibold">{getTotalItems()} items</span>
        </div>
      )} */}
      {cartMatches?.length > 0 && (
        <div className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 2.5M7 13l2.5 2.5m6-7a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="font-semibold">{getTotalItems()} items</span>
        </div>
      )}
      {/* Header Section ================================================================== */}

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">


        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Product Inventory</h2>
          <p className="text-gray-600">Select items to add to your cart</p>
        </div>
      </div>



      {/* Grid View  ==================================================================*/}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-6">
          {inventoryItem?.map((inv) => {
            const isSelected = selectedItems.has(inv.id);
            console.log('cartMatches=cartMatches========', cartMatches);
            const quantity = cartMatches?.find(cart => cart.inventoryId === inv.id)?.quantity || 0;
            const statusConfig = getStatusConfig(inv.status);
            const approvalConfig = getApprovalConfig(inv.approvalStatus);
            const isLowStock = inv.stock <= (inv.lowStockThreshold || 10);

            return (
              <div key={`${inv.id}-${inv.vendorId}`}


                className={`bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border-2 transform hover:-translate-y-1 ${isSelected
                  ? 'border-indigo-500 ring-4 ring-indigo-100'
                  : 'border-gray-100 hover:border-gray-200'
                  }`}
              >
                {/* Product Header */}
                <div className="p-4 pb-0">
                  <img src={inv.image} alt={inv.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg mb-1 line-clamp-1">
                        {inv.name || "Unnamed Product"}
                      </h3>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="bg-gray-100 px-2 py-1 rounded-md font-mono text-xs">
                          {inv.sku || "N/A"}
                        </span>
                      </div>

                      <h3 className="font-semibold text-gray-900 text-lg mb-1 line-clamp-1">
                        {/* {inv.s || "Priyanka store"} */}
                        <InventoryStore storeId={inv?.vendorId} />
                      </h3>
                    </div>


                  </div>

                  {/* Price */}
                  <div className="text-2xl font-bold text-indigo-600 mb-3">
                    ₹{Number(inv.price || 0).toLocaleString('en-IN')}
                  </div>

                  {/* Stock Info */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${isLowStock ? 'bg-red-500' : 'bg-green-500'}`}></div>
                      <span className={`text-sm font-medium ${isLowStock ? 'text-red-600' : 'text-green-600'}`}>
                        {inv.stock} in stock
                      </span>
                    </div>
                    {isLowStock && (
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">
                        Low Stock
                      </span>
                    )}
                  </div>
                </div>

                {/* Status Badges */}
                <div className="px-4 pb-4">



                  {/* Quantity Selector */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <label className="text-sm font-medium text-gray-700 block mb-2">
                      Quantity
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(inv, -1)}   // pass full item + -1
                        className="cursor-pointer w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                      >
                        −
                      </button>
                      <input
                        // type="number"
                        value={!isItemAdded ? quantity : '-'}
                        disabled={isItemAdded}
                        // onChange={(e) => updateQuantity(inv.id, Math.max(1, parseInt(e.target.value) || 1))}
                        className=" w-16 text-center py-1 px-2 border border-gray-300 rounded-md text-sm font-medium"
                      // min="1"
                      // max={inv.stock}
                      />
                      <button
                        disabled={isItemAdded}
                        // type="number"

                        value={quantity}
                        onClick={() => updateQuantity(inv, 1)}    // pass full item + +1
                        className="cursor-pointer w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <div className="mt-2 text-right">
                      <span className="text-sm font-semibold text-indigo-600">
                        Subtotal: ₹{Number((inv.price || 0) * quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                  {/* {isSelected && (
                  )} */}
                </div>
              </div>
            );
          })}
        </div>
      )}


    </div>
  );
}

// =========================================================
