import { cn } from "@/lib/utils";
import { Link, useLocation, useNavigate } from "@remix-run/react";
import { Code, FolderOpenDot, Heart, House, Shapes } from "lucide-react";
import {
  Accordion,
  AccordionBody,
  AccordionItem,
  AccordionTrigger,
} from "../generic/accordion";
import { useEffect, useState } from "react";
import { getAllComponents } from "@/services/components";

const sidebarLinks = [
  {
    url: "/dashboard",
    name: "Home",
    icon: <House />,
  },
];
export default function SidebarLayout({ userSession }: { userSession: any }) {
  const location = useLocation();
  const { pathname } = location;
  return (
    <div className="sticky top-0 pt-4 min-w-80">
      <ul className="flex flex-col gap-y-5 p-3">
        <Accordion>
          {sidebarLinks.map((item) => {
            const Icon = item.icon;
            return (
              <AccordionItem
                key={item.url}
                value={item.url}
                isActive={pathname.includes(item.url)}
                className={`bg-white rounded-md ${pathname.includes(item.url) ? "bg-org-primary hover:text-black" : ""}`}
              >
                <AccordionTrigger>
                  <Link
                    to={`${item.url}`}
                    className={cn(
                      "flex gap-x-2 items-center text-sm md:text-base p-2 w-full rounded-md"
                    )}
                  >
                    {Icon}
                    <span>{item.name}</span>
                  </Link>
                </AccordionTrigger>
                <AccordionBody>
                  <ShowComponentsList auth={userSession} />
                </AccordionBody>
              </AccordionItem>
            );
          })}
        </Accordion>
        <Accordion>
          {sidebarLinks.map((item) => {
            const Icon = item.icon;
            return (
              <AccordionItem
                key={item.url}
                value={item.url}
                isActive={pathname.includes(item.url)}
                className={`bg-white rounded-md ${pathname.includes(item.url) ? "bg-org-primary hover:text-black" : ""}`}
              >
                <AccordionTrigger>
                  <Link
                    to={`${item.url}`}
                    className={cn(
                      "flex gap-x-2 items-center text-sm md:text-base p-2 w-full rounded-md"
                    )}
                  >
                    {Icon}
                    <span>{item.name}</span>
                  </Link>
                </AccordionTrigger>
                <AccordionBody>
                  <ShowComponentsList auth={userSession} />
                </AccordionBody>
              </AccordionItem>
            );
          })}
        </Accordion>
        <Accordion>
          {sidebarLinks.map((item) => {
            const Icon = item.icon;
            return (
              <AccordionItem
                key={item.url}
                value={item.url}
                isActive={pathname.includes(item.url)}
                className={`bg-white rounded-md ${pathname.includes(item.url) ? "bg-org-primary hover:text-black" : ""}`}
              >
                <AccordionTrigger>
                  <Link
                    to={`${item.url}`}
                    className={cn(
                      "flex gap-x-2 items-center text-sm md:text-base p-2 w-full rounded-md"
                    )}
                  >
                    {Icon}
                    <span>{item.name}</span>
                  </Link>
                </AccordionTrigger>
                <AccordionBody>
                  <ShowComponentsList auth={userSession} />
                </AccordionBody>
              </AccordionItem>
            );
          })}
        </Accordion>
        <Accordion>
          {sidebarLinks.map((item) => {
            const Icon = item.icon;
            return (
              <AccordionItem
                key={item.url}
                value={item.url}
                isActive={pathname.includes(item.url)}
                className={`bg-white rounded-md ${pathname.includes(item.url) ? "bg-org-primary hover:text-black" : ""}`}
              >
                <AccordionTrigger>
                  <Link
                    to={`${item.url}`}
                    className={cn(
                      "flex gap-x-2 items-center text-sm md:text-base p-2 w-full rounded-md"
                    )}
                  >
                    {Icon}
                    <span>{item.name}</span>
                  </Link>
                </AccordionTrigger>
                <AccordionBody>
                  <ShowComponentsList auth={userSession} />
                </AccordionBody>
              </AccordionItem>
            );
          })}
        </Accordion>
      </ul>
    </div>
  );
}

interface User {
  Id: number;
  name: string;
  email: string;
}

interface ComponentData {
  code: string;
  createdAt: string; // or Date if you want to work with Date objects
  description: string;
  formattedCode: string;
  Id: number;
  isActive: boolean;
  name: string;
  updatedAt: string; // or Date if you want to work with Date objects
  user: User;
  userId: number;
}

function ShowComponentsList({ auth }: { auth: any }) {
  const [loading, setLoading] = useState(true);
  const [components, setComponents] = useState<ComponentData[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await getAllComponents({ auth });
        setComponents(res?.data?.data?.responseData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    })();
  }, []);
  if (loading) return <div>Loading...</div>;
  return (
    <ul className="flex flex-col gap-y-3">
      {components.map((comp, idx) => {
        return (
          <li
            role="link"
            tabIndex={0}
            aria-label={`${comp.name} component`}
            key={`${comp.name}-${comp.Id}`}
            onClick={() => {
              navigate(`/components/view/${comp.Id}`);
            }}
            className={cn(
              "hover:cursor-pointer min-w-fit p-3 rounded-lg hover:text-org-primary hover:bg-org-primary-foreground capitalize",
              location.pathname.includes(`${comp.Id}`) &&
                "text-org-primary bg-org-primary-foreground"
            )}
          >
            <p className="max-w-24 truncate">{comp.name}</p>
          </li>
        );
      })}
    </ul>
  );
}
