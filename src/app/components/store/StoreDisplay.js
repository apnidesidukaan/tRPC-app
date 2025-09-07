'use client'
import React, { useEffect, useState } from 'react';
// import DiscoveryCard from './DiscoveryCard';
// import PromotionalSections from './HeroTiles';
// import Banner from './Banner';
import Loader from '../ui/status/Loader';
import TrendingProductsSection from '../sections/TrendingProductsSection';
// import CategoryTabs from '.CategoryTabs';
import InventoryCard from '../ui/card/InventoryCard';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import { api } from "~/trpc/react";
import ProductCard from '../ui/card/ProductCard';
import CategoryTabs from './hero/CategoryTabs';

//===================================================================

export default function StoreDisplay() {

  //===================================================================
  const [mood, setMood] = useState('Ganesh Chaturthi');
  const [categoryId, setCategoryId] = useState('');
  const { data: discoveries } = api.discovery.getAll.useQuery();
  const { data: products, isLoading } = api.product.getProductsByCategoryId.useQuery(categoryId);
  console.log('========= categoryId', categoryId);

  //===================================================================
  return (
    <>
      <section className="p-2 lg:p-4">

        <CategoryTabs
          setCategoryId={setCategoryId}
        />

        {/* <Banner /> */}
        {/* <CategoryTabs
          setCategoryId={setCategoryId}
        /> */}
        <div className="flex gap-4 overflow-x-auto py-2 px-1 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          {products?.map((c) => (
            <div className="flex-shrink-0 w-40">
              <ProductCard key={c.id} product={c} />
            </div>
          ))}
        </div>

        {/* <PromotionalSections
          promoContentSectionData={promoContentSectionData}
          mood={mood} /> */}
        {/* <h2 className="mt-12 text-xl font-bold text-gray-800">New Arrivals</h2> */}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4 bg-gray-50">
          {discoveries?.map((bestSeller) => (
            <div key={bestSeller.id} className="flex">
              {/* <DiscoveryCard bestSeller={bestSeller} /> */}
            </div>
          ))}
        </div>

        {/* <TrendingProductsSection /> */}
        {/* {discoveries?.map((section, index) => (
        ))} */}
      </section>


    </>
  );
}
//===================================================================
