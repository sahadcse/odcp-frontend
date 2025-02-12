"use client";

import React, {useEffect, useState} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdDashboard,
  MdCalendarMonth,
  MdOutlineFiberSmartRecord,
  MdHistory,
  MdOutlinePayment,
  MdOutlineSettings,
  MdLogout,
} from "react-icons/md";
import { useDispatch } from "react-redux";
import { ReactNode } from "react";
import { logout } from "@/redux/slices/userSlice";
import useUserData from "@/hooks/useUserData";
import { DoctorProfileData } from "@/data/doctorProfileData";


const DoctorLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const user = useUserData();
  const { full_name, bio } = user;
  const isActive = (path: string): boolean => pathname === path;
  interface ProfileData {
    profile_picture_url: string;
    // Add other properties of the profile data here
  }

  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      const getProfileData = async () => {
        try {
          const data = await DoctorProfileData(user?._id);
          setProfileData(data);
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("An unknown error occurred");
          }
        }
      };
  
      getProfileData();
    }, []);

  return (
    <>
      <div className="drawer lg:drawer-open font-work-sans">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

        {/* Content */}
        <div className="drawer-content flex flex-col min-h-screen">
          {/* Mobile Header */}
          <div className="lg:hidden flex justify-between items-center bg-white shadow-sm">
            <div className="flex items-center gap-3">
              <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
              <span className="text-lg font-semibold">{full_name}</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-4 lg:p-6 flex-grow">{children}</div>
        </div>

        {/* Sidebar */}
        <div className="drawer-side z-20">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <div className="w-72 min-h-full bg-gray-100 p-4 lg:p-6">
            <ul className="text-base-content font-medium text-base space-y-4">
              {/* Doctor Info */}
              <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
                <img
                  src={profileData?.profile_picture_url}
                  alt="Doctor"
                  className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
                />
                <div className="text-center">
                  <h1 className="text-lg font-semibold">{full_name}</h1>
                  <p className="text-sm text-gray-500">{bio}</p>
                </div>
              </div>

              {/* Menu Items */}
              <div className="space-y-2">
                <li
                  className={`rounded-lg transition-colors ${
                    isActive("/doctor/dashboard")
                      ? "bg-color-primary text-white"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <Link
                    href="/doctor/dashboard"
                    className="flex items-center p-3 gap-3"
                  >
                    <MdDashboard className="text-xl" /> Dashboard
                  </Link>
                </li>

                {user?.documents?.length > 0 && (
                  <>
                    {/* Appointments Section */}
                    <div className="space-y-1">
                      <li className="font-semibold p-3">
                        <div className="flex items-center gap-3">
                          <MdCalendarMonth className="text-xl" /> Appointments
                        </div>
                      </li>
                      <li
                        className={`rounded-lg ml-6 transition-colors ${
                          isActive("/doctor/appointments")
                            ? "bg-color-primary text-white"
                            : "hover:bg-gray-200"
                        }`}
                      >
                        <Link href="/doctor/appointments" className="block p-3">
                          Today's Appointments
                        </Link>
                      </li>
                      <li
                        className={`rounded-lg ml-6 transition-colors ${
                          isActive("/doctor/appointments/upcoming")
                            ? "bg-color-primary text-white"
                            : "hover:bg-gray-200"
                        }`}
                      >
                        <Link
                          href="/doctor/appointments/upcoming"
                          className="block p-3"
                        >
                          Upcoming Appointments
                        </Link>
                      </li>
                    </div>

                    {/* Rest of the menu items */}
                    <li
                      className={`rounded-lg transition-colors ${
                        isActive("/doctor/consultHistory")
                          ? "bg-color-primary text-white"
                          : "hover:bg-gray-200"
                      }`}
                    >
                      <Link
                        href="/doctor/consultHistory"
                        className="flex items-center p-3 gap-3"
                      >
                        <MdHistory className="text-xl" /> Consultations
                      </Link>
                      <ul className="ml-4 mt-2">
                        <li
                          className={
                            isActive("/doctor/consultations/todays")
                              ? "bg-color-primary text-white rounded"
                              : ""
                          }
                        >
                          <Link
                            href="/doctor/consultations/todays"
                            passHref
                            className=""
                          >
                            Today's Consultations
                          </Link>
                        </li>
                        <li
                          className={
                            isActive("/doctor/consultations/upComing")
                              ? "bg-color-primary text-white rounded"
                              : ""
                          }
                        >
                          <Link
                            href="/doctor/consultations/upComing"
                            passHref
                            className=""
                          >
                            Upcoming Consultations
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li
                      className={`rounded-lg transition-colors ${
                        isActive("/doctor/avilability")
                          ? "bg-color-primary text-white"
                          : "hover:bg-gray-200"
                      }`}
                    >
                      <Link
                        href="/doctor/avilability"
                        className="flex items-center p-3 gap-3"
                      >
                        <MdOutlinePayment className="text-xl" /> Availability
                        Management
                      </Link>
                    </li>
                  </>
                )}

                <li
                  className={`rounded-lg transition-colors ${
                    isActive("/doctor/profile")
                      ? "bg-color-primary text-white"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <Link
                    href="/doctor/profile"
                    className="flex items-center p-3 gap-3"
                  >
                    <MdOutlineSettings className="text-xl" /> Profile
                  </Link>
                </li>
                <li className="rounded-lg hover:bg-gray-200 transition-colors">
                  <button
                    onClick={() => dispatch(logout())}
                    className="flex items-center p-3 gap-3 w-full"
                  >
                    <MdLogout className="text-xl" /> Logout
                  </button>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorLayout;
