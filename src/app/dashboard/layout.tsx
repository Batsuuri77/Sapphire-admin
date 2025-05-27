"use client";
import Header from "@/components/layout/Header";
import SideBar from "@/components/layout/SideBar";
import React from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="relative min-h-screen bg-backgroundAuth text-foreground font-sans antialiased overflow-hidden">
        <Header />
        <SideBar />
        <main className=" z-10 px-4 w-full max-w-5xl mx-auto">
          <div>{children}</div>
        </main>
      </body>
    </html>
  );
}
