"use client";

import { WithStyle } from "@/typings/utils";
import { Button, Code } from "@heroui/react";

export const GetStarted = ({ className }: WithStyle<{}>) => {
  return (
    <div className={`flex ${className}`}>
      <Button
        className="bg-gradient-to-tr from-[#7a69f9] to-[#f26378] text-white shadow-lg mr-2"
        radius="full"
      >
        Get started
      </Button>
      <Code
        className="h-10 rounded-full sm:max-w-fit w-full overflow-x-auto overflow-y-hidden flex items-center px-6"
        size="md"
      >
        $ codesnap -f ./main.rs -o clipboard
      </Code>
    </div>
  );
};
