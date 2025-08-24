// app/explore/[moduleSlug]/TopCategoriesSection.js
'use client';
import React from 'react';
import { ChevronRight } from 'lucide-react';
import CategoryCard from './CategoryCard'; // Import the CategoryCard

const TopCategoriesSection = ({ categories }) => {
    if (!categories || categories.length === 0) {
        return null; // Don't render if no categories
    }
    return (
        <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Top Categories</h2>
                <button className="text-orange-600 hover:text-orange-700 font-medium flex items-center">
                    View All <ChevronRight className="w-4 h-4 ml-1" />
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.slice(0, 6).map((category) => (
                    <CategoryCard key={category.id} category={category} />
                ))}
            </div>
        </div>
    );
};

export default TopCategoriesSection;