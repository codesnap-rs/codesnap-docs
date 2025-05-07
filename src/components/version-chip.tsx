"use client";

import { useVersion } from "@/hooks/useVersion";
import { WithStyle } from "@/typings/utils";
import { Chip } from "@heroui/react";

export const VersionChip = ({ className }: WithStyle<{}>) => {
  const { version } = useVersion();

  return <Chip className={className}>{!version ? "Loading..." : version}</Chip>;
};
