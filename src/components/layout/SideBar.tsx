import { SidebarProps } from "@/types/sidebarProps";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SideBar: React.FC<SidebarProps> = ({
  isOpen,
  toggleSidebar,
  closeSidebar,
  openSidebar,
  navLinks: { links, icons },
  sideBarClassName = "w-64 min-h-screen bg-gray-100 shadow-md px-6 py-8 rounded-2xl",
}) => {
  const pathName = usePathname();
  console.log("Current Path:", pathName);
  return (
    <nav className={sideBarClassName}>
      <ul className="flex flex-col gap-4">
        {links.map((link, index) => {
          //const isActive = pathname === link.href;
          const isActive = pathName.startsWith(link.href);

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
                <span className="w-5 h-5">{icons[index].atr}</span>
                <span>{link.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SideBar;
