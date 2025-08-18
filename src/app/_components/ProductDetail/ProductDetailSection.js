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
  Truck,

  Clock,

} from 'lucide-react';
// import { useFetchInventoryItem } from '../../controllers/inventory';
import { useParams } from 'next/navigation';
import InventoryVendorStore from './InventoryVendorStore';
// import { useInventoryVendorStore } from '../../controllers/store';
import VendorByModules from './VendorByModules';
import SimilarProducts from './SimilarProducts';
import InventoryInformationTab from './InventoryInformationTab';
import DeliveryInfo from './DeliveryInfo';
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





  const { moduleName, catName, id } = useParams();

  // const { inventory: inventoryItem, refetch } = useFetchInventoryItem(id)

  // useEffect(() => {
  //   if (!inventoryItem) {
  //     refetch()
  //   }
  // }, [inventoryItem, refetch]);

  // const { inventoryVendorStoreData, refetchInventoryVendorStore } = useInventoryVendorStore()
  // useEffect(() => {
  //   if (!inventoryVendorStoreData) {
  //     refetchInventoryVendorStore()
  //   }
  // }, [inventoryVendorStoreData]);

  // State management


  // i will dynamically set the price
  const totalPrice = 254;
  let deliveryTotal = 0;
  // if (
  //   inventoryItem &&
  //   inventoryItem?.delivery &&
  //   typeof inventoryItem?.delivery.freeThreshold === 'number'
  // ) {
  //   deliveryTotal =
  //     totalPrice >= inventoryItem?.delivery.freeThreshold
  //       ? 0
  //       : inventoryItem?.delivery.fee;
  // } else if (inventoryItem && inventoryItem?.delivery) {
  //   deliveryTotal = inventoryItem?.delivery.fee;
  // }

  // const handleToppingChange = (toppingName) => {
  //   setSelectedToppings(prev =>
  //     prev.includes(toppingName)
  //       ? prev.filter(t => t !== toppingName)
  //       : [...prev, toppingName]
  //   );
  // };

  // const renderStars = (rating) => {
  //   return Array.from({ length: 5 }, (_, i) => (
  //     <Star
  //       key={i}
  //       className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
  //     />
  //   ));
  // };
  //===============================================================================================

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-600 mb-6">
        <span>Home</span> <span className="mx-2"></span>
        <span>Store</span> <span className="mx-2"></span>
        <span>Italian</span> <span className="mx-2"></span>
        <span>Pizza</span> <span className="mx-2"></span>
        <span className="text-gray-900">{'inventoryItem?.name'}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className=" relative bg-gray-100 rounded-lg overflow-hidden aspect-square">
            {/* <img
              src={inventoryItem?.image && inventoryItem?.image[currentImageIndex]}
              alt={inventoryItem?.name}
              className="w-full h-full object-cover"
            /> */}

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
            {inventoryItem?.image?.length > 1 && (
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
            {inventoryItem?.image?.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${index === currentImageIndex ? 'border-blue-500' : 'border-gray-200'}`}
              >
                <img src={image} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Vendor Info */}
          <InventoryVendorStore storeOwner={inventoryVendorStoreData} />

          {/* Product Details */}
          <div>
            <h1 className="text-2xl font-bold mb-2">{inventoryItem?.name}</h1>
            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-1">
                {renderStars(inventoryItem?.rating)}
                <span className="text-sm text-gray-600">({inventoryItem?.reviewCount} reviews)</span>
              </div>
              {inventoryItem?.stock <= 5 && (
                <span className="text-sm text-orange-600 font-medium">Only {inventoryItem?.stock} left!</span>
              )}
            </div>

            {/* Tags */}
            <div className="flex gap-2 mb-4">
              {inventoryItem?.tags?.map(tag => (
                <span key={tag} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  {tag}
                </span>
              ))}
            </div>

            {/* Pricing */}
            <div className="flex items-center gap-3 mb-6">
              {/* <span className="text-3xl font-bold text-green-600">${inventoryItem?.sizes && inventoryItem?.sizes[selectedSize]?.price?.toFixed(2)}</span> */}
              <span className="text-3xl font-bold text-green-600">${inventoryItem?.price?.toFixed(2)}</span>
              {/* <span className="text-lg text-gray-500 line-through">${inventoryItem?.sizes && inventoryItem?.sizes[selectedSize]?.originalPrice?.toFixed(2)}</span> */}
              <span className="text-lg text-gray-500 line-through">${inventoryItem?.originalPrice?.toFixed(2)}</span>
              <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm font-medium">
                {inventoryItem?.discount}% OFF
              </span>
            </div>
          </div>



          <div>
            {inventoryItem?.variants?.map((variant, variantIndex) => (
              <div key={variantIndex} className="mb-6">
                {/* Variant Name */}
                <h3 className="font-semibold mb-3">{variant.name}</h3>

                {/* Variant Options */}
                <div className="grid grid-cols-3 gap-2">
                  {variant?.options?.map((option, optionIndex) => (
                    <button
                      key={optionIndex}
                      onClick={() => setSelectedVariant({
                        variantIndex,
                        optionIndex
                      })}
                      className={`p-3 rounded-lg border text-center ${selectedVariant?.variantIndex === variantIndex &&
                          selectedVariant?.optionIndex === optionIndex
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      <div className="font-medium">{option.label}</div>
                      <div className="text-sm text-gray-600">
                        ₹{option.price}
                      </div>
                      <div className="text-xs text-gray-500">
                        Stock: {option.stock}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>




          {/* Size Selection */}
          <div>
            <h3 className="font-semibold mb-3">Size</h3>
            <div className="grid grid-cols-3 gap-2">
              {inventoryItem?.sizes?.map((size, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(index)}
                  className={`p-3 rounded-lg border text-center ${selectedSize === index ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <div className="font-medium">{size.name}</div>
                  <div className="text-sm text-gray-600">${size.price}</div>
                </button>
              ))}
            </div>
          </div>


          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="font-semibold">Quantity:</span>
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-100 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 border-x">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Total Price */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total:</span>
                {/* set the dynamic price */}
                <span className="text-green-600">${((inventoryItem.originalPrice * inventoryItem.discount) / 100) * quantity}</span>
              </div>
            </div>






            {/* Add to Cart Button */}
            <button
              // disabled={!selectedCrust}
              className="w-full py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              // on click the data do be stored in the session storage of the client if not login otherwie we gonnna make the post req to server
              onClick={() => {
                const { name, originalPrice, discount, image, category, module, id } = inventoryItem;
                const price = ((originalPrice - (originalPrice * discount) / 100) * quantity);
                const existingCart = JSON.parse(localStorage.getItem("cart_product")) || [];

                const newCartItem = {
                  name,
                  id,
                  originalPrice,
                  discount,
                  image,
                  category,
                  module,
                  price,
                  quantity
                };
                const newCart = existingCart.filter(product => product.id != id)
                const updatedCart = [newCartItem, ...newCart];


                localStorage.setItem("cart_product", JSON.stringify(updatedCart));

              }}
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
          </div>

          <DeliveryInfo />
        </div>
      </div>

      <VendorByModules />

      <InventoryInformationTab />

      <SimilarProducts />
    </div>
  );
};
//===============================================================================================

export default ProductDetailPage;
//===============================================================================================
