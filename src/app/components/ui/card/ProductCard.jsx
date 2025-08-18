'use client';
import React, { useState, useEffect } from 'react';
import { Heart, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import RatingStars from './RatingStars';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// import { useCart } from '../../../hooks/useCart';

const ProductCard = ({ product, onAddToCart, onToggleWishlist }) => {

    const cartItem = product?.cartItem || null; // Assuming product has cartItem info
    const [selectedVariants, setSelectedVariants] = useState([]);

    // Variant picker state
    const [showVariantPicker, setShowVariantPicker] = useState(false);
    // selectedOptions: { [variantId]: optionObject }
    const [selectedOptions, setSelectedOptions] = useState({});

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const router = useRouter();
    const hasMultipleImages = Array.isArray(product?.images) && product.images.length > 1;

    useEffect(() => {
        if (!hasMultipleImages) return;
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
        }, 10000);
        return () => clearInterval(interval);
    }, [product?.images?.length, hasMultipleImages]);

    const nextImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    };

    const goToImage = (index, e) => {
        e.stopPropagation();
        setCurrentImageIndex(index);
    };

    const moduleName = product?.module || 'df';
    const categoryName = product?.category || 'df';
    const id = product._id || product.id; // inventory _id from backend

    // When user clicks Add
    const handleAddClick = () => {
        // If variants exist, open picker
        if (Array.isArray(product?.variants) && product.variants.length > 0) {
            setShowVariantPicker(true);
            directAdd({
                vendorId: product.vendorId,
                inventoryId: product.id,
                // for products with no variants we set a default option id = product._id or "default"
                variantOptionId: '',
                variantLabel: product.name,
                variantSku: product.sku || '',
                variantPrice: product.price || 0,
                variantImages: product.images || [],
                attributesSnapshot: [],
                quantity: 1,
                priceAtTime: product.price || 0,
                reservedUntil: null
            });

        }

        // No variants -> direct add
        directAdd({
            vendorId: product.vendorId,
            inventoryId: product.id,
            // for products with no variants we set a default option id = product._id or "default"
            variantOptionId: '',
            variantLabel: product.name,
            variantSku: product.sku || '',
            variantPrice: product.price || 0,
            variantImages: product.images || [],
            attributesSnapshot: [],
            quantity: 1,
            priceAtTime: product.price || 0,
            reservedUntil: null
        });
        // directAdd(product)
    };

    const handleAddVariantOption = (variant, option) => {
        // If variants exist, open picker
        console.log('selectedOptions', option);

        directAdd({
            vendorId: product.vendorId,
            inventoryId: product.id,
            // for products with no variants we set a default option id = product._id or "default"
            variantOptionId: option?._id,
            variantLabel: product.name,
            variantSku: product.sku || '',
            variantPrice: product.price || 0,
            variantImages: product.images || [],
            attributesSnapshot: [],
            quantity: 1,
            priceAtTime: product.price || 0,
            reservedUntil: null
        });




    };


    // helper to add item (merging existing logic for logged-in vs guest is inside useCart)
    const directAdd = (newItem) => {

        // If already in cart (same inventoryId + variantOptionId) then update quantity instead
        const existing = cart?.find(it =>
            String(it.inventoryId) === String(newItem.inventoryId) &&
            String(it.variantOptionId) === String(newItem.variantOptionId)
        );

        if (existing) {
            // call updateCartItem: signature (inventoryId, variantOptionId, updatedFields)
            updateCartItem(existing.inventoryId, existing.variantOptionId, { quantity: (existing.quantity || 0) + newItem.quantity });
        } else {
            // console.log('else -----------');

            addToCart(newItem);
        }
    };

    // called when user selects an option for a variant group
    const handleOptionSelect = (variantId, option) => {
        setSelectedOptions(prev => ({ ...prev, [variantId]: option }));
    };

    // Confirm selection and add
    const handleConfirmVariants = () => {
        const variantGroups = Array.isArray(product?.variants) ? product.variants : [];
        // Build attributesSnapshot and calculate price (sum of selected options)
        const attributesSnapshot = [];
        let totalVariantPrice = 0;
        let variantSkus = [];
        let variantImages = [];

        for (const variant of variantGroups) {
            const sel = selectedOptions[variant._id];
            if (!sel) {
                // If some variant not selected, pick first option as fallback
                const fallback = Array.isArray(variant.options) && variant.options[0];
                if (fallback) {
                    attributesSnapshot.push({ key: variant.name || variant.variantType || 'option', value: fallback.label });
                    totalVariantPrice += fallback.price || 0;
                    if (fallback.sku) variantSkus.push(fallback.sku);
                    if (Array.isArray(fallback.images) && fallback.images.length) variantImages = variantImages.concat(fallback.images);
                }
            } else {
                attributesSnapshot.push({ key: variant.name || variant.variantType || 'option', value: sel.label });
                totalVariantPrice += sel.price || 0;
                if (sel.sku) variantSkus.push(sel.sku);
                if (Array.isArray(sel.images) && sel.images.length) variantImages = variantImages.concat(sel.images);
            }
        }

        // Primary variantOptionId: choose the first selected option's _id (keeps compatibility with backend single-option flows)
        const firstVariant = variantGroups[0];
        const primarySelected = firstVariant ? (selectedOptions[firstVariant._id] || (firstVariant.options && firstVariant.options[0])) : null;
        const primaryOptionId = primarySelected ? primarySelected._id : (product._id ? product._id.toString() : 'default');

        // Build variantLabel: join "VariantName: OptionLabel" for all groups
        const variantLabel = attributesSnapshot.map(a => `${a.key}: ${a.value}`).join(' | ');

        const newItem = {
            vendorId: product.vendorId,
            inventoryId: product._id,
            variantOptionId: primaryOptionId.toString(),
            variantLabel,
            variantSku: variantSkus.join('|'),
            variantPrice: totalVariantPrice || product.price || 0,
            variantImages: variantImages.length ? variantImages : (product.images || []),
            attributesSnapshot,
            quantity: 1,
            priceAtTime: (totalVariantPrice || product.price || 0) * 1,
            reservedUntil: null,
            createdAt: new Date().toISOString()
        };

        // Add or update
        directAdd(newItem);
        setShowVariantPicker(false);
    };



    const handleSelectOption = (variantIndex, optionIndex) => {
        setSelectedOptions(prev => ({
            ...prev,
            [variantIndex]: optionIndex // only one option per variant
        }));
    };

    return (
        <>
            <div
                className="group bg-white rounded-3xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden transform hover:-translate-y-2 cursor-pointer relative w-50"
            >
                {product.discount && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-20 shadow-md">
                        {product.discount}% OFF
                    </div>
                )}

                {/* Image Carousel */}
                <div
                    onClick={() => router.push(`/product-detail/${moduleName}/${categoryName}/${id}`)}
                    className="relative h-40 bg-gray-100 overflow-hidden rounded-t-3xl"
                >
                    <div
                        className="flex transition-transform duration-500 ease-in-out h-full"
                        style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                    >
                        {/* {(product?.images || product?.image ||product?.metaImage|| []).map((img, idx) => (
                            <div key={idx} className="w-full h-full flex-shrink-0 flex items-center justify-center">
                                <Image
                                    src={img}
                                    alt={`${product.name} - Image ${idx + 1}`}
                                    width={160}
                                    height={160}
                                    className="object-contain max-h-full max-w-full"
                                />
                            </div>
                        ))} */}
                        <Image
                            src={product.metaImage}
                            // alt={`${product.name} - Image ${idx + 1}`}
                            width={160}
                            height={160}
                            className="object-contain max-h-full max-w-full"
                        />
                    </div>

                    {hasMultipleImages && (
                        <>
                            <button
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                                onClick={prevImage}
                            >
                                <ChevronLeft className="w-4 h-4 text-gray-700" />
                            </button>
                            <button
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                                onClick={nextImage}
                            >
                                <ChevronRight className="w-4 h-4 text-gray-700" />
                            </button>
                        </>
                    )}

                    {hasMultipleImages && (
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1 z-10">
                            {(product.images || []).map((_, idx) => (
                                <button
                                    key={idx}
                                    className={`w-2 h-2 rounded-full transition-all duration-200 ${idx === currentImageIndex ? 'bg-white shadow-md' : 'bg-white/50 hover:bg-white/70'}`}
                                    onClick={(e) => goToImage(idx, e)}
                                />
                            ))}
                        </div>
                    )}

                    {/* Wishlist */}
                    <button
                        className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md text-gray-500 hover:text-pink-500 hover:scale-110 transition-all z-20"
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggleWishlist(product._id);
                        }}
                    >
                        <Heart className="w-5 h-5" />
                    </button>
                </div>

                {/* Card Content */}
                <div className="p-4">
                    <h3 className="text-base font-semibold text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
                    <p className="text-xs text-gray-600 mb-1">{product.vendorName}</p>
                    <div className="flex items-center mb-2">
                        <RatingStars rating={product.rating ?? 1} />
                        <span className="text-xs text-gray-500 ml-2">({product.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-baseline space-x-1 mb-2">
                        <span className="text-lg font-bold text-green-500">₹{product.price}</span>
                        {product.originalPrice && (
                            <span className="text-xs text-gray-500 line-through">₹{product.originalPrice}</span>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                        {product.badges?.map((badge, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                                {badge}
                            </span>
                        ))}
                    </div>

                    {/* Add to Cart Button */}

                    {(Array.isArray(product?.variants) && product.variants.length > 0) ?
                        <button
                            className={`w-full bg-gradient-to-r from-[#83bf22] to-[#83bf22] text-white ring-2 cursor-pointer hover:shadow-green-300 py-2 rounded-xl text-sm font-semibold flex items-center justify-center space-x-1 border-white transition-all duration-200 ${cartItem ? 'bg-opacity-90' : ''}`}
                            onClick={() => {
                                // console.log('hua vraina twaala ')
                                setShowVariantPicker(true);

                            }}
                        >
                            <ShoppingCart className="w-4 h-4" />
                            <span>{cartItem ? `Added (${cartItem?.quantity})` : 'Add'}</span>
                            <span>{cartItem ? `Added (${cartItem?.quantity})` : 'Add'}</span>
                        </button> :

                        <button
                            className={`w-full bg-gradient-to-r from-[#83bf22] to-[#83bf22] text-white ring-2 cursor-pointer hover:shadow-green-300 py-2 rounded-xl text-sm font-semibold flex items-center justify-center space-x-1 border-white transition-all duration-200 ${cartItem ? 'bg-opacity-90' : ''}`}
                            onClick={handleAddClick}
                        >
                            <ShoppingCart className="w-4 h-4" />
                            <span>{cartItem ? `Added (${cartItem?.quantity})` : 'Add'}</span>
                        </button>
                    }

                </div>

                {/* =================== Variant Picker Modal ==================================== */}
            </div>
            {showVariantPicker && (
                <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] backdrop-blur-sm z-50 bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-4 w-96 max-w-[95%]">
                        <h3 className="text-lg font-semibold mb-3">Select Variant Options</h3>

                        <div className="space-y-4 max-h-[60vh] overflow-auto">
                            <div>
                                {product?.variants?.map((variant, vIndex) => (
                                    <div key={vIndex} className="mb-4">
                                        <h3 className="font-semibold mb-3">{variant.name}</h3>
                                        <div className="grid grid-cols-3 gap-2">
                                            {variant.options?.map((option, oIndex) => {
                                                const isSelected =
                                                    selectedVariants[variant.name] &&
                                                    selectedVariants[variant.name].name === option.name;

                                                const isInCart = cart && cart?.some(sel => sel.variantOptionId === option._id);
                                                return (
                                                    <div
                                                        key={oIndex}
                                                        className={`p-3 rounded-lg border text-center cursor-pointer ${isSelected
                                                            ? 'border-blue-500 bg-blue-50'
                                                            : 'border-gray-200 hover:border-gray-300'
                                                            }`}
                                                        onClick={() => handleAddVariantOption(variant.name, option)}
                                                    >
                                                        <div className="font-medium">{option.name}</div>
                                                        <div className="text-sm text-gray-600">₹{option.price}</div>

                                                        {isInCart ? (
                                                            <div className="flex items-center justify-center gap-2 mt-2">
                                                                <button
                                                                    className="px-2 py-1 border rounded"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        updateQuantity(
                                                                            cartItem.productId,
                                                                            cartItem.quantity - 1,
                                                                            cartItem.variantSelections
                                                                        );
                                                                    }}
                                                                >
                                                                    -
                                                                </button>
                                                                <span>{cartItem.quantity}</span>
                                                                <button
                                                                    className="px-2 py-1 border rounded"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        updateQuantity(
                                                                            cartItem.productId,
                                                                            cartItem.quantity + 1,
                                                                            cartItem.variantSelections
                                                                        );
                                                                    }}
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <button
                                                                className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
                                                                onClick={handleAddVariantOption}
                                                            >
                                                                Add
                                                            </button>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>


                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-2">
                            <button
                                className="w-full bg-gray-200 py-2 rounded-lg hover:bg-gray-300"
                                onClick={() => setShowVariantPicker(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="w-full bg-[#83bf22] text-white py-2 rounded-lg"
                                onClick={handleConfirmVariants}
                            >
                                Add Selected
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
};

export default ProductCard;
