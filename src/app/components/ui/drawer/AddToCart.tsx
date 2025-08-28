'use client';

import { useEffect, useState } from 'react';
import { MdClose } from "react-icons/md";
import { FiClock, FiTruck, FiBox, FiTag } from "react-icons/fi";
import CartItem from "../CartItem/drawer";
import { useCartManager } from "~/app/components/CartManager";
import { api } from '~/trpc/react';

// Razorpay script loader
const loadRazorpay = () => {
  return new Promise<boolean>((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function CartDrawer({ isOpen, onClose }) {
  const [cartDetails, setCartDetails] = useState<any[]>([]);
  const { getCartItems } = useCartManager();

  // tRPC mutation
  const place = api.order.placeOrder.useMutation({
    onSuccess: (data) => console.log('Order placed successfully:', data),
    onError: (error) => console.error('Error placing order:', error),
  });

  useEffect(() => {
    setCartDetails(getCartItems());
  }, [getCartItems]);

  // Payment handler
  const handlePayment = async () => {
    const res = await loadRazorpay();
    if (!res) {
      alert('Razorpay SDK failed to load. Check your internet connection.');
      return;
    }
    if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
      console.error("❌ Razorpay Key not found. Make sure NEXT_PUBLIC_RAZORPAY_KEY_ID is set.");
      alert("Payment configuration missing. Please contact support.");
      return;
    }
    try {




      const orderData = await place.mutateAsync(); // backend should return { id, amount }
      console.log(orderData);

      if (!orderData?.orderId) {
        alert('Order creation failed. Please try again.');
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData?.amount, // in paise
        currency: 'INR',
        name: 'Apni Desi Dukaan',
        description: 'Order Payment',
        order_id: orderData.orderId,
        image: 'https://your-logo-url.com/logo.png',
        prefill: {
          name: process.env.NEXT_PUBLIC_USER_NAME || 'Guest User',
          email: process.env.NEXT_PUBLIC_USER_EMAIL || 'guest@example.com',
          contact: process.env.NEXT_PUBLIC_USER_CONTACT || '9999999999',
        },
        theme: { color: '#b28800ff' },
        handler: async function (response: any) {
          const order = await api.order.createOrders.mutateAsync({
            cartId: "68a8372d417aa5f5c88f32ee",
            addressId: "68a8372d417aa5f5c88f32ee",
            vendorId: "68a8372d417aa5f5c88f32e2",
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            paymentMethod: "upi",
          });
          console.log(' ============  Payment successful: ========', order);
          onClose();
        },
        modal: {
          ondismiss: function () {
            console.warn('Payment popup closed');
          }
        }
      };

      // @ts-ignore
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error during payment:', error);
    }
  };

  // Bill Calculations
  const totalMRP = cartDetails.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0);
  const totalDiscounted = cartDetails.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const savings = totalMRP - totalDiscounted;
  const deliveryCharge = 25;
  const handlingCharge = 4;
  const totalAmount = totalDiscounted + deliveryCharge + handlingCharge;

  return (
    <div
      className={`fixed top-0 right-0 h-screen w-full max-w-sm bg-accent z-[9999] flex flex-col transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
        }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b sticky top-0 bg-white z-10">
        <h2 className="text-lg font-bold">My Cart</h2>
        <MdClose className="w-6 h-6 cursor-pointer text-muted" onClick={onClose} />
      </div>

      {/* Cart Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="bg-blue-50 text-blue-700 px-4 py-2 text-sm font-medium flex justify-between items-center">
          <span>Your total savings</span>
          <span>₹{savings}</span>
        </div>

        <div className="p-4 bg-gray-50 border-b">
          <div className="flex items-center gap-2 text-sm text-gray-800 mb-1">
            <FiClock className="text-green-600" />
            <span className="font-medium">Delivery in 8 minutes</span>
          </div>
          <div className="text-xs text-muted ml-6">Shipment of {cartDetails.length} item(s)</div>
        </div>

        <div className="p-4 space-y-4 bg-white max-h-[calc(100vh-360px)] overflow-y-auto">
          {cartDetails.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty...</p>
          ) : (
            cartDetails.map((item) => <CartItem key={item.id} item={item} />)
          )}
        </div>

        {/* Bill Details */}
        <div className="bg-white p-4 border-t space-y-2 text-sm">
          <h3 className="font-semibold text-base mb-1">Bill details</h3>

          <div className="flex justify-between">
            <div className="flex gap-2 items-center text-muted">
              <FiTag />
              Item total
              <span className="ml-2 text-blue-700 text-xs bg-blue-100 px-2 py-0.5 rounded-full font-medium">
                Saved ₹{savings}
              </span>
            </div>
            <div>
              <span className="line-through text-xs text-muted mr-1">₹{totalMRP}</span>
              ₹{totalDiscounted}
            </div>
          </div>

          <div className="flex justify-between text-muted">
            <div className="flex items-center gap-2"><FiTruck /> Delivery charge</div>
            <div>₹{deliveryCharge}</div>
          </div>

          <div className="flex justify-between text-muted">
            <div className="flex items-center gap-2"><FiBox /> Handling charge</div>
            <div>₹{handlingCharge}</div>
          </div>

          <hr className="border-dashed border-t my-2" />
          <div className="flex justify-between font-bold text-base">
            <span>Grand total</span>
            <span>₹{totalAmount}</span>
          </div>
        </div>

        <div className="bg-blue-50 text-blue-700 px-4 py-2 text-sm font-medium flex justify-between items-center border-t">
          <span>Your total savings</span>
          <span>₹{savings}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-4 py-3 text-xs text-muted border-t">
        <strong className="text-sm text-gray-700 block mb-1">Cancellation Policy</strong>
        Orders cannot be cancelled once packed. In case of unexpected delays, refunds may apply.
      </div>

      <div className="shrink-0 border-t px-4 py-3 bg-white sticky bottom-0 z-10">
        <div className="flex items-center justify-between bg-white">
          <div className="text-lg font-bold text-green-500">
            ₹{totalAmount} <span className="text-sm font-medium text-muted">TOTAL</span>
          </div>
          <button
            className="cursor-pointer bg-accent text-white px-6 py-2 rounded-lg font-semibold text-sm shadow-sm"
            onClick={handlePayment}
          >
            Proceed to Pay →
          </button>
        </div>
      </div>
    </div>
  );
}
