"use client";

import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import Logo from "../images/Logo (2).png";
import useisAuthenticated from "../hooks/useIsAuthenticated";
import useUserData from "../hooks/useUserData";
import { logout } from "@/redux/slices/userSlice";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isAuth = useisAuthenticated();
  const userData = useUserData();
  const dispatch = useDispatch();

  const navigation = [
    { name: "HOME", href: "/" },
    { name: "ABOUT", href: "/about" },
    { name: "SERVICES", href: "/services" },
    { name: "DOCTORS", href: "/doctor" },
    { name: "APPOINTMENT", href: "/appointment" },
    { name: "CONTACT", href: "/contact" },
  ];

  if (isAuth) {
    navigation.push({
      name: "DASHBOARD",
      href:
        userData?.role === "doctor"
          ? "/doctor/dashboard"
          : userData?.role === "patient"
          ? "/patient/dashboard"
          : "/admin/dashboard",
    });
  }

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/login";
  };

  const renderLinks = () =>
    navigation.map((item) => (
      <Link
        key={item.name}
        href={item.href}
        className={`text-lg font-semibold leading-6 px-3 py-2 rounded-lg transition-all duration-200 ${
          pathname === item.href
        ? "bg-color-primary text-white shadow-lg transform scale-105"
        : "text-gray-900 hover:bg-gray-100 hover:text-color-primary"
        }`}
      >
        {item.name}
      </Link>
    ));

  const renderAuthButtons = () =>
    isAuth ? (
      <button
        onClick={handleLogout}
        className="inline-flex items-center justify-center rounded-xl bg-color-primary py-3 px-6 font-dm text-base font-medium text-white transition-transform duration-200 ease-in-out hover:scale-[1.02]"
      >
        LOGOUT
      </button>
    ) : (
      <div className="flex text-sm">
        <Link href="/login">
            <button className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-color-primary to-blue-600 py-2.5 px-6 font-dm text-base font-medium text-white shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:translate-y-[-2px] hover:brightness-110 active:transform active:translate-y-[1px]">
            <span className="mr-1">LOGIN</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            </button>
        </Link>
      </div>
    );

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md py-2">
      <div className="max-w-[95vw] mx-auto">
        <nav className="flex items-center justify-between lg:px-20 text-xl ">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/">
              <Image src={Logo} alt="Logo" height={100} width={100} priority />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center justify-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              {mobileMenuOpen ? (
                <span className="text-red-600 border border-red-600 px-1 rounded-md text-sm">Close</span>
              ) : (
                <Bars3Icon aria-hidden="true" className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:gap-x-12">{renderLinks()}</div>

          {/* Authentication Buttons */}
          <div className="hidden lg:flex">{renderAuthButtons()}</div>
        </nav>

        {/* Mobile Menu Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden p-4">
            <div className="flex flex-col space-y-4">
              {renderLinks()}
              {renderAuthButtons()}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
