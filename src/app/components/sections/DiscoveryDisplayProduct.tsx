'use client';
import React from "react";
import { api } from "~/trpc/react";
import ProductCard from "../ui/card/ProductCard";

export default function DiscoveryDisplayProduct({ id }) {
  const { data } = api.product.getManyByIds.useQuery({ ids: id, type: 'category', });

console.log(data);



  return (


    <div className="flex gap-4 overflow-x-auto py-2 px-1 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
      {data?.map((c) => (
        <div className="flex-shrink-0 w-40">
          <ProductCard key={c.id} product={c} />
        </div>
      ))}
    </div>


    // <div className="space-y-3">
    //   {data?.map((p) => (
    //     <div
    //       key={p.id}
    //       className="flex items-center gap-3 border rounded-lg p-3"
    //     >
    //       <ProductCard product={p} />
    //     </div>
    //   ))}
    // </div>

  );
}
