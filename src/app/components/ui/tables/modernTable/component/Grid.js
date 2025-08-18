import React from 'react';
import ImageCarousel from "../../../Carousel/ImageCarousel"; // Adjust path
import { categoryIcons, commonIcons } from '../constants/icons';
import { FaArrowUpRightDots } from "react-icons/fa6";
import { BiCalendar, BiUser } from "react-icons/bi";
import { FaDollarSign, FaEnvelope, FaPhoneAlt, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { BiMap } from "react-icons/bi";

const { FaCheckIcon, FaTimesIcon } = commonIcons;

const GridView = ({ gridType, dataArray = [], handleRowClick }) => {
    const getStockStatusColor = (stockLevel) => {
        if (stockLevel > 20) return 'bg-green-500';
        if (stockLevel > 10) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    const formatDate = (dateString) => new Date(dateString).toLocaleDateString();
    const formatCurrency = (amt) => amt ? `₹${amt.toFixed(2)}` : 'n/a';

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {dataArray.map((item, index) => {
                // Orders grid
                if (gridType === "orders") {
                    return (
                        <div
                            key={item._id || index}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                            onClick={() => handleRowClick(item)}
                        >
                            <div className="p-4 space-y-2">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold text-gray-900">{item.orderId}</h3>
                                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                                        {item.orderStatus}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600">
                                    <BiUser className="inline-block w-4 h-4 mr-1" />
                                    {item.deliveryAddress?.name}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <FaDollarSign className="inline-block w-4 h-4 mr-1" />
                                    {formatCurrency(item.grandTotal)}
                                </p>
                                <p className="text-xs text-gray-500">
                                    <BiCalendar className="inline-block w-4 h-4 mr-1" />
                                    {formatDate(item.timestamps?.createdAt)}
                                </p>
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {item.items?.map((prod, idx) => (
                                        <span
                                            key={idx}
                                            className="text-xs bg-gray-100 px-2 py-0.5 rounded-md text-gray-700"
                                        >
                                            {prod.name} x{prod.quantity}
                                        </span>
                                    ))}
                                </div>
                                <div className="pt-3 border-t mt-3 text-right">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleRowClick(item);
                                        }}
                                        className="text-blue-600 hover:text-blue-800 text-sm inline-flex items-center"
                                    >
                                        View Details <FaArrowUpRightDots className="ml-1 w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                }

                if (gridType === "users" || gridType === "vendors") {
                    return (
                        <div
                            key={item._id || index}
                            className="relative bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden 
                 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl 
                 cursor-pointer group" // Added group for hover effects on children
                            onClick={() => handleRowClick(item)}
                        >
                            {/* Top background accent */}
                            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-10"></div>

                            <div className="relative flex flex-col items-center p-6 space-y-4 pt-8"> {/* Adjusted padding */}
                                {/* Avatar */}
                                {item.avatarUrl ? (
                                    <img
                                        src={item.avatarUrl}
                                        alt={item.name}
                                        className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg 
                       ring-2 ring-blue-400 group-hover:ring-blue-600 transition-all duration-300" // Enhanced avatar
                                    />
                                ) : (
                                    <div className="w-20 h-20 flex items-center justify-center rounded-full bg-blue-100 text-blue-500 border-4 border-white shadow-lg">
                                        <BiUser className="w-12 h-12" /> {/* Larger, centered icon */}
                                    </div>
                                )}

                                {/* Name */}
                                <span className="text-xl font-extrabold text-gray-800 text-center leading-tight">
                                    {item.name}
                                </span>

                                {/* Email & Phone with subtle icons */}
                                <div className="flex flex-col items-center space-y-1 text-sm text-gray-600">
                                    <div className="flex items-center gap-1">
                                        <FaEnvelope className="w-3.5 h-3.5 text-gray-400" /> {/* Small envelope icon */}
                                        <span>{item.email}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <FaPhoneAlt className="w-3.5 h-3.5 text-gray-400" /> {/* Small phone icon */}
                                        <span>{item.phone}</span>
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                    <BiMap className="w-4 h-4 text-gray-400" />
                                    <span className="truncate max-w-[150px]">{item.address || "No address provided"}</span>
                                </div>

                                {/* Status Badge */}
                                <div className={`mt-3 px-4 py-1.5 rounded-full text-sm font-semibold capitalize 
                     ${item.status === "new"
                                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                                        : item.status === "active"
                                            ? "bg-blue-100 text-blue-800 border border-blue-200"
                                            : "bg-gray-100 text-gray-700 border border-gray-200"
                                    } shadow-sm`}>
                                    <div className="flex items-center gap-2">
                                        {item.status === "new" ? (
                                            <FaCheckCircle className="text-emerald-500" size={14} />
                                        ) : (
                                            <FaExclamationCircle className="text-yellow-500" size={14} /> // More appropriate for 'active' or default
                                        )}
                                        {item.status}
                                    </div>
                                </div>

                                {/* Optional: Modules of Interest - Uncomment if you want to show */}
                                {/* {item?.modules?.length > 0 && (
          <div className="mt-4 flex flex-wrap justify-center gap-2 max-w-full">
            {item.modules.map((mod) => (
              <div
                key={mod._id}
                className="flex items-center gap-1 bg-purple-50 text-purple-700 px-2.5 py-1 
                           rounded-full text-xs font-medium border border-purple-200 shadow-xs
                           hover:bg-purple-100 transition-colors"
              >
                <img
                  src={mod.icon || "/icons/default.png"} // fallback icon
                  alt={mod.name}
                  className="w-3.5 h-3.5 object-contain"
                />
                <span>{mod.name}</span>
              </div>
            ))}
          </div>
        )} */}
                            </div>

                            {/* Convert Button (optional, and more prominent on hover) */}
                            {/* {item.status !== "client" && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white/90 to-transparent 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation(); // prevent card click
              convertToClient(item._id);
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 
                       text-white text-sm font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 
                       transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <FaUserPlus className="w-4 h-4" /> {/* Icon for making client * /}
            Make Client
          </button>
        </div>
      )} */}
                        </div>
                    );
                }
                // Default: inventory grid
                return (
                    <div
                        key={item.id || index}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => handleRowClick(item)}
                    >
                        <div className="h-48 overflow-hidden bg-gray-200 relative">
                            {item?.images?.length > 0 && <ImageCarousel images={item.images} />}
                            <div className="absolute top-2 right-2">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                    }`}>
                                    {item.status === 'active'
                                        ? <FaCheckIcon size={10} className="mr-1" />
                                        : <FaTimesIcon size={10} className="mr-1" />}
                                    {item.status}
                                </span>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-900 truncate">{item.name}</h3>
                            <p className="text-sm text-gray-500 font-mono mb-2">{item.sku}</p>
                            <div className="flex items-center justify-between mb-2">
                                <div className="text-sm text-gray-600 flex items-center">
                                    {item?.categoryId?.name && categoryIcons[item.categoryId.name] && (
                                        <span className="mr-1">{categoryIcons[item.categoryId.name]}</span>
                                    )}
                                    {item.categoryId?.name}
                                </div>
                                <div className="text-lg font-bold text-gray-900">₹{item.price}</div>
                            </div>
                            <div className="flex items-center">
                                <div className={`w-2 h-2 rounded-full mr-2 ${getStockStatusColor(item.stock)}`}></div>
                                <span className="text-sm text-gray-700">Stock: {item.stock}</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default GridView;