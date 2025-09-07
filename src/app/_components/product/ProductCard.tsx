// ProductCard.tsx
"use client";
import { api } from "~/trpc/react";
import { BadgeCheck, OctagonX, Star } from "lucide-react";
import { useRouter } from "next/navigation";

export function ProductCard({ prod, onEdit, onDelete }: any) {
  const router = useRouter();
  const { data: inventory } = api.product.getInventoryCountByProductId.useQuery(prod.id);

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 hover:border-gray-200 transition-all duration-300 transform hover:-translate-y-1 group">
      {/* Inventory Badge */}
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
        Inventory: <span className="font-semibold ml-1">{inventory?.count ?? 0}</span>
      </span>

      <div
        className="p-6 pb-4 cursor-pointer"
        onClick={() => router.push(`/inventory/${prod.id}`)}
      >
        <div className="flex-1">
          {/* <img
            // src={prod?.metaImage || "/default-module.png"}
            alt={prod.name}
            className="w-16 h-16 rounded-full object-cover mb-2"
          /> */}
        </div>

        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
              {prod.name}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
              {prod.description || "No description provided"}
            </p>
          </div>

          <div className="flex gap-2 ml-4">
            {prod.isDeleted ? (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <BadgeCheck size={16} className="mr-1" />
                Active
              </span>
            ) : (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                <OctagonX size={16} className="mr-1" />
                InActive
              </span>
            )}
            {prod.isPromoted && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                <Star size={16} className="mr-1" />
                Featured
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-6 py-4 bg-gray-50 rounded-b-2xl border-t border-gray-100 flex gap-2">
        <button
          className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-lg hover:from-yellow-500 hover:to-orange-500 transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          onClick={() => onEdit(prod)}
        >
          ✏️ Edit
        </button>
        <button
          className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          onClick={() => onDelete(prod.id)}
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
}
