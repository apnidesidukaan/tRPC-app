// components/inventory/ProductDetailModal.jsx
import React from 'react';
import ImageCarousel from "../../../Carousel/ImageCarousel"; // Adjust path as needed
import { commonIcons } from '../constants/icons'; // Adjust path as needed

const { FaTimes } = commonIcons;

const ProductDetailModal = ({ product, onClose }) => {
    if (!product) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <FaTimes size={24} />
                </button>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h2>
                <div className="mb-4">
                    {product.images && product.images.length > 0 && (
                        <div className="h-64 rounded-lg overflow-hidden bg-gray-200">
                            <ImageCarousel images={product.images} />
                        </div>
                    )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-sm">
                    <div>
                        <p className="font-medium">SKU:</p>
                        <p className="font-mono">{product.sku}</p>
                    </div>
                    <div>
                        <p className="font-medium">Price:</p>
                        <p>₹{product.price}</p>
                    </div>
                    <div>
                        <p className="font-medium">Stock:</p>
                        <p>{product.stock}</p>
                    </div>
                    <div>
                        <p className="font-medium">Status:</p>
                        <p className="capitalize">{product.status}</p>
                    </div>
                    {product.module && (
                        <div>
                            <p className="font-medium">Module:</p>
                            <p>{product.module}</p>
                        </div>
                    )}
                    {product.category && (
                        <div>
                            <p className="font-medium">Category:</p>
                            <p>{product.category}</p>
                        </div>
                    )}
                    {product.description && (
                        <div className="md:col-span-2">
                            <p className="font-medium">Description:</p>
                            <p className="text-gray-600">{product.description}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetailModal;