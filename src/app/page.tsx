


import DiscoverySection from './components/sections/DiscoverySection';
import HeroSection from './components/sections/HeroSection';
import TopBrandsSection from './components/sections/TopBrandsSection';
import TopCategoriesSection from './components/sections/TopCategoriesSection';
import TrendingProductsSection from './components/sections/TrendingProductsSection';
import Footer from './layouts/Footer';
import Header from './layouts/Header';
import MobileMenu from './layouts/MobileMenu';

export default async function HomePage() {


  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Header

      />

      <MobileMenu

      />

      <main>

        <HeroSection />
        
        <DiscoverySection/>
        {/* <TrendingProductsSection  /> */}

      </main>

      <Footer />
    </div>
  );
};

