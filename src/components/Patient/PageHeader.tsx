"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BellIcon,
  Bars3Icon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/userSlice";
import Cookies from "js-cookie";

interface PageHeaderProps {
  onMenuClick: () => void;
}

const PageHeader = ({ onMenuClick }: PageHeaderProps) => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    Cookies.remove("token");
    Cookies.remove("patient");
    window.location.href = "/login";
  };

  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 bg-white border-b z-10">
      <div className="px-4 md:px-6 py-2">
        <div className="flex items-center justify-between">
          {/* Left section */}
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuClick}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-semibold capitalize text-gray-800">
              {(pathname ?? "").split("/").pop()?.replace(/-/g, " ")}
            </h1>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none focus:outline-none ml-2 w-48"
              />
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 hover:bg-gray-100 rounded-full relative"
              >
                <BellIcon className="h-6 w-6" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border py-2">
                  <div className="px-4 py-2 border-b">
                    <h3 className="font-semibold">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {/* Add notification items here */}
                    <div className="px-4 py-2 hover:bg-gray-50">
                      <p className="text-sm">No new notifications</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
