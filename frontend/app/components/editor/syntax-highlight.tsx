import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
export default function ReactSyntaxHighlighter({ code }: { code: string }) {
  return (
    <div>
      <SyntaxHighlighter wrapLines={true} language="jsx">
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
