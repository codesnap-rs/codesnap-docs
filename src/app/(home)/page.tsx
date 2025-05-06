import { Logo } from "@/assets/icons/logo";
import { CodeEditor } from "@/components/editor";
import { GetStarted } from "@/components/get-started";
import { Heading } from "@/components/heading";
import { VersionChip } from "@/components/version-chip";
import { Button } from "@heroui/react";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <div className="fixed top-0 left-0 inset-0 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)] dark:bg-[radial-gradient(#242323_1px,transparent_1px)]"></div>
      <main className="flex flex-1 text-center justify-center z-10">
        <div className="flex justify-between w-full max-w-fd-container">
          <div className="w-1/2 h-[calc(100vh-148px)] flex flex-col justify-center">
            <VersionChip className="mb-4" />
            <Heading />
            <div className="flex text-start text-lg text-gray-500 mt-4">
              Code snapshot tool, provide CLI, Rust Library, Editor plugins and
              WebAssembly library, make it easy to use in any environment.
            </div>
            <GetStarted className="mt-8"></GetStarted>
          </div>
          <div className="flex flex-col justify-center">
            <CodeEditor />
          </div>
        </div>
      </main>
    </>
  );
}
