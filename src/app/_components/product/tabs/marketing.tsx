"use client";

import { useState } from "react";
import {
    FaTag,
    FaBoxOpen,
    FaDollarSign,
    FaExclamationTriangle,

} from "react-icons/fa";
import {
    MdInventory,
    MdCategory,
    MdDescription,

} from "react-icons/md";


// ===============================================================================
export const MarketingTab = ({ formData, handleChange, errors }) => {

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
                            Product Image Url*
                        </label>
                        <input
                            type="text"
                            name="metaImage"
                            value={formData.metaImage}
                            onChange={handleChange}
                            className={`w-full bg-white/10 backdrop-blur-md border rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ${errors.name ? "border-red-500 ring-2 ring-red-500/30" : "border-white/20 hover:border-white/40"
                                }`}
                            // placeholder="Enter product name..."
                        />
                        {errors.metaImage && (
                            <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                                <FaExclamationTriangle />
                                {errors.metaImage}
                            </p>
                        )}
                    </div>

                   
                </div>

      

               
            </div>
        </>
    )
};

// ===============================================================================