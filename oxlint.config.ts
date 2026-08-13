import { defineConfig } from "oxlint";

export default defineConfig({
  env: {
    node: true,
    browser: true,
  },
  ignorePatterns: [
    "**/node_modules",
    "**/.git",
    "**/dist",
    "**/build",
    "**/out",
    "**/.next",
    "**/coverage",
    "**/*.gen.*",
    "**/*.generated.*",
    "**/package-lock.json",
  ],
});
