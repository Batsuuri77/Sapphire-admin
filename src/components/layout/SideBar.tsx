"use client";

import { SidebarProps } from "@/types/sidebarProps";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Image from "next/image";
import { LOGO } from "@/utils/imagePaths";

const SideBar: React.FC<SidebarProps> = ({
  isOpen,
  isCollapsed,
  toggleSidebar,
  closeSidebar,
  toggleCollapse,
  navLinks: { links, icons },
  sideBarClassName,
}) => {
  const pathName = usePathname();

  return (
    <>
      {/* Overlay for mobile */}
      <div
        onClick={closeSidebar}
        className={`fixed inset-0 bg-black/50 z-30 transition-opacity duration-300 md:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      ></div>

      <aside
        className={`fixed top-0 left-0 z-40 h-screen bg-gray-100 text-black/50 dark:bg-secondary-dark dark:text-white border-r border-gray-200 transform transition-transform duration-300 ${sideBarClassName} 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:flex-shrink-0
          ${isCollapsed ? "md:w-20" : "md:w-64"}
        `}
      >
        <div className="flex flex-col h-full w-full px-4 py-6">
          {/* Collapse / Expand button (desktop) */}
          <div className="hidden md:flex items-center justify-between pl-6 mb-6">
            <Image src={LOGO.light} alt="Logo" width={100} height={100} />
            <button
              onClick={toggleCollapse}
              className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
            >
              {isCollapsed ? (
                <ChevronDoubleRightIcon className="w-5 h-5" />
              ) : (
                <ChevronDoubleLeftIcon className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Menu */}
          <nav>
            <ul className="flex flex-col gap-4">
              {links.map((link, index) => {
                const isActive = pathName.startsWith(link.href);
                const IconComponent = icons[index]?.atr;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-300
                      ${
                        isActive
                          ? "bg-blue-200 text-blue-700 font-semibold"
                          : "text-black/60 hover:bg-white"
                      }`}
                    >
                      <span className="w-6 h-6 flex items-center justify-center">
                        <IconComponent />
                      </span>
                      {!isCollapsed && <span>{link.name}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
