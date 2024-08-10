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
    <div className="h-20 bg-white shadow-md sticky top-0 flex justify-between items-center px-3 md:px-10">
      <div className="flex gap-x-3 items-center">
        <div className="">
          <Link className="hidden lg:block" to={"/login"}>
            <img src="/logo.jpg" alt="logo" className="w-20 h-20" />
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
            <img src="/logo.jpg" alt="logo" className="w-20 h-20" />
          </button>
        </div>
        <p className="hidden md:block uppercase font-semibold text-xl">
          Component Hub
        </p>
      </div>
      <div className="hidden md:block">
        <SearchBar />
      </div>
      <div className="">
        <UserInfo userSession={userSession} />
      </div>
    </div>
  );
}
