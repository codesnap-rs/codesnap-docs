"use client";
import { useEffect, useState } from "react";

const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

export const useVersion = () => {
  const _version =
    typeof window !== "undefined" &&
    window.localStorage &&
    localStorage.getItem("codesnap_version");

  const [version, setVersion] = useState(_version);

  useEffect(() => {
    fetch("https://api.github.com/repos/fatedier/frp/releases/latest", {
      method: "GET",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (_version !== data.tag_name) {
          localStorage.setItem("codesnap_version", data.tag_name);
          setVersion(data.tag_name);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return { version };
};
