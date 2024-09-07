import React, { useEffect, useState } from "react";
import prettier from "prettier/standalone";
import babelPlugin from "prettier/plugins/babel";
import estreePlugin from "prettier/plugins/estree";

export default function useFormatCode({ code }: { code: string | undefined }) {
  const [localCode, setLocalCode] = useState(code);
  useEffect(() => {
    (async () => {
      try {
        const formatted = await prettier.format(code || "", {
          parser: "babel",
          plugins: [babelPlugin, estreePlugin],
          trailingComma: "all",
        });
        setLocalCode(formatted);
      } catch (error) {
        console.log("Error formatting code:", error);
      }
    })();
  }, [code]);
  return { code: localCode };
}
