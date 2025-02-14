"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  UserIcon,
  CalendarIcon,
  ClipboardIcon,
  HomeIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/userSlice"; // Adjust the import path as necessary

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

interface NavigationProps {
  onCloseSidebar: () => void;
}

const Navigation = ({ onCloseSidebar }: NavigationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [patient, setPatient] = useState<any>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    Cookies.remove("token"); // Remove the token cookie
    Cookies.remove("patient"); // Remove the patient cookie
    window.location.href = "/login"; // Redirect to login page
  };

  const isActive = (path: string): boolean => pathname === path;

  const isSubmenuActive = (paths: string[]): boolean =>
    pathname !== null && paths.includes(pathname);

  const isParentActive = (paths: string[]): boolean =>
    isSubmenuActive(paths) || isActive(paths[0]);

  const fetchPatientData = async () => {
    const token = Cookies.get("token"); // Assuming the token is stored in a cookie named "token"
    try {
      const response = await axios.get(`${baseUrl}/api/users/patient/profile`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        },
      });
      setPatient(response.data);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  useEffect(() => {
    fetchPatientData();
  }, []);

  useEffect(() => {
    if (
      isSubmenuActive([
        "/patient/appointments/book",
        "/patient/appointments/view",
        "/patient/appointments/book/confirm",
      ])
    ) {
      setOpenMenu("appointments");
    }
    if (
      isSubmenuActive([
        "/patient/consultations/details",
        "/patient/consultations/history",
        "/patient/consultations/upload",
      ])
    ) {
      setOpenMenu("consultations");
    }
  }, [pathname]);

  const handleNavigation = (href: string) => {
    router.push(href);
    onCloseSidebar();
  };

  const menuItems = [
    {
      id: "dashboard",
      href: "/patient/dashboard",
      icon: HomeIcon,
      label: "Dashboard",
    },
    {
      id: "profile",
      href: "/patient/profile",
      icon: UserIcon,
      label: "Profile",
    },
    {
      id: "appointments",
      icon: CalendarIcon,
      label: "Appointments",
      submenu: [
        { href: "/patient/appointments/book", label: "Book Appointment" },
        { href: "/patient/appointments/view", label: "View Appointments" },
      ],
    },
    {
      id: "consultations",
      icon: ClipboardIcon,
      label: "Consultations",
      submenu: [
        { href: "/patient/consultations/history", label: "History" },
        // { href: '/patient/consultations/upload', label: 'Upload Documents' }
      ],
    },
  ];

  const renderMenuItem = (item: {
    id: string;
    href?: string;
    icon: any;
    label: string;
    submenu?: Array<{ href: string; label: string }>;
  }) => {
    const isActive = item.href
      ? pathname === item.href
      : item.submenu?.some((sub) => pathname === sub.href);
    const isOpen = openMenu === item.id;

    return (
      <div key={item.id} className="px-3 py-1">
        {item.href ? (
          // Single menu item with direct link
          <button
            onClick={() => handleNavigation(item.href!)}
            className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${
              isActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </div>
          </button>
        ) : (
          // Menu item with submenu
          <button
            onClick={() => setOpenMenu(isOpen ? null : item.id)}
            className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${
              isActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </div>
            {item.submenu && (
              <ChevronDownIcon
                className={`h-4 w-4 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            )}
          </button>
        )}

        {/* Submenu items */}
        {item.submenu && isOpen && (
          <div className="mt-1 ml-4 pl-4 border-l">
            {item.submenu.map((subItem) => (
              <button
                key={subItem.href}
                onClick={() => handleNavigation(subItem.href)}
                className={`w-full text-left px-4 py-2 rounded-lg text-sm ${
                  pathname === subItem.href
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {subItem.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Profile Section */}
      <div className="p-6 border-b">
        <div className="flex flex-col items-center">
          {patient?.profile_picture ? (
            <img
              src={patient.profile_picture}
              alt={patient.full_name}
              className="w-20 h-20 rounded-full object-cover ring-2 ring-offset-2 ring-blue-100"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center ring-2 ring-offset-2 ring-blue-100">
              <span className="text-xl font-semibold text-blue-600">
                {patient?.full_name?.charAt(0)}
              </span>
            </div>
          )}
          <div className="mt-4 text-center">
            <h3 className="font-semibold text-gray-800">
              {patient?.full_name}
            </h3>
            <span className="text-sm text-gray-500">
              Blood Group: {patient?.blood_group}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto py-4">
        {menuItems.map(renderMenuItem)}
      </nav>
    </div>
  );
};

export default Navigation;
