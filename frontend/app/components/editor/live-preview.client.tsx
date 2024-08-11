import React from "react";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";

export default function CodePreview({ code }: { code: string }) {
  return (
    <div>
      <LiveProvider code={code} scope={{ React }} noInline={false}>
        <div className="flex flex-col gap-3">
          <LiveEditor className="border border-gray-300 p-2 rounded" />
          <LivePreview />
          <LiveError className="text-red-600" />
        </div>
      </LiveProvider>
    </div>
  );
}
