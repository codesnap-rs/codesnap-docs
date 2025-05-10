"use client";

import { WithStyle } from "@/typings/utils";
import { Chip } from "@heroui/react";

interface VersionChipProps {
  version?: string;
}

export const VersionChip = ({
  className,
  version,
}: WithStyle<VersionChipProps>) => (
  <Chip className={`p-4 ${className}`}>
    {!version ? "Loading..." : version}
  </Chip>
);
