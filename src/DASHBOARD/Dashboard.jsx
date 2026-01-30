import React from "react";
import { Outlet } from "react-router-dom";
import Dsidebar from "../DASHBOARD/Dsidebar";
import Dheader from "../DASHBOARD/Dheader";

const Dashboard = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* SIDEBAR */}
        <Dsidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col bg-gray-200">
        {/* HEADER */}
        <Dheader />

        {/* PAGE CONTENT */}
        <section className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
