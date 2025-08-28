"use client";

import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { FiClock, FiTruck, FiBox, FiTag } from "react-icons/fi";
import CartItem from "../CartItem/drawer";
import { useCartManager } from "~/app/components/CartManager";
import { api } from "~/trpc/react";

// Razorpay script loader
const loadRazorpay = () => {
  return new Promise<boolean>((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function CartDrawer({ isOpen, onClose }) {
  const [cartDetails, setCartDetails] = useState<any[]>([]);
  const { getCartItems } = useCartManager();

  // tRPC mutation
  const place = api.order.getRazorPayId.useMutation({
    onSuccess: (data) => console.log("Order placed successfully:", data),
    onError: (error) => console.error("Error placing order:", error),
  });

  useEffect(() => {
    setCartDetails(getCartItems());
  }, [getCartItems]);

  // Payment handler

  const createOrder = api.order.createOrders.useMutation();
  const createTrip = api.trip.create.useMutation();

  const handlePayment = async () => {
    const res = await loadRazorpay();
    if (!res) {
      alert("Razorpay SDK failed to load. Check your internet connection.");
      return;
    }
    if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
      console.error(
        "❌ Razorpay Key not found. Make sure NEXT_PUBLIC_RAZORPAY_KEY_ID is set.",
      );
      alert("Payment configuration missing. Please contact support.");
      return;
    }
    try {
      const orderData = await place.mutateAsync(); // backend should return { id, amount }
      console.log(orderData);

      if (!orderData?.orderId) {
        alert("Order creation failed. Please try again.");
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData?.amount, // in paise
        currency: "INR",
        name: "Apni Desi Dukaan",
        description: "Order Payment",
        order_id: orderData.orderId,
        image: "https://your-logo-url.com/logo.png",
        prefill: {
          name: process.env.NEXT_PUBLIC_USER_NAME || "Guest User",
          email: process.env.NEXT_PUBLIC_USER_EMAIL || "guest@example.com",
          contact: process.env.NEXT_PUBLIC_USER_CONTACT || "9999999999",
        },
        theme: { color: "#b28800ff" },
        handler: async function (response: any) {
          const order = await createOrder.mutateAsync({
            cartId: "68a8372d417aa5f5c88f32ee",
            addressId: "68a8372d417aa5f5c88f32ee",
            vendorId: "68a8372d417aa5f5c88f32e2",
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            paymentMethod: "upi",
          });

          console.log(" ============  Payment successful: ========", order);

          const trip = await createTrip.mutateAsync({
            cartId: "68a8372d417aa5f5c88f32ee",
            addressId: "68a8372d417aa5f5c88f32ee",
            vendorId: "68a8372d417aa5f5c88f32e2",
            orderId: order.id, // link Trip with created Order
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            paymentMethod: "upi",
          });
          onClose();
        },
        modal: {
          ondismiss: function () {
            console.warn("Payment popup closed");
          },
        },
      };

      // @ts-ignore
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error during payment:", error);
    }
  };

  // Bill Calculations
  const totalMRP = cartDetails.reduce(
    (sum, item) => sum + item.originalPrice * item.quantity,
    0,
  );
  const totalDiscounted = cartDetails.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const savings = totalMRP - totalDiscounted;
  const deliveryCharge = 25;
  const handlingCharge = 4;
  const totalAmount = totalDiscounted + deliveryCharge + handlingCharge;

  return (
    <div
      className={`bg-accent fixed top-0 right-0 z-[9999] flex h-screen w-full max-w-sm transform flex-col transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-4 py-4">
        <h2 className="text-lg font-bold">My Cart</h2>
        <MdClose
          className="text-muted h-6 w-6 cursor-pointer"
          onClick={onClose}
        />
      </div>

      {/* Cart Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex items-center justify-between bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
          <span>Your total savings</span>
          <span>₹{savings}</span>
        </div>

        <div className="border-b bg-gray-50 p-4">
          <div className="mb-1 flex items-center gap-2 text-sm text-gray-800">
            <FiClock className="text-green-600" />
            <span className="font-medium">Delivery in 8 minutes</span>
          </div>
          <div className="text-muted ml-6 text-xs">
            Shipment of {cartDetails.length} item(s)
          </div>
        </div>

        <div className="max-h-[calc(100vh-360px)] space-y-4 overflow-y-auto bg-white p-4">
          {cartDetails.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty...</p>
          ) : (
            cartDetails.map((item) => <CartItem key={item.id} item={item} />)
          )}
        </div>

        {/* Bill Details */}
        <div className="space-y-2 border-t bg-white p-4 text-sm">
          <h3 className="mb-1 text-base font-semibold">Bill details</h3>

          <div className="flex justify-between">
            <div className="text-muted flex items-center gap-2">
              <FiTag />
              Item total
              <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                Saved ₹{savings}
              </span>
            </div>
            <div>
              <span className="text-muted mr-1 text-xs line-through">
                ₹{totalMRP}
              </span>
              ₹{totalDiscounted}
            </div>
          </div>

          <div className="text-muted flex justify-between">
            <div className="flex items-center gap-2">
              <FiTruck /> Delivery charge
            </div>
            <div>₹{deliveryCharge}</div>
          </div>

          <div className="text-muted flex justify-between">
            <div className="flex items-center gap-2">
              <FiBox /> Handling charge
            </div>
            <div>₹{handlingCharge}</div>
          </div>

          <hr className="my-2 border-t border-dashed" />
          <div className="flex justify-between text-base font-bold">
            <span>Grand total</span>
            <span>₹{totalAmount}</span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
          <span>Your total savings</span>
          <span>₹{savings}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="text-muted border-t bg-gray-50 px-4 py-3 text-xs">
        <strong className="mb-1 block text-sm text-gray-700">
          Cancellation Policy
        </strong>
        Orders cannot be cancelled once packed. In case of unexpected delays,
        refunds may apply.
      </div>

      <div className="sticky bottom-0 z-10 shrink-0 border-t bg-white px-4 py-3">
        <div className="flex items-center justify-between bg-white">
          <div className="text-lg font-bold text-green-500">
            ₹{totalAmount}{" "}
            <span className="text-muted text-sm font-medium">TOTAL</span>
          </div>
          <button
            className="bg-accent cursor-pointer rounded-lg px-6 py-2 text-sm font-semibold text-white shadow-sm"
            onClick={handlePayment}
          >
            Proceed to Pay →
          </button>
        </div>
      </div>
    </div>
  );
}
