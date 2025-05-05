import { Logo } from "@/assets/icons/logo";
import { CodeEditor } from "@/components/editor";
import { GetStarted } from "@/components/get-started";
import { Button } from "@heroui/react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-1 text-center justify-center">
      <div className="flex justify-between w-full max-w-fd-container mt-20">
        <div className="w-1/2 flex flex-col justify-center">
          <h1 className="flex mb-1.5 text-balance text-2xl font-semibold tracking-tight sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl [&>span]:dark:from-muted-foreground [&>span]:dark:to-foreground [&>span]:dark:bg-gradient-to-t [&>span]:dark:to-40% [&>span]:dark:bg-clip-text [&>span]:dark:text-transparent">
            The
            <div className="flex ml-3 mb-1.5 text-2xl font-semibold tracking-tight sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl [&>span]:dark:from-muted-foreground [&>span]:dark:to-foreground [&>span]:dark:bg-gradient-to-t [&>span]:dark:to-40% [&>span]:dark:bg-clip-text [&>span]:dark:text-transparent from-[#FF1CF7] to-[#b249f8] bg-clip-text text-transparent bg-gradient-to-b">
              Most Beautiful,
            </div>
          </h1>

          <h2 className="flex mb-1.5 text-2xl font-semibold tracking-tight sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl [&>span]:dark:from-muted-foreground [&>span]:dark:to-foreground [&>span]:dark:bg-gradient-to-t [&>span]:dark:to-40% [&>span]:dark:bg-clip-text [&>span]:dark:text-transparent">
            <span className="tracking-tight inline from-[#ff7675] to-[#fdcb6e] bg-clip-text text-transparent bg-gradient-to-b">
              Faster,
            </span>
            <span className="ml-4 tracking-tight inline from-[#0984e3] to-[#74b9ff] bg-clip-text text-transparent bg-gradient-to-b">
              Customizable,
            </span>
          </h2>
          <h1 className="flex text-balance text-2xl font-semibold tracking-tight sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl [&>span]:dark:from-muted-foreground [&>span]:dark:to-foreground [&>span]:dark:bg-gradient-to-t [&>span]:dark:to-40% [&>span]:dark:bg-clip-text [&>span]:dark:text-transparent">
            code snapshot tool in Pure Rust
          </h1>

          <GetStarted></GetStarted>
        </div>
        <div className="flex flex-col justify-center">
          <CodeEditor />
        </div>
      </div>
    </main>
  );
}
