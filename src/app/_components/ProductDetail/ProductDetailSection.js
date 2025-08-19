'use client'
import React, { useState, useEffect } from 'react';
import {
  Heart,
  Share2,
  ShoppingCart,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,


} from 'lucide-react';
// import { useFetchInventoryItem } from '../../controllers/inventory';
import { useParams } from 'next/navigation';
import VendorByModules from './VendorByModules';
import SimilarProducts from './SimilarProducts';
import InventoryInformationTab from './InventoryInformationTab';
import DeliveryInfo from './DeliveryInfo';
import { api } from '~/trpc/react';
import InventoryList from './ProductInventory';
//===============================================================================================

const ProductDetailPage = () => {
  //===============================================================================================
  const [selectedVariant, setSelectedVariant] = useState(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedCrust, setSelectedCrust] = useState("");
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  //===============================================================================================





  const { id } = useParams();
  const { data: inventoryItem, isLoading, error } = api.product.getInventoryByProductId.useQuery(String(id));
  const { data: product, } = api.product.getById.useQuery(String(id));
  // console.log(product)
  
  // console.log('inventoryItem ====', inventoryItem);



  //===============================================================================================

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-600 mb-6">
        <span>Home</span> <span className="mx-2"></span>
        <span>Store</span> <span className="mx-2"></span>
        <span>Italian</span> <span className="mx-2"></span>
        <span>Pizza</span> <span className="mx-2"></span>
        {/* i have added the product name to be rendered on the product display section */}
        <span className="text-gray-900">{'inventoryItem?.name'}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className=" relative bg-gray-100 rounded-lg overflow-hidden aspect-square">
            <img
              src={product?.metaImage}
              alt={product?.name}
              className="w-full h-full object-cover"
            />

            {/* Action buttons */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-2 rounded-full ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white text-gray-600'} shadow-md hover:scale-105 transition-transform`}
              >
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-2 bg-white text-gray-600 rounded-full shadow-md hover:scale-105 transition-transform">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation arrows */}
            {inventoryItem?.metaImage && (
              <>
                <button
                  onClick={() => setCurrentImageIndex(prev => prev === 0 ? inventoryItem?.images.length - 1 : prev - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentImageIndex(prev => prev === inventoryItem?.images.length - 1 ? 0 : prev + 1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2">
            <button
              // key={inventoryItem.id}
              // onClick={() => setCurrentImageIndex(inventoryItem.id)}
              className={`w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-200'}`}
            >
              <img src={inventoryItem?.metaImage} alt="" className="w-full h-full object-cover" />
            </button>
            {/* {inventoryItem?.image?.map((image, index) => (
            ))} */}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Vendor Info */}
          {/* <InventoryVendorStore storeOwner={inventoryVendorStoreData} /> */}

          {/* Product Details */}
          <div>
            <h1 className="text-2xl font-bold mb-2">{product?.name}</h1>
            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-1">
                {/* {renderStars(inventoryItem?.rating)} */}
                <span className="text-sm text-gray-600">({product?.reviewCount} reviews)</span>
              </div>
              {product?.stock <= 5 && (
                <span className="text-sm text-orange-600 font-medium">Only {inventoryItem?.stock} left!</span>
              )}
            </div>

            {/* Tags */}
            <div className="flex gap-2 mb-4">
              {product?.tags?.map(tag => (
                <span key={tag} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  {tag}
                </span>
              ))}
            </div>

            {/* Pricing */}
            <div className="flex items-center gap-3 mb-6">
              {/* <span className="text-3xl font-bold text-green-600">${inventoryItem?.sizes && inventoryItem?.sizes[selectedSize]?.price?.toFixed(2)}</span> */}
              <span className="text-3xl font-bold text-green-600">${inventoryItem && inventoryItem[0]?.price?.toFixed(2)}</span>
              {/* <span className="text-lg text-gray-500 line-through">${inventoryItem?.sizes && inventoryItem?.sizes[selectedSize]?.originalPrice?.toFixed(2)}</span> */}
              <span className="text-lg text-gray-500 line-through">${inventoryItem && inventoryItem[0]?.originalPrice?.toFixed(2)}</span>
              <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm font-medium">
                {product?.discount}% OFF
              </span>
            </div>
          </div>



        





          <InventoryList inventoryItem={inventoryItem}/>


        
          <DeliveryInfo />
        </div>
      </div>

      {/* <VendorByModules /> */}

      {/* <InventoryInformationTab /> */}

      {/* <SimilarProducts /> */}
      
    </div>
    
  );
};
//===============================================================================================

export default ProductDetailPage;
//===============================================================================================
