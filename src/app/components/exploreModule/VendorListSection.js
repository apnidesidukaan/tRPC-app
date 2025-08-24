// app/explore/[moduleSlug]/VendorListSection.js
'use client';
import React from 'react';
import VendorGridCard from './VendorGridCard';
import VendorListCard from './VendorListCard';

const VendorListSection = ({ title, vendors, viewMode, totalVendorsCount }) => {
    if (!vendors || vendors.length === 0) {
        return null; // Don't render section if no vendors
    }
    return (
        <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                <div className="text-sm text-gray-600">{totalVendorsCount} vendors found</div>
            </div>

            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {vendors.map((vendor) => (
                        <VendorGridCard key={vendor.id} vendor={vendor} />
                    ))}
                </div>
            ) : (
                <div className="space-y-4">
                    {vendors.map((vendor) => (
                        <VendorListCard key={vendor.id} vendor={vendor} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default VendorListSection;