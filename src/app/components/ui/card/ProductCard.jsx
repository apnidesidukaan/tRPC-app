"use client";

import { useState } from "react";
import { Heart, Minus, Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import AddToCart from "../button/AddToCart";

const ProductCard = ({ product, onToggleWishlist }) => {
    const [showVariantPicker, setShowVariantPicker] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState({});

    // --- tRPC hooks ---
    const utils = api.useUtils();
    const { data: cart } = api.cart.get.useQuery();
    const addItem = api.cart.addItem.useMutation({
        onSuccess: () => utils.cart.get.invalidate(),
    });
    const updateItem = api.cart.updateItem.useMutation({
        onSuccess: () => utils.cart.get.invalidate(),
    });

    // --- Cart helpers ---
    const directAdd = (payload) => {
        addItem.mutate(payload);
    };

    const handleAddClick = () => {
        if (Array.isArray(product?.variants) && product.variants.length > 0) {
            setShowVariantPicker(true);
            return;
        }
        directAdd({
            vendorId: product.vendorId,
            inventoryId: product.id,
            variantOptionId: product._id || "default",
            variantLabel: product.name,
            variantSku: product.sku || "",
            variantPrice: product.price || 0,
            variantImages: product.images || [],
            attributesSnapshot: [],
            quantity: 1,
            priceAtTime: product.price || 0,
        });
    };

    const handleAddVariantOption = (variant, option) => {
        directAdd({
            vendorId: product.vendorId,
            inventoryId: product.id,
            variantOptionId: option._id,
            variantLabel: `${variant.name}: ${option.value}`,
            variantSku: option.sku || "",
            variantPrice: option.price || 0,
            variantImages: option.images || [],
            attributesSnapshot: [{ name: variant.name, value: option.value }],
            quantity: 1,
            priceAtTime: option.price || 0,
        });

        setSelectedOptions((prev) => ({ ...prev, [variant._id]: option._id }));
        setShowVariantPicker(false);
    };

    const cartItem = cart?.items?.find((i) => i.inventoryId === product.id);
    const router = useRouter();

    // --- Render ---
    return (
        <motion.div
            whileHover={{ y: -4 }}
            className="h-90 group bg-white rounded-2xl shadow hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
        >
            {/* Product Image */}
            <div
                onClick={() => router.push(`/product-detail/${product.id}`)}
                className="relative cursor-pointer"
            >
                <Image
                    // src={product.metaImage || product.icon || "/placeholder.png"}
                    alt={product.name}
                    width={300}
                    height={200}
                    className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Wishlist */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product.id);
                    }}
                    className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow hover:scale-110 transition"
                >
                    <Heart
                        className={`h-5 w-5 ${product.isWishlisted
                            ? "text-red-500 fill-red-500"
                            : "text-gray-500"
                            }`}
                    />
                </button>
            </div>

            {/* Product Info */}
            <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-base line-clamp-1">
                    {product.name}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                    {product.description}
                </p>

                <div className="flex flex-wrap gap-1 mt-3">
                    {product?.tags?.map((tag, index) => {
                        // Define some desi colors
                        const colors = [
                            "bg-yellow-400/30 text-yellow-800",
                            "bg-red-400/30 text-red-800",
                            "bg-green-400/30 text-green-800",
                            "bg-orange-400/30 text-orange-900",
                            "bg-pink-400/30 text-pink-800",
                            "bg-purple-400/30 text-purple-800",
                        ];
                        const colorClass = colors[index % colors.length];

                        return (
                            <span
                                key={index}
                                className={`px-2 py-0.5 rounded-full text-xs font-medium truncate max-w-[100px] ${colorClass}`}
                                title={tag}
                            >
                                {tag || "badge"}
                            </span>
                        );
                    })}
                </div>




            </div>


        </motion.div>
    );
};

export default ProductCard;
