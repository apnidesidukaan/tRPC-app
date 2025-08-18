'use client';

import React, { useState, useEffect } from 'react';
import { Bell, Heart, ShoppingCart, Menu, X, User, ShoppingCartIcon } from 'lucide-react';
import Logo from '../components/ui/logo/Logo';
import LocationSelector from '../components/ui/select/LocationSelector';
import SearchBar from '../components/ui/search/SearchBar';
import LiveOffersBanner from '../components/sections/LiveOffersBanner';
// import { liveOffers } from '../../data/mockData';
import CartButton from '../components/ui/button/Cart';
import LoginButton from '../components/ui/button/Login';

const Header = ({ showLiveOffer }) => {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [wishlistCount, setWishlistCount] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentOffer, setCurrentOffer] = useState();

    useEffect(() => {
        setCurrentOffer({
            title: 'Special Discount!',
            description: 'Get 20% off on your first order.',
        });
    }, []);

    const toggleWishlist = () => {
        setWishlistCount(prev => (prev === 0 ? 1 : 0));
    };

    return (
        <header className="bg-[#c08f50] rounded-lg mt-2 shadow shadow-[#5b280f] sticky top-0 z-50 w-full">
            {/* {liveOffers && showLiveOffer && <LiveOffersBanner offers={liveOffers} />} */}

            <div className="p-4  mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo & Location */}
                    <div className="flex items-center space-x-4">
                        <Logo />
                        <div className="hidden lg:flex ml-6">
                            <LocationSelector
                                selectedLocation={selectedLocation}
                                onLocationChange={setSelectedLocation}
                            />
                        </div>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="lg:hidden flex items-center space-x-2">
                        <button
                            className="p-2"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle mobile menu"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>

                    {/* Search Bar - Hidden on Mobile */}
                    <div className="hidden md:block w-full max-w-lg mx-4">
                        <SearchBar
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            isFocused={isSearchFocused}
                            setIsFocused={setIsSearchFocused}
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="hidden lg:flex items-center space-x-4">
                        {/* <ActionButton icon={Bell} badgeCount={3} aria-label="Notifications" />
                        <ActionButton
                            icon={Heart}
                            badgeCount={wishlistCount}
                            onClick={toggleWishlist}
                            aria-label="Wishlist"
                        />
                        <ActionButton icon={ShoppingCart} badgeCount={cartCount} aria-label="Cart" /> */}

                        <CartButton />
                        <LoginButton />
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden mt-4 space-y-3">
                        <LocationSelector
                            selectedLocation={selectedLocation}
                            onLocationChange={setSelectedLocation}
                        />
                        <SearchBar
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            isFocused={isSearchFocused}
                            setIsFocused={setIsSearchFocused}
                        />
                        <CartButton />
                        <LoginButton />

                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
