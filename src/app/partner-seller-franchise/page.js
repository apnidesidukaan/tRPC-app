"use client";

import React, { useState, useEffect } from 'react';
import { Store, Users, Truck, Building2, ArrowRight, CheckCircle, Phone, Mail, Clock, Star, Zap, Shield, TrendingUp, Users2Icon, Key, StepForward, Footprints } from 'lucide-react';
// import Header from '../../components/layout/Header';
// import Footer from '../../components/layout/Footer';
import { useRouter } from 'next/navigation';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';

const ApniDesiDukaanPartner = () => {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState('vendor');
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    // Set meta tags dynamically
    document.title = "Partner with Apni Desi Dukaan - Sell, Franchise & Grow Your Local Business";

    // Create meta tags
    const metaTags = [
      { name: 'description', content: 'Join Apni Desi Dukaan as vendor, partner or franchise owner. Digitize your local business, earn smart with hyperlocal e-commerce platform. Free registration, technology support & revenue sharing.' },
      { name: 'keywords', content: 'Apni Desi Dukaan, local business partner, franchise opportunity, vendor registration, hyperlocal ecommerce, digital storefront, local delivery partner, business opportunity India, kirana store online, small business digitization' },
      { property: 'og:title', content: 'Partner with Apni Desi Dukaan - Empower Local, Earn Smart' },
      { property: 'og:description', content: 'Transform your local business with digital technology. Join as vendor, partner or franchise owner in India\'s fastest growing hyperlocal platform.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Apni Desi Dukaan Partnership - Local Business Revolution' },
      { name: 'twitter:description', content: 'Digitize your shop, expand services, or become a franchise partner. Join the desi digital revolution today!' }
    ];

    metaTags.forEach(tag => {
      const element = document.createElement('meta');
      Object.keys(tag).forEach(key => {
        element.setAttribute(key, tag[key]);
      });
      document.head.appendChild(element);
    });

    // Cleanup function
    return () => {
      metaTags.forEach(tag => {
        const elements = document.querySelectorAll(`meta[${Object.keys(tag)[0]}="${Object.values(tag)[0]}"]`);
        elements.forEach(el => el.remove());
      });
    };
  }, []);

  const partnerModels = [
    {
      id: 'city',
      title: 'City/Area Partner',
      description: 'Launch and manage Apni Desi Dukaan in your region with vendor onboarding and operational support.',
      icon: Building2,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'tech',
      title: 'Technology Partner',
      description: 'Build modules, apps, or integrate services like POS, analytics, and chatbots for our ecosystem.',
      icon: Zap,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'logistics',
      title: 'Logistics Partner',
      description: 'Run local delivery services using your fleet and earn per transaction commission.',
      icon: Truck,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'aggregator',
      title: 'Service Aggregator',
      description: 'Onboard 50+ vendors and earn commissions for every successful registration and transaction.',
      icon: Users,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const benefits = [
    'Free vendor registration',
    'Digital storefront with custom branding',
    'Inventory & order management dashboard',
    'Real-time order notifications',
    'Online payments and delivery support',
    'Access to hyperlocal customers',
    'Daily sales insights and growth tools'
  ];

  const earningsData = [
    { role: '🛍️ Vendor', earnings: 'Profits from product/services sold online' },
    { role: '🚚 Delivery Partner', earnings: 'Per delivery commission + incentives' },
    { role: '🤝 Partner', earnings: 'Commission on vendor sales, onboarding, services' },
    { role: '🏢 Franchise Owner', earnings: 'Multi-stream revenue + bonus on milestones' }
  ];

  const requirements = [
    'PAN card & GST (for sellers/partners)',
    'Address and ID proof',
    'Smartphone or computer access',
    'Internet connection and basic digital literacy',
    'Franchise model may require refundable deposit and MoU'
  ];

  const whyChooseUs = [
    { icon: Star, text: 'Hyperlocal focus — built for Bharat' },
    { icon: CheckCircle, text: 'Simple onboarding — no tech skills needed' },
    { icon: Shield, text: 'Full visibility & control over business' },
    { icon: Users, text: 'Trusted by vendors, customers, and agents' },
    { icon: TrendingUp, text: 'Low-cost, high-return ecosystem' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      <Header />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-pulse">
              🤝 Partner with <span className="text-yellow-300">Apni Desi Dukaan</span>
            </h1>
            <p className="text-xl md:text-2xl mb-3 opacity-90">
              Join the Desi Digital Revolution. Empower Local. Earn Smart.
            </p>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              <a href="/leads" className="cursor-pointer ml-2 px-2 py-1 text-lg font-semibold rounded-full bg-accent text-primary-text-inverse animate-pulse hover:underline transition">Join Us !</a>
            </p>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8">
              <p className="text-lg">
                Apni Desi Dukaan isn't just a platform — it's a growing ecosystem that connects India's local economy with modern technology.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setActiveTab('vendor')}
                className="bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-300 transform hover:scale-105 transition-all duration-300"
              >
                Become a Vendor
              </button>
              <button
                onClick={() => setActiveTab('partner')}
                className="bg-white/20 backdrop-blur-md px-8 py-3 rounded-full font-semibold hover:bg-white/30 transition-all duration-300"
              >
                Partner with Us
              </button>
              <button
                onClick={() => setActiveTab('franchise')}
                className="bg-green-500 px-8 py-3 rounded-full font-semibold hover:bg-green-400 transition-all duration-300"
              >
                Franchise Program
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center p-8">
            {[
              { id: 'vendor', icon: () => <Store className='text-accent' />, label: 'Sell on Platform' },
              { id: 'partner', icon: () => <Users2Icon className='text-accent' />, label: ' Partner Models' },
              { id: 'franchise', icon: () => <Building2 className='text-accent' />, label: 'Franchise Program' },
              { id: 'earnings', icon: () => <TrendingUp className='text-accent' />, label: 'Earnings' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all duration-300 ${activeTab === tab.id
                  ? 'text-orange-600 border-b-3 border-orange-600 bg-orange-50'
                  : 'text-gray-600 hover:text-orange-500 hover:bg-gray-50'
                  }`}
              >
                <tab.icon />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Vendor Section */}
      {activeTab === 'vendor' && (
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-gray-800 mb-4">
                Sell on Apni Desi Dukaan
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Become a Local Vendor, Go Digital. Take your shop online in just a few steps and reach thousands of customers in your area.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                  <Key className="text-accent rounded-full" size={40} />
                  Benefits
                </h3>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                      <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                  <Footprints className="text-white rounded-full" size={40} />
                  How to start
                </h3>                <div className="space-y-4">
                  {[
                    'Sign up as a vendor',
                    'Submit basic business documents',
                    'Set up your store (we can assist)',
                    'Start receiving orders!'
                  ].map((step, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => {
                    router.push('/add-vendor');

                  }}
                  className="cursor-pointer mt-6 bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-all duration-300 flex items-center gap-2">
                  Register as Vendor <ArrowRight size={16} />
                </button>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-4">Perfect for:</p>
              <div className="flex flex-wrap justify-center gap-3">
                {['Kirana Store', 'Tailor', 'Pharmacy', 'Salon', 'Plumber', 'Real Estate Agent'].map(business => (
                  <span key={business} className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full font-medium">
                    {business}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Partner Section */}
      {activeTab === 'partner' && (
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-gray-800 mb-4">
                Partner with Us
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We are expanding across cities, towns, and rural areas — and we need passionate people and companies to partner with us.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {partnerModels.map((model) => (
                <div key={model.id} className="group cursor-pointer">
                  <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                    <div className={`w-16 h-16 bg-gradient-to-r ${model.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <model.icon className="text-white" size={34} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{model.title}</h3>
                    <p className="text-gray-600">{model.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full font-semibold hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto">
                Apply for Partnership <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Franchise Section */}
      {activeTab === 'franchise' && (
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                🏪 Franchise Opportunities
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Become a Franchise Owner – Build a Local Business Network with full support, training, and platform access.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">🎯 Franchise Includes:</h3>
                <div className="space-y-4">
                  {[
                    'Exclusive operational rights in your territory',
                    'White-labeled backend admin system',
                    'Vendor onboarding rights and revenue share',
                    'Field training and digital marketing support',
                    'Business dashboard, performance metrics & CRM',
                    'Monthly franchise income + performance bonuses'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={16} />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-blue-600 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">💼 Ideal for:</h3>
                <div className="space-y-4">
                  {[
                    'Local entrepreneurs',
                    'Small agencies and IT companies',
                    'Professionals looking to diversify income',
                    'Startups aiming to serve Bharat\'s next billion'
                  ].map((ideal, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Star className="text-yellow-400 flex-shrink-0" size={16} />
                      <span>{ideal}</span>
                    </div>
                  ))}
                </div>
                <button className="mt-6 bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-all duration-300 flex items-center gap-2">
                  Franchise Inquiry <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Earnings Section */}
      {activeTab === 'earnings' && (
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                💰 Revenue & Earning Potential
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {earningsData.map((item, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="text-2xl mb-3">{item.role.split(' ')[0]}</div>
                  <h3 className="font-bold text-gray-800 mb-2">{item.role.substring(2)}</h3>
                  <p className="text-gray-600 text-sm">{item.earnings}</p>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">📋 Basic Requirements</h3>
              <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {requirements.map((req, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white/20 rounded-lg p-3">
                    <CheckCircle size={16} />
                    <span className="text-sm">{req}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Training & Support Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-gray-800 mb-4">
              Training & Support
            </h2>
            <p className="text-xl text-gray-600">We offer full onboarding support for all roles</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'Digital training sessions',
              'WhatsApp support groups',
              'Vendor kits and marketing material',
              'Personal success manager (for franchises)'
            ].map((support, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md text-center">
                <CheckCircle className="text-green-500 mx-auto mb-3" size={24} />
                <p className="font-medium text-gray-700">{support}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              📣 Why Choose Apni Desi Dukaan?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="text-white" size={24} />
                </div>
                <p className="text-gray-700 font-medium">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8">🚀 Ready to Join?</h2>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">📌 Vendors & Sellers</h3>
              <button className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-all duration-300">
                Register as Vendor
              </button>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">📌 Partners & Agents</h3>
              <button className="bg-green-500 px-6 py-3 rounded-full font-semibold hover:bg-green-400 transition-all duration-300">
                Apply for Partnership
              </button>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">📌 Franchise Program</h3>
              <button className="bg-blue-500 px-6 py-3 rounded-full font-semibold hover:bg-blue-400 transition-all duration-300">
                Franchise Inquiry
              </button>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-6">📞 Need Help or Consultation?</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <Mail size={20} />
                <span>contact@appzenowebservices.com</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Phone size={20} />
                <span>[Insert Helpline Number]</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Clock size={20} />
                <span>Mon–Sat, 10 AM – 7 PM</span>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <p className="text-2xl font-bold opacity-90">
              Let's build the future of local India, together.
            </p>
          </div>
        </div>
      </section>
      <Footer />
      {/* Footer spacing */}
    </div>
  );
};

export default ApniDesiDukaanPartner;