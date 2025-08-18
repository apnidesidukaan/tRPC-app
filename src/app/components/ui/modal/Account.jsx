'use client';
import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
// import im from '../../../public/qr-app.png'
import { useRouter } from 'next/navigation';
const AccountModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);
  const router = useRouter();


  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="mt-10 fixed inset-0 z-50 flex items-start justify-end p-4 bg-transparent">
      <div
        ref={modalRef}
        className="w-72 bg-white border border-accent ring-2 shadow-xl rounded-xl overflow-hidden text-sm mt-12"
      >
        <div className="p-4 border-b border-gray-100 font-semibold text-gray-800">
          My Account
        </div>

        <ul
          onClick={() => router.push('/account-page')}
          className="flex flex-col gap-2 p-4 text-gray-700">
          <li className="cursor-pointer hover:text-accent transition">My Orders</li>
          <li className="cursor-pointer hover:text-accent transition">Saved Addresses</li>
          <li className="cursor-pointer hover:text-accent transition">E-Gift Cards</li>
          <li className="cursor-pointer hover:text-accent transition">FAQ's</li>
          <li className="cursor-pointer hover:text-accent transition">Account Privacy</li>
          <li
            className="cursor-pointer hover:text-red-500 transition"
            onClick={() => {
              localStorage.removeItem('token');
              onClose();
            }}
          >
            Log Out
          </li>
        </ul>

        <div className="border-t border-gray-100 p-4 flex gap-3 items-start bg-gray-50 rounded-b-xl">
          <div className="w-16 h-16 rounded-sm overflow-hidden border">
            {/* <Image src={im} alt="QR Code" width={64} height={64} /> */}
          </div>
          <div className="text-xs text-gray-600">
            <p className="font-semibold text-black mb-1">
              Simple way to get groceries in <span className="text-accent">minutes</span>
            </p>
            <p>Scan the QR code and download ADD app</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountModal;
