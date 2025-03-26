import { Outlet, useOutletContext } from "@remix-run/react";
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
  const auth = useOutletContext();

  return (
    <div className="">
      <Outlet context={auth} />
    </div>
  );
}
