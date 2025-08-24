// import { useFetchBestSellerInventory } from "../../../controllers/inventory";
import React, { useEffect } from "react";
import { api } from "~/trpc/react";

function CategoriesList({ ids, displayType }: { ids: string[]; displayType: string }) {
  const { data: categories, isLoading } = api.category.getManyByIds.useQuery({ ids, type: 'category' });
  if (isLoading) return <p>Loading categories...</p>;
  if (!categories?.length) return <p>No categories found</p>;

  return (
    <div className="flex gap-4 overflow-x-auto py-2 px-1 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
      {categories.map((c) => (
        <div className="flex-shrink-0 w-40">
          {/* <ProductCard key={c.id} product={c} /> */}
        </div>
      ))}
    </div>
  );


}

export default function DiscoveryCard({ bestSeller }) {
  // await getManyByIds(["p1", "p2", "p3", "p4", "p5", "p6"], "product", { limit: 5 });

  // const { data, isLoading } = api.category.getManyByIds.useQuery({ ids: bestSeller.refIds, type: 'category', skip: 10, limit: 6 });
  const { data, isLoading } = api.category.getManyByIds.useQuery({ ids: bestSeller.refIds, type: 'category', limit: 6 });
  // if (isLoading) return <p>Loading categories...</p>;
  // if (!categories?.length) return <p>No categories found</p>;


  // const { bestSellerInventory, refetch } = useFetchBestSellerInventory()
  // console.log('categories=============', bestSeller);
  // useEffect(() => { refetch() }, [])

  return (
    <>

      <div className="w-45 p-2  bg-gray-200 rounded-2xl shadow text-center">

        <div className="grid grid-cols-2 gap-1.5 mb-2">




          {data?.map((item) => (

            < div className="bg-white rounded-2xl p-2">
              <img
                src={item?.icon}
                alt={item?.name}
                className="w-full h-20 object-contain"
              />
            </div>

          ))}


        </div>
        <div className="text-sm text-gray-600 shadow w-fit m-auto p-1 rounded-full bg-gray-100 relative bottom-5">+{bestSeller?.totalCount} more</div>
        <div className="font-bold text-gray-800 ">{bestSeller?.title}</div>
      </div>
    </>
  );
}
