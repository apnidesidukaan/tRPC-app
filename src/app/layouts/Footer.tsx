'use client';
import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const categoryIcons = {
        'Kirana / Grocery': '🛒',
        'Fruits & Vegetables': '🥕',
        'Dairy & Bakery': '🥛',
        'Medicines / Pharmacy': '💊',
        'Food & Tiffin Services': '🍱',
        'Meat & Fish': '🐟',
        'Stationery & Office Supplies': '📝',
        'Clothing & Tailoring': '👕',
        'Electronics & Appliances': '📱',
        'Home & Decor': '🏠',
        'Jewellery & Accessories': '💍',
        'Beauty & Personal Care': '💄'
    };

    return (
        <footer className="relative bg-gradient-to-br from-[#0a2647] via-[#0a2647] to-[#0a2647] text-white overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-40 h-40 bg-yellow-300 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-orange-400 rounded-full blur-2xl"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Brand Section */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-orange-300 to-yellow-500 bg-clip-text text-transparent mb-4">
                        Apni Desi Dukaan
                    </h2>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Your neighborhood marketplace bringing everything you need, right to your doorstep. 
                        <span className="text-yellow-400 font-semibold"> Everything, Everywhere.</span>
                    </p>
                    <div className="flex justify-center space-x-6 mt-6">
                        <a href="#" className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 p-3 rounded-full transition-all duration-300 hover:scale-110">
                            <svg className="w-5 h-5 text-blue-400 group-hover:text-blue-300" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                            </svg>
                        </a>
                        <a href="#" className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 p-3 rounded-full transition-all duration-300 hover:scale-110">
                            <svg className="w-5 h-5 text-blue-600 group-hover:text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                        </a>
                        <a href="#" className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 p-3 rounded-full transition-all duration-300 hover:scale-110">
                            <svg className="w-5 h-5 text-pink-500 group-hover:text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.119.112.219.085.338-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                            </svg>
                        </a>
                        <a href="#" className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 p-3 rounded-full transition-all duration-300 hover:scale-110">
                            <svg className="w-5 h-5 text-red-500 group-hover:text-red-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Categories Section */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">🛍️</span>
                            </div>
                            <h4 className="text-xl font-bold text-white">Shop by Category</h4>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                            {Object.entries(categoryIcons).map(([category, icon]) => (
                                <a 
                                    key={category}
                                    href="#" 
                                    className="group flex items-center space-x-3 text-gray-300 hover:text-yellow-400 transition-all duration-300 hover:translate-x-2"
                                >
                                    <span className="text-lg group-hover:scale-110 transition-transform">{icon}</span>
                                    <span className="text-sm font-medium">{category}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Company Section */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">🏢</span>
                            </div>
                            <h4 className="text-xl font-bold text-white">Company</h4>
                        </div>
                        <ul className="space-y-3">
                            {[
                                { name: 'About Us', href: 'about-us', badge: null },
                                { name: 'Careers', href: 'careers', badge: 'Hiring' },
                                { name: 'Blog', href: 'blogs', badge: null },
                                { name: 'Press', href: 'press', badge: null },
                                { name: 'Security', href: 'security', badge: null },
                                { name: 'Join Us', href: 'leads', badge: 'New' },
                                { name: 'Rent Bike', href: 'rent-bike', badge: null },
                                { name: 'Franchise Inquiry', href: 'franchise-inquiry', badge: 'Hot' }
                            ].map((item) => (
                                <li key={item.name}>
                                    <a 
                                        href={item.href} 
                                        className="group flex items-center justify-between text-gray-300 hover:text-blue-400 transition-all duration-300 hover:translate-x-2"
                                    >
                                        <span className="text-sm font-medium">{item.name}</span>
                                        {item.badge && (
                                            <span className={`px-2 py-1 text-xs rounded-full font-bold ${
                                                item.badge === 'Hiring' ? 'bg-green-500 text-white' :
                                                item.badge === 'New' ? 'bg-blue-500 text-white' :
                                                'bg-red-500 text-white'
                                            }`}>
                                                {item.badge}
                                            </span>
                                        )}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Section */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">🛟</span>
                            </div>
                            <h4 className="text-xl font-bold text-white">Support</h4>
                        </div>
                        <ul className="space-y-3">
                            {[
                                'Help Center', 'Privacy Policy', 'Contact Us', 'FAQ\'s', 
                                'ADD Partner Program', 'Terms and Conditions', 'Refund & Cancellation'
                            ].map((item, index) => {
                                const hrefs = ['help-center', 'privacy-policy', 'contact-us', 'faqs', 
                                             'partner-seller-franchise', 'terms-conditions', 'refund-policy'];
                                return (
                                    <li key={item}>
                                        <a 
                                            href={hrefs[index]} 
                                            className="text-gray-300 hover:text-green-400 transition-all duration-300 hover:translate-x-2 text-sm font-medium block"
                                        >
                                            {item}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Quick Links & Newsletter */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">⚡</span>
                            </div>
                            <h4 className="text-xl font-bold text-white">Quick Links</h4>
                        </div>
                        <ul className="space-y-3 mb-6">
                            {[
                                'Featured Vendors', 'Trending Products', 'Top Categories', 
                                'Live Offers', 'Media & Press'
                            ].map((item, index) => {
                                const hrefs = ['#', '#', '#', '#', 'press'];
                                return (
                                    <li key={item}>
                                        <a 
                                            href={hrefs[index]} 
                                            className="text-gray-300 hover:text-purple-400 transition-all duration-300 hover:translate-x-2 text-sm font-medium block"
                                        >
                                            {item}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>

                        {/* Newsletter Signup */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                            <h5 className="text-lg font-semibold mb-3 text-white">Stay Updated</h5>
                            <p className="text-gray-300 text-sm mb-4">Get the latest offers and updates delivered to your inbox.</p>
                            <div className="flex space-x-2">
                                <input 
                                    type="email" 
                                    placeholder="your@email.com" 
                                    className="flex-1 px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                                />
                                <button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 px-4 py-2 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 text-sm">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-white/20 mt-16 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-center md:text-left">
                            <p className="text-gray-400 text-sm">
                                &copy; {currentYear} <span className="font-semibold text-white">Apni Desi Dukaan</span>. All rights reserved.
                            </p>
                            <p className="text-gray-500 text-xs mt-1">
                                Crafted with ❤️ by{' '}
                                <a 
                                    href="https://www.appzenowebservices.com" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
                                >
                                    AppZeno Web Services
                                </a>
                            </p>
                        </div>
                        
                        <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-2 text-gray-400 text-xs">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                <span>All systems operational</span>
                            </div>
                            <div className="text-gray-500 text-xs">
                                Made in 🇮🇳 India
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;