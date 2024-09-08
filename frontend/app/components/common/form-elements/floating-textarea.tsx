import * as React from "react";

import { cn } from "@/lib/utils";
import { FormLabel } from "@/components/ui/form";

export interface TextareaProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label: React.ReactNode;
}

const FloatingTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, value, onBlur, required, onFocus, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    return (
      <div className="">
        <div className="relative">
          <FormLabel
            className={cn(
              "absolute top-5 left-3 flex gap-x-1 transform -translate-y-1/2 transition-all duration-200 h-fit",
              (value || isFocused) && "top-0 bg-white p-1"
            )}
          >
            <span>{label}</span>
            {required && <span className="text-red-500">*</span>}
          </FormLabel>
        </div>
        <textarea
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus && onFocus(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur && onBlur(e);
          }}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
FloatingTextarea.displayName = "FloatingTextarea";

export { FloatingTextarea };
