import { CodeEditor } from "@/components/editor";
import { GetStarted } from "@/components/get-started";
import { Heading } from "@/components/heading";
import { VersionChip } from "@/components/version-chip";
import { fetchVersion } from "@/utils/version";

export default async function HomePage() {
  const version = await fetchVersion();

  return (
    <>
      <div className="fixed top-0 left-0 inset-0 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)] dark:bg-[radial-gradient(#242323_1px,transparent_1px)]"></div>
      <main className="flex p-5 md:p-8 lg:p-10 2xl:p-0 flex-1 text-center justify-center z-10">
        <div className="flex xl:justify-between flex-col xl:flex-row w-full max-w-fd-container">
          <div className="xl:w-1/2 mt-8 xl:mt-0 xl:h-[calc(100vh-148px)] flex flex-col justify-center">
            <VersionChip className="mb-4" version={version} />
            <Heading />
            <div className="flex text-left text-lg text-gray-500 mt-4">
              Code snapshot tool, provide CLI, Rust Library, Editor plugins and
              WebAssembly library, make it easy to use in any environment.
            </div>
            <GetStarted className="mt-8 flex sm:flex-row flex-col gap-6 sm:gap-0"></GetStarted>
          </div>
          <div className="flex mt-10 xl:mt-0 flex-col xl:w-[560px] max-w-[700px] justify-center">
            <CodeEditor />
          </div>
        </div>
      </main>
    </>
  );
}
