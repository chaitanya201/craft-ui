import { getAllComponents } from "@/services/components";
import { Outlet, useOutletContext } from "@remix-run/react";
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
  id: number;
  isActive: boolean;
  name: string;
  updatedAt: string; // or Date if you want to work with Date objects
  user: User;
  userId: number;
}

export default function ShowAllComponents() {
  const [components, setComponents] = useState<ComponentData[]>([]);
  const auth = useOutletContext();
  useEffect(() => {
    (async () => {
      const res = await getAllComponents({ auth });
      setComponents(res?.data?.data?.responseData);
    })();
  }, []);
  return (
    <div>
      ShowAllComponents
      <ul>
        {components.map((comp, idx) => {
          return <li key={idx}>{comp.name}</li>;
        })}
      </ul>
      <Outlet context={auth} />
    </div>
  );
}
