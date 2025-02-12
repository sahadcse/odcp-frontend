"use client";

import useUserData from "@/hooks/useUserData";
import {
  ExclamationTriangleIcon,
  BellIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface DashboardHeroNavProps {
  headName: string;
}

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

const DashboardHeroNav = ({ headName }: DashboardHeroNavProps) => {
  const user = useUserData();
  const showWarning = user?.documents?.length === 0;
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = Cookies.get("token");
        const response = await fetch(
          `${BACKEND_API_URL}/api/users/doctor/notifications`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setServerMessage(data.message);
          setNotifications([]);
        } else {
          setNotifications(data);
          setServerMessage(null);
        }
      } catch (err) {
        setServerMessage("Unable to connect to server");
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <header className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-4 space-y-4">
        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl text-gray-800 font-bold tracking-tight">
            {headName}
          </h1>

          <div className="flex flex-wrap w-full md:w-auto items-center gap-3">
            {/* Search Bar */}
            <div className="relative flex-1 md:flex-none">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            {/* Notification Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative group px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <BellIcon className="h-5 w-5" />
              <span className="hidden md:inline">Notifications</span>
              {!loading && notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Notification Overlay */}
        <Transition show={isOpen} as={Fragment}>
          <Dialog onClose={() => setIsOpen(false)} className="relative z-50">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/30" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <Dialog.Title className="text-lg font-medium">
                        Notifications
                      </Dialog.Title>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="p-1 rounded-lg hover:bg-gray-100"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      {loading ? (
                        <p className="text-gray-500">
                          Loading notifications...
                        </p>
                      ) : notifications.length > 0 ? (
                        notifications.map((notif: any) => (
                          <div
                            key={notif._id}
                            className="p-3 bg-gray-50 rounded-lg"
                          >
                            <p className="text-gray-800">{notif.message}</p>
                            <span className="text-sm text-gray-500">
                              {new Date(notif.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500">
                          {serverMessage || "No notifications"}
                        </p>
                      )}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>

        {/* Warning Alert */}
        {showWarning && (
          <div className="flex items-center gap-3 px-4 py-3 bg-red-50 border-l-4 border-red-500 rounded-lg transition-all duration-300 hover:bg-red-100">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-500 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-red-800">
                Action Required
              </h3>
              <p className="text-sm text-red-600">
                Please upload your documents to access full dashboard features
              </p>
            </div>
          </div>
        )}

        {/* Show server message if exists */}
        {/* {serverMessage && (
          <div className="text-sm text-gray-600 italic">{serverMessage}</div>
        )} */}
      </div>
    </header>
  );
};

export default DashboardHeroNav;
