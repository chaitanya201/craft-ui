import * as React from "react";

import { cn } from "@/lib/utils";
import { FormLabel } from "@/components/ui/form";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
}

const FloatingInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, value, onBlur, required, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur && onBlur(e);
          }}
          ref={ref}
          {...props}
        />
        <FormLabel
          className={cn(
            "absolute top-5 left-3 flex gap-x-1 transform -translate-y-1/2 transition-all duration-200 h-fit",
            (value || isFocused) && "-top-1 bg-white p-1"
          )}
        >
          <span>{label}</span>
          {required && <span className="text-red-500">*</span>}
        </FormLabel>
      </div>
    );
  }
);
FloatingInput.displayName = "Input";

export { FloatingInput };
