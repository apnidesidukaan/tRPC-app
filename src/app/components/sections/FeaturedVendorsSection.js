'use client';
import React from 'react';
import { Award, ChevronRight } from 'lucide-react';
import VendorCard from '../ui/card/VendorCard';

const FeaturedVendorsSection = ({ vendors }) => {
    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-6">
                        <Award className="w-4 h-4" />
                        <span>Premium Partners</span>
                    </div>
                    <h2 className="text-4xl font-black text-gray-900 mb-4">Featured Vendors</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">Handpicked vendors offering exceptional quality and service</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {vendors.map(vendor => (
                        <VendorCard key={vendor.id} vendor={vendor} />
                    ))}
                </div>

                <div className="text-center mt-16">
                    <button className="bg-white border border-gray-300 text-gray-800 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center mx-auto space-x-2 shadow-md">
                        <span>View All Vendors</span>
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FeaturedVendorsSection;