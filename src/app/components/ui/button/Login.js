'use client';

import React, { useState } from 'react';
import { User } from 'lucide-react';
// import { useCart } from '../../../hooks/useCart';
import LoginModal from '../modal/Login';
// import { useAuthToken } from '../../../hooks/useAuthToken';
import AccountModal from '../modal/Account';
import { useSession } from 'next-auth/react';

const LoginButton = () => {
    const { data: session } = useSession();
    const [openCart, setOpenCart] = useState(false);
    // console.log('token hai =======================', session?.user);
    // const token = null

    return (
        <>
            <button
                onClick={() => setOpenCart(true)}

                className="flex items-center bg-gradient-to-r from-[#800020]  to-[#b22222] text-[#ffffff] border border-[#ffdb96] font-bold ring-2 px-4 py-2 rounded-xl hover:shadow-lg transition-all"
            >
                <User className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">{session !== null ? 'Account' : 'Log In'}</span>

            </button >


            {session === null ? <LoginModal
                isOpen={openCart}
                onClose={() => setOpenCart(false)}
            /> : <AccountModal
                isOpen={openCart}
                onClose={() => setOpenCart(false)}
            />}
        </>
    );
};

export default LoginButton;
