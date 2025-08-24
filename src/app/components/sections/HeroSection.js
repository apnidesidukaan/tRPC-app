'use client';

import React from 'react';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import HeroModuleCard from '../../components/ui/card/HeroModuleCard';
import { api } from '~/trpc/react';

const HeroSection = () => {
  const { data: modules } = api.module.getAll.useQuery();

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-orange-300 via-amber-400 to-orange-400 text-white overflow-hidden px-4 sm:px-6 lg:px-8 py-16">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,...')] pointer-events-none"></div>
      <div className="absolute top-20 left-10 w-24 h-24 bg-red-500/20 rounded-full animate-pulse blur-xl"></div>
      <div className="absolute top-32 right-16 w-20 h-20 bg-yellow-400/30 rounded-full animate-bounce blur-lg"></div>

      {/* Hero Text */}
      <div className="relative max-w-7xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-red-600/20 to-orange-600/20 backdrop-blur-sm rounded-full px-6 py-2 border-2 border-orange-200/30 mx-auto">
          <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
          <span className="text-sm font-bold tracking-wide text-orange-100 font-hindi">
            🇮🇳 भारत का विश्वसनीय बाज़ार 🇮🇳
          </span>
          <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
        </div>

        <h1 className="text-4xl md:text-6xl font-black font-hindi drop-shadow-2xl">
          🪔 अपना बाज़ार 🪔
        </h1>
        <p className="text-sm md:text-lg text-orange-50 max-w-2xl mx-auto italic">
          🏪 घर-घर डिलीवरी • ताज़ा सामान • भरोसेमंद दुकानदार
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
          <button className="bg-gradient-to-r from-red-600 via-orange-600 to-red-600 text-white px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 shadow hover:scale-105 transition transform">
            <img src="/icons/android.png" alt="App" className="w-5 h-5 rounded-full" />
            ऐप डाउनलोड करें
            <ArrowRight className="w-4 h-4" />
          </button>
          <button className="bg-white/10 border border-orange-200/30 px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 backdrop-blur-sm hover:bg-white/20 transition">
            <Play className="w-4 h-4 text-yellow-300" />
            कैसे काम करता है
          </button>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 mt-12">
        {modules?.map((module, i) => (
          <HeroModuleCard key={module.id} index={i} module={module} />
        ))}
      </div>

      {/* Footer Text */}
      <p className="text-center text-orange-100 italic mt-8 text-sm">
        🙏 "आपका विश्वास, हमारी पहचान" 🙏
      </p>
    </section>
  );
};

export default HeroSection;
