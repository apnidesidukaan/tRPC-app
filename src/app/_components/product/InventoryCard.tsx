// InventoryCard.tsx
import React from "react";

export default function InventoryCard({
  item,
  onAddToCart,
}: {
  item: any;
  onAddToCart: (item: any) => void;
}) {
  return (
    <div className="flex-none w-44 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Image */}
      <div className="relative w-full h-40 bg-gray-50">
        {item.images?.[0] ? (
          <img
            src={item.images[0]}
            alt={item.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            No Image
          </div>
        )}

        {/* Offer Tag */}
        {item.discount && (
          <span className="absolute top-2 left-2 bg-[#1ba672] text-white text-xs font-bold px-2 py-0.5 rounded-md shadow">
            {item.discount}% OFF
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-2 flex flex-col gap-1">
        {/* Title */}
        <h3 className="text-xs font-medium text-gray-900 line-clamp-2 min-h-[32px]">
          {item.name}
        </h3>

        {/* Quantity / Weight */}
        {item.unit && (
          <p className="text-[11px] text-gray-500">{item.unit}</p>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-1">
          <span className="text-sm font-bold text-gray-900">
            ₹{Number(item.price).toLocaleString("en-IN")}
          </span>
          {item.originalPrice && (
            <span className="text-xs line-through text-gray-400">
              ₹{Number(item.originalPrice).toLocaleString("en-IN")}
            </span>
          )}
        </div>

        {/* Add Button */}
        <button
          // onClick={() => onAddToCart(item)}
          className="mt-1 w-full py-1.5 rounded-lg text-xs font-semibold border border-[#83bf22] text-[#83bf22] hover:bg-[#83bf22] hover:text-white transition-all duration-200"
        >
          ADD
        </button>
      </div>
    </div>
  );
}
