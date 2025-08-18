'use client'
import React from 'react';
import { Truck, Clock } from 'lucide-react';

const DeliveryInfo = ({ inventoryItem }) => {
  // Sample fallback data
  const sampleInventory = {
    delivery: {
      time: '2–4 days',
      fee: 40,
      freeThreshold: 300
    }
  };

  const item = inventoryItem || sampleInventory;
  const totalPrice = 254; // current cart total
  const deliveryFee = totalPrice >= item.delivery.freeThreshold ? 0 : item.delivery.fee;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="p-5 bg-gradient-to-br from-yellow-100 via-orange-50 to-yellow-50 border border-yellow-300 shadow-sm rounded-2xl">
        <div className="flex items-center gap-2 mb-4">
          <Truck className="w-5 h-5 text-orange-600" />
          <h3 className="text-lg font-semibold text-orange-800">
            Delivery Information
          </h3>
        </div>

        <div className="text-sm text-gray-800 space-y-2">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-orange-500" />
            <span>
              <strong>Estimated:</strong> {item.delivery.time}
            </span>
          </div>

          <div>
            <strong>Delivery Fee:</strong>{' '}
            {deliveryFee === 0 ? (
              <span className="text-green-600 font-bold">FREE</span>
            ) : (
              <span className="text-orange-700 font-semibold">₹{deliveryFee}</span>
            )}
          </div>

          {totalPrice < item.delivery.freeThreshold && (
            <div className="text-sm text-blue-700 font-medium">
              Add ₹{(item.delivery.freeThreshold - totalPrice).toFixed(2)} more for{' '}
              <span className="underline">FREE delivery</span> 🚚
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfo;
