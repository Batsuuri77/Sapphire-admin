import { ComponentType, SVGProps } from "react";

export interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  toggleCollapse: () => void;
  navLinks: {
    links: { name: string; href: string }[];
    icons: { name: string; atr: ComponentType<SVGProps<SVGSVGElement>> }[];
  };
  sideBarClassName?: string;
}
