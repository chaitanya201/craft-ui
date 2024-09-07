import { cn } from "@/lib/utils";
import { ReactNode, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  slidingLabel: ReactNode;
}

export default function SlidingInput({ slidingLabel, ...props }: Props) {
  return (
    <div className="relative">
      <input
        {...props}
        className={cn(
          "w-28 bg-slate-200 p-1.5 rounded-md peer focus-visible:outline-none px-4",
          props.className
        )}
      />
      <label
        className={cn(
          "absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 peer-focus-visible:hidden pointer-events-none"
        )}
      >
        {slidingLabel}
      </label>
    </div>
  );
}
