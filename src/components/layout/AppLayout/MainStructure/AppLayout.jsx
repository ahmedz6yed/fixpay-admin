// layouts/AppLayout.jsx

import { Outlet } from "react-router-dom";
import MobileDropdown from "./MobileDropdown";
import Sidebar from "./Sidebar/SideBar";

export default function AppLayout() {
  return (
    <div className="h-screen w-full flex flex-col md:flex-row bg-page font-sans overflow-hidden">
      {/* Mobile Dropdown (Visible only on < md) */}
      <div className="md:hidden flex-none z-50">
        <MobileDropdown />
      </div>

      {/* Sidebar for tablet and up (Visible on >= md) */}
      <div className="hidden md:block flex-none h-full z-40">
        <Sidebar />
      </div>

      {/* Main Content Area (Independent scroll) */}
      <main className="flex-1 h-full min-w-0 overflow-y-auto overflow-x-hidden relative scroll-smooth">
        <div className="w-full mx-auto pb-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
