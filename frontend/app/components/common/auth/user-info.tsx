import { LogOut, UserRound } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Card from "../card/card";
import { cn } from "@/lib/utils";
import { Link } from "@remix-run/react";

export default function UserInfo({
  userSession,
}: {
  userSession: { token: string; Id: string; email: string; name: string };
}) {
  const profileRef = useRef<HTMLDivElement | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleDomClick = (e: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setShowDropdown((prev) => {
          if (prev) {
            return false;
          }
          return prev;
        });
      } else {
        setShowDropdown((prev) => (!prev ? !prev : prev));
      }
    };

    document.addEventListener("click", handleDomClick);

    return () => {
      document.removeEventListener("click", handleDomClick);
    };
  }, []);

  return (
    <div ref={profileRef} className="relative cursor-pointer">
      <div className="flex items-center gap-x-2">
        <UserRound className="h-10 w-10 text-org-primary" />
      </div>

      <Card
        className={cn(
          "absolute text-sm md:text-base opacity-0 transition-all duration-300 top-full -left-28 md:-left-36 w-fit md:w-52 border mt-2 flex flex-col gap-y-3 max-h-80 overflow-auto cursor-default z-50",
          showDropdown ? "opacity-100" : "pointer-events-none"
        )}
      >
        <p className="flex gap-x-2 capitalize">
          <span>Welcome</span>
          <span
            aria-label="user name"
            className="truncate text-ellipsis overflow-hidden"
          >
            {userSession.name}
          </span>
        </p>
        <Link
          to={`/logout`}
          className="flex gap-x-2 hover:bg-slate-200 p-3 rounded-md"
        >
          <LogOut />
          <span>Logout</span>
        </Link>
      </Card>
    </div>
  );
}
