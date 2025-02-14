"use client";

import React, { useState } from "react";
import { ReactNode } from "react";
import Navigation from "./Navigation";
import PageHeader from "./PageHeader";

const PatientLayout = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Navigation */}
      <div
        className={`w-64 fixed md:fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-200 ease-in-out z-30 bg-white h-full overflow-hidden`}
      >
        <Navigation onCloseSidebar={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen md:ml-64">
        {/* Header */}
        <PageHeader onMenuClick={() => setSidebarOpen(true)} />

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-6 mt-16 overflow-x-hidden overflow-y-auto">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t px-4 py-3">
          <div className="max-w-7xl mx-auto text-center text-sm text-gray-600">
            © {new Date().getFullYear()} Online Doctor Consultation. All rights
            reserved.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PatientLayout;
