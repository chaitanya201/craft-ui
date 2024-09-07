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
import { FloatingInput } from "@/components/common/form-elements/floating-input";
import { FloatingTextarea } from "@/components/common/form-elements/floating-textarea";
import { Button } from "@/components/ui/button";
import { createComponent } from "@/services/components";
import useFormatCode from "@/utils/hooks/format-code";
import { useOutletContext } from "@remix-run/react";
const CodePreview = lazy(
  () => import("@/components/editor/live-preview.client")
);

export const componentSchema = z.object({
  name: z.string().min(4, "Name must be at least 4 chars"),
  description: z.string().min(4, "Description must be at least 4 chars"),
  code: z.string().min(1, "Code is required"),
});

export default function AddComponent() {
  const auth = useOutletContext();
  const form = useForm<z.infer<typeof componentSchema>>({
    resolver: zodResolver(componentSchema),
    mode: "all",
    defaultValues: {
      code: `
      <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-96">
<h2 className="text-5xl font-bold text-gray-900">Hello Tailwind!</h2>
        <p className="text-pink-600">Edit this code and see live updates.</p>
      </div>`,
    },
  });

  const { code } = useFormatCode({ code: form.watch("code") });
  const onSubmit = async (data: z.infer<typeof componentSchema>) => {
    try {
      const res = await createComponent({
        auth,
        data: { ...data, code: code || "" },
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  console.log("formtedcode", code);

  return (
    <div>
      <h3>Add Component</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FloatingInput label="Name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FloatingTextarea
                      label="Description"
                      className="border w-full resize-none border-gray-300 p-2 rounded"
                      {...field}
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <div className="flex flex-col gap-4">
                      {/* <textarea
                      rows={10}
                      className="border border-gray-300 p-2 rounded"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                    /> */}

                      <Suspense fallback={<div>Loding..........</div>}>
                        <CodePreview
                          setValue={form.setValue}
                          code={field.value}
                          className=""
                        />
                      </Suspense>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <ReactSyntaxHighlighter code={form.getValues("code")} />
            <Button className="absolute bottom-10 right-40">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
