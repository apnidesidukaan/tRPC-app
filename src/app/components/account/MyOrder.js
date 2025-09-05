'use client';
import React, { useEffect, useState } from 'react';
import { api } from '~/trpc/react';
// import httpClient from '@/config/httpClient'; // Uncomment if you're fetching from API

const MyOrders = () => {
  // const [orders, setOrders] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const { data, isLoading } = api.user.getOrders.useQuery()
  console.log('orders ------', data);



  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading your orders...</p>;
  }

  if (data?.order?.length === 0) {
    return <p className="text-sm text-muted-foreground">You haven't placed any orders yet.</p>;
  }

  return (
    <div className="space-y-4">
      {data?.order?.map((order) => (
        <div
          key={order.id}
          className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-sm text-accent">Order ID: {order.orderId}</h3>
            <span className={`text-xs font-medium ${order.status === 'Delivered' ? 'text-green-600' : 'text-red-500'
              }`}>
              {order.status}
            </span>
          </div>
          <p className="text-sm text-gray-600">Date: {order.date}</p>
          <p className="text-sm text-gray-600">
            Items: {data?.orderItems.map(item => item.name).join(", ")}
          </p>
          <p className="text-sm font-semibold mt-2">Total: ₹{order.grandTotal}</p>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
