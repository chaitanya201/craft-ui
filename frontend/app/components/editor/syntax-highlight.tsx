import useFormatCode from "@/utils/hooks/format-code";
import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

export default function ReactSyntaxHighlighter({
  code,
}: {
  code: string | undefined;
}) {
  const { code: formattedCode } = useFormatCode({ code });
  return (
    <div>
      <SyntaxHighlighter wrapLines={true} language="jsx">
        {formattedCode || ""}
      </SyntaxHighlighter>
    </div>
  );
}
