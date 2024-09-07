import useFormatCode from "@/utils/hooks/format-code";
import { Copy, CopyCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

export default function ReactSyntaxHighlighter({
  code,
}: {
  code: string | undefined;
}) {
  const [hasCopied, setHasCopied] = useState(false);
  const { code: formattedCode = "" } = useFormatCode({ code });
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formattedCode);
      setHasCopied(true);
    } catch (error) {
      setHasCopied(false);
    }
  };
  return (
    <div className="relative -mt-2">
      <button className="absolute right-3 top-2" onClick={handleCopy}>
        {!hasCopied ? <Copy /> : <CopyCheck />}
      </button>
      <SyntaxHighlighter wrapLines={true} language="jsx">
        {formattedCode}
      </SyntaxHighlighter>
    </div>
  );
}
