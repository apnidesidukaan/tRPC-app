'use client';
import React from 'react';
import { ThumbsUp, ArrowRight } from 'lucide-react';
import BrandCard from '../ui/card/BrandCard';

const TopBrandsSection = ({ brands }) => {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-6">
                        <ThumbsUp className="w-4 h-4" />
                        <span>Quality Assured</span>
                    </div>
                    <h2 className="text-4xl font-black text-gray-900 mb-4">Top Brands</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">Shop from your favorite and most trusted brands</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {brands.map(brand => (
                        <BrandCard key={brand.id} brand={brand} />
                    ))}
                </div>

                <div className="text-center mt-16">
                    <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center mx-auto space-x-2 shadow-md">
                        <span>View All Brands</span>
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default TopBrandsSection;