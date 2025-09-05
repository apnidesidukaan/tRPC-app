import React, { useEffect, useState } from 'react';
import { HiOutlineBell } from 'react-icons/hi';
import { TbLayoutSidebarRightCollapse } from "react-icons/tb";
import { FaSearch } from "react-icons/fa";
import ThemeSelector from './ui/drawer/Drawer';
import NotificationPanel from './NotificationPanel';
// import { useNotification } from '../controllers/notification';

//============================================================
const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  // const { notification, isLoading, notificationCount } = useNotification();
  const [notifications_, setNotifications] = useState([]);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // useEffect(() => {
  //   if (notification) {
  //     setNotifications(notification);
  //   }
  // }, [notification]);

  // useEffect(() => {
  //   socket.on("connect", () => {
  //     console.log("Socket connected:", socket.id);
  //   });

  //   socket.on("notification", (data) => {
  //     console.log("Notification received:", data);
  //     setNotifications(prev => [...prev, data]);
  //   });

  //   return () => {
  //     socket.off("notification");
  //   };
  // }, []);

  return (
    <nav className="bg-background text-white border-accent">
      <div className="flex flex-wrap items-center justify-between mx-auto p-4">

        {!isSidebarOpen && (
          <button
            className="p-2 rounded-full bg-accent text-primary-text-inverse hover:bg-accent/80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50 w-10 h-10 mb-4"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="Toggle Sidebar"
          >
            <TbLayoutSidebarRightCollapse className="w-6 h-6" />
          </button>
        )}

        {/* Logo */}
        {!isSidebarOpen && (
          <a href="/" className="flex items-center space-x-3">
            <img
              src="logo.png"
              className="w-12 h-12 rounded-full"
              alt="Logo"
            />
            <p
              className="font-bold text-primary-text text-2xl"
              style={{ color: 'var(--color-primary-text)' }}
            >
              ADD
            </p>
          </a>
        )}

        {/* Search Bar */}
        <div className="hidden md:flex relative items-center w-full max-w-md">
          <FaSearch className="absolute left-4 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-3 pl-12 border rounded-2xl bg-white text-black placeholder-gray-500 shadow-sm focus:ring-4 focus:ring-secondary focus:outline-none transition-all duration-300 w-full"
          />
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-6">
          <ThemeSelector />

          {/* Notification Bell */}
          <button
            className="relative focus:outline-none"
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            aria-label="Notifications"
          >
            <HiOutlineBell
              size={24}
              className=" w-10 h-10 p-2 rounded-full shadow-md bg-accent text-primary-text-inverse 
                hover:bg-accent/80 transition-all duration-300 
                focus:ring-2 focus:ring-offset-2 focus:ring-accent/50"
            />
            {notifications_?.length > 0 && (
              <span className="border absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full shadow">
                {/* {notifications_?.length > 99 ? "99+" : notifications_?.length} */}
                {0}
              </span>
            )}
          </button>

          <NotificationPanel
            isOpen={isNotifOpen}
            onClose={() => setIsNotifOpen(false)}
            notifications={notifications_}
          />

          {/* Profile Image */}
          <button type="button" className="focus:outline-none">
            <img
              className="w-10 h-10 rounded-full"
              src="https://ui-avatars.com/api/?name=Elon+Musk"
              alt="User"
            />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
