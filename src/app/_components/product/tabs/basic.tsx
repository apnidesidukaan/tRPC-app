"use client";

import { useState } from "react";
import {
    FaTag,
    FaBoxOpen,
    FaDollarSign,
    FaExclamationTriangle,

} from "react-icons/fa";
import { FaPersonBreastfeeding } from "react-icons/fa6";
import {
    MdInventory,
    MdCategory,
    MdDescription,
    MdBrandingWatermark,

} from "react-icons/md";


// ===============================================================================
export const BasicInfoTab = ({ formData, handleChange, errors }) => {

    // ===============================================================================v



    // ==============================================================================
    return (
        <>
            <div className="space-y-6 animate-fade-in">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
                        <MdInventory className="text-white text-xl" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Basic Information</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Product Name */}
                    <div className="relative">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-200 mb-2">
                            <FaBoxOpen className="text-indigo-400" />
                            Product Name *
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full bg-white/10 backdrop-blur-md border rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ${errors.name ? "border-red-500 ring-2 ring-red-500/30" : "border-white/20 hover:border-white/40"
                                }`}
                            placeholder="Enter product name..."
                        />
                        {errors.name && (
                            <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                                <FaExclamationTriangle />
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Price */}
                    <div className="relative">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-200 mb-2">
                            <MdBrandingWatermark className="text-green-400" />
                            Brand *
                        </label>
                        <div className="relative">

                            <input
                                type="text"
                                name="brand"
                                value={formData.brand}
                                onChange={handleChange}

                                className={`w-full bg-white/10 backdrop-blur-md border rounded-xl pl-8 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 ${errors.price ? "border-red-500 ring-2 ring-red-500/30" : "border-white/20 hover:border-white/40"
                                    }`}
                                placeholder="Nestles , patanjali , etc..."
                            />
                        </div>
                        {errors.brand && (
                            <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                                <FaExclamationTriangle />
                                {errors.brand}
                            </p>
                        )}
                    </div>

                    {/* Stock */}
                    {/* <div className="relative">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-200 mb-2">
                            <MdInventory className="text-blue-400" />
                            Stock Quantity
                        </label>
                        <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            min="0"
                            className={`w-full bg-white/10 backdrop-blur-md border rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${errors.stock ? "border-red-500 ring-2 ring-red-500/30" : "border-white/20 hover:border-white/40"
                                }`}
                            placeholder="Available quantity"
                        />
                        {errors.stock && (
                            <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                                <FaExclamationTriangle />
                                {errors.stock}
                            </p>
                        )}
                    </div> */}

                    {/* SKU */}
                    {/* <div className="relative">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-200 mb-2">
                            <FaTag className="text-purple-400" />
                            SKU Code
                        </label>
                        <input
                            type="text"
                            name="sku"
                            value={formData.sku}
                            onChange={handleChange}
                            className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 hover:border-white/40 transition-all duration-300"
                            placeholder="Product SKU..."
                        />
                    </div> */}
                </div>

                {/* Description */}
                <div className="relative">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-200 mb-2">
                        <MdDescription className="text-orange-400" />
                        Product Description
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 hover:border-white/40 transition-all duration-300 resize-none"
                        placeholder="Describe your product in detail..."
                    />
                </div>

                {/* Category and Module */}
                {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="relative">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-200 mb-2">
                            <MdCategory className="text-pink-400" />
                            Category
                        </label>
                        <input
                            type="text"
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 hover:border-white/40 transition-all duration-300"
                            placeholder="Product category..."
                        />
                    </div>

                    <div className="relative">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-200 mb-2">
                            <FaBoxOpen className="text-cyan-400" />
                            Module
                        </label>
                        <input
                            type="text"
                            name="moduleId"
                            value={formData.moduleId}
                            onChange={handleChange}
                            className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 hover:border-white/40 transition-all duration-300"
                            placeholder="Product module..."
                        />
                    </div>
                </div> */}
            </div>
        </>
    )
};

// ===============================================================================