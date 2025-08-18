"use client";
import React, { useState } from "react";
import { api } from "~/trpc/react";
import { ModuleForm } from "../_components/categoryModule/ModuleForm";
import Layout from "../layouts/Layout";
import { useRouter } from "next/navigation";

const CategoryModulePage = () => {
  const router = useRouter()
  const utils = api.useUtils();



  const { data: modules, isLoading } = api.module.getAll.useQuery();
  const { data: categories } = api.module.getCategoriesForModule.useQuery({ moduleId: '68972283a4062e831546e6f7' });

  // console.log("categories Data:", categories);


  const deleteMutation = api.module.delete.useMutation({
    onSuccess: () => utils.module.getAll.invalidate(),
  });

  const [editingModule, setEditingModule] = useState<any>(null);
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
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Modules</h1>
            <p className="text-gray-600">Manage your business modules</p>
          </div>
          <button
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2 font-medium"
            onClick={() => {
              setEditingModule(null);
              setShowForm(true);
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Module
          </button>
        </div>

        {/* Form Section */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              {editingModule ? "Edit Module" : "Create New Module"}
            </h2>
            <ModuleForm

              initialData={editingModule}
              onSuccess={() => setShowForm(false)}
            />
          </div>
        )}

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Total Modules</p>
                <p className="text-2xl font-bold text-blue-700">{modules?.length || 0}</p>
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
                  {modules?.filter(m => m.isActive).length || 0}
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
                  {modules?.filter(m => m.isFeatured).length || 0}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl p-4 border border-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">Categories</p>
                <p className="text-2xl font-bold text-purple-700">
                  {modules?.reduce((acc, m) => acc + (m.Category?.length || 0), 0) || 0}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Modules Grid */}
        {modules?.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gray-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No modules found</h3>
            <p className="text-gray-500 mb-6">Get started by creating your first module</p>
            <button
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
              onClick={() => {
                setEditingModule(null);
                setShowForm(true);
              }}
            >
              Create Module
            </button>
          </div>
        ) : (
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules?.map((mod: any) => (
              <div
                key={mod.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 hover:border-gray-200 transition-all duration-300 transform hover:-translate-y-1 group"
              >
                {/* Card Header */}
                <div className="p-6 pb-4"
                  onClick={() => {
                    router.push(`/category/${mod.id}`);

                    // setEditingModule(mod);
                    // setShowForm(true);
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                        {mod.name}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                        {mod.description || "No description provided"}
                      </p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      {mod.isActive && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Active
                        </span>
                      )}
                      {mod.isFeatured && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          Featured
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Module Info */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Business ID:</span>
                      <span className="font-medium text-gray-700">{mod.businessId}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Version:</span>
                      <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{mod.version}</span>
                    </div>
          
                    {/* Categories */}
                    {mod.Category && mod.Category.length > 0 && (
                      <div className="pt-2">
                        <p className="text-sm text-gray-500 mb-2">Categories:</p>
                        <div className="flex flex-wrap gap-1">
                          {mod.Category.map((category: any, index: number) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100"
                            >
                              {category.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 py-4 bg-gray-50 rounded-b-2xl border-t border-gray-100">
                  <div className="flex gap-2">
                    <button
                      className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-lg hover:from-yellow-500 hover:to-orange-500 transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                      onClick={() => {
                        setEditingModule(mod);
                        setShowForm(true);
                      }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this module?')) {
                          deleteMutation.mutate(mod.id);
                        }
                      }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CategoryModulePage;