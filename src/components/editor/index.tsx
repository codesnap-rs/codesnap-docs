"use client";

import { Editor, Monaco } from "@monaco-editor/react";
import hljs from "highlight.js";
import { useTheme } from "next-themes";
import { useMemo, useState } from "react";
import OneDark from "./one-dark.json";
import OneLight from "./one-light.json";
import { Aperture } from "lucide-react";
import init, { take_snapshot } from "codesnap.wasm";
import download from "downloadjs";
import { CompiledMode } from "highlight.js";
import { Language } from "highlight.js";
import { Tooltip } from "@heroui/react";
import { useWithToggle } from "@/hooks/use-toggle";
import { sleep } from "@/utils/time";

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
  const [code, setCode] = useState<string>(CODESNAP_WASM_CODE_TEMPLATE);
  const [isViewMask, withViewMaskToggle] = useWithToggle(false);
  const language = useMemo(() => {
    const { aliases = ["typescript"] } = (hljs.highlightAuto(code)._top ??
      {}) as Language;

    return aliases[0];
  }, [code]);

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

  const handleCaptureButtonClick = async () => {
    withViewMaskToggle(async () => {
      // The generate process is synchronous, it may block main thread, thus the animation
      // may not execute correctly, so we need to delay the generation logic to wait the animation execute done.
      await sleep(300);
      await init();
      const snapshot = take_snapshot(code, language);
      const imageSnapshot = snapshot.create_image_snapshot();
      const { data } = imageSnapshot.png_data();
      const mimeType = "image/png";
      const blob = new Blob([data], { type: mimeType });

      download(blob, "codesnap.png", mimeType);
    });
  };

  return (
    <div className="relative px-1 py-4 bg-[#FAFAFA] dark:bg-[#1E1E1E] rounded-lg w-full h-fit">
      <div className="absolute w-full h-full flex justify-center items-center top-0 left-0">
        <div className="m2 w-[90%] h-[90%]"></div>
      </div>

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
        value={code}
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
      <div className="flex justify-end mt-2 mr-2">
        <span className="group">
          <Tooltip
            content="Click to capture a code snapshot!"
            placement="bottom"
          >
            <Aperture
              onClick={handleCaptureButtonClick}
              color="#525252"
              strokeWidth={1.5}
              className="cursor-pointer relative z-20 outline-none"
            />
          </Tooltip>

          <div
            className={`justify-center items-center flex transition-all duration-300 ease-in-out bg-[#FAFAFA]/30 rounded-lg dark:bg-[#1E1E1E]/30 backdrop-blur-sm w-full h-full top-0 left-0 absolute ${isViewMask ? "opacity-100 z-10" : "opacity-0 z-[-1]"}`}
            backdrop-blur-sm
          >
            <div className="p-1 animate-spin drop-shadow-2xl bg-gradient-to-bl from-pink-400 via-purple-400 to-indigo-600 w-10 h-10 aspect-square rounded-full">
              <div className="rounded-full h-full w-full bg-slate-100 dark:bg-zinc-900 opacity-75 backdrop-blur-sm"></div>
            </div>
          </div>
        </span>
      </div>
    </div>
  );
};
