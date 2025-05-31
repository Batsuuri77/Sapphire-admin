"use client";
import Header from "@/components/layout/Header";
import SideBar from "@/components/layout/SideBar";
import React from "react";
import {
  ComputerDesktopIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  GiftIcon,
  TruckIcon,
  CreditCardIcon,
  ArchiveBoxIcon,
  UserGroupIcon,
  StarIcon,
  LightBulbIcon,
  ChartPieIcon,
  UserCircleIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/outline";
import { SIDEBAR_ROUTES } from "@/utils/routes";
const navLinks = {
  links: [
    { name: "Dashboard", href: SIDEBAR_ROUTES.DASHBOARD },
    { name: "Products", href: SIDEBAR_ROUTES.PRODUCTS },
    { name: "Orders", href: SIDEBAR_ROUTES.ORDERS },
    { name: "Offers", href: SIDEBAR_ROUTES.OFFERS },
    { name: "Transactions", href: SIDEBAR_ROUTES.TRANSACTIONS },
    { name: "Shipping", href: SIDEBAR_ROUTES.SHIPPING },
    { name: "Inventory", href: SIDEBAR_ROUTES.INVENTORY },
    { name: "Customers", href: SIDEBAR_ROUTES.CUSTOMERS },
    { name: "Ratings", href: SIDEBAR_ROUTES.RATINGS },
    { name: "Statistics", href: SIDEBAR_ROUTES.STATISTICS },
    { name: "Manage Account", href: SIDEBAR_ROUTES.MANAGE_ACCOUNT },
    { name: "Settings", href: SIDEBAR_ROUTES.SETTINGS },
    { name: "Help", href: SIDEBAR_ROUTES.HELP },
  ],
  icons: [
    {
      name: "DashboardIcon",
      atr: (
        <span>
          <ComputerDesktopIcon />
        </span>
      ),
    },
    {
      name: "ProductsIcon",
      atr: (
        <span>
          <ShoppingBagIcon />
        </span>
      ),
    },
    {
      name: "OrdersIcon",
      atr: (
        <span>
          <ShoppingCartIcon />
        </span>
      ),
    },
    {
      name: "OffersIcon",
      atr: (
        <span>
          <GiftIcon />
        </span>
      ),
    },
    {
      name: "TransactionsIcon",
      atr: (
        <span>
          <CreditCardIcon />
        </span>
      ),
    },
    {
      name: "ShippingIcon",
      atr: (
        <span>
          <TruckIcon />
        </span>
      ),
    },
    {
      name: "InventoryIcon",
      atr: (
        <span>
          <ArchiveBoxIcon />
        </span>
      ),
    },
    {
      name: "CustomersIcon",
      atr: (
        <span>
          <UserGroupIcon />
        </span>
      ),
    },

    {
      name: "RatingsIcon",
      atr: (
        <span>
          <StarIcon />
        </span>
      ),
    },
    {
      name: "StatisticsIcon",
      atr: (
        <span>
          <ChartPieIcon />
        </span>
      ),
    },
    {
      name: "ManageAccountIcon",
      atr: (
        <span>
          <UserCircleIcon />
        </span>
      ),
    },
    {
      name: "SettingsIcon",
      atr: (
        <span>
          <Cog8ToothIcon />
        </span>
      ),
    },
    {
      name: "HelpIcon",
      atr: (
        <span>
          <LightBulbIcon />
        </span>
      ),
    },
  ],
};
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="relative min-h-screen bg-backgroundAuth text-foreground font-sans antialiased overflow-hidden">
        <div className="grid h-full w-full grid-cols-[250px_1fr] grid-rows-[auto_1fr] gap-2 ">
          <aside className="row-span-2 bg-white text-black/50 dark:bg-secondary-dark dark:text-white border-r border-gray-200">
            <SideBar
              isOpen={true}
              toggleSidebar={function (): void {
                throw new Error("Function not implemented.");
              }}
              closeSidebar={function (): void {
                throw new Error("Function not implemented.");
              }}
              openSidebar={function (): void {
                throw new Error("Function not implemented.");
              }}
              navLinks={navLinks}
            />
          </aside>

          <header className="bg-white border-b border-gray-200 p-4 rounded-tl-2xl">
            <Header />
          </header>

          <main className="overflow-auto p-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
