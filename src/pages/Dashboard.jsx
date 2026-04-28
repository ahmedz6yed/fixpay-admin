import { Outlet } from "react-router-dom";
import MobileDropdown from "../components/layout/AppLayout/MainStructure/MobileDropdown";
import Sidebar from "../components/layout/AppLayout/MainStructure/Sidebar/SideBar";
export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Mobile Dropdown */}
      <div className="md:hidden">
        <MobileDropdown />
      </div>

      <div className="flex flex-1">
        {/* Sidebar for tablet and up */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Main Outlet */}
        <main className="flex-1 bg-white ">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
