'use client';

import React, { useState } from 'react';
import { ShoppingCartIcon } from 'lucide-react';
// import { useCart } from '../../../hooks/useCart';
import CartDrawer from '../drawer/AddToCart';

const CartButton = () => {
    // const { cart } = useCart();
    const [openCart, setOpenCart] = useState(false);

    // Count total items
    // const totalItems = cart?.reduce((acc, item) => acc + (item?.quantity || 1), 0);
    // const totalItems = cart?.items?.length > 0 ? cart?.items?.length :cart?.length
    // console.log('totalItems ------------------', cart.length);
    
    return (
        <>
            <button
                onClick={() => setOpenCart(true)}

                className="relative flex items-center bg-gradient-to-r from-[#83bf22] to-[#83bf22] text-white border border-[#ffdb96] font-bold ring-2 px-4 py-2 rounded-xl hover:shadow-lg transition-all">
                <ShoppingCartIcon className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Cart</span>

                {/* Badge */}
                {/* {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full font-semibold">
                        {totalItems}
                    </span>
                )} */}
            </button>

            <CartDrawer
                isOpen={openCart}
                // cartItems={cart}
                onClose={() => setOpenCart(false)}
            />
        </>
    );
};

export default CartButton;
