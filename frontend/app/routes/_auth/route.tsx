import MobileSidebar from "@/components/common/layouts/mobile-sidebar";
import Navbar from "@/components/common/layouts/navbar";
import SidebarLayout from "@/components/common/layouts/sidebar";
import { getSession } from "@/lib/cookies";
import { cn } from "@/lib/utils";
import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { useRef, useState } from "react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");
  if (!token) {
    return redirect("/login");
  }

  const sessionData = session.data;

  return sessionData;
};

export default function AuthLayout() {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const userSession = useLoaderData<typeof loader>();
  const navbarRef = useRef<HTMLDivElement | null>(null);
  console.log({ showMobileSidebar });

  return (
    <div className="h-screen max-w-7xl w-full mx-auto bg-slate-100 overflow-hidden">
      <div ref={navbarRef}>
        <Navbar
          setShowMobileSidebar={setShowMobileSidebar}
          userSession={userSession}
        />
      </div>
      <div className="flex h-full">
        <div className="hidden lg:block bg-white h-full overflow-y-auto shadow-inner">
          <p className="text-center">Components</p>
          <SidebarLayout />
        </div>

        <div
          className={cn(
            "transition-all  duration-300 relative",
            showMobileSidebar ? "opacity-100" : "opacity-0 -z-10"
          )}
        >
          <MobileSidebar
            ref={navbarRef}
            setShowMobileSidebar={setShowMobileSidebar}
          />
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
