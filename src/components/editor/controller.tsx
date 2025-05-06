import { Button } from "@heroui/react";

export const Controller = () => {
  return (
    <div className="flex justify-end mt-4 bg-[#FAFAFA] dark:bg-[#1E1E1E] shadow-md rounded-lg w-full h-fit p-2">
      <Button size="sm" className="mr-2">
        Copy
      </Button>
      <Button size="sm">Save</Button>
    </div>
  );
};
