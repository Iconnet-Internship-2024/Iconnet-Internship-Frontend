import React from "react";
import {
  HiOutlineChartPie,
  HiOutlineClipboardList,
  HiOutlineClock,
  HiOutlineMenu,
} from "react-icons/hi";
import logo from "../assets/logo.svg"; // Import the SVG logo
import { Link, useLocation } from "react-router-dom"; // Import useLocation for active link detection

function AdminSidebar({ isOpen, toggleSidebar }) {
  return (
    <div>
      <div className="lg:hidden flex items-center justify-between p-4 bg-white shadow-md">
        {isOpen && (
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="w-12 mr-2" /> {/* Increased size */}
          </div>
        )}
        <button onClick={toggleSidebar}>
          <HiOutlineMenu className="text-2xl" />
        </button>
      </div>
      <div className={`h-full bg-white flex flex-col p-4 lg:w-64 ${isOpen ? 'block' : 'hidden'} lg:block`}>
        <div className="flex items-center mb-8">
          <img src={logo} alt="Logo" className="w-24 mr-2" /> {/* Increased size */}
        </div>
        <div className="flex flex-col space-y-2">
          <SidebarItem href="dashboard" icon={HiOutlineChartPie} label="Dashboard" />
          <SidebarItem href="pengajuan" icon={HiOutlineClipboardList} label="Pengajuan" />
          <SidebarItem href="riwayat-log" icon={HiOutlineClock} label="Riwayat Log" />
        </div>
      </div>
    </div>
  );
}

function SidebarItem({ href, icon: Icon, label }) {
  const location = useLocation();
  const isActive = location.pathname === `/${href}`;

  return (
    <Link
      to={`/${href}`}
      className={`flex items-center text-base font-medium ${isActive ? 'text-[#CB1919]' : 'text-gray-700'} hover:text-[#CB1919]`}
    >
      <Icon className="text-2xl" />
      <span className="ml-2">{label}</span>
    </Link>
  );
}

export default AdminSidebar;
