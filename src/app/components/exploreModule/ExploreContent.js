// app/explore/[moduleSlug]/ExploreContent.js
'use client';
import React, { useState, useEffect, useMemo } from 'react';
import ExploreFilters from './ExploreFilters'; // New Client Component
import TopCategoriesSection from './TopCategoriesSection'; // New Client Component
import VendorListSection from './VendorListSection'; // New Client Component

const ExploreContent = ({ initialCategories, initialFeaturedVendors, initialAllVendors }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('popular');
    const [viewMode, setViewMode] = useState('list'); // 'grid' or 'list'

    // Combine all vendors for filtering/sorting
    const allCombinedVendors = useMemo(() => {
        // Ensure uniqueness if a vendor can be both featured and in allVendors
        const combined = {};
        [...initialFeaturedVendors, ...initialAllVendors].forEach(vendor => {
            combined[vendor.id] = vendor;
        });
        return Object.values(combined);
    }, [initialFeaturedVendors, initialAllVendors]);

    // Derived state for filtering and sorting
    const filteredCategories = useMemo(() => {
        return initialCategories.filter(category =>
            category.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [initialCategories, searchQuery]);

    const filteredAndSortedVendors = useMemo(() => {
        const filtered = allCombinedVendors.filter(vendor => {
            const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (vendor.categories && vendor.categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase())));
            const matchesCategory = selectedCategory === 'all' ||
                (vendor.categories && vendor.categories.some(cat => cat.toLowerCase() === selectedCategory.toLowerCase()));
            return matchesSearch && matchesCategory;
        });

        return [...filtered].sort((a, b) => {
            switch (sortBy) {
                case 'rating':
                    return b.rating - a.rating;
                case 'delivery':
                    // Handle cases where deliveryTime might not be a simple number string
                    const timeA = parseInt(a.deliveryTime);
                    const timeB = parseInt(b.deliveryTime);
                    if (isNaN(timeA) && isNaN(timeB)) return 0;
                    if (isNaN(timeA)) return 1; // Put undefined/invalid times last
                    if (isNaN(timeB)) return -1;
                    return timeA - timeB;
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'popular': // Default sort by reviewCount
                default:
                    return (b.reviewCount || 0) - (a.reviewCount || 0); // Handle missing reviewCount
            }
        });
    }, [allCombinedVendors, searchQuery, selectedCategory, sortBy]);

    const categoryOptions = useMemo(() => {
        return ['all', ...new Set(initialCategories.map(cat => cat.name.toLowerCase()))];
    }, [initialCategories]);

    const handleFilterChange = ({ search, category, sort, view }) => {
        if (search !== undefined) setSearchQuery(search);
        if (category !== undefined) setSelectedCategory(category);
        if (sort !== undefined) setSortBy(sort);
        if (view !== undefined) setViewMode(view);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <ExploreFilters
                searchQuery={searchQuery}
                selectedCategory={selectedCategory}
                sortBy={sortBy}
                viewMode={viewMode}
                categoryOptions={categoryOptions}
                onFilterChange={handleFilterChange}
            />

            <TopCategoriesSection categories={filteredCategories} />

            <VendorListSection
                title="Featured Vendors"
                vendors={initialFeaturedVendors.filter(vendor =>
                    filteredAndSortedVendors.some(fsVendor => fsVendor.id === vendor.id)
                )} // Only show featured vendors that pass current filters
                viewMode={viewMode}
                totalVendorsCount={initialFeaturedVendors.length} // Count of *original* featured vendors
            />

            <VendorListSection
                title="All Vendors"
                vendors={filteredAndSortedVendors} // Use the fully filtered and sorted list for "All Vendors"
                viewMode={viewMode}
                totalVendorsCount={filteredAndSortedVendors.length} // Count of *filtered* vendors
            />
        </div>
    );
};

export default ExploreContent;