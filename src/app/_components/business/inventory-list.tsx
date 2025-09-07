"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
// import { BusinessList } from "./BusinessList";
import { type RouterOutputs } from "~/trpc/react";

type InventoryListProps = {
  initialInventories: RouterOutputs["inventory"]["getAll"];
};

export const InventoryList = ({ initialInventories }: InventoryListProps) => {
  const router = useRouter();
  const [inventories, setInventories] = useState(initialInventories);
  
  const utils = api.useUtils();
  const deleteInventoryMutation = api.inventory.delete.useMutation({
    onSuccess: async () => {
      await utils.inventory.getAll.invalidate();
      router.refresh();
    },
  });

  const handleEdit = (id: string) => {
    router.push(`/inventory/${id}/edit`);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this inventory item?")) {
      deleteInventoryMutation.mutate(id);
      setInventories(inventories.filter(inventory => inventory.id !== id));
    }
  };

  if (inventories.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
        <h3 className="text-lg font-medium text-gray-900">No inventory items</h3>
        <p className="mt-1 text-gray-500">Get started by creating a new inventory item.</p>
        <div className="mt-6">
          <button
            onClick={() => router.push("/inventory/new")}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Create Inventory Item
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* {inventories.map((inventory) => (
        <BusinessList
          key={inventory.id}
          inventory={inventory}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))} */}
    </div>
  );
};