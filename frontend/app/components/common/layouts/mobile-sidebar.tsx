import React, {
  forwardRef,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";
import { cn } from "@/lib/utils";
import { Link } from "@remix-run/react";
import { FolderOpenDot, Heart, House, Shapes } from "lucide-react";

const sidebarLinks = [
  {
    url: "/dashboard",
    name: "Home",
    icon: <House />,
  },
  {
    url: "/projects",
    name: "projects",
    icon: <Shapes />,
  },
  {
    url: "/dashboard",
    name: "favorites",
    icon: <Heart />,
  },
];

interface MobileSidebarProps {
  setShowMobileSidebar: Dispatch<SetStateAction<boolean>>;
}

const MobileSidebar = forwardRef<HTMLDivElement, MobileSidebarProps>(
  ({ setShowMobileSidebar }, ref) => {
    useEffect(() => {
      const handleClick = (e: MouseEvent) => {
        if (
          ref &&
          (ref as React.RefObject<HTMLDivElement>).current?.contains(
            e.target as Node
          )
        ) {
          return;
        }
        setShowMobileSidebar(false);
      };

      document.addEventListener("click", handleClick);
      return () => {
        document.removeEventListener("click", handleClick);
      };
    }, [setShowMobileSidebar, ref]);

    return (
      <div
        className={cn(
          "lg:hidden absolute -top-20 w-60 md:w-96 h-full overflow-y-auto bg-white shadow-md m-3 mt-0 transition-all duration-300 p-5 flex flex-col gap-y-4"
        )}
      >
        <h2 className="uppercase font-semibold ">Component Hub</h2>
        {/* Sidebar content */}
        <ul className="flex flex-col gap-y-2">
          {sidebarLinks.map((item) => {
            const Icon = item.icon;
            return (
              <li
                key={item.name}
                className={cn(
                  "flex gap-x-2 items-center bg-[#99ff99] text-sm md:text-base  p-2  w-full rounded-md"
                )}
              >
                {Icon}
                <Link to={`${item.url}`}>{item.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
);

MobileSidebar.displayName = "MobileSidebar";

export default MobileSidebar;
