'use client'
import React, { useState, useEffect } from 'react';
import {
  Star,
  ChevronDown,
  ChevronUp,

} from 'lucide-react';
// import { useFetchVendorsByModules } from '../../controllers/vendor';
import { useParams } from 'next/navigation';

const renderStars = (rating) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
    />
  ));
};
const VendorByModules = () => {
  const { moduleName } = useParams();

  const [showOtherVendors, setShowOtherVendors] = useState(false);

  const { vendorsByModules, refetchVendorsByModules } = useFetchVendorsByModules(moduleName)
  useEffect(() => {
    if (!vendorsByModules) {
      refetchVendorsByModules()
    }
  }, [vendorsByModules, refetchVendorsByModules]);








  return (
    <div className="max-w-7xl mx-auto px-4 py-6">



      {/* Other Vendors */}
      <div className="mb-8">
        <button
          onClick={() => setShowOtherVendors(!vendorsByModules)}
          className="flex items-center gap-2 text-lg font-semibold mb-4 hover:text-blue-600 transition-colors"
        >
          Buy from Other Vendors
          {vendorsByModules ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>

        {vendorsByModules && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {vendorsByModules?.map((vendor, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">{vendor?.name}</h4>
                <div className="flex items-center gap-1 mb-2">
                  {renderStars(vendor?.rating)}
                  <span className="text-sm text-gray-600">{vendor?.rating}</span>
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  <div>${vendor?.price}</div>
                  <div>{vendor?.deliveryTime}</div>
                </div>
                <button className="w-full py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                  Buy from {vendor?.name}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>




    </div>
  );
};

export default VendorByModules;