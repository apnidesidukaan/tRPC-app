// app/explore/[moduleSlug]/CategoryCard.js
'use client';
import React from 'react';
import { Flame, ChevronRight } from 'lucide-react';

const CategoryCard = ({ category }) => {
    return (
        <a
            key={category.id}
            href={`/explore/${category.slug}`}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow group"
        >
            <div className="relative">
                <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {category.trending && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                        <Flame className="w-3 h-3 mr-1" />
                        Trending
                    </div>
                )}
                <div className="absolute top-3 right-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
                    {category.vendorCount} vendors
                </div>
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{category.productCount} products</span>
                    <span className="text-sm font-medium text-gray-900">From ₹{category.avgPrice}</span>
                </div>
            </div>
        </a>
    );
};

export default CategoryCard;