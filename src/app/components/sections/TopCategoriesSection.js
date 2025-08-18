'use client';
import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import CategoryCard from '../ui/card/CategoryCard';

const TopCategoriesSection = ({ categories = [], onSelect }) => {
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    if (!activeCategory && categories.length > 0) {
      setActiveCategory(categories[0].categoryId || categories[0].name);
    }
  }, [categories, activeCategory]);

  if (!categories || categories.length === 0) {
    return (
      <div className="w-full py-6 text-center text-gray-500">
        No top categories available
      </div>
    );
  }

  return (
    <section className="py-10 bg-[#f9f9f9]">
      <div className="max-w-6xl mx-auto px-4 ">
        <div className="mb-8 flex justify-between  items-center">
          <h2 className="text-xl font-bold text-gray-800">Top Categories</h2>
          <button className="flex items-center text-base text-green-600 hover:underline">
            <span>Browse All</span>
            <ChevronRight className="w-5 h-5 ml-1" />
          </button>
        </div>

        <div className="overflow-x-auto scrollbar-hide">
          <div className="inline-flex gap-4 px-1">
            {categories.map((category) => {
              const isActive = (activeCategory === category.categoryId || activeCategory === category.name);
              return (
                <button
                  key={category.categoryId || category.name}
                  onClick={() => {
                    setActiveCategory(category.categoryId || category.name);
                    onSelect?.(category);
                  }}
                  className={`bg-white flex flex-col items-center px-4 py-4 rounded-xl transition-all duration-200 shadow-sm
                    ${isActive ? 'bg-blue-50' : 'hover:bg-gray-100'}
                  `}
                  style={{ minWidth: '100px' }}
                >
                  <div className={`
                    w-16 h-16 rounded-xl overflow-hidden mb-2 flex items-center justify-center
                    ${isActive ? 'ring-2 ring-blue-500' : 'ring-1 ring-gray-300'}
                  `}>
                    <img
                      src={category.image || "/api/placeholder/64/64"}
                      alt={category.categoryName || category.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className={`text-sm font-semibold text-center truncate w-full max-w-24
                    ${isActive ? 'text-blue-700' : 'text-gray-800'}`}>
                    {category.categoryName || category.name}
                  </span>
                  {isActive && <div className="h-1 w-8 bg-blue-600 rounded-full mt-2" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopCategoriesSection;
