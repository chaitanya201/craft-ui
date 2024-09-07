import { cn } from "@/lib/utils";
import { componentSchema } from "@/routes/_auth.components.add/route";
import React from "react";
import { UseFormSetValue } from "react-hook-form";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";
import { z } from "zod";

export default function CodePreview({
  code,
  setValue,
  className,
}: {
  code: string;
  setValue: UseFormSetValue<z.infer<typeof componentSchema>>;
  className?: string;
}) {
  return (
    <div className={cn("", className)}>
      <LiveProvider code={code} scope={{ React }} noInline={false}>
        <div className="flex h-full max-h-96 gap-3 ">
          <LiveEditor
            onChange={(val) => {
              setValue("code", val);
            }}
            className="border border-gray-300 p-2 rounded min-h-80 w-1/2 overflow-y-auto"
          />
          <div className="h-full max-h-96 overflow-auto border w-1/2">
            <LivePreview />
          </div>
          <LiveError className="text-red-600" />
        </div>
      </LiveProvider>
    </div>
  );
}
