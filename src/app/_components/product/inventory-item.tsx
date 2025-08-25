"use client";

import { useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaHeart,
  FaShare,
  FaStar,
  FaLeaf,
  FaUtensils,
  FaCog,
  FaBoxOpen,
  FaFireAlt,
  FaGem,
  FaShoppingCart
} from "react-icons/fa";
import {
  MdVerified,
  MdTrendingUp,
  MdFlashOn
} from "react-icons/md";

// Mock type definition for demo
type InventoryItemProps = {
  inventory: any; // Use any type to avoid type conflicts
  cartItems: any[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
};

export const InventoryItem = ({
  inventory,
  cartItems,
  onEdit,
  onDelete,
  onView
}: InventoryItemProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Find if this inventory item is in the cart and get its quantity
  const cartItem = cartItems?.find((item: any) =>
    item.inventoryId === inventory.id || item.id === inventory.id
  );
  const isInCart = !!cartItem;
  const cartQuantity = cartItem ? (cartItem.quantity || 1) : 0;

  // Function to trim text to maximum 45 characters
  const trimText = (text: string, maxLength: number = 45) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  // Auto-rotate images on hover
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (inventory.images && inventory.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % inventory.images!.length);
      }, 800);

      setTimeout(() => {
        clearInterval(interval);
        setCurrentImageIndex(0);
      }, 3000);
    }
  };

  const getStockStatusColor = () => {
    if (inventory.stock > 20) return 'from-emerald-400 to-green-500';
    if (inventory.stock > 10) return 'from-amber-400 to-yellow-500';
    return 'from-red-400 to-rose-500';
  };

  const getStatusBadgeColor = () => {
    if (inventory.status === 'active') return 'from-emerald-500 to-green-600';
    if (inventory.status === 'inactive') return 'from-gray-400 to-gray-500';
    return 'from-blue-500 to-indigo-600';
  };

  return (
    <div
      className="text-xs group relative overflow-hidden rounded-xl bg-gradient-to-br from-white via-gray-50/90 to-blue-50/40 p-3 shadow-md backdrop-blur-sm border border-white/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isHovered
          ? 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,248,255,0.9) 50%, rgba(219,234,254,0.7) 100%)'
          : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(249,250,251,0.7) 50%, rgba(241,245,249,0.5) 100%)'
      }}
    >
      {/* Floating Badges - More Compact */}
      <div className="absolute -top-1 -right-1 z-20 flex flex-col gap-0.5">
        {inventory.isFeatured && (
          <div className="animate-pulse rounded-full bg-gradient-to-r from-amber-400 to-orange-500 p-1.5 shadow-md">
            <FaGem className="text-white text-[10px]" />
          </div>
        )}
        {inventory.isNew && (
          <div className="animate-bounce rounded-full bg-gradient-to-r from-pink-500 to-rose-600 px-1.5 py-0.5 shadow-md">
            <span className="text-[8px] font-bold text-white">NEW</span>
          </div>
        )}
        {inventory.isTrending && (
          <div className="animate-pulse rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 p-1 shadow-md">
            <MdTrendingUp className="text-white text-[10px]" />
          </div>
        )}
      </div>

      {/* Discount Banner - More Compact */}
      {inventory.discount && inventory.discount > 0 && (
        <div className="absolute top-3 left-0 z-10">
          <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-2 py-0.5 rounded-r-full shadow-md transform -skew-x-12">
            <span className="text-[10px] font-bold skew-x-12 flex items-center">
              <MdFlashOn className="mr-0.5 text-[10px]" />
              {inventory.discount}%
            </span>
          </div>
        </div>
      )}

      {/* Main Image Section - More Compact */}
      <div className="relative mb-3 overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 aspect-square group-hover:shadow-xl transition-shadow duration-300">
        {inventory.images && inventory.images.length > 0 ? (
          <>
            <img
              src={inventory.images[currentImageIndex]}
              alt={inventory.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Image Overlay Actions - More Compact */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-2 left-2 right-2 flex justify-between">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-1.5 rounded-full backdrop-blur-sm transition-all duration-300 ${isLiked
                    ? 'bg-red-500 text-white shadow-md scale-105'
                    : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                >
                  <FaHeart className="text-xs" />
                </button>

                {onView && (
                  <button
                    onClick={() => onView(inventory.id)}
                    className="p-1.5 rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
                  >
                    <FaEye className="text-xs" />
                  </button>
                )}

                <button className="p-1.5 rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 transition-all duration-300">
                  <FaShare className="text-xs" />
                </button>
              </div>
            </div>

            {/* Image Indicators - More Compact */}
            {inventory.images.length > 1 && (
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
                {inventory.images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1 h-1 rounded-full transition-all duration-300 ${index === currentImageIndex
                      ? 'bg-white shadow-sm'
                      : 'bg-white/50'
                      }`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">
            <FaBoxOpen className="text-3xl text-indigo-300" />
          </div>
        )}
      </div>

      {/* Content Section - More Compact */}
      <div className="space-y-2.5">
        {/* Title and Rating - More Compact */}
        <div className="space-y-1.5">
          <div className="flex items-start justify-between gap-2">
            <h3 
              className="text-sm font-bold text-gray-900 group-hover:text-indigo-700 transition-colors duration-300 leading-tight flex-1 vikas2"
              title={inventory.name}
            >
              {trimText(inventory.name, 45)}
            </h3>
            {inventory.rating && (
              <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 px-1.5 py-0.5 rounded-full shadow-sm flex-shrink-0">
                <FaStar className="text-white text-[10px]" />
                <span className="text-[10px] font-bold text-white">{inventory.rating}</span>
              </div>
            )}
          </div>

          {inventory.description && (
            <p className="text-xs text-gray-600 line-clamp-2 group-hover:text-gray-700 transition-colors duration-300">
              {inventory.description}
            </p>
          )}
        </div>

        {/* Category Badge - More Compact */}
        {inventory.category && (
          <div className="flex items-center">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-800 text-[10px] font-medium shadow-sm">
              <FaUtensils className="text-[8px]" />
              {inventory.category}
            </span>
          </div>
        )}

        {/* Price and Stock - More Compact */}
        <div className="flex items-center justify-between gap-2">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                ₹{inventory.price.toFixed(2)}
              </span>
              {inventory.discount && inventory.discount > 0 && (
                <span className="text-xs text-gray-500 line-through">
                  ₹{(inventory.price / (1 - inventory.discount / 100)).toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <div className="text-right">
            <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r ${getStockStatusColor()} text-white shadow-sm`}>
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
              <span className="text-[10px] font-bold">{inventory.stock}</span>
            </div>
          </div>
        </div>
        
        {/* Cart Status Indicator - Removed cart functionality */}

        {/* Status and Type Badges - More Compact with Light Colors */}
        <div className="flex flex-wrap gap-1">
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r ${getStatusBadgeColor()} text-white text-[10px] font-medium shadow-sm`}>
            <MdVerified className="text-[8px]" />
            {inventory.status}
          </span>

          {inventory.isVeg !== undefined && (
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium shadow-sm border ${inventory.isVeg
              ? "bg-green-50 text-green-800 border-green-200"
              : "bg-red-50 text-red-800 border-red-200"
              }`}>
              <FaLeaf className="text-[8px]" />
              {inventory.isVeg ? "Veg" : "Non-Veg"}
            </span>
          )}

          {inventory.isService && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-purple-50 text-purple-800 border border-purple-200 text-[10px] font-medium shadow-sm">
              <FaCog className="text-[8px]" />
              Service
            </span>
          )}
        </div>

        {/* Action Buttons - More Compact */}
        <div className="flex gap-1.5 pt-1">
          <button className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-1.5 group/btn">
            <FaShoppingCart className="text-xs group-hover/btn:animate-bounce" />
            Add to Cart
          </button>

          <div className="flex gap-1">
            {onEdit && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(inventory.id);
                }}
                className="p-1.5 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group/edit"
              >
                <FaEdit className="text-xs group-hover/edit:animate-pulse" />
              </button>
            )}

            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(inventory.id);
                }}
                className="p-1.5 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group/delete"
              >
                <FaTrash className="text-xs group-hover/delete:animate-pulse" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Animated Background Particles - More Subtle */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full animate-float"></div>
        <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full animate-float-delayed"></div>
        <div className="absolute top-1/3 -left-2 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-float-slow"></div>
      </div>

      {/* Glow Effect - More Subtle */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-sm"></div>
    </div>
  );
};