import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface props extends HTMLAttributes<HTMLDivElement> {}

export default function Card({ children, className }: props) {
  return (
    <div
      className={cn(
        "p-3 bg-white border border-slate-300 shadow-md w-full rounded-md",
        className
      )}
    >
      {children}
    </div>
  );
}
