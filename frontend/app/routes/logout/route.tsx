import { destroySession, getSession } from "@/lib/cookies";
import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import React from "react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");
  if (!token) {
    return redirect("/login");
  }

  const destroyedSession = await destroySession(session);
  return redirect("/login", { headers: { "Set-Cookie": destroyedSession } });
};

export default function LogoutPage() {
  return null;
}
