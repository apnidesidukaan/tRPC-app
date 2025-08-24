"use client";
import React from "react";
import { api } from "~/trpc/react";
import ProductCard from "../ui/card/ProductCard";
import ViewMore from "../ui/Badges/ViewMore";

export default function DiscoverySection() {
    const { data: discoveries, isLoading } = api.discovery.getAll.useQuery();

    if (isLoading) return <p>Loading...</p>;
    if (!discoveries || discoveries.length === 0) return <p>No discovery sections</p>;

    return (
        <div className="space-y-12">
            {discoveries.map((d) => {

                // console.log('discoveries ===', d.type);

                if (!d.isActive) return null;

                // Styles
                const sectionStyle = {
                    backgroundColor: d.bgColor || "transparent",
                    color: d.textColor || "inherit",
                };

                const layoutClass =
                    d.layoutStyle === "glassmorphism"
                        ? "backdrop-blur-md bg-white/30 shadow-lg rounded-2xl p-4"
                        : d.layoutStyle === "banner"
                            ? "p-6 text-center"
                            : d.layoutStyle === "card"
                                ? "grid grid-cols-2 gap-4"
                                : "p-4";

                // Fetch data based on discovery.type
                let QueryComponent: React.ReactNode = null;

                if (d.type === "product") {
                    QueryComponent = <ProductsList ids={d.refIds} displayType={d.displayType} />;
                } else if (d.type === "inventory") {
                    QueryComponent = <InventoryList ids={d.refIds} displayType={d.displayType} />;
                } else if (d.type === "category") {
                    QueryComponent = <CategoriesList ids={d.refIds} displayType={d.displayType} />;
                } else if (d.type === "module") {
                    QueryComponent = (
                        <div className="p-4 text-center text-sm text-gray-500">
                            Custom module rendering…
                        </div>
                    );
                }

                return (
                    <section
                        key={d.id}
                        style={sectionStyle}
                        className={`my-6 rounded-2xl ${d.customCss || ""}`}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-xl font-bold" style={{ color: d.textColor }}>
                                    {d.title}
                                </h2>
                                {d.subtitle && <p className="text-sm opacity-80">{d.subtitle}</p>}
                            </div>
                            {d.image && (
                                <img
                                    src={d.image}
                                    alt={d.title}
                                    className="h-12 w-12 object-cover rounded-lg"
                                />
                            )}
                            <ViewMore id={d.image} />
                        </div>

                        {/* Render type-specific content */}
                        <div className={`${layoutClass}`}>
                            {QueryComponent}
                        </div>
                    </section>
                );
            })}
        </div>
    );
}

/* ===== Subcomponents for each type ===== */

function ProductsList({ ids, displayType }: { ids: string[]; displayType: string }) {
    const { data: products, isLoading } = api.product.getManyByIds.useQuery({ ids });
    if (isLoading) return <p>Loading products...</p>;
    if (!products?.length) return <p>No products found</p>;

    return displayType === "carousel" ? (
        <div className="flex gap-4 overflow-x-auto pb-3">
            {products.map((p) => (
                <ProductCard key={p.id} product={p} />
            ))}
        </div>
    ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((p) => (
                <ProductCard key={p.id} product={p} />
            ))}
        </div>
    );
}

function InventoryList({ ids, displayType }: { ids: string[]; displayType: string }) {
    const { data: inventory, isLoading } = api.inventory.getManyByIds.useQuery({ ids });
    if (isLoading) return <p>Loading inventory...</p>;
    if (!inventory?.length) return <p>No inventory found</p>;

    return (
        <ul className="space-y-3">
            {inventory.map((i) => (
                <li key={i.id} className="p-3 border rounded-lg">
                    {i.name}
                </li>
            ))}
        </ul>
    );
}

function CategoriesList({ ids, displayType }: { ids: string[]; displayType: string }) {
    const { data: categories, isLoading } = api.category.getManyByIds.useQuery({ ids, type: 'category', limit: 100 });
    if (isLoading) return <p>Loading categories...</p>;
    if (!categories?.length) return <p>No categories found</p>;

    return (
        <div className="flex gap-4 overflow-x-auto py-2 px-1 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            {categories?.map((c) => (
                <div className="flex-shrink-0 w-40">
                    <ProductCard key={c.id} product={c} />
                </div>
            ))}
        </div>
    );


}
