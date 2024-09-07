import { Car, Search } from "lucide-react";
import React, { MouseEvent, Ref, useEffect, useRef, useState } from "react";
import SlidingInput from "../form-elements/sliding-input";
import Card from "../card/card";
import { cn } from "@/lib/utils";
import { searchComponent } from "@/services/components";
import { Link } from "@remix-run/react";
// Define the User type
interface User {
  Id: number;
  name: string;
  email: string;
}

// Define the Component type
interface Component {
  Id: number;
  name: string;
  description: string;
  code: string;
  formattedCode: string;
  userId: number;
  isActive: boolean;
  createdAt: string; // Alternatively, use Date if you work with Date objects
  updatedAt: string; // Alternatively, use Date if you work with Date objects
}

export default function SearchBarComponent({
  userSession,
}: {
  userSession: { token: string; Id: string; email: string; name: string };
}) {
  const [searchText, setSearchText] = useState("");
  const [componentList, setComponentList] = useState<Component[]>([]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const getData = async () => {
      const res = await searchComponent({
        auth: userSession,
        searchText,
      });
      setComponentList(res?.data?.data?.responseData);
    };
    if (searchText.trim().length) {
      getData();
    }
  }, [searchText]);

  useEffect(() => {
    //e:MouseEvent
    const handleClick = (e: any) => {
      setSearchText("");
      setComponentList([]);
    };
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="relative">
      <SlidingInput
        // onBlur={() => {
        //   setSearchText("");
        //   setComponentList([]);
        // }}
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        slidingLabel={<SearchBar />}
        className={cn(
          "focus-visible:w-96 focus-visible:transition-all focus-visible:duration-200 transition-all duration-300",
          searchText && "w-96"
        )}
      />
      {
        <div
          className={cn(
            "absolute transition-all duration-300 opacity-100",
            componentList.length == 0 && "opacity-0"
          )}
        >
          <div ref={dropdownRef}>
            <Dropdown componentList={componentList} />
          </div>
        </div>
      }
    </div>
  );
}

function SearchBar() {
  return (
    <div className="flex gap-x-2 items-center justify-center cursor-pointer">
      <Search />
      <span>Search</span>
    </div>
  );
}

function Dropdown({ componentList }: { componentList: Component[] }) {
  if (componentList.length == 0) {
    return <Card>No data found</Card>;
  }
  return (
    <Card className="">
      {componentList.map((comp) => {
        return (
          <Link
            key={`component-${comp.name}-${comp.Id}`}
            onClick={() => {
              console.log("clicked...");
            }}
            to={`/components/view/${comp.Id}`}
          >
            <p>{comp.name}</p>
          </Link>
        );
      })}
    </Card>
  );
}
