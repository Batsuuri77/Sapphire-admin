"use client";
import Header from "@/components/layout/Header";
import SideBar from "@/components/layout/SideBar";
import React, { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { sidebarNavLinks } from "@/constants/sideBarNavLinks";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleCollapse = () => setIsSidebarCollapsed((prev) => !prev);

  useEffect(() => {
    closeSidebar();
  }, [pathname]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-backgroundAuth text-foreground font-sans antialiased h-screen overflow-hidden">
        <div className="flex h-screen w-screen">
          {/* Sidebar */}
          <SideBar
            isOpen={isSidebarOpen}
            isCollapsed={isSidebarCollapsed}
            toggleSidebar={toggleSidebar}
            closeSidebar={closeSidebar}
            toggleCollapse={toggleCollapse}
            navLinks={sidebarNavLinks}
          />

          {/* Main area */}
          <div className="flex flex-col flex-1">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              {/* Mobile burger */}
              <button
                onClick={toggleSidebar}
                className="md:hidden text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
              >
                <Bars3Icon />
              </button>

              <Header />
            </header>

            {/* Main content */}
            <main className="flex-1 overflow-hidden h-full w-full p-4">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
