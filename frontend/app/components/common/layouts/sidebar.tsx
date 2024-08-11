import { cn } from "@/lib/utils";
import { Link, useLocation } from "@remix-run/react";
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
    url: "/fksl",
    name: "favorites",
    icon: <Heart />,
  },
];
export default function SidebarLayout() {
  const location = useLocation();
  const { pathname } = location;
  return (
    <div className="sticky top-16 pt-4">
      <ul className="flex flex-col gap-y-5 w-80 p-3">
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
    </div>
  );
}
