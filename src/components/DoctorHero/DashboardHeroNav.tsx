"use client";

import useUserData from "@/hooks/useUserData";

interface DashboardHeroNavProps {
  headName: string;
}

const DashboardHeroNav = ({ headName }: DashboardHeroNavProps) => {
  const user = useUserData();
  const warningText = user?.documents?.length === 0 ? "Please Upload Your Documents Otherwise You Can't Access Full Dashboard." : "";
  return (
    <header className="flex justify-between items-center mb-3 border border-gray-200 p-3 rounded-lg bg-gray-100">
      <h1 className="text-2xl text-color-primary font-semibold">
        {headName}
      </h1>
      <h1 className="text-2xl text-red-500 font-semibold">
        {warningText}
      </h1>
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="px-4 py-2 bg-color-primary text-white rounded-lg hover:bg-blue-600">
          Notifications
        </button>
        {/* <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
          Messages
        </button> */}
      </div>
    </header>
  );
};

export default DashboardHeroNav;
