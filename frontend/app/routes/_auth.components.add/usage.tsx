import { lazy } from "react";
import { componentSchema, TaddSchema } from "./route";
import { UseFormSetValue } from "react-hook-form";
import { z } from "zod";
import { FloatingTextarea } from "@/components/common/form-elements/floating-textarea";

const CodePreview = lazy(
  () => import("@/components/editor/live-preview.client")
);
interface ChildComponentProps {
  form: any;
}
export default function Usage({ form }: ChildComponentProps) {
  return (
    <div>
      <FloatingTextarea label="Usage" className="h-20" />
    </div>
  );
}
