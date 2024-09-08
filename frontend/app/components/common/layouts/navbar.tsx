import { Dispatch, SetStateAction } from "react";
import SearchBar from "../auth/searchbar";
import UserInfo from "../auth/user-info";
import { Link } from "@remix-run/react";

export default function Navbar({
  userSession,
  setShowMobileSidebar,
}: {
  userSession: { token: string; Id: string; email: string; name: string };
  setShowMobileSidebar: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="h-20 bg-white shadow-md fixed top-0 flex justify-between items-center w-full px-3">
      <div className="flex gap-x-3 items-center">
        <div className="">
          <Link className="hidden lg:block" to={"/login"}>
            <img src="/logo.png" alt="logo" className="w-16 h-16" />
          </Link>
          <button
            className="lg:hidden"
            onClick={() => {
              console.log("clicked");
              setShowMobileSidebar((pre) => {
                return !pre;
              });
            }}
          >
            <img src="/logo.png" alt="logo" className="w-12 h-12" />
          </button>
        </div>
        <p className="hidden md:block uppercase font-semibold text-xl">
          Component Hub
        </p>
      </div>
      <div className="hidden md:block">
        <SearchBar userSession={userSession} />
      </div>
      <div className="">
        <UserInfo userSession={userSession} />
      </div>
    </div>
  );
}
