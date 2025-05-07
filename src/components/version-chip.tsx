"use client";

import { WithStyle } from "@/typings/utils";
import { Chip } from "@heroui/react";

export const VersionChip = ({ className }: WithStyle<{}>) => (
  <Chip className={className}>Version: 0.12.1</Chip>
);
