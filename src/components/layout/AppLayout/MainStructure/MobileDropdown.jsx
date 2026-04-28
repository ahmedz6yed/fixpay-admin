import {
  Bell,
  Briefcase,
  Grid,
  History,
  LayoutDashboard,
  LineChart,
  LogOut,
  Menu,
  Settings,
  Users,
} from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import femaleBeau from "../../../../assets/avatars/female-beau.jpg";
import Logo from "../../../ui/Logo";

export default function MobileDropdown() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = () => setOpen(false);

  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-md transition-all font-semibold ${
      isActive
        ? "bg-accent text-cream shadow-sm"
        : "text-subtle hover:bg-surface-raised hover:text-charcoal"
    }`;

  const iconSize = 20;

  return (
    <div className="relative p-4 bg-card border-b border-default flex items-center justify-between">
      <Menu
        className="h-6 w-6 text-subtle cursor-pointer hover:text-charcoal transition-colors"
        onClick={() => setOpen(!open)}
      />

      <div className="cursor-pointer" onClick={() => navigate("/")}>
        {/* We use Logo component similar to sidebar but can also fallback if needed */}
        <Logo />
      </div>

      <div className="flex gap-5 items-center ">
        <img
          className="w-9 h-9 rounded-full object-cover object-top cursor-pointer border border-default"
          src={femaleBeau}
          alt="avatar"
          onClick={() => {
            handleNavigation();
            navigate("/account");
          }}
        />
        <div className="h-9 w-9 rounded-full cursor-pointer hover:bg-surface-raised flex items-center justify-center transition-all duration-300">
          <Bell className="text-xl text-subtle hover:text-charcoal transition-colors" />
        </div>
      </div>

      {open && (
        <div className="absolute left-4 top-16 bg-card shadow-md border border-default p-4 w-64 z-50 rounded-lg">
          <ul className="flex flex-col gap-2 text-md">
            <li>
              <NavLink
                to="/"
                end
                className={navLinkClasses}
                onClick={handleNavigation}
              >
                <LayoutDashboard size={iconSize} />
                Overview
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/users"
                className={navLinkClasses}
                onClick={handleNavigation}
              >
                <Users size={iconSize} />
                Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/categories"
                className={navLinkClasses}
                onClick={handleNavigation}
              >
                <Grid size={iconSize} />
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tasks-offers"
                className={navLinkClasses}
                onClick={handleNavigation}
              >
                <Briefcase size={iconSize} />
                Tasks & Offers
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/analytics"
                className={navLinkClasses}
                onClick={handleNavigation}
              >
                <LineChart size={iconSize} />
                Analytics
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/modification-logs"
                className={navLinkClasses}
                onClick={handleNavigation}
              >
                <History size={iconSize} />
                Modification Logs
              </NavLink>
            </li>
          </ul>

          <hr className="h-[0.5px] bg-border w-[95%] mx-auto border-0 my-2" />

          <ul className="flex flex-col gap-2 text-md">
            <li>
              <NavLink
                to="/settings"
                className={navLinkClasses}
                onClick={handleNavigation}
              >
                <Settings size={iconSize} />
                Settings
              </NavLink>
            </li>
            <li>
              <button
                className="w-full flex items-center gap-2 px-3 py-2 rounded-md transition-all font-semibold text-subtle hover:bg-surface-raised hover:text-charcoal"
                onClick={() => {
                  handleNavigation();
                  // logout logic here
                }}
              >
                <LogOut size={iconSize} />
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
