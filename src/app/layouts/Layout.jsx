'use client'
import { useEffect, useState } from 'react';

import ErpSidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import ConfirmationDialogueBox from '../components/ui/status/Confirmation';

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  useEffect(() => {
    // Close sidebar by default on screens smaller than 768px
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
  
    handleResize(); // Run on mount
    window.addEventListener('resize', handleResize);
  
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  // const [logginOut, setLogginOut] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => {
    // Logout logic
        if (typeof window !== "undefined") {
    
    localStorage.removeItem('token');
        }
    window.location.href = '/';
  };
  return (
    <div className="flex w-full h-screen overflow-hidden">

      {showConfirm ? <ConfirmationDialogueBox
        title=' Confirm Logout ?'

        description='This action will log you out of the system. Are you sure you want to proceed?'
        onConfirm={handleLogout}
        onCancel={() => setShowConfirm(false)}
      /> : null}



      {/* Sidebar */}
      <div className={`bg-primary text-white transition-all duration-300`}>
        {/* <button
          className="p-4 focus:outline-none"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X /> : null}
        </button> */}
        {isSidebarOpen && (
          // <nav className="p-4 space-y-4">
          //   <a href="#" className="block">Dashboard</a>
          //   <a href="#" className="block">Settings</a>
          //   <a href="#" className="block">Logout</a>
          // </nav>
          <ErpSidebar
            setLogginOut={setShowConfirm}
            logginOut={showConfirm}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen} />
        )}
      </div>

      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        {/* <header className="bg-white shadow p-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </header> */}
        <Navbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        {/* Main Content Area */}
        <main className="flex-1  bg-muted overflow-y-auto">
          {/* <ContentArea /> */}

          {children}
          {/* <p>Welcome to your dashboard!</p> */}
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  );
}