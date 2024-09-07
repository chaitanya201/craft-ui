import { Heart, House, LogOut, Plus, Shapes, UserRound } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Card from "../card/card";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "@remix-run/react";

const sidebarLinks = [
  {
    url: "/dashboard",
    name: "Home",
    icon: <House />,
  },
  {
    url: "/components/add",
    name: "Create",
    icon: <Plus />,
  },
  {
    url: "/favorite",
    name: "favorites",
    icon: <Heart />,
  },
  {
    url: "/logout",
    name: "logout",
    icon: <LogOut />,
  },
];

export default function UserInfo({
  userSession,
}: {
  userSession: { token: string; Id: string; email: string; name: string };
}) {
  const profileRef = useRef<HTMLDivElement | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const { pathname } = useLocation();

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
          "absolute text-sm md:text-base opacity-0 transition-all duration-300 top-full -left-32 md:-left-40 w-fit md:w-52 border mt-2 p-5 flex flex-col gap-y-5 max-h-80 overflow-auto cursor-default z-50",
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
        <ul className="flex flex-col gap-y-5">
          {sidebarLinks.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <Link
                  to={`${item.url}`}
                  className={cn(
                    "flex gap-x-2 items-center text-sm md:text-base p-2 w-full rounded-md",
                    pathname.includes(item.url)
                      ? "bg-org-primary hover:text-black"
                      : "hover:text-org-primary hover:bg-org-primary-foreground"
                  )}
                >
                  {Icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Card>
    </div>
  );
}
