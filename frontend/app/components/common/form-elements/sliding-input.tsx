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
          "w-80 bg-slate-200 p-1.5 rounded-md peer ",
          props.className
        )}
      />
      <label
        className={cn(
          "absolute top-1.5 left-1/3",
          props.value && "hidden left-2 text-slate-600"
        )}
      >
        {slidingLabel}
      </label>
    </div>
  );
}
