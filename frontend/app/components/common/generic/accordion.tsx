import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { createContext, ReactNode, useContext, useState } from "react";
const list = ["1", "2"];
const AccordionContext = createContext<any>(null);
const AccordionItemContext = createContext<any>(null);

export function Accordion({ children }: { children: ReactNode }) {
  const [activeValue, setActiveValue] = useState(false);
  return (
    <AccordionContext.Provider
      value={{
        activeValue,
        setActiveValue,
      }}
    >
      <>{children}</>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({
  children,
  value,
  className,
  isActive,
}: {
  children: ReactNode;
  value: string;
  className?: string;
  isActive?: boolean;
}) {
  const { activeValue } = useContext(AccordionContext);

  const defaultOpen = activeValue === value;

  return (
    <AccordionItemContext.Provider value={{ isActive, defaultOpen, value }}>
      <div className={cn("w-full", className)}>
        <div>{children}</div>{" "}
      </div>
    </AccordionItemContext.Provider>
  );
}

export function AccordionTrigger({ children }: { children: ReactNode }) {
  const { isActive, defaultOpen, value } = useContext(AccordionItemContext);
  const { activeValue, setActiveValue } = useContext(AccordionContext);

  const handleClick = () => {
    setActiveValue((pre) => {
      if (pre === value) {
        return null;
      }
      return value;
    });
  };

  return (
    <button className="w-full" onClick={handleClick}>
      <div
        className={`w-full flex gap-x-3 p-3 rounded-tl-md rounded-tr-md ${isActive || defaultOpen ? "bg-org-primary hover:text-black" : "hover:text-org-primary hover:bg-org-primary-foreground"}`}
      >
        {children}
        <div
          className={`transition-all duration-300 ${defaultOpen ? "rotate-180" : ""}`}
        >
          <ChevronDown />
        </div>
      </div>
    </button>
  );
}

export function AccordionBody({ children }: { children: ReactNode }) {
  const { defaultOpen } = useContext(AccordionItemContext);

  return (
    <div
      className={`bg-white border rounded-bl-md rounded-br-md  ${defaultOpen ? "opacity-100 p-3" : "opacity-0 h-0"} transition-all duration-200 ease-in-out`}
    >
      {children}
    </div>
  );
}
