

"use client";

import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { FiClock, FiTruck, FiBox, FiTag } from "react-icons/fi";
import CartItem from "../CartItem/drawer";
import { useCartManager } from "~/app/components/CartManager";
import { api } from "~/trpc/react";
import { useSession } from "next-auth/react";
const haversineDistance = (coords1, coords2) => {

  const toRad = (x) => (x * Math.PI) / 180;
  const lat1 = coords1?.lat;
  const lon1 = coords1?.lng;
  const lat2 = coords2?.lat;
  const lon2 = coords2?.lng;

  if (isNaN(lat1) || isNaN(lon1) || isNaN(lat2) || isNaN(lon2)) {
    console.warn('Invalid coordinates provided to haversineDistance:', coords1, coords2);
    return Infinity;
  }

  const R = 6371e3; // metres
  const φ1 = toRad(lat1);
  const φ2 = toRad(lat2);
  const Δφ = toRad(lat2 - lat1);
  const Δλ = toRad(lon2 - lon1);

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // in meters
};








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

  const { data: cartDetails } = api.cart.get.useQuery();



  const { data: cartItems, isLoading } = api.cart.getCartItemsByCartId.useQuery(String(cartDetails?.id));
  const { data: user } = api.user.getProfile.useQuery();
  const { data: store } = api.store.getById.useQuery(
    String(cartItems?.[0]?.vendorId),
    {
      enabled: !!cartItems?.[0]?.vendorId, // ✅ only triggers if vendorId exists
    }
  );



  // Bill Calculations
  const totalMRP = cartItems?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const totalDiscounted = cartItems?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const savings = totalMRP - totalDiscounted;



  let distance = haversineDistance(user?.address?.geo, store?.address?.geo)
  // console.log('distance =========================  ======', distance);

  const { data: priceDetails, isLoading: priceLoading } = api.delivery.calculatePrice.useQuery({
    distance: distance / 1000, // ← later replace with actual distance from user’s address
    cartValue: totalDiscounted ?? 0,
    express: false, // or true if they choose express delivery
  }, {
    enabled: !!totalDiscounted, // only run if cartValue is ready
  });




  const deliveryCharge = priceDetails?.deliveryCharge ?? 0;
  const platformFee = priceDetails?.platformFee ?? 0;
  const handlingCharge = 4; // still your static value
  const totalAmount = (priceDetails?.finalPrice ?? totalDiscounted ?? 0) + handlingCharge;




  // const [cartDetails, setCartDetails] = useState<any[]>([]);
  const { getCartItems, addItemToCart } = useCartManager();
  const { data: session } = useSession();

  // tRPC mutation
  const place = api.order.getRazorPayId.useMutation({
    onSuccess: (data) => console.log("Order placed successfully:", data),
    onError: (error) => console.error("Error placing order:", error),
  });







  // Payment handler

  const createOrder = api.order.createOrders.useMutation();
  const createTrip = api.trip.create.useMutation();
  const createStatusHistory = api.order.createStatusHistory.useMutation();
  const createTransaction = api.transaction.create.useMutation();
  const getVendorWallet = api.wallet.get.useMutation();

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
      const orderData = await place.mutateAsync({ amount: totalAmount * 100 });
      // console.log(orderData);

      if (!orderData?.orderId) {
        alert("Order creation failed. Please try again.");
        return;
      }
      console.log('priceDetails ----', session);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData?.amount, // in paise
        currency: "INR",
        name: "Apni Desi Dukaan",
        description: "Order Payment",
        order_id: orderData.orderId,
        image: "https://your-logo-url.com/logo.png",
        prefill: {
          name: session?.user?.name || "Guest User",
          email: session?.user?.email || "guest@example.com",
          contact: session?.user?.mobile || "9999999999",
        },
        theme: { color: "#6e241b" },
        handler: async function (response: any) {
          try {
            // 🛒 3. Group cartItems by vendorId
            const vendorGroups = cartItems?.reduce((acc: any, item: any) => {
              if (!acc[item.vendorId]) acc[item.vendorId] = [];
              acc[item.vendorId].push(item);
              return acc;
            }, {});

            // 📝 4. Loop over each vendor and create Order + Trip
            for (const [vendorId, items] of Object.entries(vendorGroups)) {
              console.log("✅ ======== data:", items);
              const order = await createOrder.mutateAsync({
                cartId: String(cartDetails?.id),
                addressId: "68a8372d417aa5f5c88f32ee", // dynamic later
                vendorId,
                cartItems: items,
                // items: items?.map((i: any) => ({
                //   productId: i.productId,
                //   quantity: i.quantity,
                // })),
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                paymentMethod: "upi",
              });

              console.log("✅ Order created:", order);

              const trip = await createTrip.mutateAsync({
                cartId: cartDetails?.id,
                addressId: "68a8372d417aa5f5c88f32ee",
                vendorId,
                orderId: order.id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                paymentMethod: "upi",
              });

              console.log("🚚 Trip created:", trip);

              const wallet = await getVendorWallet.mutateAsync({
                userId: vendorId as string,
                userModel: "vendor",
              });

              console.log("💳 Wallet fetched or created:", wallet);

              const transaction = await createTransaction.mutateAsync({
                type: "credit",
                amount: totalAmount, // ideally split per vendor
                sourceType: "order",
                sourceRef: order.id,
                description: `Payment received for Order #${order.id}`,
                walletId: wallet.id, // ✅ pass the wallet id here
              });

              console.log("transaction Created -----:", transaction);

              const statusHistory = await createStatusHistory.mutateAsync({
                vendorId,
                orderId: order.id,

              });

              console.log("Status history mainated -----:", statusHistory);
            }

            onClose();
          } catch (err) {
            console.error("❌ Error creating vendor orders/trips:", err);
          }
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


  // const deliveryCharge = 25;
  // const handlingCharge = 4;
  // const totalAmount = totalDiscounted + deliveryCharge + handlingCharge;







  return (
    <div
      className={`bg-accent fixed top-0 right-0 z-[9999] flex h-screen w-full max-w-sm transform flex-col transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
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
            Shipment of {cartItems?.length} item(s)
          </div>
        </div>

        <div className="max-h-[calc(100vh-360px)] space-y-4 overflow-y-auto bg-white p-4">
          {cartItems?.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty...</p>
          ) : (
            cartItems?.map((item) =>
              <CartItem
                key={item.id}
                item={item}
                addItem={(ite) => addItemToCart(ite, 1)}
              />)
          )}
        </div>

        {/* Bill Details */}
        {session?.user &&
          <>
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
                  <FiTag /> Platform fee
                </div>
                <div>₹{platformFee}</div>
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
              {/* <span>₹{savings}</span> */}
            </div>
          </>
        }
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
