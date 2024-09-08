import { cn } from "@/lib/utils";
import { getAllComponents } from "@/services/components";
import {
  Outlet,
  useLocation,
  useNavigate,
  useOutletContext,
} from "@remix-run/react";
import React, { useEffect, useState } from "react";
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

export default function ShowAllComponents() {
  const [components, setComponents] = useState<ComponentData[]>([]);
  const [loading, setLoading] = useState(true);
  const auth = useOutletContext();
  const navigate = useNavigate();
  const location = useLocation();
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
  return (
    <div className="flex flex-col gap-y-3 w-full">
      <ul className="flex gap-x-3 overflow-x-auto">
        {components.map((comp, idx) => {
          return (
            <li
              role="link"
              tabIndex={0}
              aria-label={`${comp.name} component`}
              key={`${comp.name}-${comp.Id}`}
              onClick={() => {
                navigate(`${comp.Id}`);
              }}
              className={cn(
                "hover:cursor-pointer border min-w-fit p-3 rounded-lg hover:text-org-primary hover:bg-org-primary-foreground capitalize",
                location.pathname.includes(`${comp.Id}`) &&
                  "text-org-primary bg-org-primary-foreground"
              )}
            >
              <p className="max-w-24 truncate">{comp.name}</p>
            </li>
          );
        })}
      </ul>
      <Outlet context={auth} />
    </div>
  );
}
