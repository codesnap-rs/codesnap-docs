"use client";

import { WithStyle } from "@/typings/utils";
import { Button, Code } from "@heroui/react";

export const GetStarted = ({ className }: WithStyle<{}>) => {
  return (
    <div className={`flex items-center ${className}`}>
      <Button className="mr-4 rounded-full" color="primary">
        Get started
      </Button>
      <Code className="h-10 rounded-full flex items-center px-6" size="md">
        $ codesnap -f ./main.rs -o clipboard
      </Code>
    </div>
  );
};
