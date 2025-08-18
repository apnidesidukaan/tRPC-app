import React from "react";
import { BiUser, BiMap, BiCurrentLocation } from "react-icons/bi";
import { FaRupeeSign } from "react-icons/fa";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const OrdersTable = ({
  orders = [],
  handleOrderClick = () => { },
  columns = ["Order ID", "Customer", "Items", "Total", "Delivery", "Status", "Created At"],
}) => {
  return (
    <div className="md:col-span-6 bg-white rounded-xl shadow-md">
      <div className="w-[260px] sm:w-full md:w-[700px] lg:w-full overflow-x-auto">

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((head, i) => (
                <th
                  key={i}
                  className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr
                key={order._id}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => handleOrderClick(order)}
              > 
                {/* Order ID */}
                <td className="whitespace-nowrap px-4 py-4 font-mono text-sm text-blue-700 font-semibold">
                  {order.orderId}
                </td>

                {/* Customer Info */}
                <td className="whitespace-nowrap px-4 py-4">
                  <div className="text-sm text-gray-900 font-medium flex items-center gap-1">
                    <BiUser className="text-gray-500" />
                    {order.deliveryAddress?.name}
                  </div>
                  <div className="text-xs text-gray-500">{order.deliveryAddress?.phone}</div>
                </td>

                {/* Items Summary */}
                <td className="whitespace-nowrap px-4 py-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="text-xs text-gray-700">
                      {item.name} ({item.variant}) x {item.quantity}
                    </div>
                  ))}
                </td>

                {/* Total Price */}
                <td className="whitespace-nowrap px-4 py-4">
                  <div className="text-sm text-gray-800 flex items-center font-semibold">
                    <FaRupeeSign className="text-xs mr-0.5" />
                    {order.grandTotal}
                  </div>
                </td>

                {/* Delivery Info */}
                <td className="whitespace-nowrap px-4 py-4 text-xs text-gray-700">
                  <div className="flex items-center gap-1">
                    <BiMap className="text-gray-400" />
                    {order.deliveryAddress?.locality}, {order.deliveryAddress?.city}
                  </div>
                  <div className="text-[10px] text-gray-500">{order.deliveryMode}</div>
                </td>

                {/* Order Status */}
                <td className="whitespace-nowrap px-4 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.orderStatus === "created"
                      ? "bg-yellow-100 text-yellow-800"
                      : order.orderStatus === "delivered"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                      }`}
                  >
                    {order.orderStatus === "delivered" ? (
                      <FaCheckCircle className="mr-1 text-green-600" size={12} />
                    ) : (
                      <FaTimesCircle className="mr-1 text-yellow-600" size={12} />
                    )}
                    {order.orderStatus}
                  </span>
                </td>

                {/* Timestamp */}
                <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                  {order.timestamps?.createdAt
                    ? (() => {
                        const date = new Date(order.timestamps.createdAt);
                        const day = date.getDate();
                        const month = date.toLocaleString("en-US", { month: "short" }).toLowerCase();
                        const year = date.getFullYear();
                        const hours = date.getHours().toString().padStart(2, "0");
                        const minutes = date.getMinutes().toString().padStart(2, "0");
                        return `${day}${getDaySuffix(day)} ${month}, ${year} @ ${hours}:${minutes}`;
                      })()
                    : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Helper for day suffix
  function getDaySuffix(day) {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  }
};

export default OrdersTable;
