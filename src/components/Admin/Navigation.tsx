"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HomeIcon from "@heroicons/react/24/outline/HomeIcon";
import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
import BriefcaseIcon from "@heroicons/react/24/outline/BriefcaseIcon";
import CalendarIcon from "@heroicons/react/24/outline/CalendarIcon";
import ClipboardIcon from "@heroicons/react/24/outline/ClipboardIcon";
import BellIcon from "@heroicons/react/24/outline/BellIcon";
import ChartBarIcon from "@heroicons/react/24/outline/ChartBarIcon";
import CogIcon from "@heroicons/react/24/outline/CogIcon";
import LockClosedIcon from "@heroicons/react/24/outline/LockClosedIcon";

import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const Navigation = () => {
  const pathname = usePathname();
  interface Admin {
    profile_picture: string;
    admin_id: string;
    role: string;
    // Add other properties if needed
  }
  
  const [admin, setAdmin] = useState<any>(null);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [isPatientsOpen, setPatientsOpen] = useState(false);
  const [isDoctorsOpen, setDoctorsOpen] = useState(false);
  const [isAppointmentsOpen, setAppointmentsOpen] = useState(false);
  const [isConsultationsOpen, setConsultationsOpen] = useState(false);
  const [isAnalyticsOpen, setAnalyticsOpen] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isAuthOpen, setAuthOpen] = useState(false);

  const isActive = (path: string): boolean => pathname === path;

  const isSubmenuActive = (paths: string[]): boolean => pathname !== null && paths.includes(pathname);

  const isParentActive = (paths: string[]): boolean => isSubmenuActive(paths) || isActive(paths[0]);

  const fetchAdminData =async () => {
    // const adminCookie = Cookies.get('admin');
    // const adminGet = adminCookie ? JSON.parse(adminCookie) : null;

    // if (!adminGet || !adminGet.admin) {
    //   console.error("Admin data is missing");
    //   return;
    // }
    // setAdmin(adminGet.admin);

    const adminCookie = Cookies.get("admin");
    const adminGet = adminCookie ? JSON.parse(adminCookie) : null;

    if (!adminGet || !adminGet.admin) {
      console.error("Admin data is missing");
      return;
    }

    const token = Cookies.get("token"); // Assuming the token is stored in a cookie named "token"
    try {
      const response = await axios.get(`${baseUrl}/api/admins/admin/${adminGet.admin._id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        },
      });
      setAdmin(response.data.admin);
      console.log(response.data.admin);
      setIsSuperAdmin(response.data.admin && response.data.admin.role === "superadmin");
    } catch (error) {
      console.error('Error fetching admin data:', error);
    }

  };

  useEffect(() => {
    const adminCookie = Cookies.get("admin");
    const adminGet = adminCookie ? JSON.parse(adminCookie) : null;

    if (!adminGet || !adminGet.admin) {
      console.error("Admin data is missing");
      return;
    }

    const token = Cookies.get("token");
    axios
      .get(`${baseUrl}/api/admins/admin/${adminGet.admin._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAdmin(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the admin details!", error);
      });
  }, []);

  useEffect(() => {
    if (isSubmenuActive([
      "/admin/patients/list",
      "/admin/patients/view",
      "/admin/patients/delete"
    ])) {
      setPatientsOpen(true);
    }
    if (isSubmenuActive([
      "/admin/doctors/list",
      "/admin/doctors/view",
      "/admin/doctors/approve_reject",
      "/admin/doctors/delete"
    ])) {
      setDoctorsOpen(true);
    }
    if (isSubmenuActive([
      "/admin/appointments/list",
    ])) {
      setAppointmentsOpen(true);
    }
    if (isSubmenuActive([
      "/admin/consultations/list",
      "/admin/consultations/view"
    ])) {
      setConsultationsOpen(true);
    }
    if (isSubmenuActive([
      "/admin/analytics",
      "/admin/reports"
    ])) {
      setAnalyticsOpen(true);
    }
    if (isSubmenuActive([
      "/admin/settings/view",
      "/admin/settings/update"
    ])) {
      setSettingsOpen(true);
    }
    if (isSubmenuActive([
      "/admin/operations/profile", 
      "/admin/operations/list", 
      "/admin/operations/register"
    ])) {
      setAuthOpen(true);
    }
  }, [pathname]);

  return (
    <div className="w-60 bg-gray-100 min-h-full">
      {/* <label htmlFor="my-drawer-2" className="drawer-overlay"></label> */}
      {/* Navigation start */}
      <div className="p-4">
        <div className="  shadow-md rounded-lg">
          <div className="flex flex-col items-center p-4">
            <img
              src={admin?.profile_picture || "#"}
              alt="Admin"
              className="w-20 h-20 rounded-full mr-4"
            />
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600 uppercase">{admin?.admin_id} | {admin?.role}</p>
            </div>
          </div>
        </div>
      </div>

      {/*  */}
      <ul className="menu py-4  font-medium text-base">
        {/* Dashboard section */}
        <li
          className={isActive("/admin/dashboard") ? "bg-sky-200 rounded" : ""}
        >
          <Link href="/admin/dashboard" passHref>
            <HomeIcon className="h-5 w-5 mr-2" /> Dashboard
          </Link>
        </li>

        {/* Manage Patients section */}
        <li className={isParentActive(["/admin/patients/list", "/admin/patients/view", "/admin/patients/delete"]) ? "bg-sky-200 rounded" : ""}>
          <div
            onClick={() => setPatientsOpen(!isPatientsOpen)}
            className="cursor-pointer flex items-center"
          >
            <UserGroupIcon className="h-5 w-5 mr-2" />
            Manage Patients
          </div>
          {isPatientsOpen && (
            <ul className={`pl-4 ${isPatientsOpen ? "overflow-hidden" : ""}`}>
              <li
                className={isActive("/admin/patients/list") ? "bg-red-200 rounded" : ""}
              >
                <Link href="/admin/patients/list" passHref>
                  List All Patients
                </Link>
              </li>
              <li
                className={isActive("/admin/patients/delete") ? "bg-red-200 rounded" : ""}
              >
                <Link href="/admin/patients/delete" passHref>
                  Approve Account Deletion
                </Link>
              </li>
            </ul>
          )}
        </li>
        {/* Manage Doctors section */}
        <li className={isParentActive(["/admin/doctors/list", "/admin/doctors/approve_reject",  "/admin/doctors/delete"]) ? "bg-sky-200 rounded" : ""}>
          <div
            onClick={() => setDoctorsOpen(!isDoctorsOpen)}
            className="cursor-pointer flex items-center"
          >
            <BriefcaseIcon className="h-5 w-5 mr-2" />
            Manage Doctors
          </div>
          {isDoctorsOpen && (
            <ul className={`pl-4 ${isDoctorsOpen ? "overflow-hidden" : ""}`}>
              <li
                className={isActive("/admin/doctors/list") ? "bg-red-200 rounded" : ""}
              >
                <Link href="/admin/doctors/list" passHref>
                  List All Doctors
                </Link>
              </li>
              <li
                className={isActive("/admin/doctors/approve_reject") ? "bg-red-200 rounded" : ""}
              >
                <Link href="/admin/doctors/approve_reject" passHref>
                  Approve | Reject
                </Link>
              </li>
              <li
                className={isActive("/admin/doctors/delete") ? "bg-red-200 rounded" : ""}
              >
                <Link href="/admin/doctors/delete" passHref>
                  Approve Account Deletion
                </Link>
              </li>
            </ul>
          )}
        </li>
        {/* Manage Appointments */}
        <li className={isParentActive(["/admin/appointments/list"]) ? "bg-sky-200 rounded" : ""}>
          <div
            onClick={() => setAppointmentsOpen(!isAppointmentsOpen)}
            className="cursor-pointer flex items-center"
          >
            <CalendarIcon className="h-5 w-5 mr-2" />
            Appointments
          </div>
          {isAppointmentsOpen && (
            <ul
              className={`pl-4 ${isAppointmentsOpen ? "overflow-hidden" : ""}`}
            >
              <li
                className={
                  isActive("/admin/appointments/list")
                    ? "bg-red-200 rounded"
                    : ""
                }
              >
                <Link href="/admin/appointments/list" passHref>
                  View All Appointments
                </Link>
              </li>
              
              
            </ul>
          )}
        </li>
        {/* Consultations */}
        <li className={isParentActive(["/admin/consultations/list", "/admin/consultations/view"]) ? "bg-sky-200 rounded" : ""}>
          <div
            onClick={() => setConsultationsOpen(!isConsultationsOpen)}
            className="cursor-pointer flex items-center"
          >
            <ClipboardIcon className="h-5 w-5 mr-2" />
            Consultations
          </div>
          {isConsultationsOpen && (
            <ul
              className={`pl-4 ${isConsultationsOpen ? "overflow-hidden" : ""}`}
            >
              <li
                className={
                  isActive("/admin/consultations/list")
                    ? "bg-red-200 rounded"
                    : ""
                }
              >
                <Link href="/admin/consultations/list" passHref>
                  View All Consultations
                </Link>
              </li>
              {/* <li
                className={
                  isActive("/admin/consultations/view")
                    ? "bg-red-200 rounded"
                    : ""
                }
              >
                <Link href="/admin/consultations/view" passHref>
                  View Consultation Details
                </Link>
              </li> */}
            </ul>
          )}
        </li>
        {/* Notifications */}
        <li
          className={
            isActive("/admin/notifications") ? "bg-sky-200 rounded" : ""
          }
        >
          <Link href="/admin/notifications" passHref>
            <BellIcon className="h-5 w-5 mr-2" />
            Send Notifications
          </Link>
        </li>
        {/* Analytics & Reports */}
        <li className={isParentActive(["/admin/analytics", "/admin/reports"]) ? "bg-sky-200 rounded" : ""}>
          <div
            onClick={() => setAnalyticsOpen(!isAnalyticsOpen)}
            className="cursor-pointer flex items-center"
          >
            <ChartBarIcon className="h-5 w-5 mr-2" />
            Analytics & Reports
          </div>
          {isAnalyticsOpen && (
            <ul className={`pl-4 ${isAnalyticsOpen ? "overflow-hidden" : ""}`}>
              <li
                className={isActive("/admin/analytics") ? "bg-red-200 rounded" : ""}
              >
                <Link href="/admin/analytics" passHref>
                  View Analytics
                </Link>
              </li>
              <li
                className={isActive("/admin/reports") ? "bg-red-200 rounded" : ""}
              >
                <Link href="/admin/reports" passHref>
                  Generate Reports
                </Link>
              </li>
            </ul>
          )}
        </li>
        {/* Platform Settings */}
        <li className={isParentActive(["/admin/settings/view", "/admin/settings/update"]) ? "bg-sky-200 rounded" : ""}>
          <div
            onClick={() => setSettingsOpen(!isSettingsOpen)}
            className="cursor-pointer flex items-center"
          >
            <CogIcon className="h-5 w-5 mr-2" />
            Platform Settings
          </div>
          {isSettingsOpen && (
            <ul className={`pl-4 ${isSettingsOpen ? "overflow-hidden" : ""}`}>
              <li
                className={isActive("/admin/settings/view") ? "bg-red-200 rounded" : ""}
              >
                <Link href="/admin/settings/view" passHref>
                  View Platform Settings
                </Link>
              </li>
              <li
                className={isActive("/admin/settings/update") ? "bg-red-200 rounded" : ""}
              >
                <Link href="/admin/settings/update" passHref>
                  Update Platform Settings
                </Link>
              </li>
            </ul>
          )}
        </li>
        {/* Profile */}
        <li className={isParentActive(["/admin/operations/profile", "/admin/operations/list", "/admin/operations/register"]) ? "bg-sky-200 rounded" : ""}>
          <div
            onClick={() => setAuthOpen(!isAuthOpen)}
            className="cursor-pointer flex items-center"
          >
            <LockClosedIcon className="h-5 w-5 mr-2" />
              Profile
          </div>
          {isAuthOpen && (
            <ul className={`pl-4 ${isAuthOpen ? "overflow-hidden" : ""}`}>
              <li
          className={isActive("/admin/operations/profile") ? "bg-red-200 rounded" : ""}
              >
          <Link href="/admin/operations/profile" passHref>
            Admin Profile
          </Link>
              </li>
              <li
          className={isActive("/admin/operations/register") ? "bg-red-200 rounded" : ""}
              >
          <Link href="/admin/operations/register" passHref>
            Register Admin
          </Link>
              </li>
              <li
          className={isActive("/admin/operations/list") ? "bg-red-200 rounded" : ""}
              >
          <Link href="/admin/operations/list" passHref>
            View All Admins
          </Link>
              </li>
            </ul>
          )}
        </li>


      </ul>
    </div>
  );
};

export default Navigation;

