import React from 'react';
import { Card, CardContent } from '../ui/card/card';
import { BiStore, BiMap, BiPhone } from 'react-icons/bi';
import { FaStore } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function StoreDisplay({ storesData }) {
  const router = useRouter();
function formatAddress(address) {
  return [
    address.street,
    address.area,
    address.landmark,
    address.city,
    address.state,
    address.zipCode,
    address.country
  ]
    .filter(Boolean) // Remove empty/undefined fields
    .join(', ');
}
  return (
    <div className="p-6">
      {/* <h2 className="text-2xl font-bold mb-6">Vendor Stores</h2> */}
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {storesData?.map((store) => (
          <Card key={store.id} className="hover:shadow-lg transition-shadow">
            <div className="h-32 bg-gray-100 flex items-center justify-center text-gray-400">
              <BiStore size={48} />
            </div>

            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-semibold">{store.name}</h3>
                <FaStore
                  size={22}
                  className="text-white bg-accent p-1 rounded cursor-pointer"
                  onClick={() => router.push(`/store-details/${store._id}`)}
                />
              </div>

              {store.description && (
                <p className="text-sm text-muted-foreground mb-3">{store.description}</p>
              )}

              <div className="text-sm text-muted-foreground space-y-1">
                <p className="flex items-center gap-1">
                  <BiMap /> {formatAddress(store.address) || "Hazratganj, Lucknow"}
                </p>
                <p className="flex items-center gap-1">
                  <BiPhone /> {'+91- '+store.mobile || "+91-7392988369"}
                </p>
              </div>

              <div className="mt-3 pt-3 border-t text-sm">
                <p>Products: <span className="font-medium">{store.product_count || 0}</span></p>
                {store.ratings && (
                  <p className="text-yellow-500 mt-1">
                    ⭐ {store.ratings.average} ({store.ratings.total_reviews} reviews)
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}