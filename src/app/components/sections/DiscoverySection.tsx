'use client';
import React from "react";
import { api } from "~/trpc/react";
import ProductCard from "../ui/card/ProductCard";
import DiscoveryDisplayProduct from "./DiscoveryDisplayProduct";

export default function DiscoverySection() {
  const { data: discoveries, isLoading } = api.discovery.getAll.useQuery();

  // Simple early returns
  if (isLoading) return <p>Loading...</p>;
  if (!discoveries?.length) return <p>No discovery sections</p>;

  return (
    <div className="space-y-8">
      {discoveries?.map((d) => {
        // if (!d.isActive) return null;

        // Only focus on "list" displayType
        // if (d.displayType !== "list") return null;

        // Fetch products/inventory for this section
        // const { data } = api.category.getManyByIds.useQuery({ ids: d.refIds, type: 'category', limit: 6 });

        // { enabled: !!d.refIds?.length }

        // console.log('====================', data);

        return (
          <section
            key={d.id}
            className={`my-6 rounded-2xl p-4 ${d.customCss || ""}`}
            style={{
              backgroundColor: d.bgColor || "transparent",
              color: d.textColor || "inherit",
            }}
          >
            {/* Section Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold">{d.title}</h2>
                {d.subtitle && <p className="text-sm opacity-80">{d.subtitle}</p>}
              </div>
              {d.image && (
                <img
                  src={d.image}
                  alt={d.title}
                  className="h-12 w-12 object-cover rounded-lg"
                />
              )}
            </div>

            <DiscoveryDisplayProduct
              id={d.refIds}
            />


          </section>
        );
      })}
    </div>
  );
}
