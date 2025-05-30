import { docs } from "@/.source";
import { loader } from "fumadocs-core/source";
import { icons } from "lucide-react";
import { createElement } from "react";
import ZedLogo from "@/assets/icons/zed-logo.webp";

const CUSTOM_ICON = {
  zed: ZedLogo,
};

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
  // it assigns a URL to your pages
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
  icon(icon) {
    if (!icon) {
      // You may set a default icon
      return;
    }

    if (icon in icons) return createElement(icons[icon as keyof typeof icons]);

    return createElement("img", {
      width: 20,
      height: 20,
      src: CUSTOM_ICON[icon as keyof typeof CUSTOM_ICON].src ?? icon,
    });
  },
});
