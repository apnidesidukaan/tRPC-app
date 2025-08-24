'use client'
import React, { useEffect, useState } from "react";
import ProductDisplayCard from "../categoryProducts/ProductDisplayCard";
import SubCategorySidebar from "./SubCategorySidebar";
import { Breadcrumbs } from "../ui/Breadcrumb/breadcrumb";
// import { useFetchInventoryByCategory } from "../../controllers/inventory";
import InventoryCard from "../ui/card/InventoryCard";
import { useParams } from "next/navigation";
import { api } from "~/trpc/react";
import ProductCard from "../ui/card/ProductCard";
//=======================================================================


const breadcrumbs = [
  { label: 'Marketplace', href: '/' },
  { label: 'Cart', },
];
//=======================================================================
const CategoryProductsLayout = () => {
  const { moduleId } = useParams()  // const { vendorStoreCaterogies } = useVendorStore();
  // console.log('params', categoryId);
  const [selectedCategory, setSelectedCategory] = useState('')
  const { data: categories, isLoading } = api.inventory.getAll.useQuery(moduleId);
  const { data: product } = api.product.getProductsByCategoryId.useQuery(selectedCategory);


  // const { inventoryData, refetchInventoryByCategory } = useFetchInventoryByCategory(selectedCategory)
  // useEffect(() => {
  //   refetchInventoryByCategory()
  // }, [selectedCategory])
  console.log('selectedCategory -------------- ', moduleId);
  //=======================================================================// 
  return (
    <>
      <div className="flex flex-col lg:flex-row bg-background-section min-h-screen items-center justify-center ">
        <SubCategorySidebar
          moduleId={moduleId}
          setSelectedCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
        <main className=" scrollbar  overflow-y-auto h-[100vh] p-4">
          <div className=" mb-4 text-primary-text text-start max-w-[1186px] m-auto">
            <Breadcrumbs items={breadcrumbs} />
            <h2 className="text-xl font-semibold mb-4 text-primary-text text-start max-w-[1186px] m-auto">Flakes and Cereals</h2>
          </div>
          <div className="grid 
  grid-cols-1 
  sm:grid-cols-2 
  md:grid-cols-3 
  lg:grid-cols-4 
  xl:grid-cols-5 
  2xl:grid-cols-6 
  gap-6 
  max-w-[1440px] 
  m-auto 
  bg-background 
  p-6">
            {product?.map((product) => (
              <ProductCard product={product} key={product.id || product._id} />
            ))}
          </div>

        </main>
      </div>
    </>
  );
};
//=======================================================================
export default CategoryProductsLayout;
//=======================================================================
