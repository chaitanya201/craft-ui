import React from "react";

export default function Navbar() {
  return (
    <div className="h-20 bg-white shadow-md sticky top-0 flex gap-x-3 items-center ">
      <div>
        <img src="/logo.jpg" alt="logo" className="w-20 h-20" />
      </div>
      <p className="uppercase font-semibold text-xl">Component Hub</p>
    </div>
  );
}
