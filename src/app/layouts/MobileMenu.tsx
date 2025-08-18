// components/layout/MobileMenu.jsx
import React from 'react';
import { X, Home, ShoppingBag, User, Settings, Heart, Bell } from 'lucide-react';

const MobileMenu = ({ isOpen, onClose }) => {
    return (
        <div
            className={`fixed inset-0 bg-white z-50 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out lg:hidden`}
        >
            <div className="flex justify-end p-4">
                <button onClick={onClose} aria-label="Close menu">
                    <X className="w-8 h-8 text-gray-800" />
                </button>
            </div>
            <nav className="flex flex-col items-start p-8 space-y-6 text-lg font-semibold">
                <a href="#" className="flex items-center space-x-3 text-gray-800 hover:text-blue-600" onClick={onClose}>
                    <Home /> <span>Home</span>
                </a>
                <a href="#" className="flex items-center space-x-3 text-gray-800 hover:text-blue-600" onClick={onClose}>
                    <ShoppingBag /> <span>Shop</span>
                </a>
                <a href="#" className="flex items-center space-x-3 text-gray-800 hover:text-blue-600" onClick={onClose}>
                    <Heart /> <span>Wishlist</span>
                </a>
                <a href="#" className="flex items-center space-x-3 text-gray-800 hover:text-blue-600" onClick={onClose}>
                    <Bell /> <span>Notifications</span>
                </a>
                <a href="#" className="flex items-center space-x-3 text-gray-800 hover:text-blue-600" onClick={onClose}>
                    <User /> <span>My Account</span>
                </a>
                <a href="#" className="flex items-center space-x-3 text-gray-800 hover:text-blue-600" onClick={onClose}>
                    <Settings /> <span>Settings</span>
                </a>
            </nav>
        </div>
    );
};

export default MobileMenu;