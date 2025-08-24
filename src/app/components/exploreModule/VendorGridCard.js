// app/explore/[moduleSlug]/VendorGridCard.js
'use client';
import React from 'react';
import { Star, Clock, MapPin } from 'lucide-react';

const VendorGridCard = ({ vendor }) => {
    return (
        <div key={vendor.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
            <div className="relative">
                <img
                    src={vendor.banner || 'https://via.placeholder.com/400x200?text=Vendor+Banner'} // Fallback for banner
                    alt={vendor.name}
                    className="w-full h-40 object-cover"
                />
                <div className="absolute top-4 left-4">
                    <img
                        src={vendor.logo || 'https://via.placeholder.com/100x100?text=Logo'} // Fallback for logo
                        alt={vendor.name}
                        className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
                    />
                </div>
                {vendor.freeDelivery && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Free Delivery
                    </div>
                )}
            </div>
            <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <h3 className="font-bold text-xl text-gray-900 mb-1">{vendor.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium">{vendor.rating}</span>
                                <span>({vendor.reviewCount})</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{vendor.deliveryTime}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{vendor.location}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    {vendor.categories?.slice(0, 3).map((category, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            {category}
                        </span>
                    ))}
                </div>

                {vendor.specialties && vendor.specialties.length > 0 && (
                    <div className="mb-4">
                        <div className="text-sm font-medium text-gray-900 mb-1">Specialties:</div>
                        <div className="text-sm text-gray-600">{vendor.specialties.join(', ')}</div>
                    </div>
                )}

                {vendor.offers && vendor.offers.length > 0 && (
                    <div className="bg-orange-50 rounded-lg p-3 mb-4">
                        <div className="text-sm font-medium text-orange-800 mb-1">Current Offers:</div>
                        {vendor.offers.map((offer, index) => (
                            <div key={index} className="text-sm text-orange-700">• {offer}</div>
                        ))}
                    </div>
                )}

                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Min order ₹{vendor.minOrder}</span>
                    <a
                        href={`/store/${vendor.slug}`}
                        className="bg-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors"
                    >
                        Visit Store
                    </a>
                </div>
            </div>
        </div>
    );
};

export default VendorGridCard;