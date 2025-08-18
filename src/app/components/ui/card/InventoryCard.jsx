'use client';
import React, { useState, useEffect } from 'react';
import { Star, Heart, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import RatingStars from './RatingStars';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const InventoryCard = ({ product, onAddToCart, onToggleWishlist }) => {
   
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const router = useRouter();
    let images = Array.isArray(product.images) ? product.images : [product.images];
    if(!images.length)
        images=Array.isArray(product.image) ? product.image : [product.image];
    console.log(product)
    const hasMultipleImages = images.length > 1;

    // Auto-advance image every 2 seconds
    useEffect(() => {
        if (!hasMultipleImages) return;
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 10000);
        return () => clearInterval(interval);
    }, [images.length, hasMultipleImages]);

    const nextImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const goToImage = (index, e) => {
        e.stopPropagation();
        setCurrentImageIndex(index);
    };

    // Use actual product info if available
    const moduleName = product?.module || 'df';
    const categoryName = product?.category || 'df';
    const id = product.id || product._id || 21324657;

    return (
        <div
            onClick={() => router.push(`/product-detail/${moduleName}/${categoryName}/${id}`)}
            className="group bg-white rounded-xl shadow hover:shadow-md transition-all duration-200 overflow-hidden transform hover:-translate-y-1 cursor-pointer relative w-40 min-w-[150px] max-w-[180px] mx-auto"
        >
            {product.discount && (
                <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-20 shadow">
                    {product.discount}% OFF
                </div>
            )}

            {/* Image Carousel Container */}
            <div className="relative h-24 bg-gray-100 overflow-hidden rounded-t-xl">
                {/* Carousel Images */}
                <div
                    className="flex transition-transform duration-500 ease-in-out h-full"
                    style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                >
                    {images.map((img, idx) => (
                        <div key={idx} className="w-full h-full flex-shrink-0 flex items-center justify-center">
                            <Image
                                src={img}
                                alt={`${product.name} - Image ${idx + 1}`}
                                width={80}
                                height={80}
                                className="object-contain max-h-full max-w-full"
                            />
                        </div>
                    ))}
                </div>

                {/* Navigation Arrows */}
                {hasMultipleImages && (
                    <>
                        <button
                            className="absolute left-1 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1 rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                            onClick={prevImage}
                            aria-label="Previous image"
                        >
                            <ChevronLeft className="w-3 h-3 text-gray-700" />
                        </button>
                        <button
                            className="absolute right-1 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1 rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                            onClick={nextImage}
                            aria-label="Next image"
                        >
                            <ChevronRight className="w-3 h-3 text-gray-700" />
                        </button>
                    </>
                )}

                {/* Image Indicators */}
                {hasMultipleImages && (
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex space-x-1 z-10">
                        {images.map((_, idx) => (
                            <button
                                key={idx}
                                className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${idx === currentImageIndex
                                    ? 'bg-white shadow'
                                    : 'bg-white/50 hover:bg-white/70'
                                    }`}
                                onClick={(e) => goToImage(idx, e)}
                                aria-label={`Go to image ${idx + 1}`}
                            />
                        ))}
                    </div>
                )}

                {/* Wishlist Button */}
                <button
                    className="absolute top-2 right-2 bg-white p-1 rounded-full shadow text-gray-400 hover:text-pink-500 hover:scale-110 transition-all z-20"
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist && onToggleWishlist(product.id);
                    }}
                    aria-label="Add to wishlist"
                >
                    <Heart className="w-4 h-4" />
                </button>
            </div>

            <div className="p-2">
                <h3 className="text-xs font-semibold text-gray-900 mb-0.5 line-clamp-2">{product.name}</h3>
                <p className="text-[10px] text-gray-600 mb-0.5">{product.vendor}</p>
                <div className="flex items-center mb-1">
                    <RatingStars rating={product.rating ?? 1} size={12} />
                    <span className="text-[10px] text-gray-500 ml-1">({product.reviewCount})</span>
                </div>
                <div className="flex items-baseline space-x-1 mb-1">
                    <span className="text-base font-bold text-green-500">₹{product.price}</span>
                    {product.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
                    )}
                </div>
                <div className="flex flex-wrap gap-0.5 mb-2">
                    {product.badges?.map((badge, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-[9px] px-1 py-0.5 rounded-full">
                            {badge}
                        </span>
                    ))}
                </div>
                <button
                    className="w-full bg-gradient-to-r from-[#c8e6c9] via-[#81c784] to-[#4caf50]  text-[#ffff] border-[#1b5e20] ring-2 py-1 rounded-lg text-xs font-semibold flex items-center justify-center space-x-1 "
                    onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart && onAddToCart(product.id);
                    }}
                >
                    <ShoppingCart className="w-3 h-3" />
                    <span>Add</span>
                </button>
            </div>
        </div>
    );
};

export default InventoryCard;