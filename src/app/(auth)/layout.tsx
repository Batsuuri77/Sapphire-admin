"use client";
import InitialHeader from "@/components/layout/InitialHeader";
import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        <InitialHeader />
        <div className="pt-20 px-4 md:px-8 max-w-2xl mx-auto">{children}</div>
      </body>
    </html>
  );
}
