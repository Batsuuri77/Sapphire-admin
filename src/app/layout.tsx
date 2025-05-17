import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { LOGO } from "../utils/imagePaths";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sapphire admin",
  description: "Admin panel for Sapphire",
  icons: {
    icon: LOGO.light,
    shortcut: LOGO.light,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} light`}>
      <body className={`${inter.variable} antialiased`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
