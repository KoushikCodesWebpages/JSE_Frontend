// Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Briefcase,
  FileText,
  Layers,
  LineChart,
  Bookmark,
  Settings as SettingsIcon,
} from "lucide-react";

const Sidebar = () => {
  const { pathname } = useLocation();

  const menuItems = [
    { to: "/user/dashboard", icon: <Home className="w-5 h-5 text-[#2c6472]" />, label: "Dashboard" },
    { to: "/user/job-listings", icon: <Briefcase className="w-5 h-5 text-[#2c6472]" />, label: "Job Listings" },
    { to: "/user/selected-applications", icon: <FileText className="w-5 h-5 text-[#2c6472]" />, label: "Selected Application" },
    { to: "/user/my-applications", icon: <Layers className="w-5 h-5 text-[#2c6472]" />, label: "My Application" },
    { to: "/user/application-tracker", icon: <LineChart className="w-5 h-5 text-[#2c6472]" />, label: "Application Tracker" },
    { to: "/user/saved-jobs", icon: <Bookmark className="w-5 h-5 text-[#2c6472]" />, label: "Saved Jobs" },
  ];

  return (
    <aside className="w-61 h-screen bg-white border-r flex flex-col"><br/>
      <div className="flex justify-center items-center py-6">
        <span className="text-2xl font-bold text-stone-600]">JSE AI</span>
      </div><br/><br/>

      <div className="flex-1">
        <ul className="space-y-4 text-lg text-gray-400">
          {menuItems.map((item, index) => (
            <Link to={item.to} key={index}>
              <li
                className={`flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-100 hover:text-[#2c6472] transition ${
                  pathname === item.to
                    ? "bg-gray-100 text-[#2c6472]"
                    : "hover:bg-gray-100 hover:text-[#2c6472]"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </li><br/>
            </Link>
          ))}
        </ul>
      </div>

      <div className="px-6">
        <Link to="/user/settings">
          <div
            className={`flex items-center text-lg gap-3 px-4 py-2 rounded-md hover:bg-gray-100 hover:text-black transition ${
              pathname === "/user/settings" ? "text-black" : "text-[#2c6472]"
            }`}
          >
            <SettingsIcon className="w-4 h-4" />
            <span>Settings</span>
          </div>
        </Link>
      </div><br/>
    </aside>
  );
};

export default Sidebar;
