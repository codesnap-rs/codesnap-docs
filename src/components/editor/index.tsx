"use client";

import { Editor, Monaco } from "@monaco-editor/react";
import hljs from "highlight.js";
import { useTheme } from "next-themes";
import { useMemo, useState } from "react";
import OneDark from "./one-dark.json";
import OneLight from "./one-light.json";

const CODESNAP_WASM_CODE_TEMPLATE = `import init, { take_snapshot } from "codesnap.wasm";

await init();

const snapshot = take_snapshot(code);
const imageSnapshot = snapshot.create_image_snapshot();
const { data } = imageSnapshot.png_data();
const blob = new Blob([data], { type: "image/png" });
const url = URL.createObjectURL(blob);

document.getElementById("image")?.setAttribute("src", url);`;

export const CodeEditor = () => {
  const { resolvedTheme } = useTheme();
  const [code, setCode] = useState<string>("");
  const language = useMemo(
    () => hljs.highlightAuto(code).language ?? "typescript",
    [code],
  );

  const handleEditorDidMount = async (monaco: Monaco) => {
    monaco.editor.defineTheme("OneDark", {
      ...OneDark,
      base: "vs-dark",
    });

    monaco.editor.defineTheme("OneLight", {
      ...OneLight,
      base: "vs",
    });

    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
    });
  };

  return (
    <div className="px-1 py-4 bg-[#FAFAFA] dark:bg-[#1E1E1E] rounded-lg w-full h-fit dark:shadow-[6px_28px_263px_35px_rgba(68,_122,_148,_0.86)] shadow-[6px_28px_263px_35px_rgba(0,_0,_0,_0.1)]">
      <img id="image" />
      <div className="flex gap-2 mb-4 ml-4">
        <div className="rounded-full w-3 h-3 bg-[#FF5F57]" />
        <div className="rounded-full w-3 h-3 bg-[#FEBC2E]" />
        <div className="rounded-full w-3 h-3 bg-[#28C840]" />
      </div>
      <Editor
        theme={resolvedTheme === "dark" ? "OneDark" : "OneLight"}
        height={300}
        defaultLanguage="typescript"
        language={language}
        defaultValue={CODESNAP_WASM_CODE_TEMPLATE}
        onChange={(value) => setCode(value ?? "")}
        beforeMount={handleEditorDidMount}
        options={{
          minimap: {
            enabled: false,
          },
          fontSize: 14,
          fontFamily: "Jetbrains-Mono",
          fontLigatures: true,
          suggest: {
            showFields: false,
            showFunctions: false,
          },
          lineNumbers: "off",
          renderValidationDecorations: "off",
          scrollbar: {
            verticalScrollbarSize: 0,
          },
          lineDecorationsWidth: 0,
          renderLineHighlight: "none",
        }}
      />
    </div>
  );
};
