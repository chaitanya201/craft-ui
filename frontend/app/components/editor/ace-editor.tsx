import React, { useRef, useState } from "react";

interface Props {
  mode: string;
  dark?: boolean;
  onChange: () => void;
  value: string;
}
export default function Editor(data: Props) {
  return <h1>hi</h1>;
}

// import React, { useRef, useState, useEffect } from "react";
// import prettier from "prettier/standalone";
// import babelPlugin from "prettier/plugins/babel";
// import estreePlugin from "prettier/plugins/estree";

// interface Props {
//   mode: string;
//   dark?: boolean;
//   onChange: (val: string) => void;
//   value: string;
// }

// const Editor: React.FC<Props> = ({ onChange, value }) => {
//   const [AceEditor, setAceEditor] = useState<any>(null);
//   const aceEditorRef = useRef<any>(null);
//   const [code, setCode] = useState("");

//   useEffect(() => {
//     // Dynamically import the AceEditor component and ace-builds on client-side only
//     import("react-ace")
//       .then((module) => {
//         setAceEditor(() => module.default);
//         return import("ace-builds/src-noconflict/mode-jsx");
//       })
//       .then(() => {
//         return import("ace-builds/src-noconflict/theme-github");
//       })
//       .then(() => {
//         return import("ace-builds/src-noconflict/ext-language_tools");
//       })
//       .catch((error) => {
//         console.error("Failed to load ace-builds modules:", error);
//       });
//   }, []);

//   const formatCode = async () => {
//     if (aceEditorRef.current) {
//       try {
//         const formatted = await prettier.format(value, {
//           parser: "babel",
//           plugins: [babelPlugin, estreePlugin],
//           trailingComma: "all",
//         });
//         onChange(formatted);
//         aceEditorRef.current.editor.setValue(formatted, 1);
//       } catch (error) {
//         console.log("Error formatting code:", error);
//       }
//     }
//   };

//   const handleChange = (updatedCode: string) => {
//     onChange(updatedCode);
//   };

//   const saveCode = () => {
//     formatCode();
//   };

//   if (!AceEditor) return <div>Loading Editor...</div>;

//   return (
//     <AceEditor
//       ref={aceEditorRef}
//       mode={"jsx"}
//       theme={"github"}
//       onChange={handleChange}
//       name="jsxEditor"
//       height="500px"
//       width="100%"
//       value={value}
//       editorProps={{ $blockScrolling: true }}
//       setOptions={{
//         enableBasicAutocompletion: true,
//         enableLiveAutocompletion: true,
//         enableSnippets: true,
//         showLineNumbers: true,
//         tabSize: 2,
//       }}
//     />
//   );
// };

// export default Editor;
