"use client";
import InitialHeader from "@/components/layout/InitialHeader";
import React from "react";
import Image from "next/image";
import { BG } from "@/utils/imagePaths";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative min-h-screen bg-backgroundAuth text-foreground font-sans antialiased overflow-hidden">
        <div className="absolute inset-0 w-full h-full -z-10">
          <Image
            src={BG.bg}
            alt="Background"
            fill
            priority
            className="object-contain [object-position:center_90%] h-screen w-screen"
          />
        </div>
        <InitialHeader />
        <main className=" z-10 px-4 w-full max-w-5xl mx-auto">
          <div>{children}</div>
        </main>
      </body>
    </html>
  );
}
