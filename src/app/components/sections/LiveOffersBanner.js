'use client';
import { off } from 'process';
import React, { useEffect, useState } from 'react';

const LiveOffersBanner = ({ offers }) => {
    // console.log(offers);
    
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!offers.length) return;
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % offers.length);
        }, 10000);
        return () => clearInterval(interval);
    }, [offers.length]);

    if (!offers.length) return null;
    const offer = offers[current];

    return (
        <div className={`bg-gradient-to-r ${offer.color} text-white py-2 px-4`}>
            <div className="max-w-7xl mx-auto flex items-center justify-center space-x-2 text-sm font-medium transition-all duration-500">
                <span className="text-lg">{offer.icon}</span>
                <span>{offer.title}: {offer.subtitle}</span>
                <span className="opacity-75">• {offer.timeLeft}</span>
            </div>
        </div>
    );
};

export default LiveOffersBanner;