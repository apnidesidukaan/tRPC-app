"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const InventoryNav = () => {
  const pathname = usePathname();
  
  const navItems = [
    { name: "Dashboard", href: "/inventory" },
    { name: "Add New Item", href: "/inventory/new" },
  ];

  return (
    <nav className="mb-8">
      <div className="border-b border-gray-200">
        <div className="flex space-x-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${
                  isActive
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                } inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};