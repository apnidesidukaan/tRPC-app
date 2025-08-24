// app/explore/[moduleSlug]/ExploreModuleHero.js
'use client';
import React from 'react';
import { Users, Grid } from 'lucide-react';

const ExploreModuleHero = ({ moduleData }) => {
    return (
        <div className="relative bg-gradient-to-r from-orange-600 to-red-600 text-white">
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-40">
                    {/* If you have a video, uncomment and ensure path is correct.
                        For a simpler background image:
                    <div
                        className="w-full h-full object-cover"
                        style={{
                            backgroundImage: `url(${moduleData.banner})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    /> */}
                </div>
            </div>
            <div className="relative max-w-7xl mx-auto px-4 py-16">
                <div className="text-center">
                    <div className="text-6xl mb-4">{moduleData?.icon}</div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{moduleData?.name}</h1>
                    <p className="text-xl mb-6 max-w-2xl mx-auto">{moduleData?.description}</p>
                    <div className="flex justify-center space-x-8 text-lg">
                        <div className="flex items-center space-x-2">
                            <Users className="w-5 h-5" />
                            <span>{moduleData?.totalVendors} Vendors</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Grid className="w-5 h-5" />
                            <span>{moduleData?.totalProducts} Products</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExploreModuleHero;