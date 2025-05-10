import { useState } from "react";

export const useWithToggle = (initialValue: boolean) => {
  const [value, setValue] = useState(initialValue);

  const withToggle = async (callback: () => void | Promise<void>) => {
    setValue(!initialValue);
    await callback();
    setValue(initialValue);
  };

  return [value, withToggle] as const;
};
