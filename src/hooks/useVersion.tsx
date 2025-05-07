"use client";
import { useEffect } from "react";
import { useStorage } from "./use-storage";

const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
const repo_url = "https://api.github.com/repos/codesnap-rs/codesnap/tags";

export const useVersion = () => {
  const [version, setStoredValue] = useStorage("codesnap_version", "");

  useEffect(() => {
    const getTagData = async () => {
      try {
        const res = await fetch(repo_url, {
          method: "GET",
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.ok && (await res.json());
        const [tagsData] = data;
        const { name } = tagsData;

        if (name !== version) {
          setStoredValue(name);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getTagData();
  }, []);

  return { version };
};
