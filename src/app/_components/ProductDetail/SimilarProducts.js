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
// import { useFetchInventoryByCategory, useFetchInventoryItem } from '../../controllers/inventory';
import { useParams } from 'next/navigation';
import InventoryVendorStore from './InventoryVendorStore';
// import { useInventoryVendorStore } from '../../controllers/store';
import VendorByModules from './VendorByModules';
// import ProductDisplayCard from '../ui/card/InventoryCard';
// import ProductCard from '../ui/card/ProductCard';
const SimilarProducts = () => {
  const { categoryName } = useParams();

  const [showOtherVendors, setShowOtherVendors] = useState(false);

  const { inventoryData, refetchInventoryByCategory } = useFetchInventoryByCategory(categoryName)
  useEffect(() => {
    if (!inventoryData) {
      refetchInventoryByCategory()
    }
  }, [inventoryData, refetchInventoryByCategory]);




  const similarProducts = [
    { name: "Pepperoni Classic", price: 22.99, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200&h=150&fit=crop", rating: 4.3 },
    { name: "Veggie Supreme", price: 24.99, image: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=200&h=150&fit=crop", rating: 4.4 },
    { name: "Meat Lovers", price: 28.99, image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=200&h=150&fit=crop", rating: 4.6 }
  ];




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



      {/* Similar Products */}
      <div>
        <h2 className="text-xl font-bold mb-6">Similar Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* i have used the ProductDisplayCard component to render the product */}
          {inventoryData?.map((product, index) => {

            product.images=product.image
            return <ProductCard product={product} key={product.id|product._id}/>
          }
          // (
            // <div key={index} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            //   <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            //   <div className="p-4">
            //     <h3 className="font-semibold mb-2">{product.name}</h3>
            //     <div className="flex items-center gap-1 mb-2">
            //       {renderStars(product.rating)}
            //       <span className="text-sm text-gray-600">{product.rating}</span>
            //     </div>
            //     <div className="flex items-center justify-between">
            //       <span className="text-lg font-bold text-green-600">${product.price}</span>
            //       <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
            //         Add to Cart
            //       </button>
            //     </div>
            //   </div>
            // </div>
          // )
          )}
        </div>
      </div>



    </div>
  );
};

export default SimilarProducts;