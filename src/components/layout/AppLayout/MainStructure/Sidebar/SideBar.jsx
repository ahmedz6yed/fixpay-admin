import {
  Briefcase,
  Grid,
  History,
  LayoutDashboard,
  LineChart,
  LogOut,
  Settings,
  Users,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import femaleBeau from "../../../../../assets/avatars/female-beau.jpg";
import Logo from "../../../../ui/Logo";

const listStyling =
  "flex items-center gap-2 cursor-pointer px-3 py-2 rounded-md transition-all active:scale-95 duration-200 font-semibold";

export default function Sidebar() {
  // 1. Lazy initialization using matchMedia to prevent layout shifts
  const [isExpanded, setIsExpanded] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(min-width: 1024px)").matches;
    }
    return true;
  });

  const navigate = useNavigate();

  // 2. High-performance observer: Only triggers exactly when breakpoint is crossed
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    
    const handleMediaQueryChange = (e) => {
      setIsExpanded(e.matches);
    };

    // Modern API
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };
  const navLinkClasses = ({ isActive }) =>
    `${listStyling} ${
      isActive
        ? "bg-accent text-cream shadow-sm"
        : "text-subtle hover:bg-surface-raised hover:text-charcoal"
    }`;

  const iconSize = 20;

  return (
    <aside
      className={`bg-card border-r border-default p-4 min-h-screen flex flex-col justify-between ${
        isExpanded ? "w-60" : "w-20"
      } transition-all duration-300`}
    >
      <div>
        <div className="flex flex-col h-auto justify-between">
          {/* Top section */}
          <div
            className={`flex ${
              isExpanded ? "justify-between" : "justify-center"
            } items-center mb-4`}
          >
            {isExpanded ? (
              <Link to="/">
                <Logo />
              </Link>
            ) : (
              "" // spacer when collapsed
            )}
            <div
              onClick={toggleSidebar}
              className="cursor-pointer hover:bg-surface-raised rounded-md w-8 h-8 flex items-center justify-center backdrop-blur-[5px] active:scale-95 transition-all"
            >
              <LogOut
                className="text-subtle hover:text-charcoal transition-colors"
                size={20}
              />
            </div>
          </div>

          {/* Navigation links */}
          <div className="flex flex-col gap-4 mt-2">
            <ul className="flex flex-col gap-2 text-md">
              <li>
                <NavLink to="/" end className={navLinkClasses}>
                  <LayoutDashboard size={iconSize} />
                  {isExpanded && "Overview"}
                </NavLink>
              </li>
              <li>
                <NavLink to="/users" className={navLinkClasses}>
                  <Users size={iconSize} />
                  {isExpanded && "Users"}
                </NavLink>
              </li>
              <li>
                <NavLink to="/categories" className={navLinkClasses}>
                  <Grid size={iconSize} />
                  {isExpanded && "Categories"}
                </NavLink>
              </li>
              <li>
                <NavLink to="/tasks-offers" className={navLinkClasses}>
                  <Briefcase size={iconSize} />
                  {isExpanded && "Tasks & Offers"}
                </NavLink>
              </li>
              <li>
                <NavLink to="/analytics" className={navLinkClasses}>
                  <LineChart size={iconSize} />
                  {isExpanded && "Analytics"}
                </NavLink>
              </li>
              <li>
                <NavLink to="/modification-logs" className={navLinkClasses}>
                  <History size={iconSize} />
                  {isExpanded && "Modification Logs"}
                </NavLink>
              </li>
            </ul>

            <hr className="h-[0.5px] bg-border w-[95%] mx-auto border-0" />

            <ul className="flex flex-col gap-2 text-md">
              <li>
                <NavLink to="/settings" className={navLinkClasses}>
                  <Settings size={iconSize} />
                  {isExpanded && "Settings"}
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        className={`flex ${
          isExpanded ? "justify-between" : "justify-center"
        } items-center`}
      >
        <div
          className="flex gap-3 items-center cursor-pointer group"
          onClick={() => navigate("/profile")}
        >
          <img
            className="w-9 h-9 rounded-full object-cover object-top border border-default group-hover:border-accent transition-all duration-300 shadow-sm"
            src={femaleBeau}
            alt="avatar"
          />
          {isExpanded && (
            <div className="flex flex-col">
              <p className="text-charcoal text-sm font-bold leading-none group-hover:text-accent transition-colors">
                Youstina Sameh
              </p>
              <p className="text-[10px] text-text-subtle font-medium mt-1 uppercase tracking-wider">
                Administrator
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
