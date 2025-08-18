"use client";
import React, { useState } from "react";
import { api } from "~/trpc/react";
import Layout from "../../layouts/Layout";
import { useParams, useRouter } from "next/navigation";
import { CategoryForm } from "~/app/_components/categoryModule/CategoryForm";
import { FaMartiniGlassCitrus } from "react-icons/fa6";
import { BadgeCheck, OctagonX, Star } from "lucide-react";
import { ProductForm } from "~/app/_components/product/product-form";
import { ProductCard } from "~/app/_components/product/ProductCard";

const CategoryModulePage = () => {
  const utils = api.useUtils();
  const params = useParams();

  const { data: products, isLoading } = api.product.getProductsByCategoryId.useQuery(params?.categoryId);
  const { data: inventoryCount, } = api.product.getInventoryCountByProductId.useQuery('68a1924a452f4990504f3f1a');



  const deleteMutation = api.product.delete.useMutation({
    onSuccess: () => utils.product.getProductsByCategoryId.invalidate(),
  });

  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);







  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="flex gap-2 mb-4">
                  <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                  <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                </div>
                <div className="flex gap-2">
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                  <div className="h-8 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6 space-y-8">

        {/* ================================================================ */}

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Products</h1>
            <p className="text-gray-600">Manage your business products</p>
          </div>
          <button
            className="cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2 font-medium"
            onClick={() => {
              setEditingProduct(null);
              setShowForm((prev) => !prev);
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Products
          </button>
        </div>
        {/* ================================================================ */}
        {/* Form Section */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 relative">
            <button
              onClick={() => setShowForm(false)}
              className="cursor-pointer absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              {editingProduct ? "Edit Module" : "Create New Module"}
            </h2> */}
            {/* <CategoryForm

              initialData={editingProduct}
              onSuccess={() => setShowForm(false)}
            /> */}

            <ProductForm
              initialData={editingProduct}
              onSuccess={() => {
                utils.product.getProductsByCategoryId.invalidate(),
                  setShowForm(false)

              }}
            />

          </div>
        )}
        {/* ================================================================ */}

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Total Category</p>
                <p className="text-2xl font-bold text-blue-700">{products?.length || 0}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Active</p>
                <p className="text-2xl font-bold text-green-700">
                  {products?.filter(m => m.isDeleted).length || 0}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-4 border border-yellow-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-600 text-sm font-medium">Featured</p>
                <p className="text-2xl font-bold text-yellow-700">
                  {products?.filter(m => m.isPromoted).length || 0}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
            </div>
          </div>


        </div>
        {/* ================================================================ */}

        {/* Modules Grid */}
        {products?.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gray-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Category found</h3>
            <p className="text-gray-500 mb-6">Get started by creating your first module</p>
            <button
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
              onClick={() => {
                setEditingProduct(null);
                setShowForm(true);
              }}
            >
              Create Module
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products?.map((prod: any) => (
              <ProductCard
                key={prod.id}
                prod={prod}
                onEdit={(p) => { setEditingProduct(p); setShowForm(true); }}
                onDelete={(id) => {
                  if (window.confirm("Are you sure you want to delete this module?")) {
                    deleteMutation.mutate(id);
                  }
                }}
              />
            ))}
          </div>
        )}
        {/* ================================================================ */}

      </div>
    </Layout>
  );
};

export default CategoryModulePage;