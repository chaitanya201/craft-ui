import { Outlet, useOutletContext } from "@remix-run/react";
import React from "react";

export default function Components() {
  const auth = useOutletContext();
  return (
    <>
      <Outlet context={auth} />
    </>
  );
}
