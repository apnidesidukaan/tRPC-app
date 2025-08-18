
import { api } from "~/trpc/server";
import { InventoryList } from "~/app/_components/inventory/inventory-list";
import { InventorySearch } from "~/app/_components/inventory/inventory-search";
import { InventoryNav } from "~/app/_components/inventory/inventory-nav";
import Layout from "../layouts/Layout";

export default async function InventoryPage() {
  const inventories = await api.inventory.getAll();

  return (
    <Layout>

      <div className="container mx-auto px-4 py-8">
        <InventoryNav />

        <div className="mb-8 flex flex-col justify-between md:flex-row md:items-center">
          <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
          <div className="mt-4 md:mt-0">
            <a
              href="/inventory/new"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add New Item
            </a>
          </div>
        </div>

        <InventorySearch
        // onSearch={() => {}}
        />

        <div className="mt-8">
          <InventoryList initialInventories={inventories} />
        </div>
      </div>
    </Layout>
  );
}