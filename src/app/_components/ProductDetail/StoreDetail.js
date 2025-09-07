"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { api } from "~/trpc/react";

export default function InventoryStore({ storeId }) {
  const router = useRouter();
  const { data: store, isLoading } = api.store.getById.useQuery(storeId);
  
  if (isLoading) return <p>Loading...</p>;
  if (!store) return <p>Store not found</p>;

  return (
    <div
      onClick={() => { router.push(`/store/${store.id}/${store.name}`) }}
      className="bg-white rounded-lg shadow-md border border-gray-200 p-4 hover:shadow-lg transition-shadow duration-200 cursor-pointer">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">
          {store.name}
        </h3>
        <svg
          className="w-5 h-5 text-blue-600 hover:text-blue-800 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </div>
    </div>
  );
}