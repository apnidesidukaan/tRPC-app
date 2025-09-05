'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import MyOrders from '../components/account/MyOrder';
import { signOut } from 'next-auth/react';

const AccountPage = () => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('orders');

  const handleLogout = () => {
    signOut({
      callbackUrl: "/", // where to redirect after logout
    });
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'orders':
        return <MyOrders />
      case 'addresses':
        return <p>Manage your saved delivery addresses here.</p>;
      case 'gifts':
        return <p>Check your E-Gift Cards and balances.</p>;
      case 'faq':
        return <p>Frequently Asked Questions and Help topics.</p>;
      case 'privacy':
        return <p>Review and manage your account privacy settings.</p>;
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">My Account</h1>

        <div className="flex gap-8">
          {/* Sidebar Menu */}
          <div className="w-1/3 border-r border-gray-200 pr-4">
            <ul className="space-y-4 text-gray-700 text-sm font-medium">
              <li
                onClick={() => setActiveSection('orders')}
                className={`cursor-pointer hover:text-accent ${activeSection === 'orders' ? 'text-accent' : ''
                  }`}
              >
                My Orders
              </li>
              <li
                onClick={() => setActiveSection('addresses')}
                className={`cursor-pointer hover:text-accent ${activeSection === 'addresses' ? 'text-accent' : ''
                  }`}
              >
                Saved Addresses
              </li>
              <li
                onClick={() => setActiveSection('gifts')}
                className={`cursor-pointer hover:text-accent ${activeSection === 'gifts' ? 'text-accent' : ''
                  }`}
              >
                E-Gift Cards
              </li>
              <li
                onClick={() => setActiveSection('faq')}
                className={`cursor-pointer hover:text-accent ${activeSection === 'faq' ? 'text-accent' : ''
                  }`}
              >
                FAQ's
              </li>
              <li
                onClick={() => setActiveSection('privacy')}
                className={`cursor-pointer hover:text-accent ${activeSection === 'privacy' ? 'text-accent' : ''
                  }`}
              >
                Account Privacy
              </li>
              <li
                onClick={handleLogout}
                className="cursor-pointer hover:text-red-500 text-red-400"
              >
                Log Out
              </li>
            </ul>
          </div>

          {/* Section Details */}
          <div className="w-2/3">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 capitalize">{activeSection.replace('-', ' ')}</h2>
              <div className="text-gray-600 text-sm">{renderSection()}</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AccountPage;
