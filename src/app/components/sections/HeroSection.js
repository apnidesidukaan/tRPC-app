'use client';

import React, { useEffect, useState } from 'react';
import { Zap, ArrowRight, Play, Sparkles } from 'lucide-react';
import HeroModuleCard  from '../../components/ui/card/HeroModuleCard';
import { api } from '~/trpc/react';
import { useParams } from 'next/navigation';
// =================================================================
// Mock useParallax hook for demo
const useParallax = (offset) => {
    return React.useRef(null);
};

// =================================================================

const HeroSection = () => {
    // =================================================================
    const utils = api.useUtils();
    const params = useParams();

    const { data: modules, isLoading } = api.module.getAll.useQuery();

    // console.log("modules ========", modules);




    // const [modules, setModules] = useState([])




    const heroContentRef = useParallax(-0.1);
    // =================================================================
    return (
        <section className="relative min-h-screen bg-gradient-to-br from-orange-300 via-amber-400 to-orange-400 text-white overflow-hidden">
            {/* Traditional Indian Pattern Background */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2280%22%20height%3D%2280%22%20viewBox%3D%220%200%2080%2080%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%3E%3Cg%20fill%3D%22%238B4513%22%20fill-opacity%3D%220.3%22%3E%3Cpath%20d%3D%22M40%2040L60%2020L40%200L20%2020z%22/%3E%3Cpath%20d%3D%22M40%2040L60%2060L40%2080L20%2060z%22/%3E%3Cpath%20d%3D%22M40%2040L80%2040L60%2020z%22/%3E%3Cpath%20d%3D%22M40%2040L80%2040L60%2060z%22/%3E%3Cpath%20d%3D%22M40%2040L0%2040L20%2020z%22/%3E%3Cpath%20d%3D%22M40%2040L0%2040L20%2060z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] pointer-events-none"></div>
            </div>

            {/* Decorative Floating Elements */}
            <div className="absolute top-20 left-10 w-24 h-24 bg-red-500/20 rounded-full animate-pulse blur-xl"></div>
            <div className="absolute top-32 right-16 w-20 h-20 bg-yellow-400/30 rounded-full animate-bounce blur-lg"></div>
            <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-orange-500/25 rounded-full animate-pulse delay-1000 blur-lg"></div>
            <div className="absolute top-1/2 right-10 w-12 h-12 bg-red-400/20 rounded-full animate-bounce delay-500 blur-md"></div>

            {/* Traditional Border Decoration */}
            <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-r from-red-600 via-orange-500 via-yellow-400 via-green-500 to-red-600"></div>
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-red-600 via-orange-500 via-yellow-400 via-green-500 to-red-600"></div>

            <div ref={heroContentRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28">
                {/* Traditional Tagline */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-red-600/20 to-orange-600/20 backdrop-blur-sm rounded-full px-8 py-3 mb-8 border-2 border-orange-200/30">
                        <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
                        <span className="text-lg font-bold tracking-wide text-orange-100 font-hindi">
                            🇮🇳 भारत का सबसे विश्वसनीय बाज़ार 🇮🇳
                        </span>
                        <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
                    </div>

                    {/* Hero Title with Traditional Touch */}
                    <h1 className="text-4xl md:text-7xl font-black mb-6 leading-tight">
                        <span className="block text-white drop-shadow-2xl font-hindi text-5xl md:text-8xl mb-2">
                            🪔 अपना बाज़ार 🪔
                        </span>
                        <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent drop-shadow-lg text-3xl md:text-5xl">
                            Your Local Marketplace
                        </span>
                    </h1>

                    {/* Traditional Subtitle */}
                    <p className="text-xl md:text-2xl text-orange-50 max-w-3xl mx-auto mt-8 leading-relaxed font-medium">
                        <span className="text-yellow-200 font-bold">🏪 घर-घर डिलीवरी</span> •
                        <span className="text-orange-100 mx-2">ताज़ा सामान</span> •
                        <span className="text-yellow-200 font-bold">भरोसेमंद दुकानदार 🤝</span>
                        <br />
                        <span className="text-lg text-orange-100 mt-3 block italic">
                            "सबकुछ मिलेगा, घर बैठे मिलेगा"
                        </span>
                    </p>

                    {/* Traditional CTA Buttons */}
                    <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
                        <button className="bg-gradient-to-r from-red-600 via-orange-600 to-red-600 hover:from-red-700 hover:via-orange-700 hover:to-red-700 text-white px-10 py-5 rounded-full font-bold text-xl shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center gap-3 border-2 border-yellow-300/50">
                            <img
                                src="/icons/android.png"
                                alt="App Icon"
                                className="w-8 h-8 bg-white rounded-full p-1 shadow-md"
                                style={{ display: 'inline-block' }}
                            />
                            <span>ऐप डाउनलोड करें</span>
                            {/* <span>Download App</span> */}
                            <ArrowRight className="w-6 h-6" />
                        </button>
                        <button className="bg-gradient-to-r from-orange-100/20 to-yellow-100/20 hover:from-orange-100/30 hover:to-yellow-100/30 border-2 border-orange-200/40 text-white px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 flex items-center gap-3 backdrop-blur-sm">
                            <Play className="w-6 h-6 text-yellow-300" />
                            <span>कैसे काम करता है</span>
                        </button>
                    </div>
                </div>

                {/* Traditional Decorative Divider */}
                <div className="flex items-center justify-center my-12">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-1 bg-gradient-to-r from-transparent to-yellow-400 rounded-full"></div>
                        <div className="text-4xl">🪷</div>
                        <div className="w-16 h-1 bg-yellow-400 rounded-full"></div>
                        <div className="text-4xl">✨</div>
                        <div className="w-16 h-1 bg-yellow-400 rounded-full"></div>
                        <div className="text-4xl">🪷</div>
                        <div className="w-8 h-1 bg-gradient-to-l from-transparent to-yellow-400 rounded-full"></div>
                    </div>
                </div>

                {/* Category Cards with Traditional Styling */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
                    {modules?.map((module, index) => (
                        <HeroModuleCard index={index} key={module.id} module={module} />
                    ))}
                </div>

                {/* Traditional Footer Text */}
                <div className="text-center mt-16">
                    <p className="text-orange-100 text-lg italic">
                        🙏 "आपका विश्वास, हमारी पहचान" 🙏
                    </p>
                </div>
            </div>

            {/* Traditional Wave Bottom with Decorative Pattern */}
            <div className="absolute bottom-0 left-0 right-0">
                <div className="h-2 bg-gradient-to-r from-red-600 via-orange-500 via-yellow-400 via-green-500 to-red-600"></div>
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-20">
                    <defs>
                        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{ stopColor: '#f9fafb' }} />
                            <stop offset="50%" style={{ stopColor: '#fef3c7' }} />
                            <stop offset="100%" style={{ stopColor: '#f9fafb' }} />
                        </linearGradient>
                    </defs>
                    <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39C380.66,31.83,262.23,72,185.22,92.83L0,120H1200Z" fill="url(#waveGradient)" />
                </svg>
            </div>
        </section>
    );
};

export default HeroSection;