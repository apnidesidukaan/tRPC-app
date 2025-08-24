// app/explore/[moduleSlug]/ExploreFilters.js
'use client';
import React from 'react';
import { Search, Grid, List } from 'lucide-react';

const ExploreFilters = ({
    searchQuery,
    selectedCategory,
    sortBy,
    viewMode,
    categoryOptions,
    onFilterChange
}) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search categories, vendors, or dishes..."
                        value={searchQuery}
                        onChange={(e) => onFilterChange({ search: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                </div>
                <div className="flex space-x-3">
                    <select
                        value={selectedCategory}
                        onChange={(e) => onFilterChange({ category: e.target.value })}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                        <option value="all">All Categories</option>
                        {categoryOptions.slice(1).map(category => (
                            <option key={category} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </option>
                        ))}
                    </select>
                    <select
                        value={sortBy}
                        onChange={(e) => onFilterChange({ sort: e.target.value })}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                        <option value="popular">Most Popular</option>
                        <option value="rating">Highest Rated</option>
                        <option value="delivery">Fastest Delivery</option>
                        <option value="name">Name A-Z</option>
                    </select>
                    <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                        <button
                            onClick={() => onFilterChange({ view: 'grid' })}
                            className={`p-3 ${viewMode === 'grid' ? 'bg-orange-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                        >
                            <Grid className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => onFilterChange({ view: 'list' })}
                            className={`p-3 ${viewMode === 'list' ? 'bg-orange-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                        >
                            <List className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExploreFilters;