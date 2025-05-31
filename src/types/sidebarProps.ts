export interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void; // Function to toggle sidebar visibility
  closeSidebar: () => void; // Function to close the sidebar
  openSidebar: () => void; // Function to open the sidebar
  navLinks: {
    links: { name: string; href: string }[];
    icons: { name: string; atr: React.JSX.Element }[];
  };
  sideBarClassName?: string; // Optional class name for the sidebar
}
