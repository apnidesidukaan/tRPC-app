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
  inventory: {
    id: string;
    name: string;
    description?: string;
    price: number;
    stock: number;
    status: string;
    isVeg?: boolean;
    isService?: boolean;
    images?: string[];
    category?: string;
    rating?: number;
    discount?: number;
    isNew?: boolean;
    isTrending?: boolean;
    isFeatured?: boolean;
  };
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
};



export const InventoryItem = ({
  inventory,
  onEdit,
  onDelete,
  onView
}: InventoryItemProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
      className=" text-xs group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-gray-50/80 to-indigo-50/30 p-4 shadow-lg backdrop-blur-md border border-white/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:scale-[1.01] cursor-pointer"

      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isHovered
          ? 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(240,245,255,0.8) 50%, rgba(224,231,255,0.6) 100%)'
          : 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(249,250,251,0.6) 50%, rgba(238,242,255,0.4) 100%)'
      }}
    >
      {/* Floating Badges */}
      <div className="absolute -top-2 -right-2 z-20 flex flex-col gap-1">
        {inventory.isFeatured && (
          <div className="animate-pulse rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 p-2 shadow-lg">
            <FaGem className="text-white text-xs" />
          </div>
        )}
        {inventory.isNew && (
          <div className="animate-bounce rounded-full bg-gradient-to-r from-pink-500 to-rose-600 px-2 py-1 shadow-lg">
            <span className="text-[10px] font-bold text-white">NEW</span>
          </div>
        )}
        {inventory.isTrending && (
          <div className="animate-pulse rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 p-1.5 shadow-lg">
            <MdTrendingUp className="text-white text-xs" />
          </div>
        )}
      </div>

      {/* Discount Banner */}
      {inventory.discount && inventory.discount > 0 && (
        <div className="absolute top-4 left-0 z-10">
          <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1 rounded-r-full shadow-lg transform -skew-x-12">
            <span className="text-xs font-bold skew-x-12 flex items-center">
              <MdFlashOn className="mr-1" />
              {inventory.discount}% OFF
            </span>
          </div>
        </div>
      )}

      {/* Main Image Section */}
      <div className="relative mb-4 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 aspect-square group-hover:shadow-2xl transition-shadow duration-500">
        {inventory.images && inventory.images.length > 0 ? (
          <>
            <img
              src={inventory.images[currentImageIndex]}
              alt={inventory.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Image Overlay Actions */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-3 left-3 right-3 flex justify-between">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 ${isLiked
                    ? 'bg-red-500 text-white shadow-lg scale-110'
                    : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                >
                  <FaHeart className="text-sm" />
                </button>

                {onView && (
                  <button
                    onClick={() => onView(inventory.id)}
                    className="p-2 rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white/30 transition-all duration-300"
                  >
                    <FaEye className="text-sm" />
                  </button>
                )}

                <button className="p-2 rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white/30 transition-all duration-300">
                  <FaShare className="text-sm" />
                </button>
              </div>
            </div>

            {/* Image Indicators */}
            {inventory.images.length > 1 && (
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                {inventory.images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${index === currentImageIndex
                      ? 'bg-white shadow-lg'
                      : 'bg-white/50'
                      }`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">
            <FaBoxOpen className="text-4xl text-indigo-300" />
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="space-y-4">
        {/* Title and Rating */}
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-700 transition-colors duration-300 leading-tight">
              {inventory.name}
            </h3>
            {inventory.rating && (
              <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 px-2 py-1 rounded-full shadow-md">
                <FaStar className="text-white text-xs" />
                <span className="text-xs font-bold text-white">{inventory.rating}</span>
              </div>
            )}
          </div>

          {inventory.description && (
            <p className="text-sm text-gray-600 line-clamp-2 group-hover:text-gray-700 transition-colors duration-300">
              {inventory.description}
            </p>
          )}
        </div>

        {/* Category Badge */}
        {inventory.category && (
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-800 text-xs font-medium shadow-sm">
              <FaUtensils className="text-xs" />
              {inventory.category}
            </span>
          </div>
        )}

        {/* Price and Stock */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                ₹{inventory.price.toFixed(2)}
              </span>
              {inventory.discount && inventory.discount > 0 && (
                <span className="text-sm text-gray-500 line-through">
                  ₹{(inventory.price / (1 - inventory.discount / 100)).toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <div className="text-right">
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${getStockStatusColor()} text-white shadow-lg`}>
              <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
              <span className="text-xs font-bold">{inventory.stock} in stock</span>
            </div>
          </div>
        </div>

        {/* Status and Type Badges */}
        <div className="flex flex-wrap gap-2">
          <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r ${getStatusBadgeColor()} text-white text-xs font-medium shadow-md`}>
            <MdVerified className="text-xs" />
            {inventory.status}
          </span>

          {inventory.isVeg !== undefined && (
            <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium shadow-md ${inventory.isVeg
              ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
              : "bg-gradient-to-r from-red-500 to-rose-600 text-white"
              }`}>
              <FaLeaf className="text-xs" />
              {inventory.isVeg ? "Vegetarian" : "Non-Vegetarian"}
            </span>
          )}

          {inventory.isService && (
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xs font-medium shadow-md">
              <FaCog className="text-xs" />
              Service Item
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <button className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2.5 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn">
            <FaShoppingCart className="text-sm group-hover/btn:animate-bounce" />
            Add to Cart
          </button>

          <div className="flex gap-2">
            {onEdit && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(inventory.id);
                }}
                className="p-2.5 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group/edit"
              >
                <FaEdit className="text-sm group-hover/edit:animate-pulse" />
              </button>
            )}

            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(inventory.id);
                }}
                className="p-2.5 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group/delete"
              >
                <FaTrash className="text-sm group-hover/delete:animate-pulse" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full animate-float"></div>
        <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full animate-float-delayed"></div>
        <div className="absolute top-1/2 -left-3 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-float-slow"></div>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl transform scale-105"></div>
    </div>
  );
};