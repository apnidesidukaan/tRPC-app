'use client'
import React from 'react';
import { useRouter } from "next/navigation";
import { commonIcons } from '../constants/icons'; // Adjust path as needed
import { MdLocalGroceryStore } from "react-icons/md"; // Specifically import this for the header
import { IoBagCheckOutline } from "react-icons/io5";

const { FaFilter, FaList, FaThLarge, FaPlusCircle } = commonIcons;

const Header = ({
    headerTitle,
    headerIcon,

    toggleFilterPanel, getFilterCount, viewMode, setViewMode }) => {
    const router = useRouter();

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center">
                <div  className="text-accent text-4xl mr-3">
                {/* <IoBagCheckOutline className="text-accent text-4xl mr-3" /> */}
                {headerIcon}
                    </div> 
                <h1 className="text-3xl font-bold text-gray-900">{headerTitle}</h1>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex items-center gap-3 flex-wrap">
                    <button
                        onClick={toggleFilterPanel}
                        className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <FaFilter size={16} className="mr-2" />
                        <span>Filters</span>
                        {getFilterCount() > 0 && (
                            <span className="ml-2 bg-blue-500 text-white text-xs font-medium w-5 h-5 rounded-full flex items-center justify-center">
                                {getFilterCount()}
                            </span>
                        )}
                    </button>

                    <div className="bg-white border border-gray-300 rounded-lg flex">
                        <button
                            onClick={() => setViewMode("table")}
                            className={`p-2 ${viewMode === "table" ? "bg-accent text-white" : "text-gray-500"} rounded-l-lg transition-colors`}
                            aria-label="Table view"
                        >
                            <FaList size={18} />
                        </button>
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`p-2 ${viewMode === "grid" ? "bg-accent text-white" : "text-gray-500"} rounded-r-lg transition-colors`}
                            aria-label="Grid view"
                        >
                            <FaThLarge size={18} />
                        </button>
                    </div>
                </div>

                <button
                    onClick={() => router.push('/add-products')}
                    className="flex items-center px-4 py-2 bg-accent text-white rounded-lg cursor-pointer transition-colors w-full sm:w-auto"
                >
                    <FaPlusCircle size={16} className="mr-2" />
                    <span>Add Product</span>
                </button>
            </div>
        </div>
    );
};

export default Header;