import Navbar from "@/components/common/layouts/navbar";
import SidebarLayout from "@/components/common/layouts/sidebar";
import { Outlet } from "@remix-run/react";
import React from "react";

export default function AuthLayout() {
  return (
    <div className="h-screen w-full bg-slate-300 overflow-hidden">
      <Navbar />
      <div className="flex h-full">
        <div className="max-w-60 h-full overflow-y-auto bg-slate-200">
          <SidebarLayout />
        </div>
        <div className="flex-grow overflow-y-auto bg-white p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
