'use client'
// import { useCategory } from '../../controllers/categories';
import React, { useState } from 'react';
import { api } from '~/trpc/react';

// Mock hook for demonstration
// const useCategory = (id) => {
//   const categories = [
//     { name: "Noodles", image: "/products/ciggar.png" },
//     { name: "Frozen Veg Snacks", image: "/products/mamaearth.png" },
//     { name: "Frozen Non-Veg Snacks", image: "/products/milk.png" },
//     { name: "Pasta", image: "/products/lipstick.png" },
//     { name: "Instant Mixes", image: "/products/mamaearth.png" },
//     { name: "Energy Bars", image: "/products/mamaearth.png" },
//     { name: "Soup", image: "/products/mamaearth.png" },
//     { name: "Beverages", image: "/products/mamaearth.png" },
//     { name: "Snacks", image: "/products/ciggar.png" },
//     { name: "Desserts", image: "/products/lipstick.png" },
//   ];

//   return { categories, refetchCategories: () => { } };
// };

const SubCategorySidebar = ({ moduleId, selectedCategory, setSelectedCategory }) => {


  const { data: categories, isLoading } = api.category.getByModuleId.useQuery(moduleId);
  // console.log('=====================categories', categories);

  // const { categories, refetchCategories } = useCategory();
  // const [selectedCategory, setSelectedCategory] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const handleCategoryClick = (category) => {
    // setSelectedCategory(index === selectedCategory ? null : index);
    setSelectedCategory(category?.id === selectedCategory ? null : category?.id);
  };

  return (
    <aside className="w-full lg:w-64 bg-gradient-to-b from-white to-gray-50/50 border-b lg:border-b-0 lg:border-r border-gray-200/80 shadow-sm">
      {/* Header */}
      <div className="hidden lg:block p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          Categories
        </h3>
        <p className="text-sm text-gray-500 mt-1">Browse by category</p>
      </div>

      {/* Mobile: Horizontal Scroll */}
      <div className="lg:hidden p-4">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
          {categories?.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => handleCategoryClick(cat, idx)}
              className={`shrink-0 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ${selectedCategory === cat?.id ? 'transform scale-105' : ''
                }`}
            >
              <div className={`relative w-16 h-16 p-3 rounded-2xl border-2 transition-all duration-300 ${selectedCategory === cat?.id
                ? 'bg-gradient-to-br from-green-400 to-green-500 border-green-400 shadow-lg'
                : 'bg-white border-gray-200 hover:border-green-300 hover:shadow-md'
                }`}>
                <img
                  src={cat.icon}
                  alt={cat.name}
                  className={`w-full h-full object-contain transition-all duration-300 ${selectedCategory === cat?.id ? 'brightness-0 invert' : ''
                    }`}
                />
                {selectedCategory === idx && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                )}
              </div>
              <span className={`text-xs mt-2 font-medium transition-colors duration-300 ${selectedCategory === cat?.id ? 'text-green-600' : 'text-gray-700'
                }`}>
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: Vertical List */}
      <div className="hidden lg:block p-4">
        <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {categories?.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => handleCategoryClick(cat, idx)}
              onMouseEnter={() => setHoveredCategory(idx)}
              onMouseLeave={() => setHoveredCategory(null)}
              className={`group flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-300 ${selectedCategory === cat?.id
                ? 'bg-gradient-to-r from-green-50 to-green-100/50 border-2 border-green-200 shadow-md'
                : 'hover:bg-gray-50 border-2 border-transparent'
                }`}
            >
              <div className={`relative w-12 h-12 p-2 rounded-xl border-2 transition-all duration-300 ${selectedCategory === cat?.id
                ? 'bg-gradient-to-br from-green-400 to-green-500 border-green-400 shadow-lg'
                : hoveredCategory === cat?.id
                  ? 'bg-green-50 border-green-200 shadow-md'
                  : 'bg-white border-gray-200'
                }`}>
                <img
                  src={cat.icon}
                  alt={cat.name}
                  className={`w-full h-full object-contain transition-all duration-300 `}
                />
                {selectedCategory === idx && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <span className={`text-sm font-medium transition-colors duration-300 ${selectedCategory === cat?.id ? 'text-green-700' : 'text-gray-700 group-hover:text-gray-900'
                  }`}>
                  {cat.name}
                </span>
                {hoveredCategory === idx && (
                  <div className="text-xs text-gray-500 mt-1 opacity-75">
                    Click to select
                  </div>
                )}
              </div>

              {/* Arrow indicator */}
              <div className={`w-5 h-5 flex items-center justify-center transition-all duration-300 ${selectedCategory === cat?.id ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-600'
                }`}>
                <svg className={`w-3 h-3 transition-transform duration-300 ${selectedCategory === cat?.id ? 'rotate-90' : ''
                  }`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer stats */}
      <div className="hidden lg:block p-4 border-t border-gray-100 mt-auto">
        <div className="text-xs text-gray-500 text-center">
          {categories?.length} categories available
        </div>
      </div>
    </aside>
  );
};

export default SubCategorySidebar;