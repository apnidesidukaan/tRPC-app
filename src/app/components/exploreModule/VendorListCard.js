// app/explore/[moduleSlug]/VendorListCard.js
'use client';
import React from 'react';
import { Star, Clock, MapPin } from 'lucide-react';

const VendorListCard = ({ vendor }) => {
    return (
        <div key={vendor.id} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
                <img
                    src={vendor.logo || 'https://via.placeholder.com/80x80?text=Logo'}
                    alt={vendor.name}
                    className="w-16 h-16 rounded-full"
                />
                <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg text-gray-900">{vendor.name}</h3>
                        <a
                            href={`/store/${vendor.slug}`}
                            className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors"
                        >
                            Visit Store
                        </a>
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-gray-600 mb-2">
                        <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{vendor.rating}</span>
                            <span>({vendor.reviewCount})</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{vendor.deliveryTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{vendor.location}</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {vendor.categories?.map((category, index) => (
                            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                {category}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorListCard;