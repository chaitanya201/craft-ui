import React, { lazy, Suspense, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";
import ReactSyntaxHighlighter from "@/components/editor/syntax-highlight";
const CodePreview = lazy(
  () => import("@/components/editor/live-preview.client")
);

const componentSchema = z.object({
  name: z.string().min(4, "Name must be at least 4 chars"),
  description: z
    .string()
    .min(4, "Description must be at least 4 chars")
    .optional(),
  code: z.string().min(1, "Code is required"),
});

export default function AddComponent() {
  const form = useForm<z.infer<typeof componentSchema>>({
    resolver: zodResolver(componentSchema),
    mode: "all",
    defaultValues: {
      code: `
      <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
<h2 className="text-2xl font-bold text-gray-900">Hello Tailwind!</h2>
        <p className="text-pink-600">Edit this code and see live updates.</p>
      </div>`,
    },
  });

  return (
    <div>
      <h3>Add Component</h3>
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <div className="flex flex-col gap-4">
                    <textarea
                      rows={10}
                      className="border border-gray-300 p-2 rounded"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                    />

                    <Suspense fallback={<div>Loding..........</div>}>
                      <CodePreview code={field.value} />
                    </Suspense>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <ReactSyntaxHighlighter code={form.getValues("code")} />
    </div>
  );
}
