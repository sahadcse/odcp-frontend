"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
import CalendarIcon from "@heroicons/react/24/outline/CalendarIcon";
import ClipboardIcon from "@heroicons/react/24/outline/ClipboardIcon";
import HomeIcon from "@heroicons/react/24/outline/HomeIcon";
import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const Navigation = () => {
  const pathname = usePathname();
  const [patient, setPatient] = useState<any>(null);
  const [isAppointmentsOpen, setAppointmentsOpen] = useState(false);
  const [isConsultationsOpen, setConsultationsOpen] = useState(false);

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
      // console.log("res: ", response.data.full_name);
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
      setAppointmentsOpen(true);
    }
    if (
      isSubmenuActive([
        "/patient/consultations/details",
        "/patient/consultations/history",
        "/patient/consultations/upload",
      ])
    ) {
      setConsultationsOpen(true);
    }
  }, [pathname]);

  return (
    <div className="w-60 bg-gray-100 min-h-full">
      <div className="p-4">
        <div className="shadow-md rounded-lg">
          <div className="flex flex-col items-center p-4">
            {patient?.profile_picture ? (
              <img
                src={patient.profile_picture}
                alt="Patient"
                className="w-20 h-20 rounded-md mr-4 object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full mr-4 bg-gray-300 flex items-center justify-center">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
            <div className="text-center mt-4">
              <p className="text-sm uppercase text-center">
                <span className="text-indigo-700">{patient && patient.full_name}</span> | {patient?.blood_group}
              </p>
            </div>
          </div>
        </div>
      </div>

      <ul className="menu py-4 font-medium text-base">
        {/* Dashboard */}
        <li className={isActive("/patient/dashboard") ? "bg-sky-200 rounded" : ""}>
          <Link href="/patient/dashboard" passHref>
            <HomeIcon className="h-5 w-5 mr-2" /> Dashboard
          </Link>
        </li>

        {/* Profile Management */}
        <li
          className={isActive("/patient/profile") ? "bg-sky-200 rounded" : ""}
        >
          <Link href="/patient/profile" passHref>
            <UserGroupIcon className="h-5 w-5 mr-2" /> Profile Management
          </Link>
        </li>

        {/* Appointments */}
        <li
          className={
            isParentActive([
              "/patient/appointments/book",
              "/patient/appointments/view",
            ])
              ? "bg-sky-200 rounded"
              : ""
          }
        >
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
                  isActive("/patient/appointments/book") || isActive("/patient/appointments/book/confirm")
                    ? "bg-red-200 rounded"
                    : ""
                }
              >
                <Link href="/patient/appointments/book" passHref>
                  Book Appointment
                </Link>
              </li>
              <li
                className={
                  isActive("/patient/appointments/view")
                    ? "bg-red-200 rounded"
                    : ""
                }
              >
                <Link href="/patient/appointments/view" passHref>
                  View Appointment
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Consultations */}
        <li
          className={
            isParentActive([
              "/patient/consultations/details",
              "/patient/consultations/history",
              "/patient/consultations/upload",
            ])
              ? "bg-sky-200 rounded"
              : ""
          }
        >
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
              {/* <li
                className={
                  isActive("/patient/consultations/details")
                    ? "bg-red-200 rounded"
                    : ""
                }
              >
                <Link href="/patient/consultations/details" passHref>
                  Get Consultation Details
                </Link>
              </li> */}
              <li
                className={
                  isActive("/patient/consultations/history")
                    ? "bg-red-200 rounded"
                    : ""
                }
              >
                <Link href="/patient/consultations/history" passHref>
                  Operation
                </Link>
              </li>
              {/* <li
                className={
                  isActive("/patient/consultations/upload")
                    ? "bg-red-200 rounded"
                    : ""
                }
              >
                <Link href="/patient/consultations/upload" passHref>
                  Upload Medical Reports
                </Link>
              </li> */}
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
