'use client'
import React, { useState, useEffect } from 'react';
import {
  Heart,
  Share2,
  ShoppingCart,
  Plus,
  Minus,
  Star,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Truck,
  Shield,
  Clock,
  ChevronDown,
  ChevronUp,
  ThumbsUp,
  MessageCircle
} from 'lucide-react';
// import { useFetchInventoryItem } from '../../controllers/inventory';
import { useParams } from 'next/navigation';
import InventoryVendorStore from './InventoryVendorStore';
// import { useInventoryVendorStore } from '../../controllers/store';
import VendorByModules from './VendorByModules';
import SimilarProducts from './SimilarProducts';

const InventoryInformationTab = () => {


  // review being fetched form the server

  const reviews = [
    {
      id: 1,
      user: "Sarah M.",
      rating: 5,
      date: "2 days ago",
      comment: "Amazing pizza! The crust was perfectly crispy and the toppings were fresh.",
      verified: true,
      helpful: 12
    },
    {
      id: 2,
      user: "Mike R.",
      rating: 4,
      date: "1 week ago",
      comment: "Good quality pizza, delivered hot and on time. Will order again!",
      verified: true,
      helpful: 8
    }
  ];




  const { moduleName, catName, id } = useParams();

  const { inventory: inventoryItem, refetch } = useFetchInventoryItem(id)

  useEffect(() => {
    if (!inventoryItem) {
      refetch()
    }
  }, [inventoryItem, refetch]);

  const { inventoryVendorStoreData, refetchInventoryVendorStore } = useInventoryVendorStore()
  useEffect(() => {
    if (!inventoryVendorStoreData) {
      refetchInventoryVendorStore()
    }
  }, [inventoryVendorStoreData]);

  // State management
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedCrust, setSelectedCrust] = useState("");
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("description");



  // i will dynamically set the price
  const totalPrice = 254;
  let deliveryTotal = 0;
  if (
    inventoryItem &&
    inventoryItem?.delivery &&
    typeof inventoryItem?.delivery.freeThreshold === 'number'
  ) {
    deliveryTotal =
      totalPrice >= inventoryItem?.delivery.freeThreshold
        ? 0
        : inventoryItem?.delivery.fee;
  } else if (inventoryItem && inventoryItem?.delivery) {
    deliveryTotal = inventoryItem?.delivery.fee;
  }

  const handleToppingChange = (toppingName) => {
    setSelectedToppings(prev =>
      prev.includes(toppingName)
        ? prev.filter(t => t !== toppingName)
        : [...prev, toppingName]
    );
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">


      {/* Information Tabs */}
      <div className="mb-8">
        <div className="border-b mb-6">
          <div className="flex gap-8">
            {["description", "ingredients", "nutrition", "reviews"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 px-1 border-b-2 font-medium capitalize ${activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="min-h-[200px]">
          {activeTab === "description" && (
            <div>
              <p className="text-gray-700 mb-6">{inventoryItem?.description}</p>
              <div className="space-y-4">
                <h3 className="font-semibold">Store Policies</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="p-3 bg-gray-50 rounded">
                    <strong>Return Policy:</strong> 30-day return window
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <strong>Warranty:</strong> Quality guarantee
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <strong>Cancellation:</strong> Free cancellation before preparation
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "ingredients" && (
            <div>
              <h3 className="font-semibold mb-4">Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {inventoryItem?.ingredients?.map(ingredient => (
                  <span key={ingredient} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>
          )}

          {activeTab === "nutrition" && (
            <div>
              <h3 className="font-semibold mb-4">Nutritional Information (per serving)</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(inventoryItem?.nutrition).map(([key, value]) => (
                  <div key={key} className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{value}{key === 'calories' ? '' : 'g'}</div>
                    <div className="text-sm text-gray-600 capitalize">{key}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold">Customer Reviews ({reviews.length})</h3>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Write a Review
                </button>
              </div>

              <div className="space-y-6">
                {reviews.map(review => (
                  <div key={review.id} className="border-b pb-6 last:border-b-0">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-sm font-semibold">
                        {review.user.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold">{review.user}</span>
                          {review.verified && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                              Verified Purchase
                            </span>
                          )}
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          {renderStars(review.rating)}
                        </div>
                        <p className="text-gray-700 mb-3">{review.comment}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <button className="flex items-center gap-1 hover:text-blue-600">
                            <ThumbsUp className="w-4 h-4" />
                            Helpful ({review.helpful})
                          </button>
                          <button className="flex items-center gap-1 hover:text-blue-600">
                            <MessageCircle className="w-4 h-4" />
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default InventoryInformationTab;