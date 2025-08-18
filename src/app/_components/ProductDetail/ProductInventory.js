"use client";
import React, { useEffect, useState } from "react";
import { useCartManager } from "~/app/components/CartManager";
// import { useSession } from "next-auth/react";

// =========================================================
export default function InventoryList({ inventoryItem }) {
  // const { data:session } = useSession();

  // console.log('session=========', session);


  const { getCartItems, addItemToCart } = useCartManager()

  useEffect(() => {
    // Fetch cart items when component mounts
    const cartItems = getCartItems();
    // console.log('Cart Items:', cartItems);
  }, [getCartItems]);
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

  const handleItemSelect = (item) => {
    const newSelected = new Set(selectedItems);
    const itemId = item?.id;
    const quantity = quantities[itemId] || 1;

    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
      const newQuantities = { ...quantities };
      delete newQuantities[itemId];
      setQuantities(newQuantities);
    } else {
      newSelected.add(itemId);
      setQuantities({ ...quantities, [itemId]: quantity });
      // Add item to cart when selected
      addItemToCart(item, quantity);
    }
    setSelectedItems(newSelected);
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity > 0) {
      setQuantities({ ...quantities, [itemId]: quantity });
      // Update cart item quantity
      addItemToCart(itemId, quantity);
    }
  };

  const getTotalAmount = () => {
    return Array.from(selectedItems).reduce((total, itemId) => {
      const item = inventoryItem.find(inv => inv.id === itemId);
      const quantity = quantities[itemId] || 1;
      return total + (item?.price || 0) * quantity;
    }, 0);
  };

  const getTotalItems = () => {
    return Array.from(selectedItems).reduce((total, itemId) => {
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
  // =========================================================

  return (
    <div className="b-accent p-6 max-w-7xl mx-auto">

      {/* Cart Summary */}
      {selectedItems.size > 0 && (
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

        <div className="flex items-center gap-4">
          {/* View Mode Toggle */}
          <div className="bg-gray-100 rounded-lg p-1 flex">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${viewMode === "grid"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
                }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${viewMode === "list"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
                }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
          </div>

        </div>
      </div>


      {/* Grid View  ==================================================================*/}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-6">
          {inventoryItem.map((inv) => {
            const isSelected = selectedItems.has(inv.id);
            const quantity = quantities[inv.id] || 1;
            const statusConfig = getStatusConfig(inv.status);
            const approvalConfig = getApprovalConfig(inv.approvalStatus);
            const isLowStock = inv.stock <= (inv.lowStockThreshold || 10);

            return (
              <div
                key={inv.id}
                className={`bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border-2 transform hover:-translate-y-1 ${isSelected
                  ? 'border-indigo-500 ring-4 ring-indigo-100'
                  : 'border-gray-100 hover:border-gray-200'
                  }`}
              >
                {/* Product Header */}
                <div className="p-4 pb-0">
                  <img src={inv.metaImage || inv.image[0]} alt={inv.name} className="w-full h-48 object-cover rounded-lg mb-4" />
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
                    </div>

                    <button
                      onClick={() => handleItemSelect(inv)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isSelected
                        ? 'bg-indigo-600 border-indigo-600 text-white'
                        : 'border-gray-300 hover:border-indigo-500'
                        }`}
                    >
                      {isSelected && (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
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
                  <div className="flex gap-2 mb-4">
                    {/* <span className={`${statusConfig.bg} ${statusConfig.text} px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
                      <span className="text-xs">{statusConfig.icon}</span>
                      {inv.status}
                    </span> */}
                    {/* <span className={`${approvalConfig.bg} ${approvalConfig.text} px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1`}>
                      <span className="text-xs">{approvalConfig.icon}</span>
                      {inv.approvalStatus}
                    </span> */}
                  </div>

                  {/* <div className="text-xs text-gray-500 mb-4">
                    Added: {new Date(inv.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </div> */}

                  {/* Quantity Selector */}
                  {isSelected && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <label className="text-sm font-medium text-gray-700 block mb-2">
                        Quantity
                      </label>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(inv.id, Math.max(1, quantity - 1))}
                          className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          value={quantity}
                          onChange={(e) => updateQuantity(inv.id, Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-16 text-center py-1 px-2 border border-gray-300 rounded-md text-sm font-medium"
                          min="1"
                          max={inv.stock}
                        />
                        <button
                          onClick={() => updateQuantity(inv.id, Math.min(inv.stock, quantity + 1))}
                          className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
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
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* List View  ==================================================================*/}
      {viewMode === "list" && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Select
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Approval
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {inventoryItem.map((inv, index) => {
                  const isSelected = selectedItems.has(inv.id);
                  const quantity = quantities[inv.id] || 1;
                  const statusConfig = getStatusConfig(inv.status);
                  const approvalConfig = getApprovalConfig(inv.approvalStatus);
                  const isLowStock = inv.stock <= (inv.lowStockThreshold || 10);

                  return (
                    <tr
                      key={inv.id}
                      className={`hover:bg-gray-50 transition-colors ${isSelected ? 'bg-indigo-50 border-l-4 border-l-indigo-500' : ''
                        } ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleItemSelect(inv)}
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${isSelected
                            ? 'bg-indigo-600 border-indigo-600 text-white'
                            : 'border-gray-300 hover:border-indigo-500'
                            }`}
                        >
                          {isSelected && (
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-semibold text-gray-900">
                            {inv.name || "Unnamed Product"}
                          </div>
                          <div className="text-xs text-gray-500 font-mono">
                            SKU: {inv.sku || "N/A"}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-lg font-bold text-indigo-600">
                          ₹{Number(inv.price || 0).toLocaleString('en-IN')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${isLowStock ? 'bg-red-500' : 'bg-green-500'}`}></div>
                          <span className={`font-semibold ${isLowStock ? 'text-red-600' : 'text-green-600'}`}>
                            {inv.stock}
                          </span>
                          {isLowStock && (
                            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">
                              Low
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`${statusConfig.bg} ${statusConfig.text} px-2 py-1 rounded-full text-xs font-medium capitalize flex items-center gap-1 w-fit`}>
                          <span className="text-xs">{statusConfig.icon}</span>
                          {inv.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`${approvalConfig.bg} ${approvalConfig.text} px-2 py-1 rounded-full text-xs font-medium capitalize flex items-center gap-1 w-fit`}>
                          <span className="text-xs">{approvalConfig.icon}</span>
                          {inv.approvalStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {isSelected ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(inv.id, Math.max(1, quantity - 1))}
                              className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-sm font-bold transition-colors"
                            >
                              −
                            </button>
                            <span className="w-8 text-center font-semibold">{quantity}</span>
                            <button
                              onClick={() => updateQuantity(inv.id, Math.min(inv.stock, quantity + 1))}
                              className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-sm font-bold transition-colors"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">Select item</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Checkout Summary ==================================================================*/}
      {selectedItems.size > 0 && (
        <div className="fixed bottom-6 right-6 bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 max-w-sm w-full mx-auto lg:mx-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 2.5M7 13l2.5 2.5m6-7a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Cart Summary
          </h3>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Inventory selected:</span>
              <span className="font-semibold">{selectedItems.size}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Items:</span>
              <span className="font-semibold">{getTotalItems()}</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-900">Total Amount:</span>
                <span className="text-xl font-bold text-indigo-600">
                  ₹{getTotalAmount().toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                setSelectedItems(new Set());
                setQuantities({});
              }}
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
            >
              Clear
            </button>
            <button className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// =========================================================
