// components/ui/SearchBar.jsx
import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ searchQuery, setSearchQuery, isFocused, setIsFocused }) => {
    return (
        <div className={`relative flex-1 max-w-2xl transition-all duration-300 ${isFocused ? 'scale-105' : ''}`}>
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
                type="text"
                placeholder="Search for products, vendors, categories..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 bg-gray-50 focus:bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            {searchQuery && isFocused && ( // Added isFocused to only show when active
                <div className="absolute top-full left-0 right-0 bg-white rounded-xl shadow-xl border mt-2 py-4 px-4 z-50">
                    <div className="text-sm text-gray-600 mb-2">Popular searches</div>
                    <div className="space-y-2">
                        {/* Mock search results - replace with actual search logic */}
                        <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                            <div className="text-lg">🍕</div>
                            <div>
                                <div className="font-medium">Pizza</div>
                                <div className="text-xs text-gray-500">450+ options available</div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                            <div className="text-lg">🍎</div>
                            <div>
                                <div className="font-medium">Fresh Fruits</div>
                                <div className="text-xs text-gray-500">Seasonal delights</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchBar;