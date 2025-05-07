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
  <Chip className={className}>{!version ? "Loading..." : version}</Chip>
);
