'use client';
import React, { useEffect, useState } from 'react';
import { TrendingUp, ChevronRight } from 'lucide-react';
import ProductCard from '../ui/card/ProductCard';
import ViewMore from '../ui/Badges/ViewMore';
import { api } from '~/trpc/react';
// import { getInventoryByCategory, getInventoryV2 } from '../../api/inventory';

const TrendingProductsSection = () => {

    const {data:products }= api?.product?.getAll.useQuery();
    console.log('products=========', products);

    // const [products, setProducts] = useState([]);

    // useEffect(() => {
    //     getInventoryByCategory(sectionData?.category).then(res => {
    //         setProducts(res.data?.data)
    //     })
    // }, [])


    const [cart, setCart] = useState([]);

    const handleAddToCart = (product) => {
        setCart((prev) => [...prev, product]);
    };


    return (
        <section className="py-8 bg-white mb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-2">
                            <TrendingUp className="w-4 h-4" />
                            <span>{'sectionData?.heading'}</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 mb-0">{'sectionData?.subheading'}</h2>
                    </div>
                    {/* <button className="mt-2 sm:mt-0 bg-blue-600 text-white px-5 py-2 rounded-full font-semibold text-base hover:bg-blue-700 transition-colors flex items-center space-x-2 shadow-md">
                        <span>Explore All Products</span>
                        <ChevronRight className="w-5 h-5" />
                    </button> */}
                    <ViewMore />

                </div>

                {/* Mobile: Horizontal Scroll */}
                <div className="md:hidden">
                    <div className="flex flex-row  p-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100  gap-4">
                        {products?.map(product => (
                            <ProductCard
                                product={product}
                                onAddToCart={() => handleAddToCart(product)}
                                onToggleWishlist={() => handleToggleWishlist(product.id)}
                            />

                        ))}
                    </div>
                </div>

                {/* Desktop: Responsive Grid */}
                <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-8">
                    {products?.map(product => (
                        <ProductCard
                            key={product?.id}
                            product={product}
                            onAddToCart={() => handleAddToCart(product)}
                            onToggleWishlist={() => handleToggleWishlist(product.id)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrendingProductsSection;