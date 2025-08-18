"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { InventoryForm } from "~/app/_components/inventory/inventory-form";
import { InventoryNav } from "~/app/_components/inventory/inventory-nav";
import Layout from "~/app/layouts/Layout";

export default function NewInventoryPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const utils = api.useUtils();
  const createInventoryMutation = api.product.create.useMutation({
    onSuccess: async () => {
      await utils.inventory.getAll.invalidate();
      router.push("/inventory");
    },
  });

  const handleSubmit = (data: any) => {
    setIsSubmitting(true);
    createInventoryMutation.mutate(data);
  };

  return (
    <Layout>

      <div className="container mx-auto px-4 py-8">
        <InventoryNav />

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add New Inventory Item</h1>
          <p className="mt-2 text-gray-600">Fill in the details for the new inventory item.</p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <InventoryForm
            initialData={{
              variants: [],
            }}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting || createInventoryMutation.isPending}
          />
        </div>
      </div>
    </Layout>
  );
}