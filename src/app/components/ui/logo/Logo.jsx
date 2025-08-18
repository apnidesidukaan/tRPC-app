// components/ui/Logo.jsx
import React from 'react';
import Image from 'next/image'; // If using Next.js

const Logo = () => {
    return (
        <div className="flex items-center space-x-2 ">
            {/* Logo Image */}
            <a href="/" className="w-18 h-18 relative rounded-xl overflow-hidden">
                <Image
                    src="/logo.png" // ⬅️ Place your logo image in `public/logo.png`
                    alt="ADD Logo"
                    layout="fill"
                    objectFit="contain"
                />
            </a>

            {/* Textual Branding */}
            <div>
                <h1 className="text-xl font-bold text-gray-900">
                    <a href="/">Apni Desi Dukaan</a>
                </h1>
                <p className="text-xs text-gray-500 hidden sm:block">Everything, Everywhere</p>
            </div>
        </div>
    );
};

export default Logo;
