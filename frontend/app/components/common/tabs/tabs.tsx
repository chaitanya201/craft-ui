import { cn } from "@/lib/utils";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface TContext {
  tabsList: {
    tab: string;
    content: ReactNode;
    isSelected: boolean;
    isDefault: boolean;
  }[];
  setTabsList: Dispatch<
    SetStateAction<
      {
        tab: string;
        content: ReactNode;
        isSelected: boolean;
        isDefault: boolean;
      }[]
    >
  >;
  defaultTab?: string;
}

const TabsContext = createContext<TContext | null>(null);

const useTabsContext = () => {
  const contextValues = useContext(TabsContext);
  if (!contextValues) {
    throw new Error("Invalid context");
  }
  return contextValues;
};

const useGetDefaultTab = () => {
  const {} = useTabsContext();
};
interface TabsProps {
  children: ReactNode;
  defaultTab?: string;
}

export default function Tabs({ children, defaultTab = "" }: TabsProps) {
  const [tabsList, setTabsList] = useState<
    {
      tab: string;
      content: ReactNode;
      isSelected: boolean;
      isDefault: boolean;
    }[]
  >([]);
  //console.log("tabs list ", tabsList);

  return (
    <TabsContext.Provider
      value={{
        tabsList,
        setTabsList,
        defaultTab,
      }}
    >
      <div className="">{children}</div>
    </TabsContext.Provider>
  );
}

interface TabsListProps {
  children: ReactNode;
  className?: string;
}

export function TabsList({ children, className }: TabsListProps) {
  return (
    <div
      className={cn(
        "flex bg-org-primary-foreground w-fit max-h-fit p-2 rounded-md overflow-x-auto",
        className
      )}
    >
      {children}
    </div>
  );
}
interface TabsTriggerProps {
  children: ReactNode;
  className?: string;
  value: string;
}

export function TabsTrigger({ children, value, className }: TabsTriggerProps) {
  const { setTabsList, tabsList, defaultTab } = useTabsContext();

  useEffect(() => {
    //console.log("in effect");
    const isTabExists = tabsList.some((item) => item.tab === value);
    if (isTabExists) {
      throw new Error(`${value} tab already exists`);
    }
    tabsList.push({
      tab: value,
      content: null,
      isSelected: false,
      isDefault: value === defaultTab,
    });
    setTabsList([...tabsList]);
  }, [value]);

  const handleClick = () => {
    setTabsList((pre) => {
      const updatedList = pre.map((item) => {
        item.isSelected = item.tab === value;
        item.isDefault = false;
        return item;
      });

      return updatedList;
    });
  };

  const isSelected = tabsList.some(
    (item) => item.tab === value && item.isSelected
  );

  const isDefault = tabsList.some((item) => {
    return item.isDefault && item.tab === value;
  });

  return (
    <button
      className={cn(
        "px-10 py-2 capitalize rounded-md font-semibold transition-all duration-300",
        (isSelected || isDefault) && "bg-org-primary",
        className
      )}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
interface TabsContentProps {
  children: ReactNode;
  className?: string;
  value: string;
}

export function TabsContent({ children, className, value }: TabsContentProps) {
  const { setTabsList, tabsList, defaultTab } = useTabsContext();

  useEffect(() => {
    setTabsList((pre) => {
      const result = pre.map((item) => {
        item.content =
          item.tab === value ? (
            <div className={cn("pt-4", className)}>{children}</div>
          ) : (
            item.content
          );
        return item;
      });
      return result;
    });
  }, [children]);

  const currentSelectedTab = tabsList.filter((item) => {
    return item.tab === value && item.isSelected;
  });
  const currentDefaultTab = tabsList.filter((item) => {
    return item.isDefault && item.tab === value;
  });
  console.log(
    "currentSelectedTab",
    currentSelectedTab,
    "value",
    value,
    " default",
    defaultTab
  );
  if (currentSelectedTab.length > 0) {
    return (
      <div className={cn("", className)}>{currentSelectedTab?.[0].content}</div>
    );
  } else if (
    currentSelectedTab.length === 0 &&
    currentDefaultTab.length === 1
  ) {
    return currentDefaultTab[0].content;
  } else {
    return null;
  }
}
