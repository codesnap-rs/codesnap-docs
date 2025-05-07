const CARGO_FILE_URL =
  "https://raw.githubusercontent.com/codesnap-rs/codesnap/refs/heads/main/Cargo.toml";

export const fetchVersion = async () => {
  const response = await fetch(CARGO_FILE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch version");
  }

  const text = await response.text();
  const version = text.match(/version = "([^"]+)"/)?.[1] ?? "";

  return `v${version}`;
};
