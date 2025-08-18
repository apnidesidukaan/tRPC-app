"use client";

import { useState } from "react";
import { Heart, ShoppingCart, Minus, Plus, X } from "lucide-react";
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

    const cartItem = cart?.items?.find(
        (i) => i.inventoryId === product.id
    );
    const router = useRouter();
    // --- Render ---
    return (
        <div className=" bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300">
            {/* Product Image */}
            <div

                onClick={() => router.push(`/product-detail/${product.id}`)}
                className="relative">
                <Image
                    src={product.metaImage || "/placeholder.png"}
                    alt={product.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                />
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product.id);
                    }}
                    className="absolute top-2 right-2 bg-white/80 p-2 rounded-full shadow"
                >
                    <Heart
                        className={`h-5 w-5 ${product.isWishlisted ? "text-red-500 fill-red-500" : "text-gray-600"
                            }`}
                    />
                </button>
            </div>

            {/* Product Info */}
            <div className="p-3">
                <h3 className="font-medium text-gray-900 line-clamp-1">{product.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center mt-2">
                    <span className="text-primary font-bold">
                        ₹{product.price?.toFixed(2)}
                    </span>

                    {cartItem ? (
                        <div className="flex items-center gap-2 bg-primary text-white px-2 py-1 rounded">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    updateItem.mutate({
                                        inventoryId: cartItem.inventoryId,
                                        variantOptionId: cartItem.variantOptionId,
                                        quantity: Math.max(cartItem.quantity - 1, 1),
                                    });
                                }}
                            >
                                <Minus size={16} />
                            </button>
                            <span className="text-sm">{cartItem.quantity}</span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    updateItem.mutate({
                                        inventoryId: cartItem.inventoryId,
                                        variantOptionId: cartItem.variantOptionId,
                                        quantity: cartItem.quantity + 1,
                                    });
                                }}
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                    ) : (
                        // <button
                        //     onClick={(e) => {
                        //         e.stopPropagation();
                        //         handleAddClick();
                        //     }}
                        //     className="cursor-pointer bg-primary text-white px-3 py-1 rounded flex items-center gap-1"
                        // >
                        //     <ShoppingCart size={16} />
                        //     <span>Add</span>


                        // </button>

                        <AddToCart inventoryItem={product} />
                    )}
                </div>
            </div>

            {/* Variant Picker Modal */}
            <AnimatePresence>
                {showVariantPicker && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white rounded-lg shadow-lg p-4 w-96 relative"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                        >
                            <button
                                onClick={() => setShowVariantPicker(false)}
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            >
                                <X size={20} />
                            </button>
                            <h3 className="text-lg font-semibold mb-4">Choose Variant</h3>

                            {product.variants?.map((variant) => (
                                <div key={variant._id} className="mb-4">
                                    <p className="font-medium text-gray-800">{variant.name}</p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {variant.options?.map((option) => (
                                            <button
                                                key={option._id}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleAddVariantOption(variant, option);
                                                }}
                                                className={`px-3 py-1 rounded border ${selectedOptions[variant._id] === option._id
                                                    ? "bg-primary text-white border-primary"
                                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                    }`}
                                            >
                                                {option.value} (₹{option.price})
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProductCard;
