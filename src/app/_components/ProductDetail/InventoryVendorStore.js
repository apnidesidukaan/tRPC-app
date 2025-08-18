'use client'
import React, { useState, useEffect } from 'react';
import {

  Star,

  MapPin,
  Shield,

} from 'lucide-react';
import { useRouter } from 'next/navigation';

const InventoryVendorStore = ({ storeOwner }) => {

  const router = useRouter()
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (


    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
      <img
        src={storeOwner?.logo ? storeOwner.logo : '/assets/default-store-logo.jpg'}
        alt={storeOwner?.name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">{storeOwner?.name}</h3>
          {storeOwner?.verified && (
            <Shield className="w-4 h-4 text-blue-500" />
          )}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            {renderStars(storeOwner?.rating)}
            <span>{storeOwner?.rating}</span>
          </div>
          <span>•</span>
          <MapPin className="w-3 h-3" />
          <span>{storeOwner?.location}</span>
        </div>
      </div>
      <button
        onClick={() => router.push(`/brand-profile`)}
        className="cursor-pointer px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
        Visit Store
      </button>
    </div>

  );
};

export default InventoryVendorStore;