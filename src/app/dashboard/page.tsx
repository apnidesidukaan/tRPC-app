"use client";

import React, { useState } from 'react';
import { api } from "~/trpc/react";
import { useRouter } from 'next/navigation';
import { Button } from '~/app/components/ui/button/button';
import ProductTable from '~/app/components/ui/tables/modernTable/component/Table';
import SearchBar from '~/app/components/ui/tables/modernTable/component/SearchBar';
import FilterPanel from '~/app/components/ui/tables/modernTable/component/FilterPanel';
import ProductDetailModal from '~/app/components/ui/tables/modernTable/component/ProductDetailModal';
import Layout from '../layouts/Layout';

const DashboardPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'products' | 'inventory'>('products');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch products
  const { data: products, isLoading: isProductsLoading } = api.product.getAll.useQuery();

  // Fetch inventory items
  const { data: inventoryItems, isLoading: isInventoryLoading } = api.inventory.getAll.useQuery();

  // Search products
  const { data: productSearchResults, refetch: refetchProductSearch } = api.product.search.useQuery({
    query: searchQuery || undefined,
    categoryId: selectedCategory || undefined,
    status: selectedStatus as "draft" | "active" | "inactive" | "archived" || undefined,
    minPrice: minPrice ? parseFloat(minPrice) : undefined,
    maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
  }, {
    enabled: false // We'll manually trigger this
  });

  // Search inventory items
  const { data: inventorySearchResults, refetch: refetchInventorySearch } = api.inventory.search.useQuery({
    query: searchQuery || undefined,
    categoryId: selectedCategory || undefined,
    status: selectedStatus || undefined,
    minPrice: minPrice ? parseFloat(minPrice) : undefined,
    maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
  }, {
    enabled: false // We'll manually trigger this
  });

  // Delete product
  const { mutate: deleteProduct } = api.product.delete.useMutation({
    onSuccess: () => {
      alert('Product deleted successfully');
    },
    onError: (error: any) => {
      alert(`Error deleting product: ${error.message}`);
    }
  });

  // Delete inventory item
  const { mutate: deleteInventory } = api.inventory.delete.useMutation({
    onSuccess: () => {
      alert('Inventory item deleted successfully');
    },
    onError: (error) => {
      alert(`Error deleting inventory item: ${error.message}`);
    }
  });

  // Handle search
  const handleSearch = () => {
    if (activeTab === 'products') {
      refetchProductSearch();
    } else {
      refetchInventorySearch();
    }
  };

  // Handle delete
  const handleDelete = (id: string, type: 'product' | 'inventory') => {
    if (confirm(`Are you sure you want to delete this ${type}?`)) {
      if (type === 'product') {
        deleteProduct(id);
      } else {
        deleteInventory(id);
      }
    }
  };

  // Handle view details
  const handleViewDetails = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  // Handle edit
  const handleEdit = (id: string, type: 'product' | 'inventory') => {
    if (type === 'product') {
      router.push(`/products/edit/${id}`);
    } else {
      // For inventory, we would need an edit page
      router.push(`/inventory/edit/${id}`);
    }
  };

  // Handle create new
  const handleCreateNew = (type: 'product' | 'inventory') => {
    if (type === 'product') {
      router.push('/products/create');
    } else {
      // For inventory, we would need a create page
      router.push('/inventory/create');
    }
  };

  // Columns for the tables
  const productColumns = ['Product', 'SKU', 'Category', 'Price', 'Stock', 'Status'];
  const inventoryColumns = ['Item', 'SKU', 'Category', 'Price', 'Stock', 'Status'];

  return (

    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Inventory Management Dashboard</h1>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-2 px-4 font-medium text-sm ${activeTab === 'products' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('products')}
          >
            Products
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm ${activeTab === 'inventory' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('inventory')}
          >
            Inventory
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <Button
              onClick={() => handleCreateNew(activeTab === 'products' ? 'product' : 'inventory')}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Add New {activeTab === 'products' ? 'Product' : 'Inventory Item'}
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <SearchBar
            searchTerm={searchQuery}
            setSearchTerm={setSearchQuery}
          />

          <FilterPanel
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            onApplyFilters={handleSearch}
          />
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {activeTab === 'products' ? (
            isProductsLoading ? (
              <div className="p-8 text-center">
                <p>Loading products...</p>
              </div>
            ) : (
              <ProductTable
                inventory={products || []}
                handleProductClick={handleViewDetails}
                columns={productColumns}
              />
            )
          ) : isInventoryLoading ? (
            <div className="p-8 text-center">
              <p>Loading inventory items...</p>
            </div>
          ) : (
            <ProductTable
              inventory={inventoryItems || []}
              handleProductClick={handleViewDetails}
              columns={inventoryColumns}
            />
          )}
        </div>

        {/* Product Detail Modal */}
        {isModalOpen && selectedItem && (
          <ProductDetailModal
            product={selectedItem}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </Layout>
  );
};

export default DashboardPage;