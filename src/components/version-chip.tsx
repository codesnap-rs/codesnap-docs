"use client";

import { WithStyle } from "@/typings/utils";
import { Chip } from "@heroui/react";

export const VersionChip = ({ className }: WithStyle<{}>) => (
  <Chip
    className={className}
    classNames={{
      base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
      content: "drop-shadow shadow-black text-white",
    }}
    variant="shadow"
  >
    Version: 0.12.1
  </Chip>
);
