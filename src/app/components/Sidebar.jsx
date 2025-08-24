"use client"
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { usePathname } from 'next/navigation';
import { MdBorderColor, MdManageAccounts } from "react-icons/md";
import { MdOutlineInventory } from "react-icons/md";

import { MdInventory } from "react-icons/md";
import { FaCashRegister, FaGear, FaTransgender } from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";
import { RiEBike2Fill } from "react-icons/ri";
import { GiShop } from "react-icons/gi";
import { FaPeoplePulling } from "react-icons/fa6";
import { GrUserManager } from "react-icons/gr";
import { GiVendingMachine } from "react-icons/gi";

import {
  HiOutlineLogout,
  HiOutlineCurrencyDollar, HiChevronDown
} from 'react-icons/hi';
import { TbLayoutSidebarRightExpand } from "react-icons/tb";

import Loader from './ui/status/Loader';
import ConfirmationDialogueBox from './ui/status/Confirmation';
import { FaBusinessTime, FaJediOrder } from 'react-icons/fa';
import { Boxes, CassetteTape, ChartBarStacked } from 'lucide-react';
import { SiMarketo } from 'react-icons/si';

const ErpSidebar = (props) => {
  const location = usePathname();

  const [openMenus, setOpenMenus] = useState({});

  const isActive = (path) => {
    return (
      location === path
    )
  };

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };
  const iconSize = 19
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <MdSpaceDashboard size={iconSize} /> },

    {
      name: 'Marketing Leads',
      icon: <FaPeoplePulling size={iconSize} />,
      path: '/leads',
      activePath: ['/leads'],

    },
    {
      name: 'Area Manager',
      icon: <GrUserManager size={iconSize} />,
      path: '/area-manager',

    },
    {
      name: 'Vendors',
      icon: <GiShop size={iconSize} />,
      path: '/vendors',

    },


    {
      name: 'Business',
      icon: <FaBusinessTime size={iconSize} />,
      path: '/business',
      activePath: ['/business-details', '/business'],


    },

    {
      name: 'Inventory',
      icon: <Boxes size={iconSize} />,
      path: '/inventory',

    },


    {
      name: 'Modules Category',
      icon: <ChartBarStacked size={iconSize} />,
      path: '/modules',

    },

    {
      name: 'Marketing',
      icon: <SiMarketo size={iconSize} />,
      path: '/marketing',
      activePath: ['/business-details', '/business'],


    },


    {
      name: 'Stores',
      icon: <GiShop size={iconSize} />,
      path: '/business-details/6831980b928f3ba57be8b259',
      activePath: ['/stores',],


    },

    {
      name: 'Delivery Agents',
      icon: <RiEBike2Fill size={iconSize} />,
      path: '/delivery-agents',
      // submenu: [
      //   { name: 'View', path: '/view-products', icon: <HiOutlineIdentification size={iconSize} /> },
      //   { name: 'Add', path: '/add-products', icon: <HiOutlineClipboardCheck size={iconSize} /> },
      // ],
    },
    // {
    //   name: 'Finance',
    //   icon: <HiOutlineCurrencyDollar size={iconSize} />,
    //   path: '/finance',

    // },
    // {
    //   name: 'Reports',
    //   icon: <HiOutlineDatabase size={iconSize} />,
    //   path: '/finance',

    // },
    // {
    //   name: 'Settings',
    //   icon: <HiOutlineCog size={iconSize} />,
    //   path: '/finance',

    // },


  ];



  useEffect(() => {
    const activeMenus = {};
    menuItems.forEach((item) => {
      if (item.submenu) {
        const isSubmenuActive = item.submenu.some((subItem) => isActive(subItem.path));
        if (isSubmenuActive) activeMenus[item.name] = true;
      }
    });
    setOpenMenus(activeMenus);
  }, [location.pathname]);

  return (
    <div
      className={`text-[#ffff] w-64 sm:w-74 h-full bg-background p-4 flex flex-col justify-between
      transition-transform duration-300 transform
      fixed top-0 left-0 z-50
      lg:relative lg:translate-x-0
      ${props.isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}
    >
      <button
        className="p-2 rounded-full bg-accent text-primary-text-inverse hover:bg-accent/80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50 w-10 h-10 mb-4"
        onClick={() => {
          props.setIsSidebarOpen(!props.isSidebarOpen);
        }}
        aria-label="Toggle Sidebar"
      >
        {props.isSidebarOpen ? <TbLayoutSidebarRightExpand className="w-6 h-6" /> : null}
      </button>

      {/* Logo and Name Section (made smaller) */}
      <div className="mb-4 p-1 rounded-lg bg-background-section shadow-sm border border-border-color">
        <div className="flex items-center gap-2 mb-1">
          <img
            src="/logo.png"
            alt="Badi Dukaan Logo"
            className="w-10 h-10 rounded-full border-2 border-accent shadow-sm"
          />
          <p style={{
            fontSize: 'var(--text-lg)', color: 'var(--color-primary-text)',
          }}
            className="font-bold text-primary-text ">
            Badi Eats
          </p>
        </div>

        <p style={{ fontSize: 'var(--text-xs)' }} className="text-center text-secondary-text mt-2 ">
          From Local Hustle to Global Muscle
        </p>
      </div>


      {/* Menu Items */}
      <ul className="scrollbar flex-grow overflow-y-auto">
        {menuItems.map((item, index) => (
          <li key={index} className="mt-2 text-sm ">
            {item.submenu ? (
              <button
                onClick={() => toggleMenu(item.name)}
                style={{ width: '95%' }}
                className="text-primary-text flex items-center p-3 rounded-lg justify-between hover:bg-accent hover:text-primary-text-inverse transition"
              >
                <span className="flex items-center font-semibold ">
                  {item.icon} <span className="ml-3 ">{item.name}</span>
                </span>
                <HiChevronDown
                  className={`transition-transform duration-200 ${openMenus[item.name] ? 'rotate-180' : ''
                    }`}
                />
              </button>
            ) : (
              <a
                href={item.path}
                className={`mr-5 text-primary-text font-semibold flex items-center p-3 rounded-lg cursor-pointer transition ${isActive(item.path) ? 'bg-accent text-primary-text-inverse font-semibold' : 'hover:bg-accent hover:text-primary-text-inverse'
                  }`}
              >
                {item.icon} <span className="ml-3">{item.name}</span>
              </a>
            )}

            {item.submenu && openMenus[item.name] && (
              <ul className=" shadow-md p-4 rounded-xl ml-6 mt-2 mr-5 space-y-1 border-l-2 border-accent pl-4">
                {item.submenu.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <a
                      href={subItem.path}
                      className={`text-primary-text flex items-center gap-3 p-2 rounded-lg transition ${isActive(subItem.path) ? 'bg-accent text-primary-text-inverse font-semibold' : 'hover:bg-accent hover:text-primary-text-inverse'
                        }`}
                    >
                      {subItem.icon}
                      <span>{subItem.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {/* User Info Section (made subtle and small) */}
      <div className="p-2 mt-2 border-t border-border-color shadow-sm rounded-md bg-background-section">
        {/* User Info */}
        <div className="flex items-center mb-1">
          <img
            src="https://ui-avatars.com/api/?name=Nischal+Gupta"
            alt="User Avatar"
            className="rounded-full w-6 h-6 mr-1"
          />
          <div>
            <p className="text-xs text-primary-text font-semibold">Nischal Gupta</p>
            <p className="text-[9px] text-secondary-text">Super Admin</p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          className="flex items-center justify-center gap-1 w-full p-1 text-xs rounded-md bg-error text-primary-text-inverse border border-transparent transition cursor-pointer"
          onClick={() => {
            props?.setLogginOut(true);
          }}
        >
          <HiOutlineLogout className="w-3 h-3" />
          {props?.logginOut ? <Loader /> : "Logout"}
        </button>
      </div>

    </div >
  );
};

export default ErpSidebar;