import { useParams } from "@remix-run/react";
import React from "react";

export default function ShowSingleComponentPage() {
  const params = useParams();

  return <div>ShowSingleComponentPage</div>;
}
